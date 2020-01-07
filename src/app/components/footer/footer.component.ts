import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [`
    footer {
      width: 100%;
      bottom: 0px;
      position: absolute;
    }
  `]
})
export class FooterComponent {

  public info: Information = { title: 'Application Angular', year: new Date().getFullYear() };

  constructor() { }

}

interface Information { title: string, year: number }
