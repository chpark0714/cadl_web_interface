import React, { useState } from 'react';
import './AttackReportForm.css';
import { parseSysmonLog, parseSuricataLog } from '../utils/logParser';
import { MITRE_TACTICS, MITRE_TECHNIQUES } from '../utils/mitreData';

function AttackReportForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    reportId: '',
    dataAnalyst: '',
    datetime: '',
    attackName: '',
    attackType: '',
    severityLevel: '',
    discoveredDate: '',
    affectedSystem: '',
    systemBehavior: '',
    networkBehavior: '',
    eventId: '',
    process: '',
    file: '',
    registry: '',
    sysmonNetwork: '',
    alertId: '',
    signature: '',
    ip: '',
    timestamp: '',
    hash: '',
    code: '',
    trigger: '',
    detectionMethod: '',
    relatedIncident: '',
    ioc: '',
    mitreTactic: '',
    mitreTechnique: '',
    mitreSubTechnique: '',
    mitreId: '',
    indicators: '',
    malwareUsed: '',
    vulnerabilities: '',
    initialResponse: '',
    containmentMeasures: '',
    eradicationSteps: '',
    preventionMeasures: '',
    securityImprovements: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSysmonFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const text = await file.text();
      const sysmonData = parseSysmonLog(text);
      setFormData(prev => ({
        ...prev,
        eventId: sysmonData.eventId || prev.eventId,
        process: sysmonData.process || prev.process,
        file: sysmonData.file || prev.file,
        registry: sysmonData.registry || prev.registry,
        sysmonNetwork: sysmonData.network || prev.sysmonNetwork
      }));
    }
  };

  const handleSuricataFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const text = await file.text();
      const suricataData = parseSuricataLog(text);
      setFormData(prev => ({
        ...prev,
        alertId: suricataData.alertId || prev.alertId,
        signature: suricataData.signature || prev.signature,
        ip: suricataData.ip || prev.ip,
        timestamp: suricataData.timestamp || prev.timestamp
      }));
    }
  };

  const handleTacticChange = (e) => {
    const tactic = e.target.value;
    setFormData(prev => ({
      ...prev,
      mitreTactic: tactic,
      mitreTechnique: '', // Reset technique when tactic changes
      mitreSubTechnique: '', // Reset sub-technique when tactic changes
      mitreId: ''
    }));
  };

  const handleTechniqueChange = (e) => {
    const technique = e.target.value;
    const selectedTechnique = MITRE_TECHNIQUES[formData.mitreTactic]?.find(t => t.name === technique);
    setFormData(prev => ({
      ...prev,
      mitreTechnique: technique,
      mitreSubTechnique: '', // Reset sub-technique when technique changes
      mitreId: selectedTechnique?.id || ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="attack-report-form">
      <h2>Enter Report Information</h2>
      
      <div className="form-section">
        <h3>Header Information</h3>
        <input
          type="text"
          name="reportId"
          placeholder="Report ID"
          value={formData.reportId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="dataAnalyst"
          placeholder="Data Analyst"
          value={formData.dataAnalyst}
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          name="datetime"
          value={formData.datetime}
          onChange={handleChange}
        />
      </div>

      <div className="form-section">
        <h3>Attack Details</h3>
        <input
          type="text"
          name="attackName"
          placeholder="Attack Name"
          value={formData.attackName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="attackType"
          placeholder="Attack Type"
          value={formData.attackType}
          onChange={handleChange}
        />
        <input
          type="text"
          name="severityLevel"
          placeholder="Severity Level"
          value={formData.severityLevel}
          onChange={handleChange}
        />
        <input
          type="date"
          name="discoveredDate"
          placeholder="Discovered Date"
          value={formData.discoveredDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="affectedSystem"
          placeholder="Affected System"
          value={formData.affectedSystem}
          onChange={handleChange}
        />
      </div>

      <div className="form-section">
        <h3>Behavioral Description</h3>
        <textarea
          name="systemBehavior"
          placeholder="System Behavior"
          value={formData.systemBehavior}
          onChange={handleChange}
        />
        <textarea
          name="networkBehavior"
          placeholder="Network Behavior"
          value={formData.networkBehavior}
          onChange={handleChange}
        />
      </div>

      <div className="form-section">
        <h3>Sysmon Data</h3>
        <div className="file-upload">
          <label htmlFor="sysmonLog">Upload Sysmon Log File:</label>
          <input
            type="file"
            id="sysmonLog"
            accept=".evtx,.xml,.txt,.log"
            onChange={handleSysmonFileUpload}
          />
        </div>
        <input
          type="text"
          name="eventId"
          placeholder="Event ID"
          value={formData.eventId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="process"
          placeholder="Process"
          value={formData.process}
          onChange={handleChange}
        />
        <input
          type="text"
          name="file"
          placeholder="File"
          value={formData.file}
          onChange={handleChange}
        />
        <input
          type="text"
          name="registry"
          placeholder="Registry"
          value={formData.registry}
          onChange={handleChange}
        />
        <input
          type="text"
          name="sysmonNetwork"
          placeholder="Network"
          value={formData.sysmonNetwork}
          onChange={handleChange}
        />
      </div>

      <div className="form-section">
        <h3>Suricata Alerts</h3>
        <div className="file-upload">
          <label htmlFor="suricataLog">Upload Suricata Log File:</label>
          <input
            type="file"
            id="suricataLog"
            accept=".log,.txt,.json"
            onChange={handleSuricataFileUpload}
          />
        </div>
        <input
          type="text"
          name="alertId"
          placeholder="Alert ID"
          value={formData.alertId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="signature"
          placeholder="Signature"
          value={formData.signature}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ip"
          placeholder="IP Address"
          value={formData.ip}
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          name="timestamp"
          value={formData.timestamp}
          onChange={handleChange}
        />
      </div>

      <div className="form-section">
        <h3>Technical Details</h3>
        <input
          type="text"
          name="hash"
          placeholder="Hash"
          value={formData.hash}
          onChange={handleChange}
        />
        <textarea
          name="code"
          placeholder="Code"
          value={formData.code}
          onChange={handleChange}
        />
        <textarea
          name="trigger"
          placeholder="Trigger"
          value={formData.trigger}
          onChange={handleChange}
        />
      </div>

      <div className="form-section">
        <h2>Technical Details</h2>
        <div className="form-group">
          <label htmlFor="indicators">Indicators:</label>
          <textarea
            id="indicators"
            name="indicators"
            value={formData.indicators}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="malwareUsed">Malware Used:</label>
          <textarea
            id="malwareUsed"
            name="malwareUsed"
            value={formData.malwareUsed}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="vulnerabilities">Vulnerabilities:</label>
          <textarea
            id="vulnerabilities"
            name="vulnerabilities"
            value={formData.vulnerabilities}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-section">
        <h2>Response Details</h2>
        <div className="form-group">
          <label htmlFor="initialResponse">Initial Response:</label>
          <textarea
            id="initialResponse"
            name="initialResponse"
            value={formData.initialResponse}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="containmentMeasures">Containment Measures:</label>
          <textarea
            id="containmentMeasures"
            name="containmentMeasures"
            value={formData.containmentMeasures}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="eradicationSteps">Eradication Steps:</label>
          <textarea
            id="eradicationSteps"
            name="eradicationSteps"
            value={formData.eradicationSteps}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-section">
        <h2>Recommendations</h2>
        <div className="form-group">
          <label htmlFor="preventionMeasures">Prevention Measures:</label>
          <textarea
            id="preventionMeasures"
            name="preventionMeasures"
            value={formData.preventionMeasures}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="securityImprovements">Security Improvements:</label>
          <textarea
            id="securityImprovements"
            name="securityImprovements"
            value={formData.securityImprovements}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-section">
        <h2>Additional Notes</h2>
        <div className="form-group">
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Detection and Mitigation</h3>
        <textarea
          name="detectionMethod"
          placeholder="Detection Method"
          value={formData.detectionMethod}
          onChange={handleChange}
        />
      </div>

      <div className="form-section">
        <h3>Additional Findings</h3>
        <textarea
          name="relatedIncident"
          placeholder="Related Incident"
          value={formData.relatedIncident}
          onChange={handleChange}
        />
        <textarea
          name="ioc"
          placeholder="Indicators of Compromise (IOC)"
          value={formData.ioc}
          onChange={handleChange}
        />
      </div>

      <div className="form-section">
        <h3>MITRE ATT&CK Framework</h3>
        <div className="mitre-select">
          <label htmlFor="mitreTactic">Tactic:</label>
          <select
            id="mitreTactic"
            name="mitreTactic"
            value={formData.mitreTactic}
            onChange={handleTacticChange}
          >
            <option value="">Select a Tactic</option>
            {MITRE_TACTICS.map(tactic => (
              <option key={tactic} value={tactic}>{tactic}</option>
            ))}
          </select>
        </div>

        {formData.mitreTactic && (
          <div className="mitre-select">
            <label htmlFor="mitreTechnique">Technique:</label>
            <select
              id="mitreTechnique"
              name="mitreTechnique"
              value={formData.mitreTechnique}
              onChange={handleTechniqueChange}
            >
              <option value="">Select a Technique</option>
              {MITRE_TECHNIQUES[formData.mitreTactic]?.map(technique => (
                <option key={technique.id} value={technique.name}>
                  {technique.id} - {technique.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {formData.mitreTechnique && MITRE_TECHNIQUES[formData.mitreTactic]?.find(t => t.name === formData.mitreTechnique)?.subTechniques && (
          <div className="mitre-select">
            <label htmlFor="mitreSubTechnique">Sub-technique:</label>
            <select
              id="mitreSubTechnique"
              name="mitreSubTechnique"
              value={formData.mitreSubTechnique}
              onChange={handleChange}
            >
              <option value="">Select a Sub-technique</option>
              {MITRE_TECHNIQUES[formData.mitreTactic]
                ?.find(t => t.name === formData.mitreTechnique)
                ?.subTechniques
                ?.map(sub => (
                  <option key={sub.id} value={sub.name}>
                    {sub.id} - {sub.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        {formData.mitreId && (
          <div className="mitre-id">
            <strong>Technique ID:</strong> {formData.mitreId}
          </div>
        )}
      </div>

      <button type="submit" className="submit-button">Convert to YAML</button>
    </form>
  );
}

export default AttackReportForm; 