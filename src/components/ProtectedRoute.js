import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // 현재 위치(경로) 정보를 가져옴
  const location = useLocation();
  
  // sessionStorage에서 ZK Proof 검증 상태를 확인
  // 'true' 문자열과 정확히 일치하는지 확인
  const isVerified = sessionStorage.getItem('zkProofVerified') === 'true';

  // 검증되지 않은 경우
  if (!isVerified) {
    // /verify 페이지로 리다이렉트하면서
    // 원래 가려고 했던 페이지 정보(location.pathname)를 state로 전달
    return <Navigate to="/verify" state={{ from: location.pathname }} />;
  }

  // 검증된 경우 protected 컴포넌트 렌더링
  return children;
}

export default ProtectedRoute; 