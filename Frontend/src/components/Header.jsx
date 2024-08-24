import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");

      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section id="header" className="header">
        <div className="header-content">
          <div className="header-buttons">
            <i
              className="bi bi-person-circle btn"
              onClick={() => setIsOpen(!isOpen)}
            ></i>
          </div>
          {isOpen && (
            <div className={`dropdown-menu ${isOpen ? "open" : ""}`}>
              <Link to="#profile">
                {}
                <i className="bi bi-person"></i> Profile
              </Link>
              <Link to="#settings">
                <i className="bi bi-gear"></i>Settings
              </Link>
              <Link onClick={logout}>
                {""}
                <i className="bi bi-box-arrow-right"></i>Logout
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Header;
