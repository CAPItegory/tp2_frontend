import { Component, Input } from '@angular/core';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist.model';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss'
})
export class ArtistComponent {

  @Input() id: string = ""

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

}
