import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from './../task-service.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  personalTaskCounts: any;
  globalTaskCounts: any;



  constructor(private TaskService: TaskServiceService) { 
    this.TaskService.countSubject.subscribe((counts: any) => {
      this.personalTaskCounts = counts.personalTaskCount;
      this.globalTaskCounts = counts.globalTaskCount;
    });
  }

  getCount(): void {
    const counts: {} = this.TaskService.getTaskCounts();
    this.personalTaskCounts = counts['personalTaskCount'];
    this.globalTaskCounts = counts['globalTaskCount'];
  }

  ngOnInit() {
    this.getCount();
  }

}
