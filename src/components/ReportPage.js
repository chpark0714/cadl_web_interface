import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AttackReportForm from './AttackReportForm';
import YamlOutput from './YamlOutput';
import './ReportPage.css';

function ReportPage() {
  const [yamlData, setYamlData] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = (formData) => {
    const yaml = `# Cyber Attack Report
# Header Information
report_id: ${formData.reportId}
data_analyst: ${formData.dataAnalyst}
datetime: ${formData.datetime}

# Attack Details
attack_name: ${formData.attackName}
attack_type: ${formData.attackType}
severity_level: ${formData.severityLevel}
discovered_date: ${formData.discoveredDate}
affected_system: ${formData.affectedSystem}

# Behavioral Description
system_behavior: ${formData.systemBehavior}
network_behavior: ${formData.networkBehavior}

# Sysmon Data
event_id: ${formData.eventId}
process: ${formData.process}
file: ${formData.file}
registry: ${formData.registry}
sysmon_network: ${formData.sysmonNetwork}

# Suricata Alerts
alert_id: ${formData.alertId}
signature: ${formData.signature}
ip_address: ${formData.ip}
timestamp: ${formData.timestamp}

# Technical Details
hash: ${formData.hash}
code: ${formData.code}
trigger: ${formData.trigger}
indicators: ${formData.indicators}
malware_used: ${formData.malwareUsed}
vulnerabilities: ${formData.vulnerabilities}

# Response Details
initial_response: ${formData.initialResponse}
containment_measures: ${formData.containmentMeasures}
eradication_steps: ${formData.eradicationSteps}

# Detection and Mitigation
detection_method: ${formData.detectionMethod}

# Additional Findings
related_incident: ${formData.relatedIncident}
indicators_of_compromise: ${formData.ioc}

# MITRE ATT&CK Framework
mitre_tactic: ${formData.mitreTactic}
mitre_technique: ${formData.mitreTechnique}
mitre_sub_technique: ${formData.mitreSubTechnique || 'N/A'}
mitre_technique_id: ${formData.mitreId}

# Recommendations
prevention_measures: ${formData.preventionMeasures}
security_improvements: ${formData.securityImprovements}

# Additional Notes
notes: ${formData.notes || 'No additional notes'}`;

    console.log("Generated YAML:", yaml); // 디버깅용
    setYamlData(yaml);
  };

  const handleUpload = () => {
    if (!yamlData) {
      alert('Please generate YAML first');
      return;
    }

    const existingReports = JSON.parse(localStorage.getItem('reports') || '[]');
    const newReport = {
      id: Date.now(),
      date: new Date().toISOString(),
      content: yamlData
    };

    const updatedReports = [...existingReports, newReport];
    localStorage.setItem('reports', JSON.stringify(updatedReports));

    alert('Report uploaded successfully!');
    navigate('/board');
  };

  return (
    <div className="report-page">
      <h1>Create Attack Report</h1>
      <div className="report-content">
        <div className="form-section">
          <AttackReportForm onSubmit={handleFormSubmit} />
        </div>
        {yamlData && (
          <div className="yaml-section">
            <YamlOutput yaml={yamlData} />
            <button onClick={handleUpload} className="upload-button">
              Upload to Board
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportPage; 