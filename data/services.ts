import { Service } from '../types';

export const services: Service[] = [
  {
    id: 'consultation-generale',
    name: 'Consultation Générale',
    description: 'Consultation médicale générale pour diagnostic et suivi de santé',
    icon: 'stethoscope',
    price: 150000,
    duration: 30,
    category: 'consultation',
    available: true
  },
  {
    id: 'consultation-pediatrie',
    name: 'Consultation Pédiatrique',
    description: 'Consultation spécialisée pour enfants et adolescents',
    icon: 'baby',
    price: 200000,
    duration: 45,
    category: 'consultation',
    available: true
  },
  {
    id: 'consultation-cardiologie',
    name: 'Consultation Cardiologique',
    description: 'Consultation spécialisée pour les problèmes cardiovasculaires',
    icon: 'heart',
    price: 300000,
    duration: 60,
    category: 'consultation',
    available: true
  },
  {
    id: 'consultation-gynecologie',
    name: 'Consultation Gynécologique',
    description: 'Consultation spécialisée en gynécologie et obstétrique',
    icon: 'user-check',
    price: 250000,
    duration: 45,
    category: 'consultation',
    available: true
  },
  {
    id: 'echographie',
    name: 'Échographie',
    description: 'Examen d\'imagerie médicale par ultrasons',
    icon: 'monitor',
    price: 100000,
    duration: 30,
    category: 'diagnostic',
    available: true
  },
  {
    id: 'ecg',
    name: 'Électrocardiogramme (ECG)',
    description: 'Examen du rythme cardiaque',
    icon: 'activity',
    price: 75000,
    duration: 20,
    category: 'diagnostic',
    available: true
  },
  {
    id: 'analyses-sang',
    name: 'Analyses Sanguines',
    description: 'Prélèvement et analyses de sang complètes',
    icon: 'droplet',
    price: 125000,
    duration: 15,
    category: 'diagnostic',
    available: true
  },
  {
    id: 'vaccination',
    name: 'Vaccination',
    description: 'Administration de vaccins selon le calendrier vaccinal',
    icon: 'shield',
    price: 50000,
    duration: 15,
    category: 'prevention',
    available: true
  },
  {
    id: 'suivi-grossesse',
    name: 'Suivi de Grossesse',
    description: 'Consultation prénatale et suivi de grossesse',
    icon: 'heart-handshake',
    price: 200000,
    duration: 45,
    category: 'consultation',
    available: true
  },
  {
    id: 'teleconsultation',
    name: 'Téléconsultation',
    description: 'Consultation médicale à distance par vidéo',
    icon: 'video',
    price: 100000,
    duration: 30,
    category: 'consultation',
    available: true
  }
];