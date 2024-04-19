import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Orders = () => {
  // Define the state to hold the orders
  const [orders, setOrders] = useState([]);

  // Function to handle deletion of an order
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://127.0.0.1:8000/api/orders/${id}`)
          .then((response) => {
            setOrders(orders.filter((order) => order.id !== id));
            console.log("Order deleted successfully");
            Swal.fire("Deleted!", "Your order has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting order:", error);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the order.",
              "error"
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your order is safe :)", "info");
      }
    });
  };

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Order list</h4>
            <h6>View/Search orders</h6>
          </div>
           <div className="page-btn">
                    <Link to="/add" className="btn btn-added">

                            <img src="assets/img/icons/plus.svg" className="me-1" alt="img" />Add stock
                        </Link>
                    </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <label className="checkboxs">
                        <input type="checkbox" id="select-all" />
                        <span className="checkmarks"></span>
                      </label>
                    </th>
                    <th>Customer Name</th>
                    <th>Customer email</th>
                    <th>Order date</th>
                    <th>Payment Type</th>
                    <th>Total amount</th>

                    <th>qty</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <label class="checkboxs">
                          <input type="checkbox" />
                          <span class="checkmarks"></span>
                        </label>
                      </td>
                      <td>{order.buyer_firstname}</td>
                      <td>{order.buyer_email}</td>
                      <td>{order.date}</td>
                      <td>{order.payment_type}</td>
                      <td>{order.total_amount}</td>

                      <td>{order.quantity_ordered}</td>
                      <td>
                        <Link to={`/order/edit/${order.id}`} class="me-3">
                          <img src="assets/img/icons/edit.svg" alt="img" />
                        </Link>
                        <a
                          className="me-3 confirm-text"
                          href="javascript:void(0);"
                          onClick={() => handleDelete(order.id)}
                        >
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
};

export default Orders;
