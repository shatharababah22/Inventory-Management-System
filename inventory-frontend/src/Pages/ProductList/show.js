import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const token = localStorage.getItem('authToken');
  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProduct(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  return (
    <div className="page-wrapper">
    <div className="content">
      <div className="page-header">
        <div className="page-title">
          <h4>Product Details</h4>
          <h6>Full details of a product</h6>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="bar-code-view">
                <img src="assets/img/barcode1.png" alt="barcode" />
                <a className="printimg">
                  <img src="assets/img/icons/printer.svg" alt="print" />
                </a>
              </div>
            <div className="productdetails">
        
    
         
  <ul className="product-bar">
    <li>
      <h4>Product</h4>
      <h6>{product.name}</h6>
    </li>
    <li>
      <h4>Category</h4>
      <h6>{product.category_name}</h6>
    </li>
    <li>
      <h4>Description</h4>
      <h6>{product.description}</h6>
    </li>
    <li>
      <h4>Price</h4>
      <h6>{product.price}</h6>
    </li>
    <li>
      <h4>Status</h4>
      <h6>{product.status === 1 ? 'Active' : 'Inactive'}</h6>
    </li>
  </ul>

          
             
                      </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="slider-product-details">
                <div className="owl-carousel owl-theme product-slide">
                  <div className="slider-product">
                    <img src={`http://127.0.0.1:8000/img/${product.image1}`} alt="img" />
                    <h4>macbookpro.jpg</h4>
                    <h6>581kb</h6>
                  </div>
                  <div className="slider-product">
                    <img src={`http://127.0.0.1:8000/img/${product.image2}`} alt="img" />
                    <h4>macbookpro.jpg</h4>
                    <h6>581kb</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

  
};

export default ProductDetails;
