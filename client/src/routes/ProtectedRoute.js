import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = () => {
    const {isAuthenticated} = useSelector((state)=>state.user);

    // console.log("######",isAuthenticated);

    if(isAuthenticated){
       return <Outlet/>  
    }
    
    return <Navigate to={"/login"}/>
}

export default ProtectedRoute;