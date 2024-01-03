import React from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart } from "../features/cart/CartSlice";
import { isValidAccessToken } from "../utils/cookieStorage";
import { ROUTES } from "./../utils/routes";
import { openLoginModal } from "../features/modal/modalSlice";

const CartItem = ({ item, onRemoveItem }) => (
  <div className="cart-product" key={`product-inBagCart-${item.id}`}>
    <div className="cart-img">
      <img src={item.images[0]} alt="" />
    </div>
    <div className="cart-desc">
      <p className="cart-name">
        {item.name}{" "}
        <GrClose
          style={{ cursor: "pointer" }}
          onClick={() => onRemoveItem(item.id)}
        />
      </p>
      <p className="cart-decription">Odeon - Medium Wash</p>
      <p className="cart-price">
        {`$${item.price}`} <del>89.50</del>
      </p>
      <div className="cart-size">
        <p>Size: {item.size}</p>
        <span className="w-full p-2 border border-gray-300 rounded">
          Quantity: {item.quantity}
        </span>
      </div>
      <div className="cart-subtotal">
        <p>
          Subtotal: <span>${item.subTotal}</span>
        </p>
      </div>
    </div>
  </div>
);

const Cart = ({ open, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.carts);
  const total = useSelector((state) => state.cart.total);

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleContinueCheckout = (e) => {
    e.preventDefault();
    const isValidToken = isValidAccessToken();

    if (isValidToken) {
      navigate(ROUTES.ORDER);
    } else {
      dispatch(openLoginModal());
    }
  };

  const renderCartItems = () =>
    cartItems?.map((item) => (
      <CartItem key={item.id} item={item} onRemoveItem={handleRemoveItem} />
    ));

  const renderTotal = () => (
    <div className="cart-total-title">
      Estimated Total <span>{`$${total}`}</span>
    </div>
  );

  return (
    <div className="cart-root">
      <div className={`cart ${open ? "openBagCart" : ""}`}>
        <p className="cart-box">
          <h4 className="cart-title">Your Cart</h4>
          <GrClose size={22} onClick={onClose} />
        </p>
        <div className={cartItems?.length === 3 ? "cart-group" : ""}>
          <h4 className="cart-ship">Ship</h4>
          {renderCartItems()}
        </div>
        <div className="cart-total">
          {renderTotal()}
          <div className="cart-btn">
            <Link to="/" onClick={handleContinueCheckout}>
              Continue to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
