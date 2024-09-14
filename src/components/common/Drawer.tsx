import { useState } from "react";
import { Link } from "react-router-dom";

interface iDrawer {
  readonly overlay: () => void;
}

const Drawer = ({ overlay }: iDrawer): JSX.Element => {
  const menus = [
    { name: "fashion", title: "패션" },
    { name: "accessory", title: "액세서리" },
    { name: "digital", title: "디지털" },
  ];

  return (
    <div className="drawer-side">
      <label htmlFor="side-menu" className="drawer-overlay"></label>
      <ul className="menu w-60 sm:w-80 p-4 overflow-y-auto bg-white dark:bg-gray-800">
        {menus.map((menu) => {
          return (
            <li key={menu.name}>
              <Link
                to={`/${menu.name}`}
                onClick={overlay}
                className="!text-gray-700 active:!text-white dark:!text-white dark:hover:bg-gray-700"
              >
                {menu.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Drawer;
