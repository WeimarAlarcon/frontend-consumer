import { PersonaInterface } from './persona.interface';

export interface NotificacionInterface {
  id: number;
  fechaHora: string;
  mensaje: string;
  persona: PersonaInterface;
  estado: boolean;
}
