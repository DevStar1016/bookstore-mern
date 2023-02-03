import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { listUsers, deleteUser } from "../../actions/userActions";

const UserList = () => {
  const dispatch = useDispatch();
  const negative = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      negative("/login");
    }
  }, [dispatch, userInfo, negative, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="p-5">
      <h1 className="pt-5">Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"alert-danger"}>{error}</Message>
      ) : (
        <table className="table table-bordered table-striped table-hover table-responsive table-sm">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <Link
                    style={{ background: "none" }}
                    href={`mailto:${user.email}`}
                  >
                    {user.email}
                  </Link>
                </td>
                <td className="text-center">
                  {user.isAdmin ? (
                    <i
                      className="fas fa-check"
                      style={{ color: "green", background: "none" }}
                    />
                  ) : (
                    <i
                      className="fas fa-times"
                      style={{ color: "red", background: "none" }}
                    />
                  )}
                </td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <button className="btn btn-light btn-sm">
                      <i className="fas fa-edit" />
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash color-red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
