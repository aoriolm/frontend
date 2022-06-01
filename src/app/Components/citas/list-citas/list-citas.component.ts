import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitaDTO } from 'src/app/Models/cita.dto';
import { CitaService } from 'src/app/Services/cita.service';
import { ServicioService } from 'src/app/Services/servicio.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-list-citas',
  templateUrl: './list-citas.component.html',
  styleUrls: ['./list-citas.component.sass'],
})
export class ListCitasComponent implements OnInit {
  citas!: CitaDTO[];
  citasTexto!: CitaDTO[];

  constructor(
    private router: Router,
    private citaService: CitaService,
    private userService: UserService,
    private servicioService: ServicioService
  ) {
    this.loadCitas();
  }

  ngOnInit(): void {}

  private loadCitas(): void {
    this.citaService.obtenerCitas().subscribe((citas) => {
      this.citas = citas;
    });
  }

  createCita(): void {
    this.router.navigateByUrl('cita/');
  }

  updateCita(citaId: string): void {
    this.router.navigateByUrl('cita/' + citaId);
    //this.router.navigateByUrl('/user/category/' + categoryId);
  }

  deleteCita(): void {
    this.router.navigateByUrl('cita/');
  }
}
