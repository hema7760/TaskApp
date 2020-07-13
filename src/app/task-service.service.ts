import { Injectable, EventEmitter } from '@angular/core';
import { TASK } from './Mock-Tasks';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  taskList: any = TASK.tasks;
  personalTaskCount: number;
  globalTaskCount: number;
  countSubject: any = new BehaviorSubject({ personalTaskCount: 0,
    globalTaskCount: 0});
  taskListSubject: any = new BehaviorSubject(this.taskList);

  constructor() {
    this.updateTaskCount(this.taskList);
    this.taskListSubject.subscribe((value) => {
        this.taskList = value;
    });
  }
  getTasksList(): [] {
    return  this.taskList;
  }

  getTaskCounts(): {} {
    return{
      personalTaskCount:  this.personalTaskCount,
      globalTaskCount: this.globalTaskCount
    };
  }


  updateTaskList(taskList): void{
    // this.taskList = taskList;
    this.updateTaskCount(this.taskList);
    this.taskListSubject.next(this.taskList);
  }
  
  updateTaskCount(taskList): void{
    const personalTaskList = this.taskList.filter((task) => {
      return task['isGlobal'] === false && task.isCompleted === false;
    });
    const globalTaskList = this.taskList.filter((task) => {
      return task['isGlobal'] === true && task.isCompleted === false;
    });
    this.personalTaskCount = personalTaskList.length;
    this.globalTaskCount = globalTaskList.length;
    this.countSubject.next({ personalTaskCount: this.personalTaskCount,
      globalTaskCount: this.globalTaskCount});
  }
  
}
