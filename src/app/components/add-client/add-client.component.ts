import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';

import { Client } from '../../shared/models/client.model';
import { ClientService } from '../../shared/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styles: [`
    .field-container {
      display: flex;
      flex-direction: column;
    }

    .field-container > * {
      width: 100%;
    }
  `]
})
export class AddClientComponent implements OnInit {

  public errors: string[];
  public client: Client = new Client();

  constructor(
    private router: Router,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  public getErrorMessage(field: AbstractControl): string {
    return field.hasError('required') ? 'You must enter a value'
      : field.hasError('email') ? 'Not a valid email'
        : field.hasError(('minlength' || 'maxlength')) ? ' Size must be between 3 and 32 characters'
          : '';
  }

  public addClient(): void {
    this.clientService.saveClient(this.client).subscribe((response: any) => {
      const client = response.client as Client;
      this.router.navigate(['/clients']);
      Swal.fire('Successfully registered new client', `${client.name} ${client.surname}`, 'success');
    }, (err) => {
      console.log(err);
      this.errors = err.error.errors as string[];
    });
  }

  public loadClient(): void {
    this.activatedRoute.params.subscribe((params: []) => {
      const id = params['id'];
      if (id) {
        this.clientService.getOneClient(id).pipe(
          tap((client: Client) => this.client = client)
        ).subscribe();
      }
    });
  }

  public editClient(): void {
    this.clientService.updateClient(this.client).subscribe((client: Client) => {
      this.router.navigate(['/clients']);
      Swal.fire('Successfully updated client', `${client.name} ${client.surname}`, 'success');
    });
  }

}
