import { Doctor } from '../types';

export const doctors: Doctor[] = [
  {
    id: 'dr-1',
    firstName: 'Dr. Mamadou',
    lastName: 'Diallo',
    specialty: 'Médecine Générale',
    title: 'Médecin Généraliste',
    email: 'dr.diallo@clinique.gn',
    phone: '+224 622 123 456',
    bio: 'Médecin généraliste avec plus de 15 ans d\'expérience. Spécialisé dans le suivi des maladies chroniques et la médecine préventive.',
    photo: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
    qualifications: [
      'Doctorat en Médecine - Université de Conakry',
      'Formation en Médecine Tropicale',
      'Certificat en Gestion des Urgences'
    ],
    languages: ['Français', 'Soussou', 'Peul'],
    availability: [
      { dayOfWeek: 1, startTime: '08:00', endTime: '17:00', breakStart: '12:00', breakEnd: '14:00' },
      { dayOfWeek: 2, startTime: '08:00', endTime: '17:00', breakStart: '12:00', breakEnd: '14:00' },
      { dayOfWeek: 3, startTime: '08:00', endTime: '17:00', breakStart: '12:00', breakEnd: '14:00' },
      { dayOfWeek: 4, startTime: '08:00', endTime: '17:00', breakStart: '12:00', breakEnd: '14:00' },
      { dayOfWeek: 5, startTime: '08:00', endTime: '16:00', breakStart: '12:00', breakEnd: '14:00' },
      { dayOfWeek: 6, startTime: '08:00', endTime: '12:00' }
    ],
    consultationFee: 150000 // GNF
  },
  {
    id: 'dr-2',
    firstName: 'Dr. Fatoumata',
    lastName: 'Camara',
    specialty: 'Pédiatrie',
    title: 'Pédiatre',
    email: 'dr.camara@clinique.gn',
    phone: '+224 622 234 567',
    bio: 'Pédiatre expérimentée, spécialisée dans le suivi de la croissance et le développement de l\'enfant. Passionnée par la santé infantile.',
    photo: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
    qualifications: [
      'Doctorat en Médecine - Université de Conakry',
      'Spécialisation en Pédiatrie - CHU Donka',
      'Formation en Nutrition Infantile'
    ],
    languages: ['Français', 'Malinké', 'Anglais'],
    availability: [
      { dayOfWeek: 1, startTime: '09:00', endTime: '16:00', breakStart: '12:30', breakEnd: '13:30' },
      { dayOfWeek: 2, startTime: '09:00', endTime: '16:00', breakStart: '12:30', breakEnd: '13:30' },
      { dayOfWeek: 3, startTime: '09:00', endTime: '16:00', breakStart: '12:30', breakEnd: '13:30' },
      { dayOfWeek: 4, startTime: '09:00', endTime: '16:00', breakStart: '12:30', breakEnd: '13:30' },
      { dayOfWeek: 5, startTime: '09:00', endTime: '15:00', breakStart: '12:30', breakEnd: '13:30' }
    ],
    consultationFee: 200000 // GNF
  },
  {
    id: 'dr-3',
    firstName: 'Dr. Alpha',
    lastName: 'Condé',
    specialty: 'Cardiologie',
    title: 'Cardiologue',
    email: 'dr.conde@clinique.gn',
    phone: '+224 622 345 678',
    bio: 'Cardiologue spécialisé dans le diagnostic et le traitement des maladies cardiovasculaires. Expert en échocardiographie.',
    photo: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg',
    qualifications: [
      'Doctorat en Médecine - Université de Conakry',
      'Spécialisation en Cardiologie - France',
      'Certification en Échocardiographie'
    ],
    languages: ['Français', 'Soussou'],
    availability: [
      { dayOfWeek: 2, startTime: '08:00', endTime: '16:00', breakStart: '12:00', breakEnd: '13:00' },
      { dayOfWeek: 4, startTime: '08:00', endTime: '16:00', breakStart: '12:00', breakEnd: '13:00' },
      { dayOfWeek: 6, startTime: '08:00', endTime: '12:00' }
    ],
    consultationFee: 300000 // GNF
  },
  {
    id: 'dr-4',
    firstName: 'Dr. Aissatou',
    lastName: 'Barry',
    specialty: 'Gynécologie',
    title: 'Gynécologue-Obstétricienne',
    email: 'dr.barry@clinique.gn',
    phone: '+224 622 456 789',
    bio: 'Gynécologue-obstétricienne avec une expertise en suivi de grossesse et santé reproductive féminine.',
    photo: 'https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg',
    qualifications: [
      'Doctorat en Médecine - Université de Conakry',
      'Spécialisation en Gynécologie-Obstétrique',
      'Formation en Échographie Obstétricale'
    ],
    languages: ['Français', 'Peul', 'Soussou'],
    availability: [
      { dayOfWeek: 1, startTime: '08:30', endTime: '17:00', breakStart: '12:00', breakEnd: '14:00' },
      { dayOfWeek: 3, startTime: '08:30', endTime: '17:00', breakStart: '12:00', breakEnd: '14:00' },
      { dayOfWeek: 5, startTime: '08:30', endTime: '16:00', breakStart: '12:00', breakEnd: '14:00' },
      { dayOfWeek: 6, startTime: '09:00', endTime: '13:00' }
    ],
    consultationFee: 250000 // GNF
  }
];