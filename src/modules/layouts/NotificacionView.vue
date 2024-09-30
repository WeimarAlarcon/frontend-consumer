<template>
  <q-dialog v-model="localAlert" persistent>
    <q-card style="width: 600px" class="q-pa-md">
      <q-bar class="bg-white q-my-auto">
        <q-item-label><strong>NOTIFICACION:</strong></q-item-label>
      </q-bar>
      <q-card-section>
        <div class="row">
          <div class="col-12 q-pl-md">
            <q-item-label class="text-h7"
              ><strong>Fecha y Hora: </strong
              >{{ formatDateTime(notificacion.fechaHora) }}</q-item-label
            >
            <q-item-label class="text-h7"
              ><strong>Mensaje:</strong>{{ notificacion.mensaje }}</q-item-label
            >
            <q-list dense padding>
              <q-item>
                <q-item-section
                  ><strong>Documento de Identidad:</strong></q-item-section
                >
                <q-item-section>
                  {{ notificacion.persona.carnetIdentidad }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section><strong>Nombre:</strong></q-item-section>
                <q-item-section>
                  {{ notificacion.persona?.nombre }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section
                  ><strong>Apellido Paterno:</strong></q-item-section
                >
                <q-item-section>
                  {{ notificacion.persona.apellidoPaterno }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section
                  ><strong>Apellido Materno:</strong></q-item-section
                >
                <q-item-section>
                  {{ notificacion.persona.apellidoMaterno }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section><strong>Profesión:</strong></q-item-section>
                <q-item-section>
                  {{ notificacion.persona.profesion }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section><strong>Estado Civil:</strong></q-item-section>
                <q-item-section>
                  {{ notificacion.persona.estadoCivil }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section><strong>Domicilio:</strong></q-item-section>
                <q-item-section>
                  {{ notificacion.persona.direccion }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section
                  ><strong>Fecha Nacimiento:</strong></q-item-section
                >
                <q-item-section>
                  {{ notificacion.persona.fechaNacimiento.split('T')[0] }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section><strong>Edad:</strong></q-item-section>
                <q-item-section>
                  {{ notificacion.persona.edad }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section><strong>Celular:</strong></q-item-section>
                <q-item-section>
                  {{ notificacion.persona.celular }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section><strong>Telefono:</strong></q-item-section>
                <q-item-section>
                  {{ notificacion.persona.telefono }}
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn color="negative" label="Cerrar" @click="closedAlert" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, watch, watchEffect } from 'vue';
import { getId } from '../services/notificacion.service';

const props = defineProps({
  view: { type: Boolean, default: false, required: true },
  id: { type: Number, default: null, required: true },
});

const emit = defineEmits<{
  'update:view': [value: boolean];
}>();

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

// const id = ref<number | null>(null);
const persona = reactive({
  id: null,
  carnetIdentidad: '',
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  fechaNacimiento: '',
  celular: '',
  telefono: '',
  direccion: '',
  edad: null as number | null,
  estadoCivil: '',
  profesion: '',
  genero: '',
});

const notificacion = reactive({
  mensaje: '',
  fechaHora: '',
  persona: persona,
});

const localAlert = ref(false);

// watch(localAlert, async (newValue) => {
//   if (newValue) {
//     try {
//       await fetchData(props.id); // Llama a fetchData cuando localAlert sea verdadero
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }
// });
watchEffect(() => {
  localAlert.value = props.view;
});

// const fetchData = async (id: number) => {
//   try {
//     const response = await getId(id);
//     console.log('response:', response);
//     const { data } = response;

//     if (data) {
//       notificacion.mensaje = data.mensaje;
//       notificacion.fechaHora = data.fechaHora;
//       Object.assign(notificacion.persona, {
//         id: data.id,
//         carnetIdentidad: data.carnetIdentidad,
//         nombre: data.nombre,
//         apellidoPaterno: data.apellidoPaterno,
//         apellidoMaterno: data.apellidoMaterno,
//         fechaNacimiento: data.fechaNacimiento,
//         celular: data.celular,
//         telefono: data.telefono,
//         direccion: data.direccion,
//         edad: data.edad,
//         estadoCivil: data.estadoCivil,
//         profesion: data.profesion,
//         genero: data.genero,
//       });
//     }
//   } catch (error) {
//     console.error('Error al obtener los datos de la persona:', error);
//     // Podrías emitir un evento para notificar al componente padre sobre el error
//   }
// };

watch(localAlert, async (newValue) => {
  if (newValue) {
    try {
      await fetchData(props.id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
});
const fetchData = async (id: number) => {
  try {
    const response = await getId(id);
    const { data } = response;

    if (data) {
      Object.assign(notificacion, {
        mensaje: data.mensaje,
        fechaHora: data.fechaHora,
        persona: { ...data.persona }, // Assuming data.persona exists
      });
    }
  } catch (error) {
    console.error('Error al obtener los datos de la persona:', error);
    // Emit an event or show a user notification
  }
};

const closedAlert = async () => {
  localAlert.value = false; // Close the dialog
  emit('update:view', false); // Emit event to the parent
  // Optionally, reset notificacion or persona if needed
};
</script>

<style scoped></style>
