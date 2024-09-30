<template>
  <div>
    <q-btn-dropdown rounded @click="reset">
      <template v-slot:label>
        <div class="row items-center no-wrap">
          <q-icon name="notifications" />
          <q-badge
            floating
            color="red"
            rounded
            :value="notificaciones"
            v-if="notificaciones > 0"
          >
            {{ notificaciones }}
          </q-badge>
        </div>
      </template>
      <ListaNotificacion />
    </q-btn-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { watch } from 'vue';
import ListaNotificacion from './ListaNotificacion.vue';
import {
  useNotificacionSocket,
  resetNotificaciones,
} from '../socket/webSocket';
import { NotificacionInterface } from '../interfaces/notificacion.interface';

defineOptions({
  name: 'NotificacionIconPage',
});

const $q = useQuasar();
const { notificaciones, notificacionNueva } = useNotificacionSocket();

const mostrarNotificacion = (notificacion: NotificacionInterface) => {
  $q.notify({
    message: 'Nueva Notificacion:', // Ajusta según los datos que quieras mostrar
    caption: `Mensaje: ${notificacion.mensaje} <br> 
      Fecha de Hora: ${new Date(notificacion.fechaHora).toLocaleString()} <br>
    `,
    timeout: 3000, // Duración de la notificación
    type: 'info',
    color: 'primary',
    position: 'bottom-right',
    html: true,
  });
};

const reset = () => {
  // Restablecer el contador de notificaciones
  resetNotificaciones();
};

// Escuchar cambios en las personas registradas

watch(notificacionNueva, (nuevaNotificacion) => {
  if (nuevaNotificacion) {
    console.log('Nueva notificación recibida:', nuevaNotificacion);
    // Asegúrate de qe los datos sean del tipo `PersonaInterface`
    const notificacion = JSON.parse(
      JSON.stringify(nuevaNotificacion)
    ) as unknown as NotificacionInterface;
    // Mostrar la notificación en la pantalla
    mostrarNotificacion(notificacion);
  }
});
</script>

<style scoped></style>
