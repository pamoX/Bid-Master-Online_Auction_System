import React, { useEffect, useState } from 'react';
import './HRDashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaMoneyCheckAlt, FaTasks, FaCheckCircle } from 'react-icons/fa';


const HRDashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [pendingPayrolls, setPendingPayrolls] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [inProgressTasks, setInProgressTasks] = useState(0);
const [completedTasks, setCompletedTasks] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch employee count
    axios.get('http://localhost:5000/api/employees/count')
    
      .then(res => setEmployeeCount(res.data.count))
      .catch(err => console.error(err));

    // Fetch pending payrolls count
    axios.get('http://localhost:5000/api/payroll/pending-count')
      .then(res => setPendingPayrolls(res.data.count))
      .catch(err => console.error(err));

    // Fetch pending tasks count
    axios.get('http://localhost:5000/api/tasks/pending-count')
      .then(res => setPendingTasks(res.data.count))
      .catch(err => console.error(err));


      // Get "In Progress" count
axios.get('http://localhost:5000/api/tasks/in-progress-count')
.then(res => setInProgressTasks(res.data.count))
.catch(err => console.error(err));

// Get "Completed" count
axios.get('http://localhost:5000/api/tasks/completed-count')
.then(res => setCompletedTasks(res.data.count))
.catch(err => console.error(err));

  }, []);

  return (
    <div className="hr-dashboard">
      <h1 className="hr-title">HR Manager Dashboard</h1>

      <div className="hr-summary-cards">
      <div className="hr-card">
  <FaUsers className="hr-icon" />
  <h2>Total Employees</h2>
  <p>{employeeCount}</p>
</div>

<div className="hr-card">
  <FaMoneyCheckAlt className="hr-icon" />
  <h2>Pending Payrolls</h2>
  <p>{pendingPayrolls}</p>
</div>

<div className="hr-card">
  <FaTasks className="hr-icon" />
  <h2>In Progress Tasks</h2>
  <p>{inProgressTasks}</p>
</div>

<div className="hr-card">
  <FaCheckCircle className="hr-icon" />
  <h2>Completed Tasks</h2>
  <p>{completedTasks}</p>
</div>


      </div>
      <h1 className="hr-title">Quick Access</h1>
      <div className="hr-action-cards">
  <div className="action-card" onClick={() => navigate('/employeeDashboard')}>
    <h3>👥 Manage Employees</h3>
    <p>View and manage employee records</p>
  </div>

  <div className="action-card" onClick={() => navigate('/payroll')}>
    <h3>💰 View Payroll</h3>
    <p>Manage and approve payrolls</p>
  </div>

  <div className="action-card" onClick={() => navigate('/tasks')}>
    <h3>🧠 Smart Task Assistant</h3>
    <p>Assign and track employee tasks</p>
  </div>
</div>


    </div>
  );
};

export default HRDashboard;
