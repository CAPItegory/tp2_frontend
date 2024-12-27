import { Component, Input } from '@angular/core';
import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';
import { EventManagementComponent } from '../event-management/event-management.component';
import { RouterLink } from '@angular/router';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist.model';
import { NgSelectComponent } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [EventManagementComponent, RouterLink, NgSelectComponent, FormsModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {

  @Input() id: string = ""

  event: Event | null = null
  isHiddenEditPopUp: boolean = true
  artists: Artist[] = []
  selectedArtist: Artist | null = null;
  artistPage: number = 0

  constructor(private eventService: EventService, private artistService: ArtistService) {}

  async ngOnInit() {
    this.loadEvent();
    this.loadArtists()
  }

  protected async loadEvent() {
    this.eventService.getEventById(this.id).subscribe(
      (response) => {this.event = response}
    )
  }

  protected async loadArtists() {
    this.artistService.searchArtist(this.artistPage, 10, [], "").subscribe(
      (response) => {this.artists = this.artists.concat(response.content)}
    )
  }

  protected async fetchMore() {
    this.artistPage += 1;
    await this.loadArtists();
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

  protected linkWithArtist() {
    if (this.event == null || this.selectedArtist == null) {
      return;
    }
    this.eventService.linkEventToArtist(this.selectedArtist.id, this.event.id).subscribe(
      () => this.loadEvent()
    )
  }

  protected unlinkWithArtist(artistId: string) {
    if (this.event == null) {
      return;
    }
    this.eventService.unlinkEventToArtist(artistId, this.event.id).subscribe(
      () => this.loadEvent()
    )
  }

}
