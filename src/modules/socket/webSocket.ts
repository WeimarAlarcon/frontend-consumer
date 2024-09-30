import io from 'socket.io-client';
import { onMounted, onUnmounted, ref } from 'vue';
import { NotificacionInterface } from '../interfaces/notificacion.interface';

const socket = io('http://localhost:3001'); // Reemplaza con la URL de tu servidor
const notificaciones = ref(0);
const notificacionNueva = ref<NotificacionInterface | null>(null);

export function useNotificacionSocket() {
  onMounted(() => {
    socket.on('notificacionNueva', (data: NotificacionInterface) => {
      console.log('Nueva notificación recibida:', data);
      notificacionNueva.value = data; // Guardar la notificación
      notificaciones.value += 1; // Incrementar el contador
    });
  });

  onUnmounted(() => {
    socket.off('notificacionNueva'); // Elimina el listener del evento para evitar fugas de memoria
    socket.disconnect(); // Desconecta el socket al desmontar el componente
  });

  return {
    notificacionNueva,
    notificaciones,
  };
}

export const resetNotificaciones = () => {
  notificaciones.value = 0;
};

export const notificacionLeida = (id: number): void => {
  socket.emit('notificacionLeida', id, (response: NotificacionInterface) => {
    console.log('Notificación leída:', response);
  });
};
