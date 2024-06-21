import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
    const location = useLocation();
    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}

export default RequireAuth;