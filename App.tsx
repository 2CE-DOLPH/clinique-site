import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AppointmentProvider } from './contexts/AppointmentContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import ServicesPage from './components/pages/ServicesPage';
import DoctorsPage from './components/pages/DoctorsPage';
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';
import AppointmentPage from './components/pages/AppointmentPage';
import AuthPage from './components/pages/AuthPage';
import PatientDashboard from './components/pages/PatientDashboard';

type PageType = 'home' | 'services' | 'doctors' | 'about' | 'contact' | 'appointment' | 'login' | 'register' | 'patient-dashboard' | 'appointments' | 'medical-records';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const handleNavigation = (page: string) => {
    setCurrentPage(page as PageType);
    window.scrollTo(0, 0);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigation} />;
      case 'doctors':
        return <DoctorsPage onNavigate={handleNavigation} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigation} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigation} />;
      case 'appointment':
        return <AppointmentPage onNavigate={handleNavigation} />;
      case 'login':
        return <AuthPage mode="login" onNavigate={handleNavigation} />;
      case 'register':
        return <AuthPage mode="register" onNavigate={handleNavigation} />;
      case 'patient-dashboard':
      case 'appointments':
      case 'medical-records':
        return <PatientDashboard onNavigate={handleNavigation} />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <AuthProvider>
      <AppointmentProvider>
        <div className="min-h-screen bg-white">
          <Header currentPage={currentPage} onNavigate={handleNavigation} />
          <main>
            {renderCurrentPage()}
          </main>
          <Footer />
        </div>
      </AppointmentProvider>
    </AuthProvider>
  );
}

export default App;