import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import ReportPage from './components/ReportPage';
import ReportBoard from './components/ReportBoard';
import './App.css';

function App() {
  const [yamlData, setYamlData] = useState('');

  const handleFormSubmit = (formData) => {
    const yaml = `# Cyber Attack Report

header:
  report_id: ${formData.reportId}
  data_analyst: ${formData.dataAnalyst}
  datetime: ${formData.datetime}

attack_details:
  name: ${formData.attackName}
  type: ${formData.attackType}
  severity_level: ${formData.severityLevel}
  discovered_date: ${formData.discoveredDate}
  affected_system: ${formData.affectedSystem}

behavioral_description:
  system_behavior: ${formData.systemBehavior}
  network_behavior: ${formData.networkBehavior}

sysmon_data:
  event_id: ${formData.eventId}
  process: ${formData.process}
  file: ${formData.file}
  registry: ${formData.registry}
  network: ${formData.sysmonNetwork}

suricata_alerts:
  alert_id: ${formData.alertId}
  signature: ${formData.signature}
  ip_address: ${formData.ip}
  timestamp: ${formData.timestamp}

technical_details:
  hash: ${formData.hash}
  code: ${formData.code}
  trigger: ${formData.trigger}

detection_and_mitigation:
  detection_method: ${formData.detectionMethod}

additional_findings:
  related_incident: ${formData.relatedIncident}
  indicators_of_compromise: ${formData.ioc}

mitre_attack:
  tactic: ${formData.mitreTactic}
  technique: ${formData.mitreTechnique}
  technique_id: ${formData.mitreId}
  sub_technique: ${formData.mitreSubTechnique}`;

    setYamlData(yaml);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route 
            path="/report" 
            element={<ReportPage onSubmit={handleFormSubmit} yamlData={yamlData} />} 
          />
          <Route path="/board" element={<ReportBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 