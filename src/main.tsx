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
import HomePage from './pages/app/Home';
import AppLayout from './layouts/AppLayout';
import PrivateRoute from './guards/PrivateRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* Redirect root to login */}
      <Route index element={<Navigate to='/auth/login' replace />} />

      {/* Public routes */}
      <Route element={<AuthLayout />}>
        <Route element={<PublicRoute />}>
          <Route path='/auth/login' element={<LoginPage />} />
        </Route>
      </Route>

      {/* PROTECTED ROUTES (with sidebar) */}
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route path='/app/home' element={<HomePage />} />
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
