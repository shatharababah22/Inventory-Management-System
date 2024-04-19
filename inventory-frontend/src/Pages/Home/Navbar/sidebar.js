import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className="active">
              <a href="index.html">
                <img src="assets/img/icons/dashboard.svg" alt="img" />
                <span> Dashboard</span>
              </a>
            </li>
            <li className="submenu">
              <a href="javascript:void(0);">
                <img src="assets/img/icons/product.svg" alt="img" />
                <span> Product</span>
                <span className="menu-arrow"></span>
              </a>
              <ul>
                <li><a href="productlist.html">Product List</a></li>
                <li><a href="addproduct.html">Add Product</a></li>
                <li><a href="categorylist.html">Category List</a></li>
                <li><a href="addcategory.html">Add Category</a></li>
              </ul>
            </li>
            <li className="submenu">
              <a href="javascript:void(0);">
                <img src="assets/img/icons/sales1.svg" alt="img" />
                <span> Sales</span>
                <span className="menu-arrow"></span>
              </a>
              <ul>
                <li><a href="saleslist.html">Sales List</a></li>
                <li><a href="pos.html">POS</a></li>
                <li><a href="pos.html">New Sales</a></li>
              </ul>
            </li>
            <li className="submenu">
              <a href="javascript:void(0);">
                <img src="assets/img/icons/users1.svg" alt="img" />
                <span> People</span>
                <span className="menu-arrow"></span>
              </a>
              <ul>
                <li><a href="customerlist.html">Customer List</a></li>
                <li><a href="addcustomer.html">Add Customer</a></li>
                <li><a href="userlist.html">User List</a></li>
                <li><a href="adduser.html">Add User</a></li>
              </ul>
            </li>
            <li className="submenu">
              <a href="javascript:void(0);">
                <img src="assets/img/icons/places.svg" alt="img" />
                <span> Places</span>
                <span className="menu-arrow"></span>
              </a>
              <ul>
                <li><a href="newcountry.html">New Country</a></li>
                <li><a href="countrieslist.html">Countries list</a></li>
              </ul>
            </li>
            <li>
              <a href="components.html">
                <i data-feather="layers"></i>
                <span> Components</span>
              </a>
            </li>
            <li className="submenu">
              <a href="javascript:void(0);">
                <img src="assets/img/icons/product.svg" alt="img" />
                <span> Application</span>
                <span className="menu-arrow"></span>
              </a>
              <ul>
                <li><a href="calendar.html">Calendar</a></li>
                <li><a href="email.html">Email</a></li>
              </ul>
            </li>
            <li className="submenu">
              <a href="javascript:void(0);">
                <img src="assets/img/icons/users1.svg" alt="img" />
                <span> Users</span>
                <span className="menu-arrow"></span>
              </a>
              <ul>
                <li><a href="newuser.html">New User</a></li>
                <li><a href="userlists.html">Users List</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
