import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Patient } from '../types';

interface AuthContextType {
  user: User | null;
  patient: Patient | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  gender: 'M' | 'F';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulation d'une connexion
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        email,
        role: 'patient',
        firstName: 'Aminata',
        lastName: 'Diallo',
        phone: '+224 622 123 456',
        isActive: true,
        createdAt: new Date().toISOString()
      };

      const mockPatient: Patient = {
        id: '1',
        firstName: 'Aminata',
        lastName: 'Diallo',
        email,
        phone: '+224 622 123 456',
        dateOfBirth: '1990-05-15',
        gender: 'F',
        address: 'Quartier Kaloum, Conakry',
        emergencyContact: {
          name: 'Ibrahim Diallo',
          phone: '+224 622 654 321',
          relationship: 'Époux'
        },
        medicalHistory: [],
        appointments: [],
        documents: [],
        createdAt: new Date().toISOString()
      };
      
      setUser(mockUser);
      setPatient(mockPatient);
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulation d'une inscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        role: 'patient',
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        isActive: true,
        createdAt: new Date().toISOString()
      };

      const mockPatient: Patient = {
        id: Date.now().toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        dateOfBirth: userData.dateOfBirth,
        gender: userData.gender,
        address: '',
        emergencyContact: {
          name: '',
          phone: '',
          relationship: ''
        },
        medicalHistory: [],
        appointments: [],
        documents: [],
        createdAt: new Date().toISOString()
      };
      
      setUser(mockUser);
      setPatient(mockPatient);
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setPatient(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      patient,
      login,
      register,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};