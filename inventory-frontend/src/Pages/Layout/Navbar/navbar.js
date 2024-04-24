
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
const Navbar = () => {
  const navigate = useNavigate(); 
  const authToken = localStorage.getItem('authToken');
  const [userData, setUserData] = useState([]);
  useEffect(() => {
  if (authToken) {
    axios.get("http://127.0.0.1:8000/api/alluser", {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }).then((response) => {
      setUserData(response.data);
      console.log(response.data)
    }).catch((error) => {
      console.error('Failed to fetch user data:', error);

    });
  }else{
    navigate('/login')
  }
}, [authToken]);

  const handleLogout = () => {
    axios.get("http://127.0.0.1:8000/api/logout", {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }).then((response) => {
   
      localStorage.removeItem('authToken');
      navigate("/adminlogin");
    }).catch((error) => {
      console.error('Logout failed:', error);
    });
  };
  



  return (




  <div className="header">
    <div className="header-left active">
      <a href="index.html" className="logo">

      

        <img src={process.env.PUBLIC_URL + '/assets/img/logo.png'} alt="" />
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

<li className="nav-item-name">{userData.name}</li>
      <li className="nav-item dropdown has-arrow main-drop">
        <a href="javascript:void(0);" className="dropdown-toggle nav-link userset" data-bs-toggle="dropdown">
          <span className="user-img">
          <img src={ `http://127.0.0.1:8000/img/${userData.image}` } alt=""  />
       
          </span>
        </a>
        <div className="dropdown-menu menu-drop-user">
          <div className="profilename">
            <div className="profileset">
              <span className="user-img">
              <img src={ `http://127.0.0.1:8000/img/${userData.image}` } alt="" />
            
              </span>
              <div className="profilesets">
                <h6>{userData.name}</h6>
                <h5>{userData.role}</h5>
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
              <img src="assets/img/icons/log-out.svg" className="me-2" alt="img" />Logout
            </a>
          </div>
        </div>
      </li>
    </ul>
    <div className="dropdown mobile-user-menu">
      <a href="javascript:void(0);" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
      <div className="dropdown-menu dropdown-menu-right">
        <a className="dropdown-item" href="profile.html">My Profile</a>
        <a className="dropdown-item" href="generalsettings.html">Settings</a>
        <a className="dropdown-item logout pb-0" onClick={handleLogout} />
      </div>
    </div>

    
  </div>
  );
};

export default Navbar;
