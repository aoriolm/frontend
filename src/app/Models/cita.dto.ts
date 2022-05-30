export class CitaDTO {
  _id?: string;
  start: Date;
  user_id: string;
  servicio: string;
  idEvento: string;

  constructor(
    start: Date,
    user_id: string,
    servicio: string,
    idEvento: string
  ) {
    this.start = start;
    this.user_id = user_id;
    this.servicio = servicio;
    this.idEvento = idEvento;
  }
}
