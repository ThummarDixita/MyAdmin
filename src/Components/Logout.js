import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";


const Logout = () => {

    localStorage.clear();
    return (
        <div>
            <Navigate to="/login" />
        </div>

    )
}

export default Logout;