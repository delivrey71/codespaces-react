import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { OrdersScreen } from './components/OrdersScreen';
import { TrackingScreen } from './components/TrackingScreen';
import { SupportScreen } from './components/SupportScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { AppProvider } from './components/AppContext';
import { Toaster } from './components/ui/sonner';
import './styles/globals.css';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('welcome');
  };

  const handleSkip = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onLogin={() => setCurrentScreen('login')}
            onRegister={() => setCurrentScreen('register')}
            onSkip={handleSkip}
          />
        );
      case 'login':
        return (
          <LoginScreen
            onLogin={handleLogin}
            onRegister={() => setCurrentScreen('register')}
            onBack={() => setCurrentScreen('welcome')}
          />
        );
      case 'register':
        return (
          <RegisterScreen
            onRegister={handleLogin}
            onLogin={() => setCurrentScreen('login')}
            onBack={() => setCurrentScreen('welcome')}
          />
        );
      case 'dashboard':
        return <DashboardScreen onNavigate={setCurrentScreen} />;
      case 'orders':
        return <OrdersScreen onNavigate={setCurrentScreen} />;
      case 'tracking':
        return <TrackingScreen onNavigate={setCurrentScreen} />;
      case 'support':
        return <SupportScreen onNavigate={setCurrentScreen} />;
      default:
        return null;
    }
  };

  return (
    <AppProvider>
      <div className="app-container">
        {renderScreen()}
        {isLoggedIn && (
          <BottomNavigation
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
            onLogout={handleLogout}
          />
        )}
        <Toaster />
      </div>
    </AppProvider>
  );
}
