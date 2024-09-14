import { useRecoilValue } from "recoil";
import Slider from "../components/common/Slider";
import { accessoryList, digitalList, fashionList } from "../store/products";
import ItemList from "../components/products/ItemList";

// 홈

const Index = (): JSX.Element => {
  const fashionLists = useRecoilValue(fashionList);
  const accessoryLists = useRecoilValue(accessoryList);
  const digitalLists = useRecoilValue(digitalList);

  return (
    <>
      <Slider />
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mt-10 xl:container mx-auto  ">
        <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">패션</h2>
        <ItemList products={fashionLists.slice(0, 4)} category="패션" />
      </section>
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto  ">
        <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">액세서리</h2>
        <ItemList products={accessoryLists.slice(0, 4)} category="액세서리" />
      </section>
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto  ">
        <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">디지털</h2>
        <ItemList products={digitalLists.slice(0, 4)} category="디지털" />
      </section>
    </>
  );
};

export default Index;
