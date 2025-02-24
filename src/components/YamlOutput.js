import React from 'react';
import './YamlOutput.css';

function YamlOutput({ yaml }) {
  return (
    <div className="yaml-output">
      <h2>YAML Output</h2>
      <pre>
        <code>{yaml}</code>
      </pre>
    </div>
  );
}

export default YamlOutput; 