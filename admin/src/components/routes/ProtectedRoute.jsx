import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuth";
import { isTokenValid } from "../../utils/isTokenValid";

const ProtectedRoute = ({children}) => {
    const {user, dispatch} = useAuthContext()

    if(!user || !isTokenValid(user?.accessToken)) {
        localStorage.removeItem('user')
         return dispatch({type:"LOGOUT"})
    }

    return children;
}

export default ProtectedRoute;