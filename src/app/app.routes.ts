import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArtistComponent } from './artist/artist.component';
import { ListArtistComponent } from './list-artist/list-artist.component';
import { ListEventComponent } from './list-event/list-event.component';

export const routes: Routes = [
    { path : '', component: HomeComponent },
    { path : 'artists/:id', component: ArtistComponent },
    { path : 'list-artists', component : ListArtistComponent},
    { path : 'list-events', component : ListEventComponent}
];
