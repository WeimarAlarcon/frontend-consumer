<template>
  <div style="max-width: 350px">
    <q-item-label class="text-h6 q-pa-sm">Notificaciones</q-item-label>
    <q-list v-if="notificaciones.length > 0" bordered separator>
      <q-item
        v-for="(notificacion, index) in notificaciones"
        :key="index"
        clickable
        v-ripple
        @click="verNotificacion(notificacion.id)"
      >
        <q-item-section>
          <q-item-label lines="1"
            >Fecha: {{ formatDateTime(notificacion.fechaHora) }}</q-item-label
          >
          <q-item-label caption lines="2">
            <span class="text-weight-bold">Mensaje: </span>
            {{ notificacion.mensaje }}
          </q-item-label>
          <q-item-label caption lines="2">
            <span class="text-weight-bold">hace: </span>
            <span>{{ timeAgo(notificacion.fechaHora) }}</span>
          </q-item-label>
          <!-- <q-item-label>
            <strong
              >Fecha y Hora:
              {{ formatDateTime(notificacion.fechaHora) }}</strong
            ><br />
            Mensaje: {{ notificacion.mensaje }}<br />
          </q-item-label> -->
          <!-- <q-separator color="dark" /> -->
        </q-item-section>
        <q-item-section side top
          ><div>
            <q-btn
              size="12px"
              flat
              dense
              round
              icon="visibility"
              @click="verNotificacion(notificacion.id)"
            >
              <q-tooltip self="top middle" :offset="[1, 1]">
                Ver
              </q-tooltip></q-btn
            >
          </div></q-item-section
        >
      </q-item>
    </q-list>
    <q-list v-else>
      <q-item>
        <q-item-section>
          <q-item-label>No hay notificaciones nuevas</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <NotificacionView
      :view="dialogoVisible"
      :id="idNotificacion ?? 0"
      @update:view="cerrarDialogos"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { get } from '../services/notificacion.service';
import { NotificacionInterface } from '../interfaces/notificacion.interface';
import NotificacionView from '../layouts/NotificacionView.vue';
// import { notificacionLeida } from '../socket/webSocket';

const notificaciones = ref<NotificacionInterface[]>([]);
const dialogoVisible = ref(false);
const notificacionSeleccionada = ref<number | null>(null);
const idNotificacion = ref<number | undefined>(undefined);

onMounted(async () => {
  await getNotificaciones();
});

const cerrarDialogos = async (newValue: boolean) => {
  dialogoVisible.value = newValue;
  // await getNotificaciones();
};

const formatDateTime = (dateString: string | number | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Cambia a true si prefieres formato de 12 horas
  };
  const date = new Date(dateString);
  return date.toLocaleString('es-ES', options); // Cambia 'es-ES' si necesitas otro idioma
};

// const cambiarEstado = async (notificacion: NotificacionInterface) => {
//   // await notificacionLeida(id);
//   const id = notificacion.id;
//   if (notificacion.estado === false) {
//     await updateEstado(id);
//     await getNotificaciones();
//   } else {
//     await verNotificacion(id);
//   }
// };

const verNotificacion = async (id: number) => {
  // await notificacionLeida(id);
  // const resp = await updateEstado(id);
  // if (resp) {
  //   await getNotificaciones();
  // } else {
  //   console.error('Error al actualizar el estado de la notificación');
  // }
  notificacionSeleccionada.value = id;
  idNotificacion.value = id;
  dialogoVisible.value = true; // Abre el diálogo
};

const getNotificaciones = async () => {
  const response = await get();
  notificaciones.value = response.data;
};

const timeAgo = (dateString: string): string => {
  const now = new Date();
  const past = new Date(dateString);

  const diffInMs = now.getTime() - past.getTime(); // Diferencia en milisegundos
  const diffInSeconds = Math.floor(diffInMs / 1000); // Diferencia en segundos
  const diffInMinutes = Math.floor(diffInSeconds / 60); // Diferencia en minutos
  const diffInHours = Math.floor(diffInMinutes / 60); // Diferencia en horas
  const diffInDays = Math.floor(diffInHours / 24); // Diferencia en días
  const diffInMonths = Math.floor(diffInDays / 30); // Diferencia en meses
  const diffInYears = Math.floor(diffInMonths / 12); // Diferencia en años

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`; // Segundos
    // return `${hace diffInSeconds}s`; // Segundos
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}min`; // Minutos
  } else if (diffInHours < 24) {
    return `${diffInHours}hrs`; // Horas
  } else if (diffInDays < 30) {
    return `${diffInDays}d`; // Días
  } else if (diffInMonths < 12) {
    return `${diffInMonths}mes${diffInMonths > 1 ? 'es' : ''}`; // Meses
  } else {
    return `${diffInYears}año${diffInYears > 1 ? 's' : ''}`; // Años
  }
};
</script>

<style scoped>
.notificacion-no-leida {
  background-color: #e0e0e0; /* Gris claro para las no leídas */
}
</style>
