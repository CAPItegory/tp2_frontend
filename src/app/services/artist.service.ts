import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Artist } from '../models/artist.model';
import { SearchArtistResult } from '../models/search-artists.model';

@Injectable({
    providedIn: 'root'
})
export class ArtistService {
    private apiUrl = environment.apiUrl + '/artists'

    constructor(private http: HttpClient) { }

    getArtistById(id: string): Observable<Artist> {
        return this.http.get<Artist>(`${this.apiUrl}/${id}`);
    }

    editArtist(id: string, label: string): Observable<Artist> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<Artist>(`${this.apiUrl}/${id}`, {'label': label}, { headers });
    }

    deleteArtist(id: string): void {
        this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    createArtist(label: string): Observable<Artist> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<Artist>(this.apiUrl, {label: label}, { headers });
    }
    
    getEventsByArtist(artistId: string): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiUrl}/${artistId}/events`);
    }

    searchArtist(page: number, size: number, sort: string[]): Observable<SearchArtistResult> {
        let params = new HttpParams();
        params.append("page", page)
        params.append("size", size)
        params.append("sort", sort.toString())
        return this.http.get<SearchArtistResult>(this.apiUrl, { params });
    }
}