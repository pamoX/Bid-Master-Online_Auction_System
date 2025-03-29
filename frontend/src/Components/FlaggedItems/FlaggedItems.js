import React from 'react';

function FlaggedItems(props) {
  const { _id, ReportName, ReportReason, Date } = props.report;

  return (
    <tr>
      <td>{_id}</td>
      <td>{ReportName}</td>
      <td>{ReportReason}</td>
      <td>{Date}</td>
      <td>
        <button className="action-btn RI-update-btn">Update</button>
        <button className="action-btn RI-delete-btn">Delete</button>
      </td>
    </tr>
  );
}

export default FlaggedItems;