import { Component } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
})
export class DirectiveComponent {

  public languages: string[] = ['TypeScript', 'Java SE', 'JavaScript', 'Python'];
  public enable: boolean = true;

  constructor() { }

}
