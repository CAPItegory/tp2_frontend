import { Component, Input } from '@angular/core';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist.model';
import { ArtistManagementComponent } from '../artist-management/artist-management.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [ArtistManagementComponent, RouterLink],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss'
})
export class ArtistComponent {

  @Input() id: string = ""

  isHiddenEditPopUp: boolean = true
  artist: Artist | null = null

  constructor(private artistService: ArtistService) {}

  async ngOnInit() {
    this.loadArtist();
  }

  protected async loadArtist() {
    this.artistService.getArtistById(this.id).subscribe(
      (response) => {this.artist = response}
    )
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

}
