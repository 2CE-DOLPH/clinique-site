import React from 'react';
import { Heart, Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-xl">Clinique Santé+</div>
                <div className="text-sm text-gray-400">Votre santé, notre priorité</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Une clinique moderne au cœur de Conakry, offrant des soins de qualité 
              avec une équipe médicale expérimentée et des équipements de pointe.
            </p>
            <div className="flex space-x-4">
              <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </button>
              <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Nos Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button className="hover:text-white transition-colors">
                  Médecine Générale
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  Pédiatrie
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  Cardiologie
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  Gynécologie
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  Analyses Médicales
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  Échographie
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span className="text-sm">
                  Avenue de la République<br />
                  Kaloum, Conakry, Guinée
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span>+224 622 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-emerald-400" />
                <span>contact@cliniquesante.gn</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-4 w-4 text-emerald-400 mt-0.5" />
                <div className="text-sm">
                  <p>Lun - Ven: 7h00 - 19h00</p>
                  <p>Sam: 8h00 - 16h00</p>
                  <p>Dim: Urgences uniquement</p>
                  <p className="text-emerald-400 mt-1">Urgences 24h/24</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Clinique Santé+. Tous droits réservés.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <button className="hover:text-white transition-colors">
                Mentions légales
              </button>
              <button className="hover:text-white transition-colors">
                Politique de confidentialité
              </button>
              <button className="hover:text-white transition-colors">
                Conditions d'utilisation
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;