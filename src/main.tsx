import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import App from './App';
import AuthLayout from './layouts/AuthLayout';
import PublicRoute from './guards/PublicRoute';
import LoginPage from './pages/auth/LoginPage';
import NotFoundPage from './pages/app/NotFoundPage';
import HomePage from './pages/app/HomePage/HomePage';
import AppLayout from './layouts/AppLayout';
import PrivateRoute from './guards/PrivateRoute';
import AddSitePage from './pages/app/AddSite';
import EditSitePage from './pages/app/EditSite';

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
          <Route path='/app/add-site' element={<AddSitePage />} />
          <Route path='/app/edit-site' element={<EditSitePage />} />
          <Route path='/app/edit-site/:id' element={<EditSitePage />} />
        </Route>
      </Route>

      {/* 404 not found */}
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
    },
    mutations: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-right' />
    </QueryClientProvider>
  </StrictMode>
);
