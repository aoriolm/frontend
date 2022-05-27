export class EventDTO {
  id?: string;
  start: Date;
  end: Date;
  title: string;

  constructor(start: Date, end: Date, title: string) {
    this.start = start;
    this.end = end;
    this.title = title;
  }
}
