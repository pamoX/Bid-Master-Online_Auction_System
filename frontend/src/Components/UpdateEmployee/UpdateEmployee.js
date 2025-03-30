import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateEmployee() {
    const [inputs, setInputs] = useState(null); // Initialize as null instead of an empty object
    const navigate = useNavigate();
    const id = useParams().id;

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
                if (response.data && response.data.employee) {
                    setInputs(response.data.employee); // Assuming response.data.user has the employee details
                }
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        try {
            await axios.put(`http://localhost:5000/api/employees/${id}`, {
                employeeId: String(inputs.employeeId),
                name: String(inputs.name),
                email: String(inputs.email),
                phone: String(inputs.phone),
                address: String(inputs.address),
                role: String(inputs.role),
                department: String(inputs.department),
                task: String(inputs.task),
            });
        } catch (error) {
            console.error('Error updating employee data:', error);
        }
    };

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        await sendRequest();
        navigate("/employeeDashboard");
    };

    // Conditional rendering: show loading state until inputs are fetched
    if (!inputs) {
        return <div>Loading...</div>; // Show loading message while waiting for data
    }

    return (
        <div className="addEmp-container">
            <div className="addEmp-box">
                <h2 className="addEmp-header">Update Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="addEmp-form">
                        <label>Employee ID:</label>
                        <input
                            type="text"
                            name="employeeId"
                            value={inputs.employeeId}
                            onChange={handleChange}
                            required
                            readOnly
                        />

                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={inputs.name}
                            onChange={handleChange}
                            required
                        />

                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={inputs.email}
                            onChange={handleChange}
                            required
                        />

                        <label>Phone Number:</label>
                        <input
                            type="text"
                            name="phone"
                            value={inputs.phone}
                            onChange={handleChange}
                            required
                        />

                        <label>Address:</label>
                        <textarea
                            name="address"
                            value={inputs.address}
                            onChange={handleChange}
                            required
                        ></textarea>

                        <label>Role:</label>
                        <br></br>
                        <select
                            name="role"
                            value={inputs.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="Employee">Employee</option>
                            <option value="Seller">Seller</option>
                            <option value="ItemInspector">Item Inspection Manager</option>
                            <option value="ShippingManager">Shipping Manager</option>
                        </select>

                        <label>Department:</label>
                        <br></br>
                        <select
                            name="department"
                            value={inputs.department}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Department</option>
                            <option value="HR Management">HR</option>
                            <option value="Seller Department">Selling</option>
                            <option value="ItemInspection Department">Item Inspection</option>
                            <option value="Shipping Department">Shipping</option>
                        </select>

                        <br />
                        <label>Task:</label>
                        <input
                            type="text"
                            name="task"
                            value={inputs.task}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit" className="addEmp-button">
                            Update Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateEmployee;
