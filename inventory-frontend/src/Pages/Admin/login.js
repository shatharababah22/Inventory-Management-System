import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignInFormAdmin = () => {
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
        "http://127.0.0.1:8000/api/loginadmin",
        user,
        {
          headers: {
            Accept: "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
        }
      );
      const authToken = response.data.data.token;
      const name = response.data.data.name;

      localStorage.setItem("authToken", authToken);

      localStorage.setItem("name", name);

      navigate("/home");
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
                <h4>This page for admin</h4>
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
                <button type="submit" className="btn btn-login loginadmin">Submit</button>

                   
                </div>
              </form>
              <div className="signinform text-center">
                <h4>
                  Don't have an account?{" "}
                  <a href="/register" className="hover-a">
                    Sign Up
                  </a>
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
            <img src="https://i.pinimg.com/564x/9c/ea/c7/9ceac7dcac59730f4ad4da6185f14617.jpg" alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInFormAdmin;
