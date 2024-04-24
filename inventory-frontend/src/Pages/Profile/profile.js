import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProfilePage = () => {
    const navigate = useNavigate();
    const authToken = localStorage.getItem('authToken');

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState("");
    const [image, setImage] = useState(null);
    const imageInput = useRef(null);

    useEffect(() => {
        if (authToken) {
            axios.get("http://127.0.0.1:8000/api/alluser", {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            .then(response => {
                const { name, email, phone, image, birthday } = response.data;

                setName(name);
                setEmail(email);
                setPhone(phone);
                setBirthday(birthday);
                if (image) {
                    setImage(`http://127.0.0.1:8000/img/${image}`);
                }
            })
            .catch(error => {
                console.error('Failed to fetch user data:', error);
                navigate('/login');
            });
        } else {
            navigate('/login');
        }
    }, [authToken, navigate]);
    

    const updateProfile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("birthday", birthday);
        if (imageInput.current && imageInput.current.files.length > 0) {
            formData.append("image", imageInput.current.files[0]);
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/profile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }
            );
            Swal.fire({
                icon: "success",
                text: response.data.message,
            });
            navigate("/home");
        } catch (error) {
            Swal.fire({
                text: error.response.data.message || "Error updating profile",
                icon: "error",
            });
        }
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setImage(reader.result); // Update the image URL state
          };
          reader.readAsDataURL(file);
        }
      };
    

    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="page-title">
                        <h4>Profile</h4>
                        <h6>User Profile</h6>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="profile-set">
                            {/* Profile picture */}
                            <div className="profile-contentimg">
                                {image && <img src={image} alt="Profile" />}
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
                            {/* Profile name and details */}
                            <div className="profile-contentname">
                                <h2>{name}</h2>
                                <h4>Update Your Photo and Personal Details</h4>
                            </div>
                        </div>
                        {/* Profile form */}
                        <form onSubmit={updateProfile}>
                            <div className="row">
                                <div className="col-lg-6 col-sm-12">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-12">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-12">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-12">
                                    <div className="form-group">
                                        <label>Birthday</label>
                                        <input
                                            type="date"
                                            value={birthday}
                                            onChange={(e) => setBirthday(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
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
};

export default ProfilePage;
