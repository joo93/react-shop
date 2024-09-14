import { useRecoilState, useRecoilValue } from "recoil";
import { IProduct, productsList } from "../../store/products";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Rating from "../common/Rating";
import Breadcrumb from "../common/Breadcrumb";
import ProductsLoad from "./ProductsLoad";
import { ICartItems, ICartState, cartState } from "../../store/cart";

const ProductView = () => {
  const products = useRecoilValue(productsList);
  const [cart, setCart] = useRecoilState(cartState);

  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const findProduct = products.find((product) => product.id === Number(id));
    if (!findProduct) {
      const navigate = useNavigate();
      navigate("/error");
      return;
    }
    setProduct(findProduct);
    setLoading(false); // 제품 데이터 로드 완료
  }, [id]);

  // addToCart 구현
  const addToCart = () => {
    if (product) {
      setCart((prevCart: ICartState) => {
        const newItems = { ...prevCart.items };
        const existingItem = newItems[product.id];

        if (existingItem) {
          newItems[product.id] = {
            ...existingItem,
            count: existingItem.count + 1,
          };
        } else {
          newItems[product.id] = {
            id: product.id.toString(),
            count: 1,
          };
        }

        return { ...prevCart, items: newItems };
      });
    }
  };

  if (loading) {
    return <ProductsLoad limit={1} />; // 로딩 상태일 때 ProductsLoad 컴포넌트 사용
  }

  return product ? (
    <div className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <div>
        <Breadcrumb category={product.category} crumb={product.title} />
        <div className="lg:flex lg:items-center mt-6 md:mt-14 px-2 lg:px-0">
          <figure className="flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white view_image">
            <img src={product.image} className="object-contain w-full h-72" />
          </figure>
          <div className="card-body px-1 lg:px-12">
            <h2 className="card-title">
              {product.title}
              <span className="badge badge-accent ml-2">NEW</span>
            </h2>
            <p>{product.description}</p>
            <Rating rate={product.rating.rate} count={product.rating.count} />
            <p className="mt-2 mb-4 text-3xl">${product.price}</p>
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => addToCart()}>
                장바구니에 담기
              </button>
              <Link to="/cart" className="btn btn-outline ml-1">
                장바구니로 이동
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ProductView;
