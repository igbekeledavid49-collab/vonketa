import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('@/pages/HomePage'));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'));
const DashboardLayout = lazy(() => import('@/pages/dashboard/DashboardLayout'));
const DashboardHome = lazy(() => import('@/pages/dashboard/DashboardHome'));
const ProjectsPage = lazy(() => import('@/pages/dashboard/ProjectsPage'));
const SettingsPage = lazy(() => import('@/pages/dashboard/SettingsPage'));

function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: withSuspense(HomePage),
    },
    {
      path: '/login',
      element: withSuspense(LoginPage),
    },
    {
      path: '/register',
      element: withSuspense(RegisterPage),
    },
    {
      path: '/forgot-password',
      element: withSuspense(ForgotPasswordPage),
    },
    {
      path: '/dashboard',
      element: withSuspense(DashboardLayout),
      children: [
        { index: true, element: withSuspense(DashboardHome) },
        { path: 'projects', element: withSuspense(ProjectsPage) },
        { path: 'settings', element: withSuspense(SettingsPage) },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);
