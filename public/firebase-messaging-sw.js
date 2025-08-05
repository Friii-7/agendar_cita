// Firebase Messaging Service Worker
// Este archivo debe estar en la carpeta public/ para que sea accesible desde la raíz del sitio

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCtQcs7W5p2ULV1C-nQ6ogrfGo_gYe8Z3M",
  authDomain: "agenda-cita-23a30.firebaseapp.com",
  projectId: "agenda-cita-23a30",
  storageBucket: "agenda-cita-23a30.appspot.com",
  messagingSenderId: "57160947365",
  appId: "1:57160947365:web:default"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Obtener instancia de messaging
const messaging = firebase.messaging();

// Manejar mensajes en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log('Mensaje recibido en segundo plano:', payload);

  const notificationTitle = payload.notification.title || 'Nueva notificación';
  const notificationOptions = {
    body: payload.notification.body || 'Tienes una nueva notificación',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    data: payload.data
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Manejar clics en notificaciones
self.addEventListener('notificationclick', (event) => {
  console.log('Notificación clickeada:', event);

  event.notification.close();

  // Abrir la aplicación cuando se hace clic en la notificación
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Manejar instalación del service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
});

// Manejar activación del service worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker activado');
}); 