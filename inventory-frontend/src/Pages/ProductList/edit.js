import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [status, setStatus] = useState("");
  const [categories, setCategories] = useState([]);
  const [validationError, setValidationError] = useState({});
  const imageInput1 = useRef(null);
  const imageInput2 = useRef(null);

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/products/${id}`
      );
      const { data } = response;
      if (data) {
        const { name, description, price, category_id, image1, image2, status } = data;
        setName(name);
        setDescription(description);
        setPrice(price);
        setCategoryID(category_id);
        setImage1(image1); 
        setImage2(image2);
        setStatus(status);
      } else {
        Swal.fire({
          text: "Product data not found",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        text: "Error fetching product data",
        icon: "error",
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category_id", categoryID);
    formData.append("status", status);
    if (imageInput1.current && imageInput1.current.files.length > 0) {
      formData.append("image1", imageInput1.current.files[0]);
    }
    if (imageInput2.current && imageInput2.current.files.length > 0) {
      formData.append("image2", imageInput2.current.files[0]);
    }
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/products/${id}`,
        formData
      );
      const { data } = response;
      Swal.fire({
        icon: "success",
        text: data.message,
      });
      navigate("/");
    } catch ({ response }) {
      if (response && response.status === 422) {
        setValidationError(response.data.errors);
      } else {
        Swal.fire({
          text: response ? response.data.message : "Error updating product",
          icon: "error",
        });
      }
    }
  };

  const handleImage1Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage1(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImage2Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage2(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Edit Product</h4>
            <h6>Edit a product</h6>
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
            <form onSubmit={updateProduct}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={categoryID}
                      onChange={(e) => setCategoryID(e.target.value)}
                      className="form-control"
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.Name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="form-control"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                  {image1 && (
                       <div style={{ marginRight: '10px' }}>
                      <img
                      src={`http://127.0.0.1:8000/img/${image1}`}
                        alt="Image 1"
                        style={{ maxWidth: "250px", maxHeight: "250px" }}
                      />
                      </div>
                    )}
                    <input
                      type="file"
                      onChange={handleImage1Change}
                      ref={imageInput1}
                      name="image1"
                      style={{ display: 'none' }} 
                      className="custom-file-input" 
                    />
                
                       <label className="custom-file-label with-border" htmlFor="image1">Choose image</label>
                  </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                  {image2 && (
                             <div style={{ marginRight: '10px' }}>
                      <img
                      src={`http://127.0.0.1:8000/img/${image2}`}
                        alt="Product Image 2"
                        style={{ maxWidth: "250px", maxHeight: "250px" }}
                      /></div>
                    )}
                    <input
                      type="file"
                      onChange={handleImage2Change}
                      ref={imageInput2}
                      name="image1"
                      style={{ display: 'none' }} 
                      className="custom-file-input" 
                    />
                
                       <label className="custom-file-label with-border" htmlFor="image1">Choose image</label>
                 
                  </div>    </div>
                </div>
                <div className="col-lg-12">
                  <button type="submit" className="btn btn-submit me-2">
                    Submit
                  </button>
                  <a href="/products" className="btn btn-cancel">
                    Cancel
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;
