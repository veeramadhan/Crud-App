import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";

const Login = ({ setAuthenticated }) => {
  const initialFormState = { name: "", password: "" };
  const [user, setUser] = useState(initialFormState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.name === "admin" && user.password === "12345678") {
      setAuthenticated(true);
      navigate("/");
    } else {
      toast.error("Incorrect username or password. Please try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-content">
        <div className="card">
          <div className="card-header">
            <h1 className="text-center">Login</h1>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">UserName</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter your username"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
