import { PersonaInterface } from './persona.interface';

export interface NotificacionInterface {
  fechaHora: string;
  mensaje: string;
  persona: PersonaInterface;
  estado: boolean;
}
