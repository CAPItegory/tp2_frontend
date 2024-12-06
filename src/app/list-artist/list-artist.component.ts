import { Component, Input } from '@angular/core';
import { ArtistService } from '../services/artist.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PopupService } from '../services/popup.service';
import { Event } from '../models/event.model';

import { PaginationBarComponent } from '../pagination-bar/pagination-bar.component';
import { Artist } from '../models/artist.model';
import { ArtistManagementComponent } from '../artist-management/artist-management.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-list-artist',
  standalone: true,
  imports: [RouterLink, PaginationBarComponent, ArtistManagementComponent, SearchBarComponent],
  templateUrl: './list-artist.component.html',
  styleUrl: './list-artist.component.scss'
})
export class ListArtistComponent {
  @Input() id: string | null = null
  artists : Artist[] = []
  isHiddenPopUp: boolean = true;

  events: Map<Artist, Event[]> = new Map()

  pageNumber: number = 0
  pageSize: number = 10
  totalPages: number = 1
  minPage = 1
  filterValue: string = ""
  
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

  setFilterValue(filter: string) {
    this.filterValue = filter
    this.loadChildren()
  }

  protected async loadChildren() {
    this.artistService.searchArtist(this.pageNumber, this.pageSize, [], this.filterValue)
    .subscribe(
      (response) => {
        this.artists = response.content;
        this.totalPages = response.totalPages;
        this.artists.forEach(a => this.setArtistEvents(a));
      });
  }

  public showCreatePopUp() {
    this.isHiddenPopUp = false;
  }

  public hidePopUp() {
    this.isHiddenPopUp = true;
  }

  async deleteArtist(id: string) {
    this.artistService.deleteArtist(id).subscribe(response => {
      this.artists = this.artists.filter(a => a.id != id)
    })
  }

}
