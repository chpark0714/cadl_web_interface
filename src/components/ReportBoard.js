import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import './ReportBoard.css';

function ReportBoard() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const savedReports = JSON.parse(localStorage.getItem('reports') || '[]');
    // YAML 파싱하여 필요한 정보 추출
    const processedReports = savedReports.map(report => {
      try {
        const yamlData = yaml.load(report.content);
        return {
          id: report.id,
          date: report.date,
          reportId: `RPT-${report.id.toString().slice(-4)}`,
          attackName: yamlData.attack_name || 'N/A',
          datetime: yamlData.datetime || report.date,
          severity: yamlData.severity || 'N/A',
          analyst: yamlData.analyst || 'N/A',
          content: report.content
        };
      } catch (error) {
        console.error('Error parsing YAML:', error);
        return null;
      }
    }).filter(report => report !== null);

    setReports(processedReports);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleViewReport = (report) => {
    setSelectedReport(selectedReport?.id === report.id ? null : report);
  };

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
              <td>{formatDate(report.datetime)}</td>
              <td>
                <span className={`severity-badge ${report.severity.toLowerCase()}`}>
                  {report.severity}
                </span>
              </td>
              <td>{report.analyst}</td>
              <td>
                <button 
                  className="view-button"
                  onClick={() => handleViewReport(report)}
                >
                  {selectedReport?.id === report.id ? 'Hide' : 'View'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedReport && (
        <div className="report-detail">
          <h2>Report Detail</h2>
          <pre className="yaml-content">
            {selectedReport.content}
          </pre>
        </div>
      )}

      {reports.length === 0 && (
        <p className="no-reports">No reports available</p>
      )}
    </div>
  );
}

export default ReportBoard; 