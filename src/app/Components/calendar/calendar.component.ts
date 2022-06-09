import { Component, OnInit } from '@angular/core';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
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
  public options: any;
  prueba: any;

  constructor(private citaService: CitaService) {
    this.loadCitas();
  }

  ngOnInit(): void {
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
      initialView: 'listWeek',
      locale: esLocale,
      headerToolbar: {
        start: 'prev,next',
        center: 'title',
        end: 'timeGridDay,listDay,listWeek,listMonth',
      },
      views: {
        timeGridDay: { buttonText: 'Día horas' },
        listDay: { buttonText: 'Día lista' },
        listWeek: { buttonText: 'Semana lista' },
        listMonth: { buttonText: 'Mes lista' },
      },
      editable: false,
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
