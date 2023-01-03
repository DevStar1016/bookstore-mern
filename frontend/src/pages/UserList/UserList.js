import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { listUsers } from "../../actions/userActions";

const UserList = () => {
  const dispatch = useDispatch();
  const negative = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      negative("/login");
    }
  }, [dispatch, userInfo, negative]);

  const deleteHandler = () => {};

  return (
    <div className="p-5">
      <h1 className="pt-5">Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varian={"alert-danger"}>{error}</Message>
      ) : (
        <table className="table table-bordered table-striped table-hover table-responsive table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <Link href={`mailto:${user.email}`}>{user.email}</Link>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }} />
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <Link to={`/user/${user._id}/edit`}>
                    <button className="btn btn-light btn-sm">
                      <i className="fas fa-edit" />
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteHandler(user.id)}
                  >
                    <i className="fas fa-trash" />
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
