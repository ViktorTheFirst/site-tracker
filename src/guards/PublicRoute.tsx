import { Navigate, Outlet } from 'react-router-dom';

import useUserStore from '@/store/userSlice';

const PublicRoute = () => {
  const user = useUserStore((state) => state.user);

  if (!user) return <Outlet />;
  return <Navigate to='/app/home' replace />;
};

export default PublicRoute;
