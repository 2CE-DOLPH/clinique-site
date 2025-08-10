import React from 'react';
import { ArrowLeft, Calendar, Phone, Mail, Languages, Award } from 'lucide-react';
import { doctors } from '../../data/doctors';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface DoctorsPageProps {
  onNavigate: (page: string) => void;
}

const DoctorsPage: React.FC<DoctorsPageProps> = ({ onNavigate }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-GN', {
      style: 'currency',
      currency: 'GNF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getDayName = (dayOfWeek: number) => {
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    return days[dayOfWeek];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour à l'accueil
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Notre Équipe Médicale
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Rencontrez nos médecins qualifiés et expérimentés, dédiés à votre bien-être 
            et à la qualité des soins.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {doctors.map(doctor => (
            <Card key={doctor.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img
                    src={doctor.photo}
                    alt={`${doctor.firstName} ${doctor.lastName}`}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {doctor.firstName} {doctor.lastName}
                      </h3>
                      <p className="text-emerald-600 font-medium">
                        {doctor.specialty}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {doctor.title}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {formatPrice(doctor.consultationFee)}
                      </div>
                      <div className="text-sm text-gray-500">
                        par consultation
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm">
                    {doctor.bio}
                  </p>

                  {/* Languages */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Languages className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Langues parlées:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map((language, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Disponibilités:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {doctor.availability.map((avail, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                        >
                          {getDayName(avail.dayOfWeek)} {avail.startTime}-{avail.endTime}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Qualifications */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Qualifications:</span>
                    </div>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {doctor.qualifications.map((qualification, index) => (
                        <li key={index}>• {qualification}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => onNavigate('appointment')}
                      size="sm"
                      className="flex-1"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Prendre RDV
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="p-2"
                        title="Appeler"
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="p-2"
                        title="Envoyer un email"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Information Section */}
        <div className="mt-16 bg-white rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Informations sur les Consultations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Prise de Rendez-vous
              </h3>
              <p className="text-gray-600 text-sm">
                Réservez en ligne 24h/24 ou appelez-nous pendant les heures d'ouverture
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Contact Direct
              </h3>
              <p className="text-gray-600 text-sm">
                Contactez directement nos médecins pour des questions urgentes
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Languages className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Communication
              </h3>
              <p className="text-gray-600 text-sm">
                Nos médecins parlent français et les langues locales principales
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Prêt à consulter un spécialiste ?
            </h2>
            <p className="text-emerald-100 mb-6">
              Choisissez le médecin qui correspond à vos besoins et prenez rendez-vous
            </p>
            <Button
              size="lg"
              onClick={() => onNavigate('appointment')}
              className="bg-white text-emerald-600 hover:bg-gray-100"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Prendre Rendez-vous
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;