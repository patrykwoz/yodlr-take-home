import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../AuthContext";
import './UserSignup.css';

function UserSignup() {
    const { signup } = useContext(AuthContext);
    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/feed";

    const INITIAL_STATE = {
        email: "",
        firstName: "",
        lastName: ""
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
        signup(formData);
        setFormData(INITIAL_STATE);
        navigate(from, { replace: true });
    };

    return (
        <div className="UserSignup">
            <h3>Sing Up</h3>
            <form className="UserSignup-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />

                <button >Submit</button>
            </form>
        </div>
    );
}

export default UserSignup;