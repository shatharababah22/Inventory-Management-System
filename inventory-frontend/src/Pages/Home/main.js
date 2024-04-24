import React, { useState, useEffect } from 'react';
import Statistics from './statistic';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [recentlyAddedProducts, setRecentlyAddedProducts] = useState([]);
  const [expiredProducts, setExpiredProducts] = useState([]);
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  useEffect(() => {
    if(!authToken){
      navigate('/adminlogin')
    }else{
    
    axios.get("http://127.0.0.1:8000/api/products?_sort=createdAt&_order=desc&_limit=5",{
      headers: {   
          Authorization: `Bearer ${authToken}`
      }
  }).then((response) => {
      setRecentlyAddedProducts(response.data);
    });
    

    axios.get("http://127.0.0.1:8000/api/expire_products",{
      headers: {   
          Authorization: `Bearer ${authToken}`
      }
  }).then((response) => {
      setExpiredProducts(response.data);
    });
  }}, []);
  

  return (
    <div className="page-wrapper">
      <div className="content">
        <Statistics />
        <div className="row">
          <div className="col-lg-7 col-sm-12 col-12 d-flex">
          <div className="card flex-fill">
              <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Purchase & Sales</h5>
                <div className="graph-sets">
                  <ul>
                    <li>
                      <span>Sales</span>
                    </li>
                    <li>
                      <span>Purchase</span>
                    </li>
                  </ul>
                  <div className="dropdown">
                    <button className="btn btn-white btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                      2022 <img src="assets/img/icons/dropdown.svg" alt="img" className="ms-2" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li>
                        <a href="javascript:void(0);" className="dropdown-item">2022</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" className="dropdown-item">2021</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" className="dropdown-item">2020</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div id="sales_charts"></div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-sm-12 col-12 d-flex">
            <div className="card flex-fill">
              <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">Recently Added Products</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive dataview">
                  <table className="table ">
                    <thead>
                      <tr>
                        <th>Sno</th>
                        <th>Product</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentlyAddedProducts.map((product, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td className="productimgname">
                            <a href={`productlist.html?id=${product.id}`} className="product-img">
                              <img src={`http://127.0.0.1:8000/img/${product.image1}`} alt={product.name} />
                            </a>
                            <a href={`productlist.html?id=${product.id}`}>{product.name}</a>
                          </td>
                          <td>JD {product.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-0">
          <div className="card-body">
            <h4 className="card-title">Expired Products</h4>
            <div className="table-responsive dataview">
              <table className="table ">
                <thead>
                  <tr>
                    <th>SNo</th>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {expiredProducts.map((product, index) => (
                    <tr key={index}>
              
                      <td><a href={`javascript:void(0);`}>{product.id}</a></td>
                      <td className="productimgname">
                        <a className="product-img" href={`productlist.html?id=${product.id}`}>
                          <img src={`http://127.0.0.1:8000/img/${product.image1}`} alt={product.name} />
                        </a>
                       
                      </td>
                      <td> <a href={`productlist.html?id=${product.id}`}>{product.name}</a></td>
                      <td>{product.status==0?'InActive':'Active'}</td>
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

export default Main;
