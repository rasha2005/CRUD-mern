import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

export const ProtectedRouteLogin = ({element}) => {
    const User = useSelector(state => state.auth.userToken);
    console.log("hhhhe",User)

    return User ? element : <Navigate to='/' />
}



export const ProtectedRouteLogout = ({ element }) => {
    const userToken = useSelector(state => state.auth.userToken);

    return userToken ? <Navigate to="/dashboard" /> : element;
};


export const AdminProtectedRoute = ({element}) => {
    const adminToken = useSelector(state => state.auth.adminToken);
    console.log("admin" , adminToken);
    return adminToken ? element : <Navigate to='/admin' /> ;
}

export const AdminProtectedRouteLogout = ({ element }) => {
    const adminToken = useSelector(state => state.auth.adminToken);
    console.log("hehe",adminToken);
    return adminToken ? <Navigate to="/adminDashboard" /> : element;
};