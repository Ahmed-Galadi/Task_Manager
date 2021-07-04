import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/servises/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  disabelNewButton = true;
  showInput = false;
  updateForm = false;
  tasks: Task[] = [];
  resultTasks: Task[] = [];
  myTask: Task = {
    label: '',
    completed: false
  };

  searchText = '';
  noResults = true ;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskService.findAll().subscribe(tasks => {
      this.resultTasks = this.tasks = tasks
    });
  }

  onDelete(id: number) {
    this.taskService.delete(id)
        .subscribe(() => {
      this.resultTasks = this.tasks = this.tasks.filter(task => task.id != id )
    });
  }

  persistTask() {

      this.taskService.persist(this.myTask).subscribe((task) => {
      this.resultTasks = this.tasks = [task, ...this.tasks];
      this.reset();
      this.showInput = false;
      this.disabelNewButton = true;
    });
  }
  reset() {
    this.myTask = {
      label: '',
      completed: false
    }
  }

  toggelCompleted(task: Task) {
    this.taskService.completed(task.id, task.completed).subscribe(() => {
      task.completed = !task.completed
    })
  }

  editTask(task: Task) {
    this.myTask = task;
    this.updateForm = !this.updateForm;
    this.showInput = true;
    this.disabelNewButton = false
  }

  updateTask() {
    this.taskService.update(this.myTask)
        .subscribe(() => {
          this.reset();
          this.updateForm = false;
          this.showInput = false;
          this.disabelNewButton = true;
        })
  }

  addTask() {
    this.showInput = true;
    this.disabelNewButton = false;
  }

  searchTasks() {

  this.resultTasks = this.tasks.filter((task) => task.label.toLowerCase().includes(this.searchText.toLowerCase()));
  }
}

