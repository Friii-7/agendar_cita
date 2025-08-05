# Firebase Setup Guide - Sistema de Barbería

## Configuración de Firebase para el Sistema de Agendamiento de Citas de Barbería

### 1. Información del Proyecto

- **Nombre del proyecto:** agenda-cita
- **ID del proyecto:** agenda-cita-23a30
- **Número del proyecto:** 57160947365
- **Clave de API web:** AIzaSyCtQcs7W5p2ULV1C-nQ6ogrfGo_gYe8Z3M

### 2. Configuración Actual

La configuración de Firebase ya está implementada en `src/lib/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyCtQcs7W5p2ULV1C-nQ6ogrfGo_gYe8Z3M",
  authDomain: "agenda-cita-23a30.firebaseapp.com",
  projectId: "agenda-cita-23a30",
  storageBucket: "agenda-cita-23a30.appspot.com",
  messagingSenderId: "57160947365",
  appId: "1:57160947365:web:default"
};
```

### 3. Estructura de Datos

Las citas se guardarán en la colección `appointments` con la siguiente estructura:

```javascript
{
  name: "Nombre del cliente",
  email: "cliente@email.com",
  phone: "+1234567890",
  barber: "araz|danel|farzin",
  service: "corte|barba|combo|disenos|tratamiento|especializado",
  date: "2024-01-15",
  time: "14:00",
  notes: "Notas adicionales",
  total: "$35",
  status: "pending",
  createdAt: Timestamp
}
```

### 4. Servicios Disponibles

- **Corte Clásico:** $25
- **Arreglo de Barba:** $20
- **Corte + Barba:** $35
- **Diseños y Degradados:** $40
- **Tratamiento Capilar:** $30
- **Servicios Especializados:** $50

### 5. Barberos Disponibles

- **Araz**
- **Danel**
- **Farzin**

### 6. Horarios de Atención

- **Lunes - Viernes:** 9:00 AM - 6:00 PM
- **Sábados:** 9:00 AM - 2:00 PM
- **Domingos:** Cerrado

### 7. Reglas de Firestore

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

### 8. Notificaciones Push

El archivo `public/firebase-messaging-sw.js` está configurado para manejar notificaciones push.

Para habilitar notificaciones push completamente:

1. Ve a Firebase Console > Project Settings > Cloud Messaging
2. Genera una VAPID key
3. Reemplaza `'YOUR_VAPID_KEY'` en `src/lib/firebase.js`

### 9. Funcionalidades Implementadas

✅ **Formulario de Citas:**
- Selección de barbero
- Selección de servicio con precios
- Cálculo automático del total
- Validación de fecha (no fechas pasadas)
- Horarios predefinidos
- Notas adicionales

✅ **Integración con Firebase:**
- Guardado de citas en Firestore
- Manejo de errores
- Mensajes de confirmación
- Service Worker para notificaciones

✅ **UI/UX:**
- Diseño responsive
- Animaciones modernas
- Mensajes de éxito/error
- Loading states
- Validación en tiempo real

### 10. Comandos para Ejecutar

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build
npm run preview
```

### 11. Próximos Pasos Recomendados

1. **Configurar autenticación** para administradores
2. **Implementar panel de administración** para ver citas
3. **Agregar validación de disponibilidad** de horarios
4. **Configurar notificaciones por email** para confirmaciones
5. **Implementar cancelación de citas**
6. **Agregar sistema de reseñas** después del servicio

### 12. Solución de Problemas

**Error 404 en firebase-messaging-sw.js:**
- ✅ Solucionado: El archivo ya está creado en `public/firebase-messaging-sw.js`

**Problemas de conexión con Firebase:**
- Verificar que las reglas de Firestore permitan lectura/escritura
- Confirmar que la configuración de Firebase sea correcta
- Revisar la consola del navegador para errores específicos

### 13. Seguridad

Para producción, considera:
- Implementar autenticación de usuarios
- Configurar reglas de Firestore más restrictivas
- Validar datos en el servidor
- Implementar rate limiting
- Usar HTTPS en producción 