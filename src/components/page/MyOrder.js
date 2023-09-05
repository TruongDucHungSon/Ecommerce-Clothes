import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrderData,
  fetchOrderData,
  selectOrder,
} from "../../features/oder/orderSlice";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

const MyOrder = () => {
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderData());
  }, [dispatch]);

  const orders = useSelector(selectOrder);

  const handleDeleteOrder = (id) => {
    dispatch(deleteOrderData(id));
  };

  // Check if there are no orders or user data
  if (!orders || !user) {
    return (
      <div className="my-order container" style={{ marginBlock: "100px" }}>
        <h4>My Orders</h4>
        <p style={{ marginBlock: "20px" }}>There are no items in your bag.</p>
        <Link to={ROUTES.PRODUCT}>Shop Now</Link>
      </div>
    );
  }

  const filteredOrders = orders?.filter((order) => user._id === order.userId);

  return (
    <div className="my-order container" style={{ marginBlock: "100px" }}>
      <h4>My Orders</h4>
      <table>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Order Date</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders?.map((order) => (
            <tr key={order._id}>
              <td>#{order._id}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>
                {order.cartItems.map((item) => (
                  <div key={item._id}>
                    {item.name} - Size: {item.size}
                    <div style={{ width: "50px", height: "50px" }}>
                      <img src={item.images[0]} alt={item.name} />
                    </div>
                  </div>
                ))}
              </td>
              <td>${order.total}</td>
              <td>
                {order.cartItems.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
              </td>
              <td>${order.total}</td>
              <td>
                <Link onClick={() => handleDeleteOrder(order._id)}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrder;
