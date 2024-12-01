import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArtistComponent } from './artist/artist.component';
import { EventComponent } from './event/event.component';

export const routes: Routes = [
    { path : '', component: HomeComponent },
    { path : 'artists/:id', component: ArtistComponent },
    { path : 'events/:id', component: EventComponent}
];
