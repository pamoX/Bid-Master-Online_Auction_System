import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import './ReportedItems.css';
import axios from 'axios';
import FlaggedItems from '../FlaggedItems/FlaggedItems';

const URL = 'http://localhost:5000/reports';

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ReportedItems() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchHandler()
      .then((data) => setReports(data.reports || data))
      .catch((error) => console.error('Error fetching reports:', error));
  }, []);

  return (
    <div className="RI-reported-items-page">
      <header className="RI-header-banner">
        <Nav />
        <div className="RI-header-overlay">
          <br/>
          <br/>
          <br/>
          <h1 className="RI-page-title">Reports Dashboard</h1>
        </div>
      </header>
      <main className="RI-content-wrapper">
        {reports.length > 0 ? (
          <table className="RI-reports-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Report Name</th>
                <th>Reason</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, i) => (
                <FlaggedItems key={i} report={report} />
              ))}
            </tbody>
          </table>
        ) : (
          <p className="RI-no-reports">No flagged items found at this time.</p>
        )}
      </main>
    </div>
  );
}

export default ReportedItems;