import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArtistService } from '../services/artist.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Artist } from '../models/artist.model';

@Component({
  selector: 'app-artist-management',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './artist-management.component.html',
  styleUrl: './artist-management.component.scss'
})
export class ArtistManagementComponent {
  @Input() editMode: boolean = false

  @Output() hiddenChange: EventEmitter<boolean> = new EventEmitter()
  @Output() artistChange: EventEmitter<Artist> = new EventEmitter()

  @Input() artistId: string | null = null


  constructor(private artistService: ArtistService) {}

  artistForm = new FormGroup({
      name : new FormControl('')
  });

  manageArtist(): void {
    if (this.editMode) {
      this.editArtist()
    } else {
      this.createArtist()
    }
  }



  async createArtist(): Promise<void> {
    this.hiddenChange.emit(true);
    this.artistService.createArtist(this.artistForm.value.name ?? "").subscribe(
      (artist) => this.artistChange.emit(artist)
    );
  }




  async editArtist(): Promise<void> {
    this.hiddenChange.emit(true);
    this.artistService.editArtist(this.artistId ?? "", this.artistForm.value.name ?? "").subscribe(
      (artist) => this.artistChange.emit(artist)
    )
  }

  hidePopup(): void {
    this.hiddenChange.emit(true)
  }
}
