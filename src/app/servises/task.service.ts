import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url: string = 'http://localhost:5000/tasks/';

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Task[]>(this.url);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}${id}`)
  }

  persist(task: Task) {
    return this.http.post<Task>(this.url, task)
  }

  completed(id: number, completed: boolean) {
    return this.http.patch(`${this.url}${id}`, {completed: !completed})
  }

  update(task: Task) {
    return this.http.put(`${this.url}${task.id}`, task);
  }
}
