import React, { useState } from 'react';
import { 
  Calendar, 
  FileText, 
  User, 
  Clock, 
  Download,
  Eye,
  Phone,
  MessageCircle,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface PatientDashboardProps {
  onNavigate: (page: string) => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ onNavigate }) => {
  const { user, patient } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'documents' | 'profile'>('overview');

  if (!user || !patient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Accès non autorisé
          </h2>
          <p className="text-gray-600 mb-4">
            Vous devez être connecté pour accéder à cette page.
          </p>
          <Button onClick={() => onNavigate('login')}>
            Se connecter
          </Button>
        </Card>
      </div>
    );
  }

  // Mock data for demonstration
  const upcomingAppointments = [
    {
      id: '1',
      date: '2025-01-20',
      time: '10:00',
      doctor: 'Dr. Mamadou Diallo',
      specialty: 'Médecine Générale',
      status: 'confirmed'
    },
    {
      id: '2',
      date: '2025-01-25',
      time: '14:30',
      doctor: 'Dr. Fatoumata Camara',
      specialty: 'Pédiatrie',
      status: 'scheduled'
    }
  ];

  const recentDocuments = [
    {
      id: '1',
      title: 'Résultats d\'analyses sanguines',
      date: '2025-01-10',
      type: 'lab-result',
      doctor: 'Dr. Mamadou Diallo'
    },
    {
      id: '2',
      title: 'Ordonnance - Consultation du 05/01',
      date: '2025-01-05',
      type: 'prescription',
      doctor: 'Dr. Mamadou Diallo'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: User },
    { id: 'appointments', label: 'Rendez-vous', icon: Calendar },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => onNavigate('home')}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour à l'accueil
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Bonjour, {patient.firstName} !
              </h1>
              <p className="text-gray-600">
                Bienvenue dans votre espace patient
              </p>
            </div>
          </div>
          <Button onClick={() => onNavigate('appointment')}>
            <Calendar className="h-5 w-5 mr-2" />
            Nouveau RDV
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${activeTab === tab.id
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Stats */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">2</div>
                  <div className="text-sm text-gray-600">RDV à venir</div>
                </Card>
                <Card className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">5</div>
                  <div className="text-sm text-gray-600">Documents</div>
                </Card>
                <Card className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">12</div>
                  <div className="text-sm text-gray-600">Consultations</div>
                </Card>
              </div>

              {/* Upcoming Appointments */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Prochains rendez-vous
                  </h2>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('appointments')}>
                    Voir tout
                  </Button>
                </div>
                <div className="space-y-4">
                  {upcomingAppointments.map(appointment => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {appointment.doctor}
                          </div>
                          <div className="text-sm text-gray-600">
                            {appointment.specialty}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(appointment.date).toLocaleDateString('fr-FR')} à {appointment.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`
                          px-2 py-1 text-xs rounded-full
                          ${appointment.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                          }
                        `}>
                          {appointment.status === 'confirmed' ? 'Confirmé' : 'Programmé'}
                        </span>
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recent Documents */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Documents récents
                  </h2>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('documents')}>
                    Voir tout
                  </Button>
                </div>
                <div className="space-y-3">
                  {recentDocuments.map(document => (
                    <div key={document.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-sm">
                            {document.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {document.doctor} • {new Date(document.date).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Actions rapides
                </h3>
                <div className="space-y-3">
                  <Button fullWidth onClick={() => onNavigate('appointment')}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Prendre RDV
                  </Button>
                  <Button variant="outline" fullWidth>
                    <Phone className="h-4 w-4 mr-2" />
                    Appeler la clinique
                  </Button>
                  <Button variant="outline" fullWidth>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </Card>

              {/* Contact Info */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact d'urgence
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-emerald-600" />
                    <span>+224 622 123 456</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4 text-emerald-600" />
                    <span>WhatsApp 24h/24</span>
                  </div>
                  <p className="text-gray-600 text-xs mt-3">
                    En cas d'urgence médicale, appelez immédiatement ou rendez-vous à la clinique.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Mes rendez-vous
            </h2>
            <div className="space-y-4">
              {upcomingAppointments.map(appointment => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-8 w-8 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {appointment.doctor}
                        </h3>
                        <p className="text-gray-600">{appointment.specialty}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(appointment.date).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })} à {appointment.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`
                        px-3 py-1 text-sm rounded-full
                        ${appointment.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                        }
                      `}>
                        {appointment.status === 'confirmed' ? 'Confirmé' : 'Programmé'}
                      </span>
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm">
                        Annuler
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'documents' && (
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Mes documents médicaux
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentDocuments.map(document => (
                <div key={document.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {document.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {new Date(document.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {document.doctor}
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" fullWidth>
                      <Eye className="h-4 w-4 mr-1" />
                      Voir
                    </Button>
                    <Button variant="outline" size="sm" fullWidth>
                      <Download className="h-4 w-4 mr-1" />
                      Télécharger
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Informations personnelles
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom
                    </label>
                    <div className="text-gray-900">{patient.firstName}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <div className="text-gray-900">{patient.lastName}</div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="text-gray-900">{patient.email}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <div className="text-gray-900">{patient.phone}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date de naissance
                    </label>
                    <div className="text-gray-900">
                      {new Date(patient.dateOfBirth).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sexe
                    </label>
                    <div className="text-gray-900">
                      {patient.gender === 'F' ? 'Féminin' : 'Masculin'}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse
                  </label>
                  <div className="text-gray-900">{patient.address || 'Non renseignée'}</div>
                </div>
                <Button variant="outline">
                  Modifier mes informations
                </Button>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Contact d'urgence
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <div className="text-gray-900">
                    {patient.emergencyContact.name || 'Non renseigné'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <div className="text-gray-900">
                    {patient.emergencyContact.phone || 'Non renseigné'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Relation
                  </label>
                  <div className="text-gray-900">
                    {patient.emergencyContact.relationship || 'Non renseignée'}
                  </div>
                </div>
                <Button variant="outline">
                  Modifier le contact d'urgence
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;