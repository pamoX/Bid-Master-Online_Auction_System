// SellerRegistration.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from '../Nav/Nav';
import "./SellerRegistration.css";

const SellerRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    address: "",
    password: "",
    accountType: "individual",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions");
      return;
    }
    if (!formData.name.trim()) {
      alert("Please enter your full name");
      return;
    }
    console.log("Registration data:", formData);
    navigate("/registration-success");
  };

  return (
    <div className="registration-page">
      <Nav /> <br/><br/><br/><br/>
      <section className="seller-registration">
        <h2 className="registration-title">Seller Registration</h2>
        <div className="registration-card">
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="companyName">Company Name (Optional)</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter your company name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your full address"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>

            <div className="form-group">
              <label>Account Type</label>
              <div className="radio-group">
                <label className="radio-label">
                  <span className="radio-text">Individual Seller</span>
                  <input
                    type="radio"
                    name="accountType"
                    value="individual"
                    checked={formData.accountType === "individual"}
                    onChange={handleChange}
                  />
                </label>
                <label className="radio-label">
                  <span className="radio-text">Business</span>
                  <input
                    type="radio"
                    name="accountType"
                    value="business"
                    checked={formData.accountType === "business"}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

            <div className="form-group terms-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                />
                I agree to the{" "}
                <Link to="/terms" className="terms-link">
                  Terms and Conditions
                </Link>
              </label>
            </div>

            <button type="submit" className="submit-btn">
              Register as Seller
            </button>
          </form>

          <p className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default SellerRegistration;