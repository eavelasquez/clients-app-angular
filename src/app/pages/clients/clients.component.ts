import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../../shared/models/client.model';
import { ClientService } from '../../shared/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {

  public columns: String[];
  public message: string = '';
  public clients: Observable<Client[]>;

  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
    /** Displayed Columns */
    this.clients = this.clientService.getAllClients().pipe(map((clients: Client[]) => {
      this.message = clients.length === 0 ? 'No found results' : null;
      clients.forEach((value) => this.columns = Object.getOwnPropertyNames(value));
      return clients;
    }));
  }

}
