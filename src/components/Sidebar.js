import { GrFormSubtract } from "react-icons/gr";
import { GrClose } from "react-icons/gr";
import {
  fetchCategories,
  selectCategories,
} from "../features/category/categorySlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProductByCategory } from "../features/product/productSlice";
const Sidebar = ({ open, close }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const category = useSelector(selectCategories);

  return (
    <section className={`sidebar-box ${open ? "active-sidebar" : ""}`}>
      <div className="product-page-hero dislay">
        <p>Filter</p>
        <GrClose onClick={close} />
      </div>

      <div className="sidebar">
        <div className="sidebar-header">
          <p>Category</p> <GrFormSubtract />
        </div>

        <div className="sidebar-action">
          <div className="sidebar-lists">
            {category?.map((item) => (
              <Link
                className="sidebar-category"
                key={item._id}
                to={`/product/category/${item._id}`}
                onClick={() => dispatch(fetchProductByCategory(item._id))}
              >
                {`${item.name} `}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
