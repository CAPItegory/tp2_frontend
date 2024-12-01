import { Component, Input } from '@angular/core';
import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {

  @Input() id: string = ""

  event: Event | null = null

  constructor(private eventService: EventService) {}

  async ngOnInit() {
    this.loadEvent();
  }

  protected async loadEvent() {
    this.eventService.getEventById(this.id).subscribe(
      (response) => {this.event = response}
    )
  }

}
