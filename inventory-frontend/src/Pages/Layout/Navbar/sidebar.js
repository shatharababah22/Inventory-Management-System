import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('/home'); 

  const handleLinkClick = (path) => {
    setActiveLink(path);
    
  };
  return (
    <div className="sidebar" id="sidebar"style={{ backgroundColor: '#ffffff' }} >
      <div className="sidebar-inner slimscroll" >

        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className={activeLink}>
              <Link to='/home'>
                <img src="assets/img/icons/dashboard.svg" alt="img" />
                <span>Inventory</span>
              </Link>
            </li>
            <li className="submenu">
              <a href="javascript:void(0);">
                <img src="assets/img/icons/product.svg" alt="img" />
                <span> 
                  <Link to='/product' style={{color: '#637381'}}>Product </Link>
                </span>
              </a>
            </li>
            <li className="submenu">
              <a href="javascript:void(0);">
                <img src="assets/img/icons/product.svg" alt="img" />
                <span>
                  <Link to='/category' style={{color: '#637381'}} onClick={() => handleLinkClick('/category')}>Category</Link>
                </span>
              </a>
            </li>
            <li className="submenu">
              <a href="javascript:void(0);">
                <img src="assets/img/icons/sales1.svg" alt="img" />
                <span>
                  <Link to='/order' style={{color: '#637381'}} onClick={() => handleLinkClick('/order')}>Orders  </Link>
                </span>
              </a>
            </li>
            <li className="submenu">
              <a href="javascript:void(0);">
                <img src="assets/img/icons/users1.svg" alt="img" />
                <span>
                  <Link to='/supplier' style={{color: '#637381'}} onClick={() => handleLinkClick('/supplier')}>Supplier </Link>
                </span>
              </a>
            </li>
            <li className="submenu">
              <a href="javascript:void(0);">
                <img src="assets/img/icons/users1.svg" alt="img" />
                <span>
                  <Link to='/admin' style={{color: '#637381'}} onClick={() => handleLinkClick('/admin')}>Admin </Link>
                </span>
              </a>
            </li>
            <li className="submenu">
              <a href="javascript:void(0);">
                <img src="assets/img/icons/places.svg" alt="img" />
                <span>
                  <Link to='/places' style={{color: '#637381'}}>Places</Link>
                </span>
              </a>
              <ul>
                <li><a href="newcountry.html">New Country</a></li>
                <li><a href="countrieslist.html">Countries list</a></li>
              </ul>
            </li>
            <li>
              <a href="components.html">
                <img src="assets/img/icons/product.svg" alt="img" />
                <span>
                  <Link to='stock' style={{color: '#637381'}} onClick={() => handleLinkClick('/stock')}>Stock</Link>
                </span>
              </a>
            </li>
      

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
