import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../Services/user.service';

@Pipe({
  name: 'mostrarUsuario',
  pure: false,
})
export class MostrarUsuarioPipe implements PipeTransform {
  valor: string = '';
  firstTime: boolean = false;

  constructor(private userService: UserService) {}

  transform(value: string): string {
    if (!this.firstTime) {
      if (this.valor !== '') {
        this.firstTime = true;
      }
      this.userService.getUserById(value).subscribe((user) => {
        this.valor = user.nombre + ' ' + user.apellido1 + ' ' + user.apellido2;
      });
    }
    return this.valor;
  }
}
