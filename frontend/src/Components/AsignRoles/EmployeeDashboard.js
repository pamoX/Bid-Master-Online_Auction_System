import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'; 
import axios from "axios";

import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const deleteHandler = async (id) => {
    try {
      // Confirm deletion before proceeding
      const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
      if (!confirmDelete) return;
  
      // Send DELETE request to backend
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      
      // Filter out the deleted employee from the current list of employees
      setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp._id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div>
      <div className="empDashboard-container">
        <div className="empDashboard">
          <h2>Employee Management Dashboard</h2>
        </div>
        <div className="empDashboard-controls">
          <div className="empDashboard-search">
            <input
              type="text"
              placeholder="Search Employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="add-employee-btn" onClick={() => navigate("/addEmployee")}>
            Add
          </button>
        </div>
        <div className="empDashboard-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>EmployeeId</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Role</th>
                <th>Department</th>
                <th>Task</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp, index) => (
                  <tr key={emp._id}>
                    <td>{index +1}</td>
                    <td>{emp.employeeId}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.address}</td>
                    <td>{emp.role}</td>
                    <td>{emp.department}</td>
                    <td>{emp.task}</td>
                    <td>
                      <Link to = {`/employeeDashboard/${emp._id}`}>
                      <button className="empUpdate-btn">✏️</button> </Link>
                      <button onClick={() => deleteHandler(emp._id)} className="empDelete-btn">🗑️</button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr className="no-employees">
                  <td colSpan="9">No employees found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
