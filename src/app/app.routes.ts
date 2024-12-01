import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArtistComponent } from './artist/artist.component';

export const routes: Routes = [
    { path : '', component: HomeComponent },
    { path : 'artists/:id', component: ArtistComponent }
];
