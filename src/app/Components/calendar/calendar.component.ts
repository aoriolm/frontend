import { Component, OnInit } from '@angular/core';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CitaDTO } from 'src/app/Models/cita.dto';
import { CitaService } from 'src/app/Services/cita.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
})
export class CalendarComponent implements OnInit {
  citas!: CitaDTO[];
  //public events: any[];
  public options: any;
  prueba: any;

  constructor(private citaService: CitaService) {
    this.loadCitas();
  }

  ngOnInit(): void {
    this.prueba = [
      {
        title: 'Evento 1',
        start: new Date(),
        description: 'Evento 1',
      },
      {
        title: 'Evento 2',
        start: new Date(new Date().getTime() + 86400000),
        description: 'Evento 2',
      },
      {
        title: 'Evento 3',
        start: new Date(new Date().getTime() + 86400000 * 2),
        end: new Date(new Date().getTime() + 86400000 * 3),
        description: 'Evento 3',
      },
    ];
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      locale: esLocale,
      headerToolbar: {
        start: 'prev,next',
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay,today',
      },
      editable: false,
      events: this.prueba,
    };
  }

  private loadCitas(): void {
    let errorResponse: any;
    let respuesta: any;
    this.citaService.obtenerEvents().subscribe((events) => {
      this.options.events = events;
      console.log(events);
    });
  }
}
