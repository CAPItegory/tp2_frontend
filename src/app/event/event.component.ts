import { Component, Input } from '@angular/core';
import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';
import { EventManagementComponent } from '../event-management/event-management.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [EventManagementComponent, RouterLink],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {

  @Input() id: string = ""

  event: Event | null = null

  isHiddenEditPopUp: boolean = true

  constructor(private eventService: EventService) {}

  async ngOnInit() {
    this.loadEvent();
  }

  protected async loadEvent() {
    this.eventService.getEventById(this.id).subscribe(
      (response) => {this.event = response}
    )
  }

  protected hidePopUp() {
    this.isHiddenEditPopUp = true;
  }

  protected showPopUp() {
    this.isHiddenEditPopUp = false;
  }

  protected setEventData(event: Event) {
    this.event = event;
  }

}
