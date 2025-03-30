import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddEmployee.css";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [inputs, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    department: "",
    task: "",
  });

  const handleChange = (e) => {
    setFormData({ ...inputs, [e.target.name]: e.target.value });
  };

  const validatePhone = (phone) => {
    // Check if phone contains only digits and is exactly 10 characters long
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    // Check if email contains '@' and ends with '.com'
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (!validatePhone(inputs.phone)) {
      alert("Please enter a valid 10-digit phone number without characters.");
      return;
    }

    // Validate email
    if (!validateEmail(inputs.email)) {
      alert("Please enter a valid email address ending with '.com'.");
      return;
    }

    const response = await fetch("http://localhost:5000/api/employees/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Employee added successfully!");
      setFormData({ employeeId: "", name: "", email: "", phone: "", address: "", role: "", department: "", task: "" });

      // Navigate to dashboard after success and refresh employee list
      navigate("/employeeDashboard", { state: { refresh: true } });
    } else {
      alert(`Error: ${data.message}`);
    }
  };

  return (
    <div className="addEmp-container">
      <div className="addEmp-box">
        <h2 className="addEmp-header">Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="addEmp-form">
            <label>Employee ID:</label>
            <input type="text" name="employeeId" value={inputs.employeeId} onChange={handleChange} required />

            <label>Name:</label>
            <input type="text" name="name" value={inputs.name} onChange={handleChange} required />

            <label>Email:</label>
            <input type="email" name="email" value={inputs.email} onChange={handleChange} required />

            <label>Phone Number:</label>
            <input type="text" name="phone" value={inputs.phone} onChange={handleChange} required />

            <label>Address:</label>
            <textarea name="address" value={inputs.address} onChange={handleChange} required></textarea>

            <label>Role:</label>
            <br />
            <select name="role" value={inputs.role} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="Employee">Employee</option>
              <option value="Seller">Seller</option>
              <option value="ItemInspector">Item Inspection Manager</option>
              <option value="ShippingManager">Shipping Manager</option>
            </select>

            <br />
            <label>Department:</label>
            <select name="department" value={inputs.department} onChange={handleChange} required>
              <option value="">Select Department</option>
              <option value="HR Management">HR</option>
              <option value="Seller Department">Selling</option>
              <option value="ItemInspection Department">Item Inspection</option>
              <option value="Shipping Department">Shipping</option>
            </select>

            <br />
            <label>Task:</label>
            <input type="text" name="task" value={inputs.task} onChange={handleChange} required />

            <button type="submit" className="addEmp-button">Add Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
