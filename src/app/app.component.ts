import { Component } from '@angular/core';
import { LabAppComponent } from "./components/lab-app/lab-app.component";
import { User } from './models/user';

@Component({
  selector: 'app-root',
  imports: [LabAppComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  user: User[] = [];
  
  constructor(){ }

  
}
