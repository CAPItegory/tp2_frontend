import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArtistService } from '../services/artist.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Artist } from '../models/artist.model';
import { PopupService } from '../services/popup.service';

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


  constructor(private artistService: ArtistService, private popupService: PopupService) {}

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
    if ((this.artistForm.value.name?.length ?? 0) < 3) {
      this.popupService.openWarning("Invalid name, too short")
      return;
    }
    this.hiddenChange.emit(true);
    this.artistService.createArtist(this.artistForm.value.name ?? "").subscribe(
      (artist) => {this.artistChange.emit(artist); this.popupService.openSuccess("Artist created")}
    );
  }




  async editArtist(): Promise<void> {
    if ((this.artistForm.value.name?.length) ?? 0 < 3) {
      this.popupService.openWarning("Invalid name, too short")
      return;
    }
    this.hiddenChange.emit(true);
    this.artistService.editArtist(this.artistId ?? "", this.artistForm.value.name ?? "").subscribe(
      (artist) => {this.artistChange.emit(artist); this.popupService.openSuccess("Artist edited")}
    )
  }

  hidePopup(): void {
    this.hiddenChange.emit(true)
  }
}
