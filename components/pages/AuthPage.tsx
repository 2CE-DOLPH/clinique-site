import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Heart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface AuthPageProps {
  mode: 'login' | 'register';
  onNavigate: (page: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ mode, onNavigate }) => {
  const { login, register, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    gender: 'F' as 'M' | 'F',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (mode === 'register') {
      if (!formData.firstName) {
        newErrors.firstName = 'Le prénom est requis';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Le nom est requis';
      }
      if (!formData.phone) {
        newErrors.phone = 'Le numéro de téléphone est requis';
      } else if (!/^\+224\s?\d{2}\s?\d{3}\s?\d{3}$/.test(formData.phone)) {
        newErrors.phone = 'Format: +224 XX XXX XXX';
      }
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'La date de naissance est requise';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      let success = false;
      
      if (mode === 'login') {
        success = await login(formData.email, formData.password);
      } else {
        success = await register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender
        });
      }

      if (success) {
        onNavigate('patient-dashboard');
      } else {
        setErrors({
          general: mode === 'login' 
            ? 'Email ou mot de passe incorrect'
            : 'Erreur lors de l\'inscription'
        });
      }
    } catch (error) {
      setErrors({
        general: 'Une erreur est survenue. Veuillez réessayer.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour à l'accueil
          </Button>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="font-bold text-2xl text-gray-900">
                Clinique Santé+
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {mode === 'login' ? 'Connexion' : 'Inscription'}
            </h1>
            <p className="text-gray-600">
              {mode === 'login' 
                ? 'Accédez à votre espace patient'
                : 'Créez votre compte patient'
              }
            </p>
          </div>
        </div>

        {/* Form */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                {errors.general}
              </div>
            )}

            {mode === 'register' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Prénom *"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                    placeholder="Aminata"
                  />
                  <Input
                    label="Nom *"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                    placeholder="Diallo"
                  />
                </div>

                <Input
                  label="Téléphone *"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                  placeholder="+224 622 123 456"
                  helperText="Format: +224 XX XXX XXX"
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Date de naissance *"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    error={errors.dateOfBirth}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sexe *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="F">Féminin</option>
                      <option value="M">Masculin</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <Input
              label="Email *"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              placeholder="votre@email.com"
            />

            <div className="relative">
              <Input
                label="Mot de passe *"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {mode === 'register' && (
              <Input
                label="Confirmer le mot de passe *"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
                placeholder="••••••••"
              />
            )}

            {mode === 'register' && (
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  J'accepte les{' '}
                  <button type="button" className="text-emerald-600 hover:underline">
                    conditions générales d'utilisation
                  </button>{' '}
                  et la{' '}
                  <button type="button" className="text-emerald-600 hover:underline">
                    politique de confidentialité
                  </button>
                </label>
              </div>
            )}

            <Button
              type="submit"
              isLoading={isLoading}
              fullWidth
              size="lg"
            >
              {mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {mode === 'login' ? (
                <>
                  Pas encore de compte ?{' '}
                  <button
                    onClick={() => onNavigate('register')}
                    className="text-emerald-600 hover:underline font-medium"
                  >
                    Créer un compte
                  </button>
                </>
              ) : (
                <>
                  Déjà un compte ?{' '}
                  <button
                    onClick={() => onNavigate('login')}
                    className="text-emerald-600 hover:underline font-medium"
                  >
                    Se connecter
                  </button>
                </>
              )}
            </p>

            {mode === 'login' && (
              <button className="mt-2 text-sm text-emerald-600 hover:underline">
                Mot de passe oublié ?
              </button>
            )}
          </div>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Vos données médicales sont protégées et sécurisées selon les normes en vigueur
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;