# Firebase Setup Guide

## Configuración de Firebase para el Sistema de Agendamiento de Citas

### 1. Crear un proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto"
3. Dale un nombre a tu proyecto (ej: "agendar-cita")
4. Sigue los pasos de configuración

### 2. Habilitar Firestore Database

1. En la consola de Firebase, ve a "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba"
4. Elige la ubicación más cercana a tus usuarios

### 3. Obtener la configuración de Firebase

1. En la consola de Firebase, ve a Configuración del proyecto (ícono de engranaje)
2. En la pestaña "General", desplázate hacia abajo hasta "Tu aplicación"
3. Haz clic en el ícono de web (</>) para agregar una aplicación web
4. Dale un nombre a tu aplicación
5. Copia la configuración que aparece

### 4. Actualizar la configuración en el código

Reemplaza la configuración en `src/lib/firebase.js` con tus datos reales:

```javascript
const firebaseConfig = {
  apiKey: "tu-api-key-real",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "tu-messaging-sender-id",
  appId: "tu-app-id"
};
```

### 5. Reglas de Firestore

En la consola de Firebase, ve a Firestore Database > Reglas y actualiza las reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /appointments/{document} {
      allow read, write: if true; // Para desarrollo - cambiar en producción
    }
  }
}
```

### 6. Estructura de datos

Las citas se guardarán en la colección `appointments` con la siguiente estructura:

```javascript
{
  nombre: "Nombre del cliente",
  fecha: "2024-01-15",
  hora: "14:00",
  barbero: "araz|danel|farzin",
  servicios: ["corte", "barba", "ambos"],
  total: "$35",
  timestamp: "2024-01-15T14:00:00.000Z",
  createdAt: Timestamp
}
```

### 7. Ejecutar el proyecto

```bash
npm run dev
```

### Notas importantes:

- Para producción, configura las reglas de seguridad apropiadas
- Considera agregar autenticación de usuarios
- Implementa validación de disponibilidad de horarios
- Agrega notificaciones por email/SMS para confirmaciones

### Características del formulario:

✅ **Campos requeridos:**
- Nombre completo
- Fecha
- Hora (9:00 AM - 6:00 PM)
- Selección de barbero (Araz, Danel, Farzin)
- Servicios (Corte $25, Barba $15, Ambos $35)

✅ **Funcionalidades:**
- Cálculo automático del total
- Animaciones modernas con Tailwind CSS
- Modal de confirmación
- Guardado en Firebase Firestore
- Diseño responsive y moderno 