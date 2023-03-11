export interface Alarm {
  id: string; // identificador único de la alarma
  time: Date; // hora de la alarma
  repeat: boolean; // si la alarma se repite o no
  alarmOn: boolean; // si la alarma esta encendida
  alarmMute: boolean; // si la alarma esta silenciada
  days?: number[]; // si la alarma se repite, los días de la semana en los que se repite (0 para domingo, 1 para lunes, etc.)
  label?: string; // etiqueta opcional para la alarma
}
