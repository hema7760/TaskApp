import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from './../task-service.service';
declare var $: any;

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  taskList: any;
  filterClicked:boolean = false;
  constructor(private TaskService : TaskServiceService) { }

  getTaskList(): void {
    this.taskList = this.TaskService.getTasksList();
  }
  resetFilter(event, formData): void {
    formData['filterCategory'].value = 'personal';
    formData['sortByCategory'].value = 'userName';
    this.filterClicked = false;
    this.taskList = this.TaskService.getTasksList();
  }
  showModal():void {
    $("#addTaskModal").modal('show');
  }
  hideModal():void {
    document.getElementById('close-modal').click();
  }

  filterTaskList(event: Event, form: any): void {
    event.preventDefault();
    this.filterClicked = true;
    const filterCategory = form['filterCategory'].value;
    const sortCategory = form['sortByCategory'].value;
    const tasks = this.TaskService.getTasksList();
    let filteredTaskList;

    if (filterCategory === 'personal') {
       filteredTaskList = tasks.filter((task) => {
        return task['isGlobal'] === false;
      });
       this.taskList = filteredTaskList;
    } else if (filterCategory === 'global') {
      filteredTaskList = tasks.filter((task) => {
       return task['isGlobal'] === true;
     });
      this.taskList = filteredTaskList;
   } else if (filterCategory === 'leader'){
       filteredTaskList = tasks.filter((task) => {
        return task['isLeader'] === true;
      });
       this.taskList = filteredTaskList;
    } else if (filterCategory === 'otherEngineer') {
       filteredTaskList = tasks.filter((task) => {
        return (task['isLeader'] === false && task['isGlobal'] === true);
      });
       this.taskList = filteredTaskList;
    }
    
    if(sortCategory === 'userName'){
       this.taskList = this.taskList.sort((a,b) => {
        return (a.creator - b.creator);
       });
    } else if (sortCategory === 'endDate'){
      this.taskList = this.taskList.sort((a,b) => {
        return (a.end - b.end);
      });
    }
  }
  changeCompletedStatus(i): void {
    this.taskList[i].isCompleted = !this.taskList[i].isCompleted;
    this.TaskService.updateTaskCount(this.taskList);
    console.log(this.taskList[i].isCompleted);
  }
  ngOnInit() {
    this.getTaskList();
  }
}
