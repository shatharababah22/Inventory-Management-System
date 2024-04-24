import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const authToken = localStorage.getItem('authToken');
const AddOrder = () => {

  
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
 


  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products",{headers: {   
        Authorization: `Bearer ${authToken}`
    }})
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    axios
      .get("http://127.0.0.1:8000/api/suppliers",{headers: {   
        Authorization: `Bearer ${authToken}`
    }})
      .then((response) => {
        setSuppliers(response.data);
      })

      .catch((error) => {
        console.error("Error fetching suppliers:", error);
      });
  }, []);


  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    const orderFormData = {
      date: date,
      total_amount: quantity,
      supplier_id: selectedSupplier,
    };
  
    axios
      .post("http://127.0.0.1:8000/api/orders", orderFormData, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      .then((orderResponse) => {
        console.log("Order submitted successfully:", orderResponse.data);
  
        const orderId = orderResponse.data.order.id;
  
        const selectedProductData = products.find(
          (product) => product.id === selectedProduct
        );
        const subTotal = selectedProductData
          ? selectedProductData.price * quantity
          : 0;
  
        const orderDetailsFormData = {
          order_id: orderId,
          product_id: selectedProduct,
          quantity_ordered: quantity,
          sub_total: subTotal,
        };
  
        axios
          .post(
            "http://127.0.0.1:8000/api/orders_details",
            orderDetailsFormData, {
              headers: {
                Authorization: `Bearer ${authToken}`
              }
            }
          )
          .then((detailsResponse) => {
            Swal.fire(
              'Success!',
              'Order added successfully.',
              'success'
            );
            navigate("/order");
          })
          .catch((error) => {
            console.error("Error submitting order details:", error.response.data);
            // Display validation errors using SweetAlert
            if (error.response && error.response.data && error.response.data.error) {
              Swal.fire("Error", error.response.data.error, "error");
            } else {
              Swal.fire("Error", "An error occurred while submitting order details.", "error");
            }
          });
      })
      .catch((error) => {
        console.error("Error submitting order:", error.response.data);
        // Display validation errors using SweetAlert
        if (error.response && error.response.data && error.response.data.error) {
          Swal.fire("Error", error.response.data.error, "error");
        } else {
          Swal.fire("Error", "An error occurred while submitting order.", "error");
        }
      });
  };
  
  
  

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Add Order</h4>
            <h6>Create new order</h6>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div className="row">
                {/* Supplier */}
                <div className="col-lg-4 col-sm-12">

                  <div className="form-group">
                    <label>Supplier</label>
                    <select
                      className="form-control"
                      name="supplier_id"
                      value={selectedSupplier}
                      onChange={(e) => setSelectedSupplier(e.target.value)}
                      required
                    >
                      <option value="">Select Supplier</option>
                      {suppliers.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.firstname}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Product */}
                <div className="col-lg-4 col-sm-12">

                  <div className="form-group">
                    <label>Product</label>
                    <select
                      className="form-control"
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      required
                    >
                      <option value="">Select Product</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-lg-4 col-sm-12">

                  <div className="form-group">
                    <label>Qty</label>
                    <input
                      type="text"
                      name="quantity_ordered"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-4 col-sm-12">
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      name="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <button type="submit" className="btn btn-submit me-2">
                    Submit
                  </button>
                  <button type="button" className="btn btn-cancel">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
