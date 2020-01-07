import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
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

  private client: Client = new Client();

  constructor(private clientService: ClientService) { }

  ngOnInit() {
  }

  public getErrorMessage(field: AbstractControl): string {
    return field.hasError('required') ? 'You must enter a value'
    : field.hasError('email') ? 'Not a valid email'
    : field.hasError(('minlength'|| 'maxlength')) ? ' Size must be between 3 and 32 characters'
    : '';
  }

  public addClient(): void {
    this.clientService.saveClient(this.client);
  }

}
