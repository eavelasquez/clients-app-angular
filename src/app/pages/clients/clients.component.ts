import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Client } from '../../shared/models/client.model';
import { ClientService } from '../../shared/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {

  public pagination: any;
  public page: number = 0;
  public columns: string[];
  public message: string = null;
  public clients: Observable<Client[]>;

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.page = +params.get('page');
      this.clients = this.clientService.getAllClients(this.page).pipe(
        tap((response: any) => this.pagination = response),
        map((response: any) => {
          const clients: Client[] = (response.content as Client[]);
          this.message = clients.length === 0 ? 'No found results' : null;
          /** Displayed Columns */
          clients.forEach((value) => this.columns = Object.getOwnPropertyNames(value));
          return clients;
        })
      );
    });
  }

  public deleteClient(client: Client): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#ff4081',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // this.clients = this.clients.filter((cli) => cli !== client);
      if (result.value) {
        this.clientService.deleteClient(client.id).subscribe(() => {
          Swal.fire('Deleted!', 'The client has been deleted.', 'success');
        });
      }
    });
  }

}
