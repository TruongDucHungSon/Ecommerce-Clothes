import React, { useState, useEffect } from "react";
import { BsFilterLeft } from "react-icons/bs";
import Sidebar from "../Sidebar";
import TypeProducts from "./../TypeProducts";
import ProductsPageItem from "../ProductsPageItem";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApiData,
  selectproducts,
} from "../../features/product/productSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { fetchProductByCategory } from "../../features/product/productSlice";
import {
  fetchCategories,
  selectCategories,
} from "../../features/category/categorySlice";
const ProductsPage = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const handleOpenSidebar = () => {
    setOpenSidebar(true);
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category");
  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };
  const navigate = useNavigate();
  const { loading, error, currentPage, totalPages, totalProducts, pageSize } =
    useSelector((state) => state.api);
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductByCategory(categoryId));
    } else {
      dispatch(fetchApiData());
    }
  }, [categoryId]);

  const dispatch = useDispatch();
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`pagination-number ${
          currentPage === pageNumber ? "pagination-number-active" : ""
        }`}
      >
        {pageNumber}
      </button>
    ));
  };
  const product = useSelector(selectproducts);
  const category = useSelector(selectCategories);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(fetchApiData({ page: newPage }));
      navigate(`/product?page=${newPage}&pageSize=${pageSize}`);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
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
              {product?.map((item) => (
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
