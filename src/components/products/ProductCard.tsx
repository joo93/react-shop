import { Link } from "react-router-dom";
import { IProduct } from "../../store/products";

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <Link
      to={`/product/${[product.id]}`}
      className="card card-bordered border-gray-200 dark:border-gray-800 card-compact lg:card-normal"
    >
      <figure className="flex h-80 bg-white overflow-hidden ">
        <img
          src={product.image}
          alt={product.title}
          className="transform hover:scale-125 transition-transform duration-200 h-40 w-40 object-contain"
        />
      </figure>
      <div className="card-body  bg-gray-100 dark:bg-gray-700 ">
        <p className="card-title text-base">{product.title}</p>
        <p className="text-base">${product.price}</p>
      </div>
    </Link>
  );
}
