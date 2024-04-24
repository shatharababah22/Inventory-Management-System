import { useNavigate } from "react-router-dom";
import axios from "axios";

const NavbarBuyer = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authTokenUser");
  const handleLogout = () => {
    axios
      .get("http://127.0.0.1:8000/api/logout", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        localStorage.removeItem("authTokenUser");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };
  return (
    <div className="header">
      <div className="header-left active">
        <a href="index.html" className="logo">
          <img src={process.env.PUBLIC_URL + "/assets/img/logo.png"} alt="" />
        </a>
        <a href="index.html" className="logo-small">
          <img src="assets/img/logo-small.png" alt="" />
        </a>
        <a id="toggle_btn" href="javascript:void(0);"></a>
      </div>
      <a id="mobile_btn" className="mobile_btn" href="#sidebar">
        <span className="bar-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </a>
      <ul className="nav user-menu">
        <li className="nav-item">
          <div className="top-nav-search">
            <a href="javascript:void(0);" className="responsive-search">
              <i className="fa fa-search"></i>
            </a>
            <form action="#">
              <div className="searchinputs">
                <input type="text" placeholder="Search Here ..." />
                <div className="search-addon">
                  <span>
                    <img src="assets/img/icons/closes.svg" alt="img" />
                  </span>
                </div>
              </div>
              <a className="btn" id="searchdiv">
                <img src="assets/img/icons/search.svg" alt="img" />
              </a>
            </form>
          </div>
        </li>
        <li className="nav-item dropdown has-arrow flag-nav">
          <a
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            href="javascript:void(0);"
            role="button"
          >
            <img src="assets/img/flags/us1.png" alt="" height="20" />
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a href="javascript:void(0);" className="dropdown-item">
              <img src="assets/img/flags/us.png" alt="" height="16" /> English
            </a>
            <a href="javascript:void(0);" className="dropdown-item">
              <img src="assets/img/flags/fr.png" alt="" height="16" /> French
            </a>
            <a href="javascript:void(0);" className="dropdown-item">
              <img src="assets/img/flags/es.png" alt="" height="16" /> Spanish
            </a>
            <a href="javascript:void(0);" className="dropdown-item">
              <img src="assets/img/flags/de.png" alt="" height="16" /> German
            </a>
          </div>
        </li>
        {/* More list items */}
        <li className="nav-item dropdown has-arrow main-drop">
          <a
            href="javascript:void(0);"
            className="dropdown-toggle nav-link userset"
            data-bs-toggle="dropdown"
          >
            <span className="user-img">
              <img
                src="https://i.pinimg.com/564x/8b/22/63/8b22634c14066d47cada4afee66bbe66.jpg"
                alt=""
              />
              <span className="status online"></span>
            </span>
          </a>
          <div className="dropdown-menu menu-drop-user">
            <div className="profilename">
              <div className="profileset">
                <span className="user-img">
                  <img
                    src="https://i.pinimg.com/564x/8b/22/63/8b22634c14066d47cada4afee66bbe66.jpg"
                    alt=""
                  />
                  <span className="status online"></span>
                </span>
                <div className="profilesets">
                  <h6>Shatha</h6>
                  <h5>User</h5>
                </div>
              </div>
              <hr className="m-0" />
              <a className="dropdown-item" href="profile.html">
                <i className="me-2" data-feather="user"></i> My Profile
              </a>
              <a className="dropdown-item" href="generalsettings.html">
                <i className="me-2" data-feather="settings"></i>Settings
              </a>
              <hr className="m-0" />
              <a className="dropdown-item logout pb-0" onClick={handleLogout}>
                <img
                  src="assets/img/icons/log-out.svg"
                  className="me-2"
                  alt="img"
                />
                Logout
              </a>
            </div>
          </div>
        </li>
      </ul>
      <div className="dropdown mobile-user-menu">
        <a
          href="javascript:void(0);"
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa fa-ellipsis-v"></i>
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <a className="dropdown-item" href="profile.html">
            My Profile
          </a>
          <a className="dropdown-item" href="generalsettings.html">
            Settings
          </a>
          <a className="dropdown-item logout pb-0" />
        </div>
      </div>
    </div>
  );
};

export default NavbarBuyer;
