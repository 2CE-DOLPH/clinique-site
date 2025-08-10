import React from 'react';
import { ArrowLeft, Heart, Shield, Users, Award, Clock, MapPin } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'Nous traitons chaque patient avec empathie et bienveillance'
    },
    {
      icon: Shield,
      title: 'Sécurité',
      description: 'Protocoles stricts pour garantir la sécurité de nos patients'
    },
    {
      icon: Users,
      title: 'Équipe',
      description: 'Une équipe médicale qualifiée et dévouée à votre service'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans tous nos services médicaux'
    }
  ];

  const stats = [
    { number: '500+', label: 'Patients satisfaits' },
    { number: '15+', label: 'Années d\'expérience' },
    { number: '10+', label: 'Spécialités médicales' },
    { number: '24/7', label: 'Service d\'urgence' }
  ];

  const timeline = [
    {
      year: '2010',
      title: 'Fondation de la clinique',
      description: 'Ouverture de notre première clinique à Conakry avec une équipe de 5 médecins'
    },
    {
      year: '2015',
      title: 'Extension des services',
      description: 'Ajout de nouvelles spécialités et modernisation des équipements médicaux'
    },
    {
      year: '2020',
      title: 'Digitalisation',
      description: 'Lancement de notre plateforme en ligne pour la prise de rendez-vous'
    },
    {
      year: '2025',
      title: 'Innovation continue',
      description: 'Intégration de nouvelles technologies pour améliorer les soins'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour à l'accueil
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            À Propos de Clinique Santé+
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Depuis plus de 15 ans, nous nous engageons à fournir des soins de santé 
            de qualité supérieure à la communauté de Conakry et ses environs.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <img
              src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg"
              alt="Clinique moderne"
              className="rounded-xl shadow-lg w-full h-64 object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Notre Mission
            </h2>
            <p className="text-gray-600 mb-6">
              Fournir des soins de santé accessibles, de qualité et centrés sur le patient. 
              Nous nous efforçons d'améliorer la santé et le bien-être de notre communauté 
              grâce à des services médicaux excellents et une approche humaine.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                <span className="text-gray-700">Soins de qualité supérieure</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                <span className="text-gray-700">Équipe médicale expérimentée</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                <span className="text-gray-700">Technologies modernes</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                <span className="text-gray-700">Approche personnalisée</span>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre pratique médicale au quotidien
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center" hoverable>
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-emerald-600 rounded-xl p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-emerald-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Notre Histoire
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un parcours d'innovation et d'engagement au service de la santé
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-emerald-200"></div>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-emerald-600 rounded-full border-4 border-white shadow"></div>
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                  }`}>
                    <Card>
                      <div className="text-emerald-600 font-bold text-lg mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Notre Emplacement
            </h2>
            <p className="text-gray-600 mb-6">
              Située au cœur de Conakry, notre clinique est facilement accessible 
              et dispose d'un parking pour nos patients.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-emerald-600" />
                <span className="text-gray-700">Avenue de la République, Kaloum, Conakry</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-emerald-600" />
                <span className="text-gray-700">Ouvert 7j/7 - Urgences 24h/24</span>
              </div>
            </div>
            <div className="mt-6">
              <Button onClick={() => onNavigate('contact')}>
                Nous contacter
              </Button>
            </div>
          </div>
          <div>
            <Card padding="none">
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Carte interactive</p>
                  <p className="text-sm">Avenue de la République, Kaloum</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Prêt à prendre soin de votre santé ?
            </h2>
            <p className="text-emerald-100 mb-6">
              Rejoignez les centaines de patients qui nous font confiance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => onNavigate('appointment')}
                className="bg-white text-emerald-600 hover:bg-gray-100"
              >
                Prendre Rendez-vous
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate('services')}
                className="border-white text-white hover:bg-white hover:text-emerald-600"
              >
                Voir nos services
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;