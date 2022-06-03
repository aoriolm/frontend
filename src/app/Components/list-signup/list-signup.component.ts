import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/Models/user.dto';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-list-signup',
  templateUrl: './list-signup.component.html',
  styleUrls: ['./list-signup.component.sass'],
})
export class ListSignupComponent implements OnInit {
  clientes!: UserDTO[];

  constructor(private router: Router, private userService: UserService) {
    this.loadClientes();
  }

  ngOnInit(): void {}

  loadClientes(): void {
    this.userService.getUsers().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  createCliente(): void {
    this.router.navigateByUrl('signup');
  }

  updateCliente(id: string): void {
    this.router.navigateByUrl('profile/' + id);
  }

  deleteCliente(clienteId: string, usuarioNombre: string): void {
    let result = confirm(
      'Desea eliminar el cliente con el nombre: ' + usuarioNombre + ' .'
    );
    if (result) {
      this.userService.deleteUser(clienteId).subscribe((response) => {
        console.log('Lo que devuelve eliminar evento: ', response);
        if (response.deletedCount > 0) {
          this.loadClientes();
        } else {
          console.log('No se ha podido eliminar el cliente');
          return;
        }
      });
    }
  }
}
