import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../features/userDetailsSlice";
import InfoModal from "./InfoModal";
import { Link } from "react-router-dom";

const Read = () => {
  const dispatch = useDispatch();
  const { users, loading, searchData } = useSelector(
    (state) => state.userDetail
  );

  const [id, setId] = useState();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(showUser());
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <>
      {showPopup && (
        <InfoModal id={id} showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
      {users &&
        users
          .filter((user) => {
            if (searchData.length === 0) {
              return user;
            } else {
              return user.name.toLowerCase().includes(searchData.toLowerCase());
            }
          })
          .map((user) => {
            return (
              <div key={user.id} className="card" style={{ width: "18rem" }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">{user.email}</p>{" "}
                  <p className="card-text">{user.gender}</p>
                  <button
                    href="#"
                    className="btn btn-primary"
                    onClick={() => {
                      setId(user.id);
                      setShowPopup(true);
                    }}
                  >
                    View
                  </button>{" "}
                  <Link to={`/edit/${user.id}`} className="btn btn-primary">
                    Edit
                  </Link>{" "}
                  <Link
                    href="#"
                    onClick={() => dispatch(deleteUser(user.id))}
                    className="btn btn-primary"
                  >
                    delete
                  </Link>
                </div>
              </div>
            );
          })}
    </>
  );
};

export default Read;
