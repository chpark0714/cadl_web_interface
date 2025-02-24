import React, { useState } from 'react';
import './ReportBoard.css';

function ReportBoard() {
  const [reports, setReports] = useState([
    // 샘플 데이터
    {
      id: 1,
      reportId: "RPT001",
      attackName: "Sample Attack 1",
      datetime: "2024-03-14",
      severity: "High",
      analyst: "John Doe"
    }
  ]);

  return (
    <div className="report-board">
      <h1>Attack Reports List</h1>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Attack Name</th>
            <th>Date</th>
            <th>Severity</th>
            <th>Analyst</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id}>
              <td>{report.reportId}</td>
              <td>{report.attackName}</td>
              <td>{report.datetime}</td>
              <td>{report.severity}</td>
              <td>{report.analyst}</td>
              <td>
                <button onClick={() => console.log('View report:', report.id)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportBoard; 