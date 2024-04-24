import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignInForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        user,
        {
          headers: {
            Accept: "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
        }
      );
      const authTokenUser = response.data.data.token;
      const name = response.data.data.name;

      localStorage.setItem("authTokenUser", authTokenUser);
      localStorage.setItem("name", name);

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "The email or password is incorrect. Please try again",
      });
    }
  };

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
                <h3>Sign In</h3>
                <h4>Continue where you left off</h4>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-login">
                  <label>Email</label>
                  <div className="form-addons">
                    <input
                      type="text"
                      placeholder="Enter your email address"
                      value={user.email}
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
                      value={user.password}
                      onChange={(e) =>
                        setUser((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
                    <span className="fas toggle-password fa-eye-slash"></span>
                  </div>
                </div>
                <div className="form-login">
                  <button type="submit" className="btn btn-login">
                    Sign In
                  </button>
                </div>
              </form>
              <div className="signinform text-center">
                <h4>
                  Don't have an account?{" "}
                  <Link to='/register' className="hover-a">
                    Sign Up
                  </Link>
                </h4>
              </div>
              <div className="form-setlogin">
                <h4>Or sign in with</h4>
              </div>
              <div className="form-sociallink">
                <ul>
                  <li>
                    <a href="javascript:void(0);">
                      <img
                        src="assets/img/icons/google.png"
                        className="me-2"
                        alt="google"
                      />
                      Sign In with Google
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">
                      <img
                        src="assets/img/icons/facebook.png"
                        className="me-2"
                        alt="facebook"
                      />
                      Sign In with Facebook
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

export default SignInForm;
