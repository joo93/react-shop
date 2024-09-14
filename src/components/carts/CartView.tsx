import { Link } from "react-router-dom";
import BreadCrumb from "../common/Breadcrumb";
import Confirm from "../common/Confirm";
import { useRecoilValue } from "recoil";
import { ICartState, cartState } from "../../store/cart";
import CartList from "./CartList";
import { IProduct, productsList } from "../../store/products";
import { toCurrencyFormat } from "../../helpers/helpers";
import { useState } from "react";

const CartView = (): JSX.Element => {
  const cart = useRecoilValue<ICartState>(cartState);
  const products = useRecoilValue(productsList);
  const [isConfirmModal, setIsConfirmModal] = useState(false);

  const isCartEmpty = !cart.items || Object.keys(cart.items).length === 0;

  const getProductDetails = (id: string): IProduct | undefined => {
    return products.find((product) => product.id.toString() === id);
  };

  const calculateTotalPrice = (): number => {
    if (!cart.items) return 0;
    return Object.entries(cart.items).reduce((total, [id, item]) => {
      const product = getProductDetails(id);
      return total + (product?.price || 0) * item.count;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  const handlePurchase = () => {
    setIsConfirmModal(true);
  };

  return (
    <>
      <BreadCrumb category="홈" crumb="장바구니" />
      <div className="mt-6 md:mt-14 px-2 lg:px-0">
        {isCartEmpty ? (
          <div>
            <h1 className="text-2xl">장바구니에 물품이 없습니다.</h1>
            <Link to="/" className="btn btn-primary mt-10">
              담으러 가기
            </Link>
          </div>
        ) : (
          <>
            <CartList />
          </>
        )}
        <div className="self-start shrink-0 flex items-center mt-10 mb-20">
          <span className="text-xl md:text-2xl">총 : {toCurrencyFormat(totalPrice)}</span>
          <label htmlFor="confirm-modal" className="modal-button btn btn-primary ml-5" onClick={handlePurchase}>
            구매하기
          </label>
        </div>
      </div>
      {isConfirmModal && <Confirm />}
    </>
  );
};

export default CartView;
