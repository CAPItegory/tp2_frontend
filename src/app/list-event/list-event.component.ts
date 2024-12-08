import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PopupService } from '../services/popup.service';

import { PaginationBarComponent } from '../pagination-bar/pagination-bar.component';
import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';
import { EventManagementComponent } from '../event-management/event-management.component';

@Component({
  selector: 'app-list-artist',
  standalone: true,
  imports: [RouterLink, PaginationBarComponent, EventManagementComponent],
  templateUrl: './list-event.component.html',
  styleUrl: './list-event.component.scss'
})
export class ListEventComponent {

  @Input() id: string | null = null
  events : Event[] = []
  isHiddenPopUp: boolean = true;

  pageNumber: number = 0
  pageSize: number = 3
  totalPages: number = 1
  minPage = 1
  
  constructor(private eventService: EventService, private activatedRoute : ActivatedRoute, private popupService : PopupService) {}

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async (params) => {
      this.id = params.get('id');
      this.loadChildren()
    });
  }

  pageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.loadChildren();
  }

  protected async loadChildren() {
    this.eventService.searchEvents(this.pageNumber, this.pageSize, [])
    .subscribe(
      (response) => {
        this.events = response.content;
        this.totalPages = response.totalPages;
      });
  }

  public showCreatePopUp() {
    this.isHiddenPopUp = false;
  }

  public hidePopUp() {
    this.isHiddenPopUp = true;
  }

}
