import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email: must contain @ and end with .com
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!emailRegex.test(formData.email)) {
      setError("Email must contain '@' and end with '.com'.");
      return;
    }

    // Validate phone number: must be exactly 10 digits, no characters
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Phone number must be exactly 10 digits with no characters.");
      return;
    }

    // Validate password: must be at least 8 characters
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/users", formData);

      // Check if registration was successful
      if (res.data.success) {
        alert("Registration successful! Please log in.");
        navigate("/login"); // Redirect to login page
      } else {
        setError(res.data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
    
      <div className="register-container">
        <div className="register-box">
          <h2 className="register-header">Register</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="register-form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button type="submit">Register</button>
              <p>
                Already have an account? <Link to="/login" className="active login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default Register;