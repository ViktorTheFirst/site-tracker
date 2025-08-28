import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import App from './App';
import AuthLayout from './layouts/AuthLayout';
import PublicRoute from './guards/PublicRoute';
import LoginPage from './pages/auth/LoginPage';
import NotFoundPage from './pages/app/NotFoundPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* Redericer root to login */}
      <Route path='/' element={<Navigate to='/auth/login' replace />} />

      {/* Public routes */}
      <Route element={<AuthLayout />}>
        <Route element={<PublicRoute />}>
          <Route path='/auth/login' element={<LoginPage />} />
        </Route>
      </Route>

      {/* 404 not found */}
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
