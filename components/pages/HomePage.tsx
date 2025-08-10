import React from 'react';
import { Calendar, Shield, Clock, Users, ArrowRight, Phone, MessageCircle, Star } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Calendar,
      title: 'Prise de RDV en ligne',
      description: 'Réservez votre consultation 24h/24 en quelques clics',
    },
    {
      icon: Shield,
      title: 'Espace Patient Sécurisé',
      description: 'Accédez à vos résultats et documents médicaux en toute sécurité',
    },
    {
      icon: Clock,
      title: 'Urgences 24h/24',
      description: 'Service d\'urgence disponible jour et nuit',
    },
    {
      icon: Users,
      title: 'Équipe Expérimentée',
      description: 'Médecins qualifiés et personnel soignant dévoué',
    },
  ];

  const services = [
    {
      name: 'Médecine Générale',
      description: 'Consultations et suivi médical général',
      price: '150 000 GNF',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
    },
    {
      name: 'Pédiatrie',
      description: 'Soins spécialisés pour enfants et adolescents',
      price: '200 000 GNF',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
    },
    {
      name: 'Cardiologie',
      description: 'Diagnostic et traitement des maladies cardiaques',
      price: '300 000 GNF',
      image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg',
    },
  ];

  const testimonials = [
    {
      name: 'Aminata Diallo',
      text: 'Excellent service ! J\'ai pu prendre rendez-vous facilement et l\'équipe est très professionnelle.',
      rating: 5,
    },
    {
      name: 'Alpha Condé',
      text: 'La prise en charge est rapide et les médecins sont à l\'écoute. Je recommande vivement.',
      rating: 5,
    },
    {
      name: 'Fatoumata Barry',
      text: 'Clinique moderne avec des équipements de qualité. Très satisfaite des soins reçus.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Votre santé,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                  {' '}notre priorité
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Clinique moderne au cœur de Conakry. Prenez rendez-vous en ligne, 
                consultez vos résultats et bénéficiez de soins de qualité avec notre équipe médicale expérimentée.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="xl"
                  onClick={() => onNavigate('appointment')}
                  className="group"
                >
                  <Calendar className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Prendre Rendez-vous
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  onClick={() => onNavigate('services')}
                >
                  Nos Services
                </Button>
              </div>
              
              {/* Quick Contact */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium">+224 622 123 456</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MessageCircle className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium">WhatsApp disponible</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg"
                alt="Clinique moderne"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-gray-900">500+</div>
                    <div className="text-sm text-gray-600">Patients satisfaits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir notre clinique ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une approche moderne de la santé avec des services digitaux 
              et une équipe médicale de qualité.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center group" hoverable>
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Services Principaux
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des soins de qualité dans différentes spécialités médicales
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden group" hoverable padding="none">
                <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-emerald-600">
                      {service.price}
                    </span>
                    <Button 
                      size="sm"
                      onClick={() => onNavigate('appointment')}
                    >
                      Réserver
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('services')}
            >
              Voir tous nos services
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos patients
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Témoignages de patients satisfaits de nos services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="font-semibold text-gray-900">
                  {testimonial.name}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à prendre soin de votre santé ?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Prenez rendez-vous dès maintenant ou contactez-nous pour plus d'informations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="xl"
              onClick={() => onNavigate('appointment')}
              className="bg-white text-emerald-600 hover:bg-gray-100 focus:ring-white group"
            >
              <Calendar className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
              Prendre Rendez-vous
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={() => onNavigate('contact')}
              className="border-white text-white hover:bg-white hover:text-emerald-600"
            >
              Nous Contacter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;