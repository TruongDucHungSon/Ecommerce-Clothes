import Navbar from "./Navbar";
import Input from "./Input";
import Logo from "./Logo";
import { TbHeart } from "react-icons/tb";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { CgSearch } from "react-icons/cg";
import { GrLocationPin, GrRefresh } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Cart from "./Cart";
import HeaderMobile from "./Header.mobile";
import SignUp from "./FormSingup";
import Login from "./FormLogin";
import { useDispatch } from "react-redux";
import { openLoginModal, openSignUpModal } from "../features/modal/modalSlice";
import { useSelector } from "react-redux";
import { clearUserData } from "../features/auth/authSlice";
import { clearToken, isValidAccessToken } from "../utils/cookieStorage";
import SearchBox from "./SearchBox";
import useDebounce from "../hooks/useDebounce";
import { filterProduct, updateSearchResults } from "../features/product/productSlice";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.carts);
  const searchResults = useSelector((state) => state.api.searchResults);
  const searchResultsLoading = useSelector((state) => state.api.searchResultsLoading);
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openBagCart, setOpenBagCart] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debounce = useDebounce(searchValue, 500);
  const [showResult, setShowResult] = useState(false);
  const searchBox = useRef();

  useEffect(() => {
    if(searchValue.trim().length !== 0) {
      dispatch(filterProduct({name: searchValue}));
    } else {
      dispatch(updateSearchResults([]))
    }
  }, [debounce]);

  useEffect(() => {

    let timeout;

    if(showResult && searchResults.length !== 0) {
      searchBox.current.style.display = "block";
    } else {
      timeout = setTimeout(() => {
        searchBox.current.style.display = "none";
      }, 200);
    }

    return () => clearTimeout(timeout);
  }, [showResult, searchResults]);

  // * handle open Bag Cart
  const handleOpenBag = () => {
    setOpenBagCart(true);
  };
  const handleCloseBag = () => {
    setOpenBagCart(false);
  };
  // * handle open modal Form
  const handleOpenSignInModal = () => {
    dispatch(openLoginModal());
  };
  const handleopenSignUpModal = () => {
    dispatch(openSignUpModal());
  };
  const checkAuth = () => {
    const isValidToken = isValidAccessToken();
    if (isValidToken) return navigate("/favorite");
    dispatch(openLoginModal());
  };
  const handleLogout = () => {
    clearToken();
    dispatch(clearUserData());
    window.location.reload();
  };

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  }
  
  return (
    <>
      <SignUp />
      <Login />
      <HeaderMobile onClose={handleCloseBag} onOpen={handleOpenBag} />
      <div className="header-group">
        {/* Header */}
        <div className="button-group">
          <div className="button-box container">
            {user ? (
              <p className="welcome">{`Hi, ${user.username} ${user.lastname}`}</p>
            ) : (
              <>
                <Link className="button" onClick={handleOpenSignInModal}>
                  Log in
                </Link>
                <Link className="button" onClick={handleopenSignUpModal}>
                  Sign Up
                </Link>
              </>
            )}
            {user && (
              <span className="logout" onClick={handleLogout}>
                Log out
              </span>
            )}
            <div className="location">
              <GrLocationPin size={12} />
              <p>Viet Nam</p>
            </div>
          </div>
        </div>
        {/* NavBar */}
        <nav className="container header">
          <Navbar />
          <Logo />
          <div className="header-box">
            <div className="header-icon">
              <CgSearch size={22} />
              <Input
                className="header-input"
                type="text"
                placeholder="What are you looking for?"
                value={searchValue}
                onChange={handleSearchValue}
                onFocus={() => setShowResult(true)}
                onBlur={() => setShowResult(false)}
              />
              {searchResultsLoading && <GrRefresh className="spin" />}
              <SearchBox useRef={searchBox} list={searchResults}/>
            </div>
            <div className="header-action ">
              <TbHeart
                size={24}
                onClick={checkAuth}
                style={{ cursor: "pointer" }}
              />
              <div className="header-items-cart" onClick={handleOpenBag}>
                <HiOutlineShoppingBag size={24} style={{ cursor: "pointer" }} />
                <span>{cartItems?.length || 0}</span>
              </div>
            </div>
          </div>
        </nav>
        {/* Bag Cart */}
      </div>
      <Cart open={openBagCart} onClose={handleCloseBag} />
    </>
  );
};

export default Header;
