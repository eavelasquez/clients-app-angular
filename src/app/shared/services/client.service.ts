import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Client } from '../models/client.model';
// import { CLIENTS } from '../constants/clients.data';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url: string = `${environment.url}/clients`;
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  public getAllClients(): Observable<Client[]> {
    // return of(CLIENTS);
    // return this.http.get(this.url, { headers: this.headers }).pipe(map((clients: Client[]) => clients));
    return this.http.get(this.url, { headers: this.headers }).pipe(
      map((clients) => clients as Client[])
    );
  }

  public saveClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.url, client, { headers: this.headers });
  }

  /** --------------------------------------------------- */

  public updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(this.url, client, { headers: this.headers });
  }

  public deleteClient(client: Client): Observable<Client> {
    return this.http.delete<Client>(this.url, { headers: this.headers });
  }
}
