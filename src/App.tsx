import "./assets/css/tailwind.css";
import { BrowserRouter } from "react-router-dom";
import Drawer from "./components/common/Drawer";
import Router from "./router/router";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { Suspense, useState } from "react";

const App = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnCloseDrawer = () => {
    setIsOpen(false);
  };

  return (
    <BrowserRouter>
      <input
        type="checkbox"
        id="side-menu"
        className="drawer-toggle"
        checked={isOpen}
        onChange={(e) => setIsOpen(e.target.checked)} // 상태 변경을 직접 처리
      />
      <section className="drawer-content  dark:bg-gray-800 dark:text-gray-400">
        <Header />
        <section className="main pt-16">
          <Suspense fallback={<div>Loading...</div>}>
            <Router />
          </Suspense>
        </section>
        <Footer />
      </section>
      <Drawer overlay={handleOnCloseDrawer} />
    </BrowserRouter>
  );
};

export default App;
