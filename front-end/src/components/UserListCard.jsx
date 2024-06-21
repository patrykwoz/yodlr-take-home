import AuthContext from "../AuthContext";
import "./UserListCard.css";

function UserListCard({ user }) {
  const { currentUser, handleactiv } = useContext(AuthContext);
  const [activ, setactiv] = useState(user.activ);

  const handleClick = async () => {
    let data = {
      username: currentUser.username,
      userId: user.id
    }
    let handleactiv = await handleactiv(data);
    setActiv(handleActiv);
  }

  return (
    <li className="UserListCard">
      <div className="UserListCard-container">
        <div className="UserListCard-text">
          <h3>{user.title}</h3>
          <p>Salary: <b>{user.salary}</b></p>
          <p>Equity: <b>{user.equity}</b></p>
          <button
            onClick={handleClick}
            className={activ ? "UserListCard-button activ" : "UserListCard-button"}>
            {activ ? "Active" : "Not Active"}
          </button>
        </div>
      </div>
    </li>
  );
}

export default UserListCard;