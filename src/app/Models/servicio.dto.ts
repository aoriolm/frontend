export class ServicioDTO {
  _id?: string;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: number;

  constructor(
    nombre: string,
    descripcion: string,
    precio: number,
    duracion: number
  ) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.duracion = duracion;
  }
}
