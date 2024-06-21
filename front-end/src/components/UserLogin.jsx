import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../AuthContext";
import './UserLogin.css'

function UserLogin() {
    const { login } = useContext(AuthContext);
    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/feed";

    const INITIAL_STATE = {
        email: ""
    };
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        login(formData);
        setFormData(INITIAL_STATE);
        navigate(from);
    };

    return (
        <div className="UserLogin">
            <h3>Log In</h3>
            <form className="UserLogin-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <button >Submit</button>
            </form>
        </div>
    );
}

export default UserLogin;