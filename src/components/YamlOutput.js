import React from 'react';

function YamlOutput({ yamlData }) {
  return (
    <div className="yaml-output">
      <h2></h2>
      <pre>{yamlData}</pre>
    </div>
  );
}

export default YamlOutput; 