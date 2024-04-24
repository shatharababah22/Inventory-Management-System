import React, { useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const AddCategoryForm = () => {
  const navigate = useNavigate();
  const imageInput = useRef(null);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [newImageUrl, setNewImageUrl] = useState(null);
  const token = localStorage.getItem("authToken");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("Name", categoryName);
      formData.append("description", description);

      if (imageInput.current && imageInput.current.files.length > 0) {
        formData.append("Image", imageInput.current.files[0]);
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/categories",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire("Success!", "Category added successfully.", "success");

      navigate("/category");

      console.log("Category added:", response.data);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };


  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewImageUrl(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Product Add Category</h4>
            <h6>Create new product Category</h6>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div className="row">
                <div className="col-lg-12 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Category Name</label>
                    <input
                      type="text"
                      name="Name"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {/* Display the photo */}
                      {newImageUrl && (
                        <div style={{ marginRight: "10px" }}>
                          <img
                            src={newImageUrl}
                            alt="New Category"
                            style={{ maxWidth: "250px", maxHeight: "250px" }}
                          />
                        </div>
                      )}
                      {/* Display the custom file input */}
                      <div className="custom-file">
                        <input
                          type="file"
                          id="image"
                          name="Image"
                          ref={imageInput}
                          className="custom-file-input"
                          onChange={handleImageChange}
                          style={{ display: "none" }} // Hide the default file input
                        />
                        <label
                          className="custom-file-label with-border"
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

export default AddCategoryForm;
