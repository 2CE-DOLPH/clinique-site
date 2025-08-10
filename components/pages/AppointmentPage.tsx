import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, FileText, CheckCircle } from 'lucide-react';
import { doctors } from '../../data/doctors';
import { services } from '../../data/services';
import { useAppointment } from '../../contexts/AppointmentContext';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface AppointmentPageProps {
  onNavigate: (page: string) => void;
}

const AppointmentPage: React.FC<AppointmentPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const {
    selectedDate,
    selectedTime,
    selectedDoctorId,
    selectedServiceId,
    setSelectedDate,
    setSelectedTime,
    setSelectedDoctorId,
    setSelectedServiceId,
    getAvailableSlots,
    bookAppointment
  } = useAppointment();

  const [currentStep, setCurrentStep] = useState(1);
  const [appointmentData, setAppointmentData] = useState({
    reason: '',
    symptoms: '',
    notes: ''
  });
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId);
  const selectedService = services.find(s => s.id === selectedServiceId);

  // Generate next 14 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const availableDates = getAvailableDates();
  const availableSlots = selectedDoctorId && selectedDate 
    ? getAvailableSlots(selectedDoctorId, selectedDate)
    : [];

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(''); // Reset time when date changes
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBookAppointment = async () => {
    if (!user) {
      onNavigate('login');
      return;
    }

    setIsBooking(true);
    try {
      const success = await bookAppointment({
        patientId: user.id,
        doctorId: selectedDoctorId,
        date: selectedDate,
        time: selectedTime,
        reason: appointmentData.reason,
        symptoms: appointmentData.symptoms,
        notes: appointmentData.notes,
        type: 'consultation'
      });

      if (success) {
        setBookingSuccess(true);
      }
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsBooking(false);
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return selectedServiceId && selectedDoctorId;
      case 2:
        return selectedDate && selectedTime;
      case 3:
        return appointmentData.reason.trim().length > 0;
      default:
        return true;
    }
  };

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Rendez-vous confirmé !
          </h2>
          <p className="text-gray-600 mb-6">
            Votre rendez-vous a été pris avec succès. Vous recevrez une confirmation par SMS et email.
          </p>
          <div className="space-y-3">
            <Button onClick={() => onNavigate('patient-dashboard')} fullWidth>
              Voir mes rendez-vous
            </Button>
            <Button variant="outline" onClick={() => onNavigate('home')} fullWidth>
              Retour à l'accueil
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Prendre Rendez-vous
          </h1>
          <p className="text-gray-600">
            Réservez votre consultation en quelques étapes simples
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${currentStep >= step 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {step}
              </div>
              {step < 4 && (
                <div className={`
                  w-16 h-1 mx-2
                  ${currentStep > step ? 'bg-emerald-600' : 'bg-gray-200'}
                `} />
              )}
            </div>
          ))}
        </div>

        <Card className="max-w-2xl mx-auto">
          {/* Step 1: Service and Doctor Selection */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Choisir un service et un médecin
              </h2>

              {/* Service Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Type de consultation
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {services.filter(s => s.available).map(service => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`
                        p-4 border rounded-lg text-left transition-colors
                        ${selectedServiceId === service.id
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <div className="font-medium text-gray-900">{service.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{service.description}</div>
                      <div className="text-sm font-medium text-emerald-600 mt-2">
                        {new Intl.NumberFormat('fr-GN', {
                          style: 'currency',
                          currency: 'GNF',
                          minimumFractionDigits: 0,
                        }).format(service.price)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Doctor Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choisir un médecin
                </label>
                <div className="space-y-3">
                  {doctors.map(doctor => (
                    <button
                      key={doctor.id}
                      onClick={() => setSelectedDoctorId(doctor.id)}
                      className={`
                        w-full p-4 border rounded-lg text-left transition-colors
                        ${selectedDoctorId === doctor.id
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={doctor.photo}
                          alt={`${doctor.firstName} ${doctor.lastName}`}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">
                            {doctor.firstName} {doctor.lastName}
                          </div>
                          <div className="text-sm text-emerald-600">{doctor.specialty}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            Langues: {doctor.languages.join(', ')}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">
                            {new Intl.NumberFormat('fr-GN', {
                              style: 'currency',
                              currency: 'GNF',
                              minimumFractionDigits: 0,
                            }).format(doctor.consultationFee)}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Date and Time Selection */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Choisir une date et heure
              </h2>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Date de consultation
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {availableDates.map(date => {
                    const dateString = date.toISOString().split('T')[0];
                    const dayName = date.toLocaleDateString('fr-FR', { weekday: 'short' });
                    const dayNumber = date.getDate();
                    const monthName = date.toLocaleDateString('fr-FR', { month: 'short' });
                    
                    return (
                      <button
                        key={dateString}
                        onClick={() => handleDateSelect(dateString)}
                        className={`
                          p-3 border rounded-lg text-center transition-colors
                          ${selectedDate === dateString
                            ? 'border-emerald-600 bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <div className="text-sm text-gray-600">{dayName}</div>
                        <div className="font-medium text-gray-900">{dayNumber}</div>
                        <div className="text-sm text-gray-600">{monthName}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Heure de consultation
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {availableSlots.map(slot => (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`
                          p-3 border rounded-lg text-center transition-colors
                          ${!slot.available 
                            ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                            : selectedTime === slot.time
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-600'
                              : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <Clock className="h-4 w-4 mx-auto mb-1" />
                        <div className="text-sm font-medium">{slot.time}</div>
                      </button>
                    ))}
                  </div>
                  {availableSlots.length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      Aucun créneau disponible pour cette date
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Appointment Details */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Détails de la consultation
              </h2>

              <div className="space-y-6">
                <Input
                  label="Motif de consultation *"
                  value={appointmentData.reason}
                  onChange={(e) => setAppointmentData({
                    ...appointmentData,
                    reason: e.target.value
                  })}
                  placeholder="Ex: Consultation de routine, douleurs abdominales..."
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Symptômes (optionnel)
                  </label>
                  <textarea
                    value={appointmentData.symptoms}
                    onChange={(e) => setAppointmentData({
                      ...appointmentData,
                      symptoms: e.target.value
                    })}
                    placeholder="Décrivez vos symptômes si applicable..."
                    rows={3}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes additionnelles (optionnel)
                  </label>
                  <textarea
                    value={appointmentData.notes}
                    onChange={(e) => setAppointmentData({
                      ...appointmentData,
                      notes: e.target.value
                    })}
                    placeholder="Informations complémentaires, allergies, traitements en cours..."
                    rows={3}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Confirmation du rendez-vous
              </h2>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-medium text-gray-900 mb-4">Récapitulatif</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Médecin:</span>
                    <span className="font-medium">
                      {selectedDoctor?.firstName} {selectedDoctor?.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                      {new Date(selectedDate).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Heure:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Motif:</span>
                    <span className="font-medium">{appointmentData.reason}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="text-gray-600">Tarif:</span>
                    <span className="font-bold text-emerald-600">
                      {selectedDoctor && new Intl.NumberFormat('fr-GN', {
                        style: 'currency',
                        currency: 'GNF',
                        minimumFractionDigits: 0,
                      }).format(selectedDoctor.consultationFee)}
                    </span>
                  </div>
                </div>
              </div>

              {!user && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-yellow-800 text-sm">
                    Vous devez être connecté pour confirmer votre rendez-vous.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Précédent
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceedToNext()}
              >
                Suivant
              </Button>
            ) : (
              <Button
                onClick={handleBookAppointment}
                isLoading={isBooking}
                disabled={!user}
              >
                Confirmer le rendez-vous
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentPage;