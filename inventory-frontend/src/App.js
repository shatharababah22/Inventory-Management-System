import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import NavbarBuyer from './Pages/Buyers/navbarBuyer';
import Navbar from './Pages/Layout/Navbar/navbar';
import Sidebar from './Pages/Layout/Navbar/sidebar';
import Routess from './Pages/ExtraPages/routes';
import SidebarBuyer from './Pages/Buyers/sideBuyer';
function App() {
  const { pathname } = useLocation();
  const [authToken, setAuthToken] = useState(null);
  const hideNavbar = pathname === "/login" || pathname === "/register" || pathname === "/adminlogin";
  const hideSidebar = pathname === "/login" || pathname === "/register" || pathname === "/adminlogin";

  useEffect(() => {
    const authTokenFromLocalStorage = localStorage.getItem('authToken');
    if (authTokenFromLocalStorage) {
      setAuthToken(authTokenFromLocalStorage);
    }
  }, []);

  return (
    <div>
 
      { authToken ?!hideNavbar && <Navbar authToken={authToken} /> :!hideNavbar && <NavbarBuyer />}
      { authToken ?!hideSidebar && <Sidebar authToken={authToken} /> :!hideSidebar && <SidebarBuyer />}
   
      <Routes>
        {Routess.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
