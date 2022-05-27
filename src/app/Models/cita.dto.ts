export class CitaDTO {
  _id?: string;
  start: Date;
  duracion: number;
  email: string;
  nombre: string;
  apellido1: string;
  apellido2?: string;
  servicios: string[];
  tel1: number;
  tel2: number;

  constructor(
    start: Date,
    duracion: number,
    email: string,
    nombre: string,
    apellido1: string,
    apellido2: string,
    servicios: string[],
    tel1: number,
    tel2: number
  ) {
    this.start = start;
    this.duracion = duracion;
    this.email = email;
    this.nombre = nombre;
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;
    this.servicios = servicios;
    this.tel1 = tel1;
    this.tel2 = tel2;
  }
}
