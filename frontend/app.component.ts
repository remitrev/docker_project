import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Task {
  _id: string;
  title: string;
  description: string;
  done: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo List';
  tasks: Task[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.http.get<Task[]>('/api/tasks').subscribe(tasks => this.tasks = tasks);
  }

  createTask(title: string, description: string): void {
    const task = { title, description };
    this.http.post<Task>('/api/tasks', task).subscribe(task => {
      this.tasks.push(task);
    });
  }
}
