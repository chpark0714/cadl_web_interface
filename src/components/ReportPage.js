import React, { useState } from 'react';
import { create } from 'ipfs-http-client';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import AttackReportForm from './AttackReportForm';
import YamlOutput from './YamlOutput';
import './ReportPage.css';

// 컨트랙트 ABI (Remix에서 컴파일 후 ABI 복사)
const contractABI = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "ipfsCid",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "reporter",
                    "type": "address"
                }
            ],
            "name": "ReportAdded",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_ipfsCid",
                    "type": "string"
                }
            ],
            "name": "addReport",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "name": "cidExists",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_index",
                    "type": "uint256"
                }
            ],
            "name": "getReport",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "ipfsCid",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "reporter",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct ReportRegistry.Report",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getReportCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "reports",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "ipfsCid",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "reporter",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

// Amoy 테스트넷에 배포된 컨트랙트 주소
const contractAddress = "0x63Dd621D5259D698e970EEfB4897CF09eB23056C";

function ReportPage() {
  const [yamlData, setYamlData] = useState('');
  const [ipfsCid, setIpfsCid] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [txHash, setTxHash] = useState('');
  const navigate = useNavigate();

  const ipfs = create({
    host: 'localhost',
    port: 5001,
    protocol: 'http'
  });

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

  const uploadToBlockchain = async (cid) => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed!");
      }

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // 현재 네트워크 확인
      const network = await provider.getNetwork();
      if (network.chainId !== 80002) { // Astar zKEVM Testnet chainId
        throw new Error("Please switch to Astar Amoy Testnet in MetaMask");
      }

      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.addReport(cid);
      setTxHash(tx.hash);
      
      await tx.wait();
      alert(`Successfully added to blockchain!\nTransaction Hash: ${tx.hash}`);
    } catch (error) {
      console.error('Error uploading to blockchain:', error);
      alert('Failed to upload to blockchain: ' + error.message);
    }
  };

  const handleIpfsUpload = async () => {
    if (!yamlData) {
      alert('Please generate YAML first');
      return;
    }

    setIsUploading(true);
    try {
      // YAML 데이터를 Uint8Array로 변환
      const encoder = new TextEncoder();
      const data = encoder.encode(yamlData);

      // IPFS에 업로드
      const result = await ipfs.add(data);
      const cid = result.path;
      setIpfsCid(cid);

      // localStorage에 저장된 reports 배열 가져오기
      const existingReports = JSON.parse(localStorage.getItem('reports') || '[]');
      
      // 새 리포트 객체 생성 (CID 포함)
      const newReport = {
        id: Date.now(),
        date: new Date().toISOString(),
        content: yamlData,
        ipfsCid: cid
      };

      // 새 리포트 추가
      const updatedReports = [...existingReports, newReport];
      localStorage.setItem('reports', JSON.stringify(updatedReports));

      alert(`Successfully uploaded to IPFS!\nCID: ${cid}`);
      
      // 블록체인에 업로드
      await uploadToBlockchain(cid);
      
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      alert('Failed to upload to IPFS: ' + error.message);
    } finally {
      setIsUploading(false);
    }
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
            <div className="button-group">
              <button 
                onClick={handleIpfsUpload} 
                className="ipfs-button"
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload to IPFS & Blockchain'}
              </button>
              {ipfsCid && (
                <div className="cid-display">
                  <p>IPFS CID:</p>
                  <code>{ipfsCid}</code>
                  <div className="ipfs-links">
                    <a 
                      href={`http://localhost:8080/ipfs/${ipfsCid}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View on Local Gateway
                    </a>
                    <a 
                      href={`https://ipfs.io/ipfs/${ipfsCid}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View on IPFS.io
                    </a>
                  </div>
                  {txHash && (
                    <div className="tx-display">
                      <p>Transaction Hash:</p>
                      <a 
                        href={`https://zkatana.blockscout.com/tx/${txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {txHash}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportPage; 