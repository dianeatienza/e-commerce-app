import { useContext, useEffect } from "react";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";

export default function Logout() {
    const { unsetUser, setUser, setUserDetails } = useContext(UserContext);

    useEffect(() => {

        unsetUser();
        setUserDetails({})
        setUser({
            id: null,
            isAdmin: null,
        });
    }, [unsetUser, setUser, setUserDetails]);

    return <Navigate to="/login" />;
}
