import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const location = useLocation();
  const isVerified = sessionStorage.getItem('zkProofVerified') === 'true';

  if (!isVerified) {
    return <Navigate to="/verify" state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute; 