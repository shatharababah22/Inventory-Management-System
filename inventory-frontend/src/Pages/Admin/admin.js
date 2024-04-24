import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";
import useAuthenticatedFetch from "../ExtraPages/api";

const AdminList = () => {
const navigate= useNavigate();
  const authToken = localStorage.getItem("authToken");
    const [admins, setAdmin] = useState([]);
  
  
    useEffect(() => {
      if (authToken) {
        axios
          .get("http://127.0.0.1:8000/api/alladmin", {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          })
          .then((response) => {
            setAdmin(response.data.data); 
          })
          .catch((error) => {
         
            console.error("Error fetching admins:", error);
          });
      } else {
        navigate("/adminlogin");
      }
    }, [admins]);

    
    
    

    return (
        <div class="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="page-title">
                        <h4>Admin List</h4>
                        <h6>View Admin Lis</h6>
                    </div>
                    <div className="page-btn">
                    <Link to="/add/admin" className="btn btn-added">

                            <img src="assets/img/icons/plus.svg" className="me-1" alt="img" />Add admin
                        </Link>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="table-top">
                            <div className="search-set">
                                <div className="search-path">
                                    <a className="btn btn-filter" id="filter_search">
                                        <img src="assets/img/icons/filter.svg" alt="img" />
                                        <span><img src="assets/img/icons/closes.svg" alt="img" /></span>
                                    </a>
                                </div>
                                <div className="search-input">
                                    <a className="btn btn-searchset"><img src="assets/img/icons/search-white.svg" alt="img" /></a>
                                </div>
                            </div>
                            <div className="wordset">
                                <ul>
                                    <li>
                                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="pdf"><img src="assets/img/icons/pdf.svg" alt="img" /></a>
                                    </li>
                                    <li>
                                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="excel"><img src="assets/img/icons/excel.svg" alt="img" /></a>
                                    </li>
                                    <li>
                                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="print"><img src="assets/img/icons/printer.svg" alt="img" /></a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="card" id="filter_inputs">
                            <div className="card-body pb-0">
                                <div className="row">
                                    <div className="col-lg-2 col-sm-6 col-12">
                                        <div className="form-group">
                                            <select className="select">
                                                <option>Choose product</option>
                                                <option>Computers</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-sm-6 col-12">
                                        <div className="form-group">
                                            <select className="select">
                                                <option>Choose Sub product</option>
                                                <option>Fruits</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-sm-6 col-12">
                                        <div className="form-group">
                                            <select className="select">
                                                <option>Choose Sub Brand</option>
                                                <option>Iphone</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-1 col-sm-6 col-12 ms-auto">
                                        <div className="form-group">
                                            <a className="btn btn-filters ms-auto"><img src="assets/img/icons/search-whites.svg" alt="img" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="table  datanew">
                                <thead>
                                    <tr>
                                        <th>
                                            <label className="checkboxs">
                                                <input type="checkbox" id="select-all" />
                                                <span className="checkmarks"></span>
                                            </label>
                                        </th>
                                        <th>#</th>
                                 
                                        <th>name</th>
                               
                                        <th>email</th>
                                        <th>Phone</th>
                                        <th>Birthday</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {admins.map((admin) => (
  <tr key={admin.id}>
    <td>
      <label className="checkboxs">
        <input type="checkbox" />
        <span className="checkmarks"></span>
      </label>
    </td>
    <td>
      <a href="javascript:void(0);">
        <img
          src={`http://127.0.0.1:8000/img/${admin.image}`}
          alt="admin"
          style={{ maxWidth: '130px', maxHeight: '130px' }}
        />
      </a>
    </td>
    <td>
      <a href="javascript:void(0);">{admin.name}</a>
    </td>
    <td>{admin.email}</td>
    <td>{admin.phone} JD</td>
    <td>{admin.birthday}</td>
    <td>
      <Link to={`/admin/show/${admin.id}`} className="me-3">
        <img src="assets/img/icons/eye.svg" alt="img" />
      </Link>
      <Link to={`/admin/edit/${admin.id}`} className="me-3">
        <img src="assets/img/icons/edit.svg" alt="img" />
      </Link>
      <a className="me-3 confirm-text" href="javascript:void(0);">
        <img src="assets/img/icons/delete.svg" alt="img" />
      </a>
    </td>
  </tr>
))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminList;
