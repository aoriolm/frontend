export class UserDTO {
  id?: string;
  accessToken?: string;
  email: string;
  password: string;
  nombre: string;
  apellido1: string;
  apellido2?: string;
  nacimiento: Date;
  tel1: number;
  tel2: number;
  genero: string;
  rol: string;

  constructor(
    email: string,
    password: string,
    nombre: string,
    apellido1: string,
    apellido2: string,
    nacimiento: Date,
    tel1: number,
    tel2: number,
    genero: string,
    rol: string
  ) {
    this.email = email;
    this.password = password;
    this.nombre = nombre;
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;
    this.nacimiento = nacimiento;
    this.tel1 = tel1;
    this.tel2 = tel2;
    this.genero = genero;
    this.rol = rol;
  }
}
