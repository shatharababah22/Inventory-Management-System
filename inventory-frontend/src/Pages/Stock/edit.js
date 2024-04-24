import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditStockForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [max_qty, setMax_qty] = useState(0);
  const [min_qty, setMin_qty] = useState(0);
  const [current_qty, setCurrent_qty] = useState("");
  const authToken = localStorage.getItem("authToken");
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/stock/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const { data } = response;
      console.log(data[0]);
      if (data[0]) {
        const { max_qty, min_qty, current_qty } = data[0];
        setMax_qty(max_qty);
        setMin_qty(min_qty);
        setCurrent_qty(current_qty);
      } else {
        Swal.fire({
          text: "Category data not found",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        text: "Error fetching category data",
        icon: "error",
      });
    }
  };

  const updateCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("max_qty", max_qty);
    formData.append("min_qty", min_qty);
    formData.append("current_qty", min_qty); // Typo: Should be formData.append("current_qty", current_qty);

    console.log(Image);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/stock/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const { data } = response;
      Swal.fire({
        icon: "success",
        text: data.message,
      });
      navigate("/stock");
    } catch (error) {
      console.error("Error updating category:", error);
      let errorMessage = "An error occurred while updating the category.";
      if (error.response && error.response.data && error.response.data.errors) {
        // Get the validation error message
        errorMessage = Object.values(error.response.data.errors)[0];
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Get the error message from the server
        errorMessage = error.response.data.message;
      }
      Swal.fire({
        text: errorMessage,
        icon: "error",
      });
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Product Edit Stock</h4>
            <h6>Edit a product Stock</h6>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            {Object.keys(validationError).length > 0 && (
              <div className="row">
                <div className="col-12">
                  <div className="alert alert-danger">
                    <ul className="mb-0">
                      {Object.entries(validationError).map(([key, value]) => (
                        <li key={key}>{value}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            <form onSubmit={updateCategory}>
              <div className="row">
                <div className="col-lg-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label>Current quantity</label>
                    <input
                      type="text"
                      value={current_qty}
                      onChange={(event) => {
                        setCurrent_qty(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label>Max quantity</label>
                    <input
                      type="text"
                      value={max_qty}
                      onChange={(event) => {
                        setMax_qty(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label>Minimum quantity</label>
                    <input
                      className="form-control"
                      value={min_qty}
                      onChange={(event) => {
                        setMin_qty(event.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <button type="submit" className="btn btn-submit me-2">
                  Submit
                </button>
                <a href="categorylist.html" className="btn btn-cancel">
                  Cancel
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStockForm;
