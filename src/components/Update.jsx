import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../features/userDetailsSlice";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updatedData, setUpdatedData] = useState();
  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.userDetail);

  const newData = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(updatedData));
    navigate("/read");
  };

  useEffect(() => {
    if (id) {
      const selectedUser = users.filter((user) => user.id === id);
      setUpdatedData(selectedUser[0]);
    }
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <div>
      <h1>Edit the form</h1>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="htmlForm-label">Name</label>
          <input
            type="text"
            name="name"
            className="htmlForm-control"
            value={updatedData && updatedData.name}
            onChange={newData}
          />
        </div>
        <div className="mb-3">
          <label className="htmlForm-label">Email</label>
          <input
            type="email"
            name="email"
            className="htmlForm-control"
            value={updatedData && updatedData.email}
            onChange={newData}
          />
        </div>
        <div className="mb-3">
          <label className="htmlForm-label">Age</label>
          <input
            type="number"
            name="age"
            className="htmlForm-control"
            value={updatedData && updatedData.age}
            onChange={newData}
          />
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="male"
            checked={updatedData && updatedData.gender === "male"}
            onChange={newData}
          />
          <label className="form-check-label">male</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="female"
            checked={updatedData && updatedData.gender === "female"}
            onChange={newData}
          />
          <label className="form-check-label">Female</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
