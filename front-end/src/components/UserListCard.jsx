import AuthContext from "../AuthContext";
import "./UserListCard.css";

function UserListCard({ user }) {
  const { currentUser, handleActive } = useContext(AuthContext);
  const [active, setActive] = useState(user.active);

  const handleClick = async () => {
    let data = {
      username: currentUser.username,
      userId: user.id
    }
    let handleActive = await handleActive(data);
    setActive(handleActive);
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
            className={active ? "UserListCard-button active" : "UserListCard-button"}>
            {active ? "Active" : "Not Active"}
          </button>
        </div>
      </div>
    </li>
  );
}

export default UserListCard;