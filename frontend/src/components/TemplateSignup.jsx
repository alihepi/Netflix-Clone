import React from "react";
import { Outlet } from "react-router-dom";
import UserFooter from "./user/UserFooter";
import Navbar from "./Navbar";

const TemplateSignup = () => {
    return (
        <div className="d-flex flex-column gap-2 min-vh-100">
            <Navbar />
            <Outlet />
            <UserFooter />
        </div>
    );
};

export default TemplateSignup;