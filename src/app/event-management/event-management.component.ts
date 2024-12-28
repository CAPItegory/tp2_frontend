import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PopupService } from '../services/popup.service';

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


  constructor(private eventService: EventService, private popupService: PopupService) {}

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
    if ((this.eventForm.value.name?.length ?? 0) < 3) {
      this.popupService.openWarning("Invalid name, too short")
      return;
    }
    var startDate = (this.eventForm.value.startDate ?? "") == "" ? new Date() : new Date(this.eventForm.value.startDate!)
    var endDate = (this.eventForm.value.endDate ?? "") == "" ? new Date() : new Date(this.eventForm.value.endDate!)
    if (startDate < new Date()) {
      this.popupService.openWarning("Invalid date, begin before today")
      return;
    }
    if (startDate > endDate) {
      this.popupService.openWarning("Invalid date, begin after the end")
      return;
    }
    this.hiddenChange.emit(true);
    this.eventService.createEvent(this.eventForm.value.name ?? "", 
      startDate, endDate
      ).subscribe(
      (event) => {this.eventChange.emit(event); this.popupService.openSuccess("Event created")}
    );
  }




  async editEvent(): Promise<void> {
    if ((this.eventForm.value.name?.length ?? 0) < 3) {
      this.popupService.openWarning("Invalid name, too short")
      return;
    }
    var startDate = (this.eventForm.value.startDate ?? "") == "" ? new Date() : new Date(this.eventForm.value.startDate!)
    var endDate = (this.eventForm.value.endDate ?? "") == "" ? new Date() : new Date(this.eventForm.value.endDate!)
    if (startDate < new Date()) {
      this.popupService.openWarning("Invalid date, begin before today")
      return;
    }
    if (startDate > endDate) {
      this.popupService.openWarning("Invalid date, begin after the end")
      return;
    }
    this.hiddenChange.emit(true);
    this.eventService.editEvent(this.eventId ?? "", this.eventForm.value.name ?? "",
      startDate, endDate 
    ).subscribe(
      (event) => {this.eventChange.emit(event); this.popupService.openSuccess("Event edited")}
    )
  }

  hidePopup(): void {
    this.hiddenChange.emit(true)
  }
}
