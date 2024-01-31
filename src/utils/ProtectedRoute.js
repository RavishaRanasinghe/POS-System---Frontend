import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ()=>{
    const token = localStorage.getItem("token");

        if(!token){ 
            return <Navigate to="/login" replace/>
        } else{
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            return<Outlet />
        }
}

export default ProtectedRoute;