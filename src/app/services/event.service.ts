import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SearchEventResult } from '../models/search-events.model';
import { Event } from "../models/event.model"

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private apiUrl = environment.apiUrl + '/events'

    constructor(private http: HttpClient) { }

    getEventById(id: string): Observable<Event> {
        return this.http.get<Event>(`${this.apiUrl}/${id}`);
    }

    editEvent(id: string, label: string, startDate: Date, endDate: Date): Observable<Event> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<Event>(`${this.apiUrl}/${id}`, {"label": label, "startDate": startDate, "endDate": endDate}, { headers });
    }

    deleteEvent(id: string): void {
        this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    createEvent(label: string, startDate: Date, endDate: Date): Observable<Event> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<Event>(this.apiUrl, {"label": label, "startDate": startDate.toLocaleDateString('sv'), "endDate": endDate.toLocaleDateString('sv')}, { headers });
    }

    searchEvents(page: number, size: number, sort: string[]): Observable<SearchEventResult> {
        let params = new HttpParams();
        params = params.append("page", page)
        params = params.append("size", size)
        params = params.append("sort", sort.toString())
        return this.http.get<SearchEventResult>(this.apiUrl, { params: params });
    }
}