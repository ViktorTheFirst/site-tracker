import useUserStore from '@/store/userSlice';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const user = useUserStore((state) => state.user);

  if (!user) return <Navigate to='/auth/login' replace />;

  return <Outlet />;
};

export default PrivateRoute;
