// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, updateDoc, doc } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCtQcs7W5p2ULV1C-nQ6ogrfGo_gYe8Z3M",
  authDomain: "agenda-cita-23a30.firebaseapp.com",
  projectId: "agenda-cita-23a30",
  storageBucket: "agenda-cita-23a30.appspot.com",
  messagingSenderId: "57160947365",
  appId: "1:57160947365:web:default"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Cloud Messaging
let messaging;
if (typeof window !== 'undefined') {
  messaging = getMessaging(app);
}

// Function to save appointment to Firebase
export async function saveAppointment(appointmentData) {
  try {
    const docRef = await addDoc(collection(db, 'appointments'), {
      ...appointmentData,
      createdAt: new Date(),
      status: 'pending'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving appointment:', error);
    throw error;
  }
}

// Function to get all appointments
export async function getAppointments() {
  try {
    const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const appointments = [];
    querySnapshot.forEach((doc) => {
      appointments.push({ id: doc.id, ...doc.data() });
    });
    return appointments;
  } catch (error) {
    console.error('Error getting appointments:', error);
    throw error;
  }
}

// Function to get appointments by date
export async function getAppointmentsByDate(date) {
  try {
    const q = query(
      collection(db, 'appointments'),
      where('date', '==', date),
      orderBy('time', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const appointments = [];
    querySnapshot.forEach((doc) => {
      appointments.push({ id: doc.id, ...doc.data() });
    });
    return appointments;
  } catch (error) {
    console.error('Error getting appointments by date:', error);
    throw error;
  }
}

// Function to request notification permission and get token
export async function requestNotificationPermission() {
  if (!messaging) return null;
  
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'YOUR_VAPID_KEY' // Reemplazar con tu VAPID key
      });
      return token;
    }
    return null;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return null;
  }
}

// Function to handle foreground messages
export function onMessageListener() {
  if (!messaging) return () => {};
  
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('Mensaje recibido en primer plano:', payload);
      resolve(payload);
    });
  });
}

// Function to get appointments by barber
export async function getAppointmentsByBarber(barberCode) {
  try {
    const q = query(
      collection(db, 'appointments'),
      where('barber', '==', barberCode),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const appointments = [];
    querySnapshot.forEach((doc) => {
      appointments.push({ id: doc.id, ...doc.data() });
    });
    return appointments;
  } catch (error) {
    console.error('Error getting appointments by barber:', error);
    throw error;
  }
}

// Function to get appointments by barber and date
export async function getAppointmentsByBarberAndDate(barberCode, date) {
  try {
    const q = query(
      collection(db, 'appointments'),
      where('barber', '==', barberCode),
      where('date', '==', date),
      orderBy('time', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const appointments = [];
    querySnapshot.forEach((doc) => {
      appointments.push({ id: doc.id, ...doc.data() });
    });
    return appointments;
  } catch (error) {
    console.error('Error getting appointments by barber and date:', error);
    throw error;
  }
}

// Function to update appointment status
export async function updateAppointmentStatus(appointmentId, status) {
  try {
    const appointmentRef = doc(db, 'appointments', appointmentId);
    await updateDoc(appointmentRef, {
      status: status,
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
}

export { db, messaging }; 