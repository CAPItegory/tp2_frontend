import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-management',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './event-management.component.html',
  styleUrl: './event-management.component.scss'
})
export class EventManagementComponent {
  @Input() editMode: boolean = false

  @Output() hiddenChange: EventEmitter<boolean> = new EventEmitter()
  @Output() eventChange: EventEmitter<Event> = new EventEmitter()

  @Input() eventId: string | null = null


  constructor(private eventService: EventService) {}

  eventForm = new FormGroup({
      name : new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl('')
  });

  manageEvent(): void {
    if (this.editMode) {
      this.editEvent()
    } else {
      this.createEvent()
    }
  }



  async createEvent(): Promise<void> {
    this.hiddenChange.emit(true);
    this.eventService.createEvent(this.eventForm.value.name ?? "", 
      this.eventForm.value.startDate == null ? new Date() : new Date(this.eventForm.value.startDate), 
      this.eventForm.value.endDate == null ? new Date() : new Date(this.eventForm.value.endDate)).subscribe(
      (event) => this.eventChange.emit(event)
    );
  }




  async editEvent(): Promise<void> {
    this.hiddenChange.emit(true);
    this.eventService.editEvent(this.eventId ?? "", this.eventForm.value.name ?? "",
      this.eventForm.value.startDate == null ? new Date() : new Date(this.eventForm.value.startDate), 
      this.eventForm.value.endDate == null ? new Date() : new Date(this.eventForm.value.endDate)
    ).subscribe(
      (event) => this.eventChange.emit(event)
    )
  }

  hidePopup(): void {
    this.hiddenChange.emit(true)
  }
}
