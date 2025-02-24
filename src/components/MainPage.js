import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
  return (
    <div className="main-container">
      <h1>CADL Web Interface</h1>
      <div className="button-container">
        <Link to="/report" className="nav-button">
          Create New Report
        </Link>
        <Link to="/board" className="nav-button">
          View Reports
        </Link>
      </div>
    </div>
  );
}

export default MainPage; 