import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditCategoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [Image, setImage] = useState(null);
  const [validationError, setValidationError] = useState({});
  const token = localStorage.getItem("authToken");
  const imageInput = useRef(null);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (data) {
        const { Name, description, Image } = data;
        setName(Name);
        setDescription(description);
        setImage(Image);
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
    formData.append("_method", "PUT");
    formData.append("Name", Name);
    formData.append("description", description);
    if (imageInput.current && imageInput.current.files.length > 0) {
      formData.append("Image", imageInput.current.files[0]);
    }
    console.log(Image);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/categories/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;

      Swal.fire({
        icon: "success",
        text: data.message,
      });

      navigate("/category");
    } catch ({ response }) {
      if (response && response.status === 422) {
        setValidationError(response.data.errors);
      } else {
        Swal.fire({
          text: response ? response.data.message : "Error updating category",
          icon: "error",
        });
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Product Edit Category</h4>
            <h6>Edit a product Category</h6>
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
                    <label>Category Name</label>
                    <input
                      type="text"
                      value={Name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      value={description}
                      onChange={(event) => {
                        setDescription(event.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>

                <div className="form-group">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {/* Display the photo */}
                    {Image && (
                      <img
                        src={`http://127.0.0.1:8000/img/${Image}`}
                        alt="Category"
                        style={{ maxWidth: "250px", maxHeight: "250px" }}
                      />
                    )}
                    {/* Display the custom file input */}
                    <div className="custom-file">
                      <input
                        type="file"
                        id="image"
                        name="Image"
                        className="custom-file-input"
                        onChange={handleImageChange}
                        ref={imageInput}
                        style={{ display: "none" }} // Hide the default file input
                      />
                      <label
                        className="custom-file-label with-border m-1"
                        htmlFor="image"
                      >
                        Choose file
                      </label>
                    </div>
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

export default EditCategoryForm;
