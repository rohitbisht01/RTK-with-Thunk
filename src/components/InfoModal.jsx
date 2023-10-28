import { useSelector } from "react-redux";
import "./InfoModal.css";

const InfoModal = ({ id, showPopup, setShowPopup }) => {
  const allUsers = useSelector((state) => state.userDetail.users);

  const userDetail = allUsers.filter((user) => user.id === id);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => setShowPopup(false)} className="btn btn-primary">
          Close
        </button>
        <p>Name : {userDetail[0].name}</p>
        <p>Email : {userDetail[0].email}</p>
        <p>Gender : {userDetail[0].gender}</p>
        <p>Age : {userDetail[0].age}</p>
      </div>
    </div>
  );
};

export default InfoModal;
