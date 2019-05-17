import { Component } from '@angular/core';
import { RestService } from '../app/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor() {}
  title = 'park-list';
}

