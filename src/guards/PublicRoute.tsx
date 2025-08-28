import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const userInfo = null;

  if (!userInfo) return <Outlet />;
  return <Navigate to='/app/dashboard' replace />;
};

export default PublicRoute;
