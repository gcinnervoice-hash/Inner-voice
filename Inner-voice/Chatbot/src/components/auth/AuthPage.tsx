import React, { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';

interface AuthPageProps {
  onAuthSuccess?: () => void;
  defaultView?: 'login' | 'register';
}

export const AuthPage: React.FC<AuthPageProps> = ({
  onAuthSuccess,
  defaultView = 'login'
}) => {
  const [currentView, setCurrentView] = useState<'login' | 'register'>(defaultView);

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  const handleSwitchToRegister = () => {
    setCurrentView('register');
  };

  return (
    <>
      {currentView === 'login' ? (
        <Login
          onSwitchToRegister={handleSwitchToRegister}
          onLoginSuccess={onAuthSuccess}
        />
      ) : (
        <Register
          onSwitchToLogin={handleSwitchToLogin}
          onRegisterSuccess={onAuthSuccess}
        />
      )}
    </>
  );
};
