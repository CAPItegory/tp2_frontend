import { Component, Input } from '@angular/core';
import { ArtistService } from '../services/artist.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PopupService } from '../services/popup.service';
import { Event } from '../models/event.model';

import { PaginationBarComponent } from '../pagination-bar/pagination-bar.component';
import { Artist } from '../models/artist.model';

@Component({
  selector: 'app-list-artist',
  standalone: true,
  imports: [RouterLink, PaginationBarComponent],
  templateUrl: './list-artist.component.html',
  styleUrl: './list-artist.component.scss'
})
export class ListArtistComponent {
  @Input() id: string | null = null
  artists : Artist[] = []

  events: Map<Artist, Event[]> = new Map()

  pageNumber: number = 1
  pageSize: number = 10
  totalPages: number = 1
  minPage = 1
  
  constructor(private artistService: ArtistService, private activatedRoute : ActivatedRoute, private popupService : PopupService) {}

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

  setArtistEvents(artist: Artist) {
    this.artistService.getEventsByArtist(artist.id).subscribe(result => this.events.set(artist, result));
  }

  protected async loadChildren() {
    this.artistService.searchArtist(this.pageNumber, this.pageSize, [])
    .subscribe(
      (response) => {
        this.artists = response.content;
        this.totalPages = response.totalPages;
        this.artists.forEach(a => this.setArtistEvents(a));
      });
  }

}
