import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [desktopServiceOpen, setDesktopServiceOpen] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const closeAll = () => {
    setOpen(false);
    setServiceOpen(false);
    setDesktopServiceOpen(false);
  };

  const goDashboard = () => {
    closeAll();
    navigate("/dashboard");
  };

  return (
    <>
      <nav className="modern-navbar">

        {/* LOGO */}
        <Link to="/" className="logo">
          Masstech
        </Link>

        {/* MOBILE TOGGLE */}
        <button className="hamburger" onClick={() => setOpen(!open)}>
          <FontAwesomeIcon
            icon={open ? faXmark : faBars}
            style={{
              color: open ? "red" : "#000",
              fontSize: "22px"
            }}
          />
        </button>

        {/* DESKTOP MENU */}
        <ul className="nav-links desktop-only">

          <li>
            <Link to="/">Home</Link>
          </li>

          {/* SERVICES */}
          <li className="nav-dropdown">
            <span
              className="nav-link"
              onClick={() => setDesktopServiceOpen(!desktopServiceOpen)}
            >
              Services ▾
            </span>

            {desktopServiceOpen && (
              <div className="dropdown-menu-custom">
                <Link to="/services/software" onClick={() => setDesktopServiceOpen(false)}>
                  Software Development
                </Link>

                <Link to="/services/webdev" onClick={() => setDesktopServiceOpen(false)}>
                  Web Development
                </Link>
                                <Link to="/services/GraphicDesign" onClick={() => setDesktopServiceOpen(false)}>
                  Graphic Desing
                </Link>
                                <Link to="/services/Seo" onClick={() => setDesktopServiceOpen(false)}>
                  Seo Optimization
                </Link>
                
              </div>
            )}
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>
                    <li>
            <Link to="/About">About</Link>
          </li>
                              <li>
            <Link to="/Store">Store</Link>
          </li>

          {/* USER */}
          <li>
            {user ? (
              <span
                className="user-name-btn"
                onClick={goDashboard}
                style={{ cursor: "pointer" }}
              >
                {user.name}
              </span>
            ) : (
              <Link className="login-btn" to="/login">
                Login
              </Link>
            )}
          </li>

        </ul>
      </nav>

      {/* OVERLAY */}
      <div
        className={`overlay ${open ? "show" : ""}`}
        onClick={closeAll}
      />

      {/* MOBILE MENU */}
      <div className={`side-menu ${open ? "open" : ""}`}>

        <button className="close-btn" onClick={closeAll}>
          <FontAwesomeIcon icon={faXmark} style={{ color: "red", fontSize: "22px" }} />
        </button>

        <Link onClick={closeAll} to="/">
          Home
        </Link>

        {/* MOBILE SERVICES */}
        <div className="side-dropdown">

          <div
            className="dropdown-title"
            onClick={() => setServiceOpen(!serviceOpen)}
          >
            Services
          </div>

          {serviceOpen && (
            <div className="dropdown-items">

              <Link onClick={closeAll} to="/services/software">
                Software Development
              </Link>

              <Link onClick={closeAll} to="/services/webdev">
                Web Development
              </Link>
                            <Link onClick={closeAll} to="/services/GraphicDesign">
                Graphic Desing
              </Link>
                            <Link onClick={closeAll} to="/services/Seo">
                Seo Optimization
              </Link>

            </div>
          )}

        </div>

        <Link onClick={closeAll} to="/contact">
          Contact
        </Link>
                <Link onClick={closeAll} to="/About">
          About
        </Link>
                       <Link onClick={closeAll} to="/Store">
          Store
        </Link>

        {/* USER MOBILE */}
        {user ? (
          <span
            onClick={goDashboard}
            className="user-name-btn"
            style={{ cursor: "pointer" }}
          >
            {user.name}
          </span>
        ) : (
          <Link onClick={closeAll} to="/login" className="login-btn">
            Login
          </Link>
        )}

      </div>
    </>
  );
}

export default Navbar;