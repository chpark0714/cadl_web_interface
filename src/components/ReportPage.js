import React from 'react';
import AttackReportForm from './AttackReportForm';
import YamlOutput from './YamlOutput';
import './ReportPage.css';

function ReportPage({ onSubmit, yamlData }) {
  return (
    <div className="report-page">
      <h1>Cyber Attack Report Generator</h1>
      <div className="container">
        <AttackReportForm onSubmit={onSubmit} />
        <YamlOutput yamlData={yamlData} />
      </div>
    </div>
  );
}

export default ReportPage; 