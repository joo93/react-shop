import { atom, selector } from "recoil";
import { CART_ITEM } from "../constants/category";
import { productsList } from "./products";

export interface ICartInfo {
  readonly id: string;
  readonly count: number;
}

export interface ICartItems {
  readonly id: number;
  readonly title: string;
  readonly price: number;
  readonly count: number;
  readonly image: string;
}

export interface ICartState {
  readonly items?: Record<string | number, ICartInfo>;
}

/**
 * 카트의 상태는 localStorage 기준으로 초기화 됩니다.
 * 카트의 상태는 새로고침해도 유지되어야 하기 때문입니다.
 */
export const cartState = atom<ICartState>({
  key: "cart",
  default: { items: {} },
  effects: [
    ({ setSelf, onSet }) => {
      localStorage.getItem(CART_ITEM) && setSelf(JSON.parse(localStorage.getItem(CART_ITEM) as string));
      onSet((value) => localStorage.setItem(CART_ITEM, JSON.stringify(value)));
    },
  ],
});

/**
 * cartList를 구현 하세요.
 * id, image, count 등을 return합니다.
 */
export const cartList = selector<ICartItems[]>({
  key: "cartList",
  get: ({ get }) => {
    const cart = get(cartState);
    const allProducts = get(productsList);
    return Object.values(cart.items || {}).map((item) => {
      const productDetails = allProducts.find((p) => p.id === parseInt(item.id));
      return {
        id: parseInt(item.id),
        title: productDetails?.title || "",
        price: productDetails?.price || 0,
        count: item.count,
        image: productDetails?.image || "",
      };
    });
  },
});

// addToCart는 구현 해보세요.
export const addToCart = (cart: ICartState, id: string): ICartState => {
  const tempCart = { ...cart };
  if (tempCart.items && tempCart.items[id]) {
    // 아이템이 이미 카트에 있는 경우, 수량을 1 증가
    return {
      ...tempCart,
      items: {
        ...tempCart.items,
        [id]: { ...tempCart.items[id], count: tempCart.items[id].count + 1 },
      },
    };
  } else {
    // 아이템이 카트에 없는 경우, 새로 추가
    return {
      ...tempCart,
      items: {
        ...tempCart.items,
        [id]: { id, count: 1 },
      },
    };
  }
};

// removeFromCart는 참고 하세요.
export const removeFromCart = (cart: ICartState, id: string): ICartState => {
  const tempCart = { ...cart };
  if (tempCart.items && tempCart.items[id]) {
    if (tempCart.items[id].count === 1) {
      // 수량이 1인 경우 아이템 제거
      const { [id]: _, ...restItems } = tempCart.items;
      return { ...tempCart, items: restItems };
    } else {
      // 수량이 1보다 큰 경우 수량 감소
      return {
        ...tempCart,
        items: {
          ...tempCart.items,
          [id]: { ...tempCart.items[id], count: tempCart.items[id].count - 1 },
        },
      };
    }
  }
  return tempCart; // 아이템이 없는 경우 카트 그대로 반환
};

/**
 * 그 외에 화면을 참고하며 필요한 기능들을 구현 하세요.
 */
