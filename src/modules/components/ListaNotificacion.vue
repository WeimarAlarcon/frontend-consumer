<template>
  <div>
    <q-item-label class="text-h6 q-pa-sm">Notificaciones</q-item-label>
    <q-list v-if="notificaciones.length > 0">
      <q-item
        v-for="(notificacion, index) in notificaciones"
        :key="index"
        clickable
        @click="verNotificacion(notificacion)"
      >
        <q-item-section>
          <q-item-label>
            <strong>Fecha y Hora: {{ notificacion.fechaHora }}</strong
            ><br />
            Mensaje: {{ notificacion.mensaje }}<br />
          </q-item-label>
          <q-separator color="dark" inset />
        </q-item-section>
      </q-item>
    </q-list>
    <q-list v-else>
      <q-item>
        <q-item-section>
          <q-item-label>No hay notificaciones nuevas</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { get } from '../services/notificacion.service';
import { NotificacionInterface } from '../interfaces/notificacion.interface';

const notificaciones = ref<NotificacionInterface[]>([]);
const dialogoVisible = ref(false);
const notificacionSeleccionada = ref<NotificacionInterface | null>(null);

onMounted(async () => {
  await getNotificaciones();
});

const verNotificacion = (notificacion: NotificacionInterface) => {
  notificacionSeleccionada.value = notificacion;
  dialogoVisible.value = true; // Abre el diálogo
};

const getNotificaciones = async () => {
  const response = await get();
  notificaciones.value = response.data;
};
</script>

<style scoped></style>
