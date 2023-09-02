import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../YupGlobal";
import { Link } from "react-router-dom";

const schema = yup
  .object({
    firstName: yup.string().min(1).required(),
    lastName: yup.string().min(1).required(),
    address: yup.string().required(),
    phone: yup.number().min(10).required(),
    chooseCb: yup.bool().oneOf([true], "Checkbox selection is required"),
  })
  .required();

const Order = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);

  return (
    <section className="order container" style={{ marginBlock: 100 }}>
      <div className="order-wrapper">
        <div className="order-left">
          <h3 className="oder-title">SECURE CHECKOUT</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="oder-form">
            <div className="oder-form-box">
              <h3 className="oder-form-title">Shipping Address</h3>
              <div className="form-item">
                <label htmlFor="firstName">First Name*</label>
                <input id="firstName" {...register("firstName")} />
                <p className="form-error">{errors.firstName?.message}</p>
              </div>
              <div className="form-item">
                <label htmlFor="lastname">Last Name*</label>
                <input id="lastName" {...register("lastName")} />
                <p className="form-error">{errors.lastName?.message}</p>
              </div>
              <div className="form-item">
                <label htmlFor="address">Address*</label>
                <input id="address" {...register("address")} />
                <p className="form-error">{errors.address?.message}</p>
              </div>
              <div className="form-item">
                <label htmlFor="phone">Phone Number*</label>
                <input id="phone" {...register("phone")} />
                <p className="form-error">{errors.phone?.message}</p>
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
            <span>$55.65</span>
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
            <span>$55.65</span>
          </div>
          <div className="oder-cart">
            <div className="oder-cart-head">
              <p>Shopping Bag</p>
              <Link to={`/`}>Edit</Link>
            </div>
            <div className="oder-cart-number">1 item</div>
            <div className="oder-cart-items">
              <div className="oder-cart-img">
                <img
                  src="https://lsco.scene7.com/is/image/lsco/005010115-front-pdp?fmt=avif&qlt=40&resMode=bisharp&fit=crop,0&op_usm=0.6,0.6,8&wid=300&hei=400&cropN=0,0.35,1,0.65"
                  alt="cart oder"
                />
              </div>
              <div className="oder-cart-desc">
                <p className="oder-cart-name">501® Original Fit Men's Jeans</p>
                <p className="oder-cart-price">$55.65 </p>
                <p className="oder-cart-size">
                  31W X 34L <span>Quantity: 1</span>
                </p>
                <p className="oder-cart-subTotal">
                  Total <span>$55.65</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
