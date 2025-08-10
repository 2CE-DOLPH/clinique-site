import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, DollarSign } from 'lucide-react';
import { services } from '../../data/services';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Tous les services' },
    { id: 'consultation', name: 'Consultations' },
    { id: 'diagnostic', name: 'Diagnostics' },
    { id: 'prevention', name: 'Prévention' },
    { id: 'treatment', name: 'Traitements' },
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const getIconComponent = (iconName: string) => {
    // This would normally import the actual icons
    return <div className="w-8 h-8 bg-emerald-100 rounded-full" />;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-GN', {
      style: 'currency',
      currency: 'GNF',
      minimumFractionDigits: 0,
    }).format(price);
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
            Nos Services Médicaux
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre gamme complète de services médicaux avec des tarifs transparents 
            et une équipe de professionnels qualifiés.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'primary' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              size="sm"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <Card key={service.id} hoverable className="h-full flex flex-col">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  {getIconComponent(service.icon)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {service.name}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{formatPrice(service.price)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 flex-1">
                {service.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-emerald-600">
                  {formatPrice(service.price)}
                </div>
                <Button
                  onClick={() => onNavigate('appointment')}
                  disabled={!service.available}
                  size="sm"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {service.available ? 'Réserver' : 'Indisponible'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun service trouvé
            </h3>
            <p className="text-gray-600">
              Aucun service ne correspond à cette catégorie pour le moment.
            </p>
          </div>
        )}

        {/* Information Section */}
        <div className="mt-16 bg-white rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Informations Importantes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Modalités de Paiement
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Paiement en espèces</li>
                <li>• Mobile Money (Orange Money, MTN Money)</li>
                <li>• Cartes bancaires acceptées</li>
                <li>• Paiement échelonné possible (sur demande)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                À Savoir
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Consultation sur rendez-vous uniquement</li>
                <li>• Arriver 15 minutes avant l'heure</li>
                <li>• Apporter vos anciens examens</li>
                <li>• Annulation gratuite 24h avant</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Besoin d'une consultation ?
            </h2>
            <p className="text-emerald-100 mb-6">
              Prenez rendez-vous dès maintenant avec l'un de nos spécialistes
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

export default ServicesPage;