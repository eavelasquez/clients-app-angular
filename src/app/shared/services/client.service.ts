import { Injectable } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { Client } from '../models/client.model';
import { CLIENTS } from '../constants/clients.data';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url: string = `${environment.url}/clients`;
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getAllClients(): Observable<Client[]> {
    // return of(CLIENTS);
    /** Way 1 */
    return this.http.get(this.url, { headers: this.headers }).pipe(
      tap((response: any) => {
        console.log('Before map');
        const clients: Client[] = response.clients as Client[];
        clients.forEach((client, index) => console.log(index, client));
      }),
      map((response: any) => {
        let clients: Client[] = response.clients as Client[];
        clients = clients.map((client) => {
          client.name = client.name.toUpperCase();
          // client.createAt = formatDate(client.createAt, 'dd-MM-yyyy', 'en-US');
          // client.createAt = new DatePipe('fr').transform(client.createAt, 'dd/MM/yyyy'); /** fullDate, EEEE dd, MMMM yyyy */
          return client;
        });
        return clients;
      }),
      tap((response: any) => {
        console.log('After map');
        response.clients.forEach((client, index) => console.log(index, client));
      }),
    );
  }

  public saveClient(client: Client): Observable<Client> {
    /** Way 2 */
    return this.http.post<Client>(this.url, client, { headers: this.headers }).pipe(
      catchError((err) => {
        if (err.status === 400) {
          return throwError(err);
        }

        Swal.fire('Error');
        return throwError(err);
      })
    );
  }

  public getOneClient(id: number): Observable<Client> {
    /** Way 3 */
    return this.http.get(`${this.url}/${id}`, { headers: this.headers }).pipe(
      map((client: Client) => client),
      catchError((err: any) => {
        Swal.fire('Error', err.error.message, 'error');
        this.router.navigate(['/clients']);
        return throwError(err);
      })
    );
  }

  public updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.url}/${client.id}`, client, { headers: this.headers });
  }

  public deleteClient(id: number): Observable<Client> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.headers }).pipe(
      map((client) => client as Client)
    );
  }
}
