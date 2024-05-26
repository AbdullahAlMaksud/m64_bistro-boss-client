import { useContext } from "react";
import { AuthContex } from "../Provider/AuthProvider";

const useAuth = () => {
    const auth = useContext(AuthContex);
    return auth
};

export default useAuth;