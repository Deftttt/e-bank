import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireRole = ({ requiredRole }) => {
    const { auth } = useAuth(); 
    const location = useLocation();

    console.log('User Roles', auth.roles);
    console.log('Required Role', requiredRole);

    const hasRequiredRole = auth.roles.includes(requiredRole);

    return (
        hasRequiredRole
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireRole;
