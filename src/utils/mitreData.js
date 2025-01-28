export const MITRE_TACTICS = [
  'Initial Access',
  'Execution',
  'Persistence',
  'Privilege Escalation',
  'Defense Evasion',
  'Credential Access',
  'Discovery',
  'Lateral Movement',
  'Collection',
  'Command and Control',
  'Exfiltration',
  'Impact'
];

export const MITRE_TECHNIQUES = {
  'Initial Access': [
    {
      id: 'T1190',
      name: 'Exploit Public-Facing Application',
      subTechniques: []
    },
    {
      id: 'T1133',
      name: 'External Remote Services',
      subTechniques: []
    },
    {
      id: 'T1566',
      name: 'Phishing',
      subTechniques: [
        { id: 'T1566.001', name: 'Spearphishing Attachment' },
        { id: 'T1566.002', name: 'Spearphishing Link' },
        { id: 'T1566.003', name: 'Spearphishing via Service' }
      ]
    }
  ],
  'Execution': [
    {
      id: 'T1059',
      name: 'Command and Scripting Interpreter',
      subTechniques: [
        { id: 'T1059.001', name: 'PowerShell' },
        { id: 'T1059.002', name: 'Windows Command Shell' },
        { id: 'T1059.003', name: 'Windows Management Instrumentation' },
        { id: 'T1059.004', name: 'Unix Shell' },
        { id: 'T1059.005', name: 'Visual Basic' },
        { id: 'T1059.006', name: 'Python' },
        { id: 'T1059.007', name: 'JavaScript' },
        { id: 'T1059.008', name: 'Network Device CLI' }
      ]
    },
    {
      id: 'T1106',
      name: 'Native API',
      subTechniques: []
    },
    {
      id: 'T1053',
      name: 'Scheduled Task/Job',
      subTechniques: [
        { id: 'T1053.002', name: 'At' },
        { id: 'T1053.003', name: 'Cron' },
        { id: 'T1053.005', name: 'Scheduled Task' }
      ]
    }
  ],
  'Persistence': [
    {
      id: 'T1098',
      name: 'Account Manipulation',
      subTechniques: [
        { id: 'T1098.001', name: 'Additional Cloud Credentials' },
        { id: 'T1098.002', name: 'Exchange Email Delegate Permissions' },
        { id: 'T1098.003', name: 'Add Office 365 Global Administrator Role' }
      ]
    },
    {
      id: 'T1547',
      name: 'Boot or Logon Autostart Execution',
      subTechniques: [
        { id: 'T1547.001', name: 'Registry Run Keys / Startup Folder' },
        { id: 'T1547.002', name: 'Authentication Package' },
        { id: 'T1547.003', name: 'Time Providers' }
      ]
    }
  ],
  'Privilege Escalation': [
    {
      id: 'T1548',
      name: 'Abuse Elevation Control Mechanism',
      subTechniques: [
        { id: 'T1548.001', name: 'Setuid and Setgid' },
        { id: 'T1548.002', name: 'Bypass User Account Control' },
        { id: 'T1548.003', name: 'Sudo and Sudo Caching' }
      ]
    },
    {
      id: 'T1134',
      name: 'Access Token Manipulation',
      subTechniques: [
        { id: 'T1134.001', name: 'Token Impersonation/Theft' },
        { id: 'T1134.002', name: 'Create Process with Token' }
      ]
    }
  ],
  'Defense Evasion': [
    {
      id: 'T1070',
      name: 'Indicator Removal on Host',
      subTechniques: [
        { id: 'T1070.001', name: 'Clear Windows Event Logs' },
        { id: 'T1070.002', name: 'Clear Linux or Mac System Logs' },
        { id: 'T1070.003', name: 'Clear Command History' },
        { id: 'T1070.004', name: 'File Deletion' },
        { id: 'T1070.005', name: 'Network Share Connection Removal' },
        { id: 'T1070.006', name: 'Timestomp' }
      ]
    },
    {
      id: 'T1027',
      name: 'Obfuscated Files or Information',
      subTechniques: [
        { id: 'T1027.001', name: 'Binary Padding' },
        { id: 'T1027.002', name: 'Software Packing' },
        { id: 'T1027.003', name: 'Steganography' },
        { id: 'T1027.004', name: 'Compile After Delivery' },
        { id: 'T1027.005', name: 'Indicator Removal from Tools' }
      ]
    }
  ],
  'Credential Access': [
    {
      id: 'T1110',
      name: 'Brute Force',
      subTechniques: [
        { id: 'T1110.001', name: 'Password Guessing' },
        { id: 'T1110.002', name: 'Password Cracking' },
        { id: 'T1110.003', name: 'Password Spraying' },
        { id: 'T1110.004', name: 'Credential Stuffing' }
      ]
    },
    {
      id: 'T1003',
      name: 'OS Credential Dumping',
      subTechniques: [
        { id: 'T1003.001', name: 'LSASS Memory' },
        { id: 'T1003.002', name: 'Security Account Manager' },
        { id: 'T1003.003', name: 'NTDS' },
        { id: 'T1003.004', name: 'LSA Secrets' },
        { id: 'T1003.005', name: 'Cached Domain Credentials' },
        { id: 'T1003.006', name: 'DCSync' },
        { id: 'T1003.007', name: 'Proc Filesystem' },
        { id: 'T1003.008', name: '/etc/passwd and /etc/shadow' }
      ]
    }
  ],
  'Discovery': [
    {
      id: 'T1087',
      name: 'Account Discovery',
      subTechniques: [
        { id: 'T1087.001', name: 'Local Account' },
        { id: 'T1087.002', name: 'Domain Account' },
        { id: 'T1087.003', name: 'Email Account' },
        { id: 'T1087.004', name: 'Cloud Account' }
      ]
    },
    {
      id: 'T1082',
      name: 'System Information Discovery',
      subTechniques: []
    }
  ],
  'Lateral Movement': [
    {
      id: 'T1021',
      name: 'Remote Services',
      subTechniques: [
        { id: 'T1021.001', name: 'Remote Desktop Protocol' },
        { id: 'T1021.002', name: 'SMB/Windows Admin Shares' },
        { id: 'T1021.003', name: 'Distributed Component Object Model' },
        { id: 'T1021.004', name: 'SSH' },
        { id: 'T1021.005', name: 'VNC' },
        { id: 'T1021.006', name: 'Windows Remote Management' }
      ]
    }
  ],
  'Collection': [
    {
      id: 'T1560',
      name: 'Archive Collected Data',
      subTechniques: [
        { id: 'T1560.001', name: 'Archive via Utility' },
        { id: 'T1560.002', name: 'Archive via Library' },
        { id: 'T1560.003', name: 'Archive via Custom Method' }
      ]
    },
    {
      id: 'T1213',
      name: 'Data from Information Repositories',
      subTechniques: [
        { id: 'T1213.001', name: 'Confluence' },
        { id: 'T1213.002', name: 'Sharepoint' }
      ]
    }
  ],
  'Command and Control': [
    {
      id: 'T1071',
      name: 'Application Layer Protocol',
      subTechniques: [
        { id: 'T1071.001', name: 'Web Protocols' },
        { id: 'T1071.002', name: 'File Transfer Protocols' },
        { id: 'T1071.003', name: 'Mail Protocols' },
        { id: 'T1071.004', name: 'DNS' }
      ]
    },
    {
      id: 'T1573',
      name: 'Encrypted Channel',
      subTechniques: [
        { id: 'T1573.001', name: 'Symmetric Cryptography' },
        { id: 'T1573.002', name: 'Asymmetric Cryptography' }
      ]
    }
  ],
  'Exfiltration': [
    {
      id: 'T1048',
      name: 'Exfiltration Over Alternative Protocol',
      subTechniques: [
        { id: 'T1048.001', name: 'Exfiltration Over Symmetric Encrypted Channel' },
        { id: 'T1048.002', name: 'Exfiltration Over Asymmetric Encrypted Channel' },
        { id: 'T1048.003', name: 'Exfiltration Over Unencrypted/Obfuscated Non-C2 Protocol' }
      ]
    }
  ],
  'Impact': [
    {
      id: 'T1485',
      name: 'Data Destruction',
      subTechniques: []
    },
    {
      id: 'T1486',
      name: 'Data Encrypted for Impact',
      subTechniques: []
    },
    {
      id: 'T1489',
      name: 'Service Stop',
      subTechniques: []
    }
  ]
}; 