import React, { useState, useEffect } from "react";
import { BsFilterLeft } from "react-icons/bs";
import Sidebar from "../Sidebar";
import TypeProducts from "./../TypeProducts";
import ProductsPageItem from "../ProductsPageItem";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApiData,
  selectProducts,
  fetchProductByCategory,
} from "../../features/product/productSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import {
  fetchCategories,
  selectCategories,
} from "../../features/category/categorySlice";

const ProductsPage = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const dispatch = useDispatch();

  const handleOpenSidebar = () => {
    setOpenSidebar(true);
  };

  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductByCategory(categoryId));
    } else {
      dispatch(fetchApiData());
    }
  }, [categoryId, dispatch]);

  const products = useSelector(selectProducts);
  const totalProducts = products.length;

  const renderPageNumbers = () => {
    // Logic to render page numbers
  };

  return (
    <>
      <TypeProducts category={category} />
      <div className="product-page-box container">
        <div className="product-page-hero">
          <p
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={handleOpenSidebar}
          >
            <BsFilterLeft size={20} />
            Filter
          </p>
          <span>{totalProducts} items</span>
        </div>
        <div className="product-page-secound">
          <Sidebar open={openSidebar} close={handleCloseSidebar} />
          <div className="product-page-secound-box">
            <div className="product-page-lists">
              {products.map((item) => (
                <ProductsPageItem
                  key={item._id}
                  id={item._id}
                  image={item.images[0]}
                  name={item.name}
                  price={item.price}
                  newprice={item.newprice}
                />
              ))}
            </div>
            <div className="product-page-pagination">
              <span
                onClick={() => handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? "pagination-hide" : ""}
              >
                <MdKeyboardArrowLeft size={20} /> Previous
              </span>
              <p className="product-page-pagination-items">
                {renderPageNumbers()}
              </p>
              <span
                onClick={() => handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? "pagination-hide" : ""}
              >
                Next <MdKeyboardArrowRight size={20} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
