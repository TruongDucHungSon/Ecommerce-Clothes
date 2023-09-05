import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./utils/routes";

import Home from "./components/page/Home.page";
import Header from "./components/Header";
import Footer from "./components/Footer";

import ProductDetail from "./components/page/ProductDetail.page";
import ProductsPage from "./components/page/Products.page";
import Contact from "./components/Contact";
import Order from "./components/page/Oder.page";
import Myorder from "./components/page/MyOrder";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.PRODUCT} element={<ProductsPage />} />
        <Route path={ROUTES.PRODUCTBYCATEGORY} element={<ProductsPage />} />
        <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetail />} />
        <Route path={ROUTES.ORDER} element={<Order />} />
        <Route path={ROUTES.YOURORDER} element={<Myorder />} />
      </Routes>
      <Contact />
      <Footer />
    </>
  );
}

export default App;
