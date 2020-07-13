import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from './../task-service.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers:[ DatePipe ]
})
export class AddTaskComponent implements OnInit {
  errorMessage: string = '';
  taskErrorFlag: boolean = false;
  nameErrorFlag: boolean = false;
  showLeaderType: boolean = true;
  constructor(private TaskService: TaskServiceService, public datepipe: DatePipe, private router: Router) { }

  ngOnInit() {
  }
  changeValues(event: any, field: any): void {
    if(event.target.value != '' && (field == 'taskName' && this.taskErrorFlag)){
      this.taskErrorFlag = false;
    }else if(event.target.value != '' && (field == 'userName' && this.nameErrorFlag)){
      this.nameErrorFlag = false;
    }
  }

  changeRadioInput(taskType: any): void{
    if (taskType === 'personal' ){
      this.showLeaderType = true;
    } else {
      this.showLeaderType = false;
    }
  }

  onSubmit(event: any, taskForm: any): void{
    event.preventDefault();
    if(taskForm.taskName.value != '' && taskForm.userName.value != ''){
      const task = {
        text: taskForm.taskName.value,
        isGlobal: (taskForm.taskType.value === 'personal') ? false : true,
        isLeader: (taskForm.leaderType.value === 'yes') ? true : false,
        creator: taskForm.userName.value,
        isCompleted: false,
        start: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
        end: this.datepipe.transform(new Date(), 'yyyy-MM-dd')
      };
      let tasklist: any = this.TaskService.getTasksList();
      tasklist.push(task);
      this.TaskService.updateTaskList(tasklist);
      taskForm['taskName'].value = '';
      taskForm['userName'].value = '';
      taskForm['taskType'].value = 'personal';
      taskForm['leaderType'].value = 'no';
      this.showLeaderType = true;
      document.getElementById('close-modal').click();
    } else {
      if (taskForm.taskName.value === '' && taskForm.userName.value === ''){
        this.errorMessage = 'Please enter Task and name .. !! These fields cannot be empty';
        this.taskErrorFlag = true;
        this.nameErrorFlag = true;
      } else if (taskForm.taskName.value === '') {
        this.errorMessage = 'Please enter Task .. !! This field cannot be empty';
        this.taskErrorFlag = true;
      } else if (taskForm.userName.value === '') {
        this.errorMessage = 'Please enter your name .. !! This field cannot be empty';
        this.nameErrorFlag = true;
      }
    }
    
  }
}
