import { api } from 'src/boot/axios';
import { NotificacionInterface } from '../interfaces/notificacion.interface';

export const get = async () => {
  return await api.get('notificaciones');
};

export const post = async (persona: NotificacionInterface) => {
  try {
    const { data } = await api.post('notificaciones', persona);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getId = async (id: number) => {
  const persona = await api.get(`notificaciones/${id}`);
  return persona;
};

export const updateEstado = async (id: number) => {
  const { data } = await api.patch(`notificaciones/update/${id}`);
  return data;
};
