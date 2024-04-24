import React from 'react';

const SidebarBuyer = () => {
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className="active">
              <a href="index.html">
                <img src="assets/img/icons/product.svg" alt="img" />
                <span>Product List</span>
              </a>
            </li>
            <li >
              <a href="index.html">
                <img src="assets/img/icons/product.svg" alt="img" />
                <span>Profile</span>
              </a>
            </li>
            <li >
              <a href="index.html">
                <img src="assets/img/icons/sales1.svg" alt="img" />
                <span>New Sales</span>
              </a>
            </li>
            <li >
              <a href="index.html">
                <img src="assets/img/icons/places.svg" alt="img" />
                <span>Countries list</span>
              </a>
            </li>

            <li >
              <a href="index.html">
                <img src="assets/img/icons/log-out.svg" alt="img" />
                <span>Logout</span>
              </a>
            </li>

    
       
       
         
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarBuyer;
