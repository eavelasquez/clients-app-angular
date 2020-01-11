import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Client } from '../../shared/models/client.model';
import { ClientService } from '../../shared/services/client.service';
import Swal from 'sweetalert2'

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

  private client: Client = new Client();

  constructor(
    private router: Router,
    private clientService: ClientService
  ) { }

  ngOnInit() {
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
      Swal.fire('Successfully registered new client', `${client.name} ${client.surname}`, 'success')
    });
  }

}
