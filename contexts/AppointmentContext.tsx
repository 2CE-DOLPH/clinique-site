import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Appointment, TimeSlot } from '../types';

interface AppointmentContextType {
  appointments: Appointment[];
  selectedDate: string;
  selectedTime: string;
  selectedDoctorId: string;
  selectedServiceId: string;
  setSelectedDate: (date: string) => void;
  setSelectedTime: (time: string) => void;
  setSelectedDoctorId: (doctorId: string) => void;
  setSelectedServiceId: (serviceId: string) => void;
  getAvailableSlots: (doctorId: string, date: string) => TimeSlot[];
  bookAppointment: (appointmentData: Partial<Appointment>) => Promise<boolean>;
  cancelAppointment: (appointmentId: string) => Promise<boolean>;
  rescheduleAppointment: (appointmentId: string, newDate: string, newTime: string) => Promise<boolean>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  return context;
};

interface AppointmentProviderProps {
  children: ReactNode;
}

export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');

  const generateTimeSlots = (startTime: string, endTime: string, breakStart?: string, breakEnd?: string): string[] => {
    const slots: string[] = [];
    const start = new Date(`2024-01-01 ${startTime}`);
    const end = new Date(`2024-01-01 ${endTime}`);
    const breakStartTime = breakStart ? new Date(`2024-01-01 ${breakStart}`) : null;
    const breakEndTime = breakEnd ? new Date(`2024-01-01 ${breakEnd}`) : null;

    const current = new Date(start);
    while (current < end) {
      const timeString = current.toTimeString().slice(0, 5);
      
      // Skip break time
      if (breakStartTime && breakEndTime) {
        if (current >= breakStartTime && current < breakEndTime) {
          current.setMinutes(current.getMinutes() + 30);
          continue;
        }
      }
      
      slots.push(timeString);
      current.setMinutes(current.getMinutes() + 30);
    }
    
    return slots;
  };

  const getAvailableSlots = (doctorId: string, date: string): TimeSlot[] => {
    // Mock implementation - in real app, this would fetch from API
    const dayOfWeek = new Date(date).getDay();
    
    // Mock doctor availability
    const mockAvailability = {
      'dr-1': { dayOfWeek: [1, 2, 3, 4, 5, 6], startTime: '08:00', endTime: '17:00', breakStart: '12:00', breakEnd: '14:00' },
      'dr-2': { dayOfWeek: [1, 2, 3, 4, 5], startTime: '09:00', endTime: '16:00', breakStart: '12:30', breakEnd: '13:30' },
      'dr-3': { dayOfWeek: [2, 4, 6], startTime: '08:00', endTime: '16:00', breakStart: '12:00', breakEnd: '13:00' },
      'dr-4': { dayOfWeek: [1, 3, 5, 6], startTime: '08:30', endTime: '17:00', breakStart: '12:00', breakEnd: '14:00' }
    };

    const doctorAvail = mockAvailability[doctorId as keyof typeof mockAvailability];
    if (!doctorAvail || !doctorAvail.dayOfWeek.includes(dayOfWeek)) {
      return [];
    }

    const timeSlots = generateTimeSlots(
      doctorAvail.startTime,
      doctorAvail.endTime,
      doctorAvail.breakStart,
      doctorAvail.breakEnd
    );

    // Mock some booked slots
    const bookedSlots = ['09:00', '10:30', '14:00', '15:30'];

    return timeSlots.map(time => ({
      time,
      available: !bookedSlots.includes(time),
      doctorId
    }));
  };

  const bookAppointment = async (appointmentData: Partial<Appointment>): Promise<boolean> => {
    try {
      // Simulation of booking
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        patientId: appointmentData.patientId || '',
        doctorId: appointmentData.doctorId || selectedDoctorId,
        date: appointmentData.date || selectedDate,
        time: appointmentData.time || selectedTime,
        duration: appointmentData.duration || 30,
        type: appointmentData.type || 'consultation',
        status: 'scheduled',
        reason: appointmentData.reason || '',
        symptoms: appointmentData.symptoms,
        notes: appointmentData.notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setAppointments(prev => [...prev, newAppointment]);
      return true;
    } catch (error) {
      return false;
    }
  };

  const cancelAppointment = async (appointmentId: string): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAppointments(prev =>
        prev.map(apt =>
          apt.id === appointmentId
            ? { ...apt, status: 'cancelled' as const, updatedAt: new Date().toISOString() }
            : apt
        )
      );
      return true;
    } catch (error) {
      return false;
    }
  };

  const rescheduleAppointment = async (
    appointmentId: string,
    newDate: string,
    newTime: string
  ): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAppointments(prev =>
        prev.map(apt =>
          apt.id === appointmentId
            ? { ...apt, date: newDate, time: newTime, updatedAt: new Date().toISOString() }
            : apt
        )
      );
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <AppointmentContext.Provider value={{
      appointments,
      selectedDate,
      selectedTime,
      selectedDoctorId,
      selectedServiceId,
      setSelectedDate,
      setSelectedTime,
      setSelectedDoctorId,
      setSelectedServiceId,
      getAvailableSlots,
      bookAppointment,
      cancelAppointment,
      rescheduleAppointment
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};