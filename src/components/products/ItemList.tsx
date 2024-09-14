import { IProduct } from "../../store/products";
import ProductCard from "./ProductCard";

const ItemList = ({ products }: { products: IProduct[]; category: string }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 ">
      {products.map((product, id) => (
        <ProductCard product={product} key={id} />
      ))}
    </div>
  );
};

export default ItemList;
