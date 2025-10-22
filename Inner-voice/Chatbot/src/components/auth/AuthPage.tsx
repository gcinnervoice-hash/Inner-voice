import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from './Login';
import { Register } from './Register';
import { useAuth } from '../../contexts/AuthContext';

interface AuthPageProps {
  defaultView?: 'login' | 'register';
}

export const AuthPage: React.FC<AuthPageProps> = ({
  defaultView = 'login'
}) => {
  const [currentView, setCurrentView] = useState<'login' | 'register'>(defaultView);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect to /app if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  const handleSwitchToRegister = () => {
    setCurrentView('register');
  };

  const handleAuthSuccess = () => {
    // Navigate to app after successful authentication
    navigate('/app', { replace: true });
  };

  return (
    <>
      {currentView === 'login' ? (
        <Login
          onSwitchToRegister={handleSwitchToRegister}
          onLoginSuccess={handleAuthSuccess}
        />
      ) : (
        <Register
          onSwitchToLogin={handleSwitchToLogin}
          onRegisterSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
};
