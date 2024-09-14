import { Link } from "react-router-dom";
import { ICartState, addToCart, cartState, removeFromCart } from "../../store/cart";
import { toCurrencyFormat } from "../../helpers/helpers";
import { useRecoilState, useRecoilValue } from "recoil";
import { IProduct, productsList } from "../../store/products";

const CartList = (): JSX.Element => {
  // Recoil을 사용해서 cart데이터를 가져오는 예제입니다.
  const [cart, setCart] = useRecoilState<ICartState>(cartState);
  const products = useRecoilValue(productsList);

  const getProductDetails = (id: string): IProduct | undefined => {
    return products.find((product) => product.id.toString() === id);
  };

  // store/cart.ts를 참고하세요.
  const removeFromCartHandler = (id: string) => {
    setCart(removeFromCart(cart, id));
  };

  //addForm 추가하기
  const handleAddToCart = (id: string) => {
    setCart(addToCart(cart, id));
  };

  return (
    <div className="lg:flex lg:items-center mt-4 px-2 lg:px-0">
      {/* 카트 리스트 화면을 구성 해보세요. */}
      {Object.entries(cart.items || {}).map(([id, item]) => {
        const productDetails = getProductDetails(id);
        return (
          <div key={id} className="lg:flex lg:items-center mt-4 px-2 lg:px-0">
            <Link to={`/product/${id}`}>
              <figure className="w-56 min-w-full flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white">
                <img src={productDetails?.image} alt={productDetails?.title} className="object-contain w-full h-48" />
              </figure>
            </Link>
            <div className="card-body px-1 lg:px-12">
              <h2 className="card-title">
                <Link to={`/product/${id}`} className="link link-hover">
                  {productDetails?.title}
                </Link>
              </h2>
              <p className="mt-2 mb-4 text-3xl">
                {toCurrencyFormat((productDetails?.price || 0) * item.count)}
                <span className="text-2xl"> ({toCurrencyFormat(productDetails?.price || 0)})</span>
              </p>
              <div className="card-actions">
                <div className="btn-group">
                  <button className="btn btn-primary" onClick={() => removeFromCartHandler(id)}>
                    -
                  </button>
                  <button className="btn btn-ghost no-animation">{item.count}</button>
                  <button className="btn btn-primary" onClick={() => handleAddToCart(id)}>
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CartList;
