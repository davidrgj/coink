import { Component, OnInit } from '@angular/core';

// Interfaces
import { PersonalInfo } from 'src/app/interfaces/personal-info.interface';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent  implements OnInit {

  logs: PersonalInfo[] = [];

  constructor() { }

  ngOnInit() {
    const logsData = localStorage.getItem('logs');
    if (logsData && logsData.length > 0) {
      this.logs = JSON.parse(logsData);
    }
  }

}
