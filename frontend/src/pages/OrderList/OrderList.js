import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { listOrders } from "../../actions/orderActions";

const OrderList = () => {
  const dispatch = useDispatch();
  const negative = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      negative("/login");
    }
  }, [dispatch, userInfo, negative]);

  return (
    <div className="p-5">
      <h1 className="pt-5">Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"alert-danger"}>{error}</Message>
      ) : (
        <table className="table table-bordered table-striped table-hover table-responsive table-sm">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center">
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i
                      className="fas fa-times"
                      style={{ color: "red", background: "none" }}
                    />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i
                      className="fas fa-times"
                      style={{ color: "red", background: "none" }}
                    />
                  )}
                </td>
                <td>
                  <Link to={`/order/${order._id}`}>
                    <button className="btn btn-light btn-sm">Detail</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;
