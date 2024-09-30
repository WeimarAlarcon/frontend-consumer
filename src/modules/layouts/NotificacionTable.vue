<template>
  <div class="q-pa-md">
    <q-table
      title="Notificaciones"
      :rows="notificaciones"
      :columns="columns"
      v-model:selected="selection"
      @row-click="selectRow"
      row-key="id"
    >
      <template v-slot:body-cell-actions="props">
        <td>
          <q-btn
            flat
            round
            color="blue"
            icon="visibility"
            @click="getIdNotificacion(props.row.id)"
            ><q-tooltip>Ver</q-tooltip>
          </q-btn>
        </td>
      </template>
    </q-table>
    <NotificacionView
      :view="view"
      :id="idNotificacion ?? 0"
      @update:view="cerrarDialogos"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { get } from '../services/notificacion.service';
import NotificacionView from './NotificacionView.vue';

defineOptions({
  name: 'NotificacionTablePage',
});

const idNotificacion = ref<number | undefined>(undefined);
const alert = ref(false);
const view = ref(false);

const cerrarDialogos = async (newValue: boolean) => {
  alert.value = newValue;
  view.value = newValue;
  await listaNotificaciones();
};

let selection = ref<RowData[]>([]);
const notificaciones = ref([]);

const listaNotificaciones = async () => {
  const response = await get();
  notificaciones.value = response.data;
};

const selectRow = (ev: Event, row: RowData) => {
  selection.value = [row];
};

const getIdNotificacion = async (id: number) => {
  idNotificacion.value = id;
  view.value = true;
};

type RowData = {
  id: number;
  fechaHora: string;
  mensaje: string;
  action: string;
};

const columns: Array<{
  name: string;
  label: string;
  required?: boolean;
  align?: 'center' | 'left' | 'right';
  field: string | ((row: RowData) => string | number); // Especifica el tipo de retorno
  format?: (val: string | number | boolean) => string; // Restringe el formato a tipos específicos
  sortable?: boolean;
  sort?: (a: string | number, b: string | number) => number; // Tipos específicos para la comparación
}> = [
  // {
  //   name: 'index',
  //   label: '#',
  //   field: 'index',
  //   sortable: true,
  // },
  {
    name: 'actions',
    label: 'Acciones',
    field: 'actions',
    align: 'center',
  },
  {
    name: 'estado',
    label: 'Estado',
    field: 'estado',
    align: 'center',
    sortable: true,
    format: (val): string => {
      if (val === true) {
        return 'Activo';
      } else if (val === false) {
        return 'Inactivo';
      }
      return '';
    },
  },
  {
    name: 'fechaHora',
    label: 'Fecha y Hora',
    field: 'fechaHora',
    align: 'center',
    sortable: true,
    format: (val) => {
      const date = new Date(val as string | number);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const hour = date.getHours().toString().padStart(2, '0');
      const minute = date.getMinutes().toString().padStart(2, '0');
      const second = date.getSeconds().toString().padStart(2, '0');
      return `${year}-${month}-${day} | ${hour}:${minute}:${second}`;
    },
  },
  {
    name: 'mensaje',
    label: 'Mensaje',
    field: 'mensaje',
    align: 'center',
    sortable: true,
  },
];

onMounted(async () => {
  await listaNotificaciones();
});
</script>

<style scoped></style>
