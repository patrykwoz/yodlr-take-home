import { Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../AuthContext";
import './HomePage.css';

function HomePage() {
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <div className="HomePage">
                <h1>Welcome to Yodlr{currentUser &&
                    <>,<span className="HomePage-user-first-name"> {currentUser.firstName}</span></>}!
                </h1>
                <p>Harmonizing Tradition with Tech – Your Ultimate Yodeling Repository!</p>
            </div>
            <Outlet />
        </>
    );
}

export default HomePage;