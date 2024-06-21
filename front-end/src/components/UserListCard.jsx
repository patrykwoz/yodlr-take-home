import { useState, useContext } from "react";
import AuthContext from "../AuthContext";
import "./UserListCard.css";

function UserListCard({ user }) {
  const { handleState } = useContext(AuthContext);
  const [state, setState] = useState(user.state);

  const handleClick = async () => {
    let userState = state === "active" ? "pending" : "active";
    let data = {
      id: user.id,
      state: userState
    }
    user = await handleState(data);
    setState(user.state);
  }

  return (
    <li className="UserListCard">
      <div className="UserListCard-container">
        <div className="UserListCard-text">
          <h3>{user.firstName} {user.lastName}</h3>
          <p>email: <b>{user.email}</b></p>

          <button
            onClick={handleClick}
            className={`UserListCard-button user-${state}`}>
            {state}
          </button>
        </div>
      </div>
    </li>
  );
}

export default UserListCard;