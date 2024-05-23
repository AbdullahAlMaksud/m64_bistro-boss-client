import { useContext } from "react";
import { AuthContex } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContex);
    const loaction = useLocation();



    if (loading) {
        return <span className="loading-spinner loading loading-lg"></span>
    }
    if (user) {
        return children
    }


    return <Navigate to='/login' state={{from: location}} replace />
};

export default PrivateRoute;