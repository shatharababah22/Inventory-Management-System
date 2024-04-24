import React, { useState, useRef } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddSupplierForm = () => {
  const navigate = useNavigate();
  const imageInput = useRef(null);
  const [userData, setUserData] = useState({
    firstname: "",
    email: "",
    phone: "",
    image: "",
    birthday: "",
    lastname: "",
    password: "",
  });
  const [newImageUrl, setNewImageUrl] = useState("");
  const token = localStorage.getItem("authToken");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstname", userData.firstname);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("birthday", userData.birthday);
      formData.append("lastname", userData.lastname);
      formData.append("password", userData.password);

      if (imageInput.current && imageInput.current.files.length > 0) {
        formData.append("image", imageInput.current.files[0]);
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/suppliers",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/supplier");
      Swal.fire("Success!", "Supplier added successfully.", "success");
    } catch (error) {
      const errorMessages = Object.values(error.response.data.errors).join(
        "<br><br>"
      );
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        html: errorMessages,
      });
    }
  };

  // Function to handle image change
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
            <h4>Add Supplier</h4>
            <h6>Create new Supplier</h6>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div className="row">
                <div className="col-lg-4 col-sm-12">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstname"
                      value={userData.firstname}
                      onChange={(e) =>
                        setUserData({ ...userData, firstname: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={userData.phone}
                      onChange={(e) =>
                        setUserData({ ...userData, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-4 col-sm-12">
                  <div className="form-group">
                    <label>Birthday</label>
                    <input
                      type="date"
                      name="birthday"
                      value={userData.birthday}
                      onChange={(e) =>
                        setUserData({ ...userData, birthday: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastname"
                      value={userData.lastname}
                      onChange={(e) =>
                        setUserData({ ...userData, lastname: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12">
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={userData.password}
                      onChange={(e) =>
                        setUserData({ ...userData, password: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12">
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
             
                      <div className="custom-file">
                        <input
                          type="file"
                          id="image"
                          name="image"
                          ref={imageInput}
                          className="custom-file-input"
                          onChange={handleImageChange}
                          style={{ display: "none" }} 
                        />
                        <label
                          className="custom-file-label with-border"
                          htmlFor="image"
                        >
                          Choose image
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

export default AddSupplierForm;
