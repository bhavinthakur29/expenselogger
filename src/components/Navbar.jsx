import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? "offcanvas-active" : ""}`}>
      <div className="nav-logo">
        <h1>Expense Tracker</h1>
      </div>

      <div className={`nav-links ${isOpen && isMobile ? "open" : ""}`}>
        <Link to="/" onClick={toggleMenu}>
          Home
        </Link>
        <Link to="/expenses" onClick={toggleMenu}>
          All Expenses
        </Link>
        <Link to="/contact" onClick={toggleMenu}>
          Contact
        </Link>
        <Link
          id="login-btn"
          to="/login"
          className="login-link"
          onClick={toggleMenu}
        >
          Login
        </Link>
      </div>

      {/* Show toggle button only on mobile */}
      {isMobile && (
        <div className="nav-toggle" onClick={toggleMenu}>
          <span className="bar first-bar"></span>
          <span className="bar second-bar"></span>
          <span className="bar third-bar"></span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
