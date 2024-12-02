
import React from "react";
import { Link } from "react-router-dom";
import"../App.css";

const Navbar = () => {
  const handleLogout = () => {
  
    localStorage.removeItem("token");
   
    window.location.href = "/login";
  };

  return (
    <nav>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/employees">Employee Management</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
