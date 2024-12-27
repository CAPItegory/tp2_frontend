import { Component, Input } from '@angular/core';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist.model';
import { ArtistManagementComponent } from '../artist-management/artist-management.component';
import { RouterLink } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [ArtistManagementComponent, RouterLink, NgSelectComponent, FormsModule],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss'
})
export class ArtistComponent {

  @Input() id: string = ""

  isHiddenEditPopUp: boolean = true
  artist: Artist | null = null
  artistEvents: Event[] = []
  events: Event[] = []
  selectedEvent: Event | null = null;
  eventPage: number = 0

  constructor(private artistService: ArtistService, private eventService: EventService) {}

  async ngOnInit() {
    await this.loadArtist();
    await this.loadEvents();
  }

  protected async loadArtist() {
    this.artistService.getArtistById(this.id).subscribe(
      (response) => {this.artist = response; this.loadArtistEvents()}
    )
  }

  protected async loadEvents() {
    this.eventService.searchEvents(this.eventPage, 10, []).subscribe(
      (response) => {this.events = this.events.concat(response.content)}
    )
  }

  protected async loadArtistEvents() {
    if (this.artist == null) {
      return;
    }
    this.artistService.getEventsByArtist(this.artist?.id).subscribe(
      (response) => {this.artistEvents = response}
    )
  }

  protected async fetchMore() {
    this.eventPage += 1;
    await this.loadEvents();
  }

  protected hidePopUp() {
    this.isHiddenEditPopUp = true;
  }

  protected showPopUp() {
    this.isHiddenEditPopUp = false;
  }

  protected setArtistData(artist: Artist) {
    this.artist = artist;
  }

  protected linkWithEvent() {
    if (this.artist == null || this.selectedEvent == null) {
      return;
    }
    this.eventService.linkEventToArtist(this.artist.id, this.selectedEvent.id).subscribe(
      (response) => this.loadArtistEvents()
    )
  }

  protected unlinkWithEvent(eventId: string) {
    if (this.artist == null) {
      return;
    }
    this.eventService.unlinkEventToArtist(this.artist.id, eventId).subscribe(
      (response) => this.loadArtistEvents()
    )
  }

}
