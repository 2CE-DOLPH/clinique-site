export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'M' | 'F';
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: MedicalRecord[];
  appointments: Appointment[];
  documents: PatientDocument[];
  createdAt: string;
}

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  title: string;
  email: string;
  phone: string;
  bio: string;
  photo: string;
  qualifications: string[];
  languages: string[];
  availability: DoctorAvailability[];
  consultationFee: number;
}

export interface DoctorAvailability {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startTime: string; // "09:00"
  endTime: string; // "17:00"
  breakStart?: string; // "12:00"
  breakEnd?: string; // "14:00"
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: 'consultation' | 'follow-up' | 'emergency' | 'teleconsultation';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  reason: string;
  notes?: string;
  symptoms?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId: string;
  date: string;
  diagnosis: string;
  treatment: string;
  prescription: Prescription[];
  notes: string;
  followUpDate?: string;
}

export interface Prescription {
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface PatientDocument {
  id: string;
  patientId: string;
  type: 'lab-result' | 'prescription' | 'medical-report' | 'imaging' | 'other';
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: number;
  duration: number; // in minutes
  category: 'consultation' | 'diagnostic' | 'treatment' | 'prevention';
  available: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  doctorId: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: 'general' | 'appointment' | 'emergency' | 'complaint';
  status: 'new' | 'read' | 'responded' | 'closed';
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin' | 'receptionist';
  firstName: string;
  lastName: string;
  phone: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
  appointmentReminders: boolean;
  resultsAvailable: boolean;
  promotions: boolean;
}