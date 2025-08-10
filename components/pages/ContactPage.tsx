import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  ArrowLeft,
  Send,
  CheckCircle
} from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <Card>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Message envoyé !
            </h2>
            <p className="text-gray-600 mb-6">
              Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
            </p>
            <div className="space-y-3">
              <Button onClick={() => onNavigate('home')} fullWidth>
                Retour à l'accueil
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSubmitted(false)} 
                fullWidth
              >
                Envoyer un autre message
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

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

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contactez-nous
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une question, un problème ou besoin d'informations ? Notre équipe est là pour vous aider.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Téléphone</h3>
                    <p className="text-sm text-gray-600">+224 622 123 456</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Disponible 24h/24 pour les urgences
                </p>
              </Card>

              <Card>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                    <p className="text-sm text-gray-600">+224 622 123 456</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Messagerie instantanée disponible
                </p>
              </Card>

              <Card>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-sm text-gray-600">contact@cliniquesante.gn</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Réponse sous 24h
                </p>
              </Card>

              <Card>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Adresse</h3>
                    <p className="text-sm text-gray-600">
                      Avenue de la République<br />
                      Kaloum, Conakry, Guinée
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Horaires</h3>
                    <div className="text-sm text-gray-600">
                      <p>Lun - Ven: 7h00 - 19h00</p>
                      <p>Sam: 8h00 - 16h00</p>
                      <p>Dim: Urgences uniquement</p>
                      <p className="text-emerald-600 mt-1 font-medium">Urgences 24h/24</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Envoyez-nous un message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Nom complet *"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Votre nom complet"
                    />
                    <Input
                      label="Email *"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="votre@email.com"
                    />
                  </div>

                  <Input
                    label="Téléphone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+224 622 123 456"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type de demande *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="general">Question générale</option>
                      <option value="appointment">Prise de rendez-vous</option>
                      <option value="emergency">Urgence médicale</option>
                      <option value="complaint">Réclamation</option>
                      <option value="feedback">Suggestion/Avis</option>
                    </select>
                  </div>

                  <Input
                    label="Sujet *"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Résumé de votre demande"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Décrivez votre demande en détail..."
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-vertical"
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      className="mt-1"
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-600">
                      J'accepte que mes données soient utilisées pour traiter ma demande. 
                      Voir notre <button type="button" className="text-emerald-600 hover:underline">politique de confidentialité</button>.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    fullWidth
                    size="lg"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Envoyer le message
                  </Button>
                </form>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <Card padding="none">
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Carte interactive</p>
                  <p className="text-sm">Avenue de la République, Kaloum, Conakry</p>
                </div>
              </div>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Questions fréquentes
              </h2>
              <p className="text-gray-600">
                Trouvez rapidement la réponse à vos questions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Comment prendre rendez-vous ?
                </h3>
                <p className="text-sm text-gray-600">
                  Vous pouvez prendre rendez-vous en ligne 24h/24, par téléphone pendant 
                  nos heures d'ouverture, ou via WhatsApp.
                </p>
              </Card>

              <Card>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Quels sont les moyens de paiement acceptés ?
                </h3>
                <p className="text-sm text-gray-600">
                  Nous acceptons les espèces, Mobile Money (Orange Money, MTN Money), 
                  et les cartes bancaires.
                </p>
              </Card>

              <Card>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Puis-je annuler mon rendez-vous ?
                </h3>
                <p className="text-sm text-gray-600">
                  Oui, vous pouvez annuler gratuitement jusqu'à 24h avant votre rendez-vous 
                  via votre espace patient ou en nous contactant.
                </p>
              </Card>

              <Card>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Comment accéder à mes résultats ?
                </h3>
                <p className="text-sm text-gray-600">
                  Vos résultats sont disponibles dans votre espace patient sécurisé. 
                  Vous recevrez une notification dès qu'ils sont prêts.
                </p>
              </Card>

              <Card>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Que faire en cas d'urgence ?
                </h3>
                <p className="text-sm text-gray-600">
                  En cas d'urgence, appelez immédiatement le +224 622 123 456 ou 
                  rendez-vous directement à la clinique.
                </p>
              </Card>

              <Card>
                <h3 className="font-semibold text-gray-900 mb-2">
                  La téléconsultation est-elle disponible ?
                </h3>
                <p className="text-sm text-gray-600">
                  Oui, nous proposons des téléconsultations pour certains types de 
                  consultations. Contactez-nous pour plus d'informations.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;