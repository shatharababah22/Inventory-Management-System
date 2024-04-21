import React, { useState, useEffect } from "react";
import axios from "axios";

const Statistics = () => {
  const [customersCount, setCustomersCount] = useState(0);
  const [suppliersCount, setSuppliersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [stockCount, setStockCount] = useState(0);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/buyers").then((response) => {
      setCustomersCount(response.data.length); 
    });
    
 
    axios.get("http://127.0.0.1:8000/api/suppliers").then((response) => {
      setSuppliersCount(response.data.length); 
    });
    axios.get("http://127.0.0.1:8000/api/products").then((response) => {
      setProductsCount(response.data.length); 
    });
    axios.get("http://127.0.0.1:8000/api/stock").then((response) => {
      const filteredStock = response.data.filter(item => item.current_qty < item.min_qty);
      const totalStock = filteredStock.reduce((acc, item) => acc + item.current_qty, 0);
      setStockCount(totalStock);
    });
    

  }, []);
  
  
  return (
    <div className="row">
      <div className="col-lg-3 col-sm-6 col-12 d-flex">
        <div className="dash-count">
          <div className="dash-counts">
            <h4>{customersCount}</h4>
            <h5>Customers</h5>
          </div>
          <div className="dash-imgs">
            <i data-feather="user"></i>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-sm-6 col-12 d-flex">
        <div className="dash-count das1">
          <div className="dash-counts">
            <h4>{suppliersCount}</h4>
            <h5>Suppliers</h5>
          </div>
          <div className="dash-imgs">
            <i data-feather="user-check"></i>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-sm-6 col-12 d-flex">
        <div className="dash-count das2">
          <div className="dash-counts">
            <h4>{productsCount}</h4>
            <h5>#Products</h5>
          </div>
          <div className="dash-imgs">
            <i data-feather="file-text"></i>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-sm-6 col-12 d-flex">
        <div className="dash-count das3">
          <div className="dash-counts">
            <h4>{stockCount}</h4>
            <h5>Current products in stock</h5>
          </div>
          <div className="dash-imgs">
            <i data-feather="file"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
