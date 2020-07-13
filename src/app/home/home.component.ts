import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskServiceService } from './../task-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  taskList: any;
  personalTaskList: any;
  globalTaskList: any;
  leaderTaskList: any;

  constructor(private TaskService: TaskServiceService) { 
      this.TaskService.taskListSubject.subscribe((taskList) => {
        this.taskList = taskList;
        this.updateLists(taskList);
      })
  }

  updateLists(tasklist: any): void {
    this.personalTaskList = this.taskList.filter((task) => {
      return (task['isGlobal'] === false && task['isCompleted'] === false);
    });
    this.globalTaskList = this.taskList.filter((task) => {
      return (task['isGlobal'] === true && task['isCompleted'] === false);
    });
    this.leaderTaskList = this.taskList.filter((task) => {
      return (task['isLeader'] === true && task['isCompleted'] === false);
    });
  }
  getTaskList(): void {
    this.taskList = this.TaskService.getTasksList();
    this.updateLists(this.taskList);
  }
  ngOnInit() {
    this.getTaskList();
  }

}
