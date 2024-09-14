import { useEffect, useRef, useState } from "react";
import { IProduct } from "../../store/products";

const SearchBar = ({ products, onProductSelect }) => {
  const [searchText, setSearchText] = useState("");
  const [searchProductList, setSearchProductList] = useState<IProduct[]>([]);
  const [searchFocus, setSearchFocus] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const searchList = products.filter((product) => product.title.toLowerCase().includes(searchText.toLowerCase()));
    setSearchProductList(searchList);
  }, [searchText, products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocus(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    setSearchFocus(value.length > 0);
  };

  return (
    <div ref={searchRef}>
      <div className="dropdown">
        <button
          type="button"
          className="flex sm:hidden w-10 sm:w-auto mx-0 px-0 sm:mx-2 sm:px-2 btn btn-ghost dark:hover:bg-zinc-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 stroke-gray-700 dark:stroke-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
        <input
          type="text"
          name="inputValue"
          placeholder="검색"
          className="fixed left-0 top-16 z-10 sm:opacity-100 sm:static sm:flex w-full input input-ghost focus:outline-0 rounded-none sm:rounded bg-gray-300 dark:bg-gray-600 !text-gray-800 dark:!text-white sm:transform-none transition-all"
          value={searchText}
          onChange={handleChange}
          onFocus={() => setSearchFocus(true)}
        />
      </div>
      {searchFocus && (
        <ul className="fixed sm:!absolute sm:top-14 menu flex-nowrap dropdown-content w-full sm:w-64 max-h-96 shadow text-base-content overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-60">
          {searchProductList.map((product) => (
            <li key={product.id} className="py-3">
              <button
                className="text-left hover:text-base-content"
                onClick={() => {
                  onProductSelect(product.id);
                  setSearchText("");
                  setSearchFocus(false);
                }}
              >
                {product.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
