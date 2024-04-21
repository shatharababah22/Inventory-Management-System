import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
  const navigate = useNavigate();
  const imageInput = useRef(null);
  const imageInput2 = useRef(null);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [status, setStatus] = useState('');
  const [newImageUrl, setNewImageUrl] = useState(null);
  const [newImageUrl2, setNewImageUrl2] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []);

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category_id', categoryID);
      formData.append('status', status);
      
      if (imageInput.current && imageInput.current.files.length > 0) {
        formData.append("image1", imageInput.current.files[0]);
      }
      if (imageInput2.current && imageInput2.current.files.length > 0) {
        formData.append("image2", imageInput2.current.files[0]);
      }
      console.log(categoryID)
      const response = await axios.post('http://127.0.0.1:8000/api/products', formData, {
        
          headers: {
            'X-CSRF-TOKEN': csrfToken,
            'Accept': 'application/json',
    
          },
      });

      navigate("/");
      console.log('Product added:', response.data);
    } catch (error) {
      console.error('Error adding product:', error);
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

  const handleImageChange2 = (e) => {
    if (e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewImageUrl2(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Add Product</h4>
            <h6>Create new product</h6>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div className="row">
                <div className="col-lg-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" name='name' value={productName} onChange={(e) => setProductName(e.target.value)} required />
                  </div>
                </div>

                <div className="col-lg-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Price</label>
                    <input type="number" className="form-control" name='price' value={price} onChange={(e) => setPrice(e.target.value)} required />
                  </div>
                </div>


                {/* Other input fields */}
                <div className="col-lg-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Category</label>
                    <select name='category_id' className="form-control" value={categoryID} onChange={(e) => setCategoryID(e.target.value)} required>
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
                    <select name='status'   className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} required>
                      <option value="">Select status</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" name='description' value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {/* Display the photo */}
                      {newImageUrl && (
                        <div style={{ marginRight: '10px' }}>
                          <img src={newImageUrl} alt="New Product" style={{ maxWidth: '250px', maxHeight: '250px' }} />
                        </div>
                      )}
                      {/* Display the custom file input */}
                      <div className="custom-file">
                        <input 
                          type="file" 
                          id="image" 
                          name="image1" 
                          ref={imageInput} 
                          className="custom-file-input" 
                          onChange={handleImageChange} 
                          required
                          style={{ display: 'none' }} // Hide the default file input
                        />
                        <label className="custom-file-label with-border" htmlFor="image">Choose Image</label>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="col-lg-12">
                  <div className="form-group">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {/* Display the photo */}
                      {newImageUrl2 && (
                        <div style={{ marginRight: '10px' }}>
                          <img src={newImageUrl2} alt="New Product" style={{ maxWidth: '250px', maxHeight: '250px' }} />
                        </div>
                      )}
                      {/* Display the custom file input */}
                      <div className="custom-file">
                        <input 
                          type="file" 
                          id="image1" 
                          name="image2" 
                          ref={imageInput2} 
                          className="custom-file-input" 
                          onChange={handleImageChange2} 
                          required
                          style={{ display: 'none' }} // Hide the default file input
                        />
                        <label className="custom-file-label with-border" htmlFor="image1">Choose another image</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <button type="submit" className="btn btn-submit me-2">Submit</button>
                  <button type="button" className="btn btn-cancel">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductForm;
