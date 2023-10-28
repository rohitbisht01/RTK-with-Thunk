import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/userDetailsSlice";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [users, setUsers] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(users);
    dispatch(createUser(users));
    navigate("/read");
  };

  return (
    <>
      <h2>Fill the data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="htmlForm-label">Name</label>
          <input
            type="text"
            name="name"
            className="htmlForm-control"
            onChange={getUserData}
          />
        </div>
        <div className="mb-3">
          <label className="htmlForm-label">Email</label>
          <input
            type="email"
            name="email"
            className="htmlForm-control"
            onChange={getUserData}
          />
        </div>
        <div className="mb-3">
          <label className="htmlForm-label">Age</label>
          <input
            type="number"
            name="age"
            className="htmlForm-control"
            onChange={getUserData}
          />
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="male"
            onChange={getUserData}
          />
          <label className="form-check-label">male</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="female"
            onChange={getUserData}
          />
          <label className="form-check-label">Female</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Create;
