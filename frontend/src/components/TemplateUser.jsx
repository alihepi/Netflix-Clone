import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Template = () => {
  return (
    <div className="d-flex flex-column gap-2 page">
      <Outlet />
      <Footer />
    </div>
  );
};

export default Template;
