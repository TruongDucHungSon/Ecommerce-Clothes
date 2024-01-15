import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../YupGlobal";
import { useDispatch, useSelector } from "react-redux";
import { http } from "../../api/http";
import { clearCart } from "../../features/cart/CartSlice";
import { useNavigate } from "react-router-dom";
const schema = yup
  .object({
    name: yup.string().min(1).required(),
    note: yup.string().min(1).required(),
    address: yup.string().required(),
    phone: yup.number().min(10).required(),
  })
  .required();

const Order = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.carts);
  const total = useSelector((state) => state.cart.total);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const orderData = {
      userId: userData._id,
      name: data.name,
      note: data.note,
      address: data.address,
      phone: data.phone,
      cartItems: cartItems,
      total: total,
    };
    try {
      const response = await http.request({
        method: "POST",
        url: "/order",
        data: orderData,
      });
      if (response.message === "success") {
        navigate("/myorder");
        dispatch(clearCart());
        reset();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="order container" style={{ marginBlock: 100 }}>
      <div className="order-wrapper">
        <div className="order-left">
          <h3 className="oder-title">SECURE CHECKOUT</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="oder-form">
            <div className="oder-form-box">
              <h3 className="oder-form-title">Shipping Address</h3>
              <div className="form-item">
                <label htmlFor="name">Name*</label>
                <input id="name" {...register("name")} />
                <p className="form-error">{errors.name?.message}</p>
              </div>
              <div className="form-item">
                <label htmlFor="address">Address*</label>
                <input id="address" {...register("address")} />
                <p className="form-error">{errors.address?.message}</p>
                <div className="form-item">
                  <label htmlFor="phone">Phone Number*</label>
                  <input id="phone" {...register("phone")} type="number" />
                  <p className="form-error">{errors.phone?.message}</p>
                </div>
                <div className="form-item">
                  <label htmlFor="note">Note for shipper*</label>
                  <input id="note" {...register("note")} placeholder="" />
                  <p className="form-error">{errors.note?.message}</p>
                </div>
              </div>
            </div>
            <button className="form-submit" type="submit">
              Save
            </button>
          </form>
        </div>
        <div className="order-right">
          <h3 className="oder-title">ORDER SUMMARY</h3>
          <div className="oder-items">
            <span>Items</span>
            <span>{cartItems.length}</span>
          </div>
          <div className="oder-items">
            <span>Estimated Tax</span>
            <span>Calculated in Checkout</span>
          </div>
          <div className="oder-items">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div className="oder-total">
            <span>Total</span>
            <span>${total}</span>
          </div>
          {userData ? (
            <div className="oder-cart">
              <div className="oder-cart-head">
                <p>Shopping Bag</p>
              </div>

              <div className="oder-cart-number">
                {cartItems.length === 1
                  ? `${cartItems.length} item`
                  : `${cartItems.length} items`}
              </div>
              <div className="oder-cart-lists">
                {cartItems?.map((item) => (
                  <div className="oder-cart-items" key={item._id}>
                    <div className="oder-cart-img">
                      <img src={item.images[0]} alt="cart oder" />
                    </div>
                    <div className="oder-cart-desc">
                      <p className="oder-cart-name">{item.name}</p>
                      <p className="oder-cart-price">{`$${item.price}`}</p>
                      <p className="oder-cart-size">
                        {item.size} <span>Quantity: {item.quantity}</span>
                      </p>
                      <p className="oder-cart-subTotal">
                        Total <span>${item.subTotal}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

export default Order;
