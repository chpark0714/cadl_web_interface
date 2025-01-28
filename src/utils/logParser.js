export function parseSysmonLog(logText) {
  const data = {
    eventId: '',
    process: '',
    file: '',
    registry: '',
    network: ''
  };

  try {
    // XML 형식인 경우
    if (logText.includes('<?xml')) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(logText, 'text/xml');
      
      // Event ID
      const eventId = xmlDoc.querySelector('EventID');
      if (eventId) {
        data.eventId = eventId.textContent;
      }

      // Process (Image)
      const image = xmlDoc.querySelector('Data[Name="Image"]');
      if (image) {
        data.process = image.textContent;
      }

      // File operations
      const targetFilename = xmlDoc.querySelector('Data[Name="TargetFilename"]');
      if (targetFilename) {
        data.file = targetFilename.textContent;
      }

      // Registry operations
      const targetObject = xmlDoc.querySelector('Data[Name="TargetObject"]');
      if (targetObject) {
        data.registry = targetObject.textContent;
      }

      // Network connections
      const destIP = xmlDoc.querySelector('Data[Name="DestinationIp"]');
      if (destIP) {
        data.network = destIP.textContent;
      }
    } 
    // 일반 로그 파일이나 EVTX를 텍스트로 변환한 경우
    else {
      // 로그 라인을 줄 단위로 분리
      const lines = logText.split('\n');
      
      // 가장 관련성 높은 이벤트 찾기
      for (const line of lines) {
        // Event ID
        const eventIdMatch = line.match(/EventID[:\s]+(\d+)/i) || 
                            line.match(/<EventID>(\d+)<\/EventID>/i);
        if (eventIdMatch && !data.eventId) {
          data.eventId = eventIdMatch[1];
        }

        // Process
        const processMatch = line.match(/Image[:\s]+([^\n]+)/i) ||
                           line.match(/Process[:\s]+([^\n]+)/i) ||
                           line.match(/<Data Name=['"]Image['"]>([^<]+)/i);
        if (processMatch && !data.process) {
          data.process = processMatch[1].trim();
        }

        // File
        const fileMatch = line.match(/TargetFilename[:\s]+([^\n]+)/i) ||
                         line.match(/FileName[:\s]+([^\n]+)/i) ||
                         line.match(/<Data Name=['"]TargetFilename['"]>([^<]+)/i);
        if (fileMatch && !data.file) {
          data.file = fileMatch[1].trim();
        }

        // Registry
        const registryMatch = line.match(/TargetObject[:\s]+([^\n]+)/i) ||
                             line.match(/Registry[:\s]+([^\n]+)/i) ||
                             line.match(/<Data Name=['"]TargetObject['"]>([^<]+)/i);
        if (registryMatch && !data.registry) {
          data.registry = registryMatch[1].trim();
        }

        // Network
        const networkMatch = line.match(/DestinationIp[:\s]+([^\n]+)/i) ||
                           line.match(/SourceIp[:\s]+([^\n]+)/i) ||
                           line.match(/IP[:\s]+([^\n]+)/i) ||
                           line.match(/<Data Name=['"]DestinationIp['"]>([^<]+)/i);
        if (networkMatch && !data.network) {
          data.network = networkMatch[1].trim();
        }
      }
    }
  } catch (e) {
    console.error('Error parsing Sysmon log:', e);
  }

  return data;
}

export function parseSuricataLog(logText) {
  const data = {
    alertId: '',
    signature: '',
    ip: '',
    timestamp: ''
  };

  try {
    // Suricata 로그가 JSON 형식인 경우
    const logEntries = logText.split('\n')
      .filter(line => line.trim())
      .map(line => JSON.parse(line));

    if (logEntries.length > 0) {
      const lastEntry = logEntries[logEntries.length - 1];
      
      data.alertId = lastEntry.alert?.signature_id || '';
      data.signature = lastEntry.alert?.signature || '';
      data.ip = lastEntry.src_ip || lastEntry.dest_ip || '';
      data.timestamp = lastEntry.timestamp || '';
    }
  } catch (e) {
    // JSON 파싱 실패 시 정규식으로 시도
    const signatureMatch = logText.match(/\[(?:\*\*|\[\d+:\d+:\d+\])\]\s*([^\[]+)/);
    if (signatureMatch) {
      data.signature = signatureMatch[1].trim();
    }

    const ipMatch = logText.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/);
    if (ipMatch) {
      data.ip = ipMatch[0];
    }

    const timestampMatch = logText.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    if (timestampMatch) {
      data.timestamp = timestampMatch[0];
    }
  }

  return data;
} 