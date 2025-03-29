// frontend/src/Components/InspectionReport/InspectionReport.js
import React from 'react';
import Nav from '../Nav/Nav';
import './InspectionReport.css';

const InspectionReport = () => {
  // Sample data for the inspection summary
  const inspectionItems = [
    { id: 1, name: 'Item 1', status: 'Approved', date: '2025-03-24' },
    { id: 2, name: 'Item 2', status: 'Rejected', date: '2025-03-23' },
    { id: 3, name: 'Item 3', status: 'Flagged', date: '2025-03-22' },
  ];

  // Function to handle the "Generate Report" button click
  const handleGenerateReport = () => {
    // For now, we'll just log the data to the console
    console.log('Generating report with the following data:', inspectionItems);
    // In a real app, you can use a library like jsPDF or PapaParse to generate a PDF/CSV
    alert('Report generation triggered! Check the console for data.');
  };

  return (
    <div className="inspection-report">
      <Nav />
      <br />
      <br />
      <br />
      <h1>Inspection Summary</h1>

      {/* Table of Inspection Items */}
      <table>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {inspectionItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.status}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Generate Report Button */}
      <button onClick={handleGenerateReport} className="generate-btn">
        Generate Report
      </button>
    </div>
  );
};

export default InspectionReport;
