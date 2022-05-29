export class CitaDTO {
  _id?: string;
  start: Date;
  user_id: string;
  servicio: string;

  constructor(start: Date, user_id: string, servicio: string) {
    this.start = start;
    this.user_id = user_id;
    this.servicio = servicio;
  }
}
