import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
      const formData = new FormData();
      formData.append('name', user.name);
      formData.append('email', user.email);
      formData.append('password', user.password);
  
      const registerResponse = await axios.post('http://127.0.0.1:8000/api/register', formData, {
        headers: {
          'X-CSRF-TOKEN': csrfToken,
          'Accept': 'application/json',
        },
      });
 const authToken = registerResponse.data.data.token;
console.log(registerResponse.data.data.token)
      // Store the token in local storage
      localStorage.setItem('authToken', authToken);
      // Assuming your Laravel controller returns JSON with a 'success' key
      if (registerResponse.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          html: `<span class="celebration-emoji" style="color:#637E4C;font-size:20px;font-family: Georgia, 'Times New Roman', Times, serif;font-weight:400">Welcome ${user.name} 🎉</span>`, // Use the userName variable
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          navigate("/login");
        });
      } else {

        const errorMessages = Object.values(registerResponse.data.errors).join('<br><br>');
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          html: errorMessages,
        });
      }
    } catch (error) {
      console.error('Registration failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'An error occurred while registering. Please try again later.',
      });
    }
  }
  
  
    return (
        <div className="main-wrapper">
            <div className="account-content">
                <div className="login-wrapper">
                    <div className="login-content">
                        <div className="login-userset">
                            <div className="login-logo">
                                <img src="assets/img/logo.png" alt="img" />
                            </div>
                            <div className="login-userheading">
                                <h3>Create an Account</h3>
                                <h4>Continue where you left off</h4>
                            </div>
                            <form onSubmit={handleSubmit}>

                                <div className="form-login">
                                    <label>Full Name</label>
                                    <div className="form-addons">
                                        <input 
                                            type="text" 
                                            placeholder="Enter your full name" 
                                            value={user.name}
                                            name='name'
                                            onChange={(e) =>
                                                setUser((prev) => ({ ...prev, name: e.target.value }))
                                              }
                                        />
                                        <img src="assets/img/icons/users1.svg" alt="img" />
                                    </div>
                                </div>
                                <div className="form-login">
                                    <label>Email</label>
                                    <div className="form-addons">
                                        <input 
                                            type="text" 
                                            placeholder="Enter your email address" 
                                            value={user.email}
                                            name='email'
                                            onChange={(e) =>
                                                setUser((prev) => ({ ...prev, email: e.target.value }))
                                              }
                                        />
                                        <img src="assets/img/icons/mail.svg" alt="img" />
                                    </div>
                                </div>
                                <div className="form-login">
                                    <label>Password</label>
                                    <div className="pass-group">
                                        <input 
                                            type="password" 
                                            className="pass-input" 
                                            placeholder="Enter your password" 
                                            name="password"
                           onChange={(e) =>
                             setUser((prev) => ({
                               ...prev,
                               password: e.target.value,
                             }))
                           }
                           value={user.password}
                                        />
                                        <span className="fas toggle-password fa-eye-slash"></span>
                                    </div>
                                </div>
                                <div className="form-login">
                                    <button type="submit" className="btn btn-login">Sign Up</button>
                                </div>
                            </form>
                            <div className="signinform text-center">
                                <h4>Already a user? <a href="signin.html" className="hover-a">Sign In</a></h4>
                            </div>
                            <div className="form-setlogin">
                                <h4>Or sign up with</h4>
                            </div>
                            <div className="form-sociallink">
                                <ul>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <img src="assets/img/icons/google.png" className="me-2" alt="google" />
                                            Sign Up using Google
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <img src="assets/img/icons/facebook.png" className="me-2" alt="google" />
                                            Sign Up using Facebook
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="login-img">
                        <img src="assets/img/login.jpg" alt="img" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
