import Navbar from "./Navbar";
import Input from "./Input";
import Logo from "./Logo";
import { TbHeart } from "react-icons/tb";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { CgSearch } from "react-icons/cg";
import { GrLocationPin } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useState } from "react";
import Cart from "./Cart";
import HeaderMobile from "./Header.mobile";
import SignUp from "./FormSingup";
import Login from "./FormLogin";
import { useDispatch } from "react-redux";
import { openLoginModal, openSignUpModal } from "../features/modal/modalSlice";
import { useSelector } from "react-redux";
import { clearUserData } from "../features/auth/authSlice";
import { clearToken } from "../utils/cookieStorage";
const Header = () => {
  const user = useSelector((state) => state.auth.userData);
  console.log(user);
  const dispatch = useDispatch();
  const [openBagCart, setOpenBagCart] = useState(false);
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

  const handleLogout = () => {
    clearToken();
    dispatch(clearUserData());
    window.location.reload();
  };
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
              />
            </div>
            <div className="header-action ">
              <TbHeart size={24} />
              <HiOutlineShoppingBag size={24} onClick={handleOpenBag} />
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
