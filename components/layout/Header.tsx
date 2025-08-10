import React, { useState } from 'react';
import { 
  Calendar, 
  User, 
  Menu, 
  X, 
  Heart,
  Phone,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navigationItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'services', label: 'Services' },
    { id: 'doctors', label: 'Équipe Médicale' },
    { id: 'about', label: 'À Propos' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      {/* Top Bar */}
      <div className="bg-emerald-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+224 622 123 456</span>
              </div>
              <div className="hidden sm:flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Urgences 24h/24</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="hover:text-emerald-200 transition-colors">
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-xl text-gray-900">
                Clinique Santé+
              </div>
              <div className="text-xs text-gray-500 hidden sm:block">
                Votre santé, notre priorité
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                  currentPage === item.id
                    ? 'text-emerald-600 border-b-2 border-emerald-600 pb-4'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Appointment Button */}
            <Button
              onClick={() => onNavigate('appointment')}
              size="sm"
              className="hidden sm:flex"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Prendre RDV
            </Button>

            {/* User Account */}
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="h-5 w-5" />
                {user && (
                  <span className="hidden sm:block text-sm font-medium">
                    {user.firstName}
                  </span>
                )}
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                {user ? (
                  <div className="py-2">
                    <button
                      onClick={() => onNavigate('patient-dashboard')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mon Espace Patient
                    </button>
                    <button
                      onClick={() => onNavigate('appointments')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mes Rendez-vous
                    </button>
                    <button
                      onClick={() => onNavigate('medical-records')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mes Documents
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Déconnexion
                    </button>
                  </div>
                ) : (
                  <div className="py-2">
                    <button
                      onClick={() => onNavigate('login')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Connexion
                    </button>
                    <button
                      onClick={() => onNavigate('register')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Inscription
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="py-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <Button
                  onClick={() => {
                    onNavigate('appointment');
                    setIsMenuOpen(false);
                  }}
                  fullWidth
                  size="lg"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Prendre Rendez-vous
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;