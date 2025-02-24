import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AttackReportForm from './AttackReportForm';
import YamlOutput from './YamlOutput';
import './ReportPage.css';

function ReportPage() {
  const [yamlData, setYamlData] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = (formData) => {
    // YAML 형식으로 변환
    const yaml = `# Cyber Attack Report
attack_name: ${formData.attackName}
datetime: ${formData.datetime}
severity: ${formData.severity}
analyst: ${formData.analyst}

# Attack Details
attack_type: ${formData.attackType}
attack_vector: ${formData.attackVector}
target_systems: ${formData.targetSystems}

# Impact Assessment
affected_systems: ${formData.affectedSystems}
data_impact: ${formData.dataImpact}
business_impact: ${formData.businessImpact}

# Technical Details
indicators:
  - ${formData.indicators}
malware_used: ${formData.malwareUsed}
vulnerabilities: ${formData.vulnerabilities}

# Response Details
initial_response: ${formData.initialResponse}
containment_measures: ${formData.containmentMeasures}
eradication_steps: ${formData.eradicationSteps}

# Recommendations
prevention_measures: ${formData.preventionMeasures}
security_improvements: ${formData.securityImprovements}

# Additional Notes
notes: ${formData.notes || 'No additional notes'}`;

    setYamlData(yaml);
  };

  const handleUpload = () => {
    if (!yamlData) {
      alert('Please generate YAML first');
      return;
    }

    // localStorage에 저장된 reports 배열 가져오기
    const existingReports = JSON.parse(localStorage.getItem('reports') || '[]');
    
    // 새 리포트 객체 생성
    const newReport = {
      id: Date.now(),
      date: new Date().toISOString(),
      content: yamlData
    };

    // 새 리포트 추가
    const updatedReports = [...existingReports, newReport];
    localStorage.setItem('reports', JSON.stringify(updatedReports));

    alert('Report uploaded successfully!');
    navigate('/board');
  };

  return (
    <div className="report-container">
      <h1>Create Attack Report</h1>
      <AttackReportForm onSubmit={handleFormSubmit} />
      {yamlData && (
        <div className="yaml-section">
          <YamlOutput yaml={yamlData} />
          <button onClick={handleUpload} className="upload-button">
            Upload to Board
          </button>
        </div>
      )}
    </div>
  );
}

export default ReportPage; 