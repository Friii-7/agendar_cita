// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

// Function to save appointment to Firebase
export async function saveAppointment(appointmentData) {
  try {
    const docRef = await addDoc(collection(db, 'appointments'), {
      ...appointmentData,
      createdAt: new Date()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving appointment:', error);
    throw error;
  }
}

export { db }; 