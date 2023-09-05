import { Component, OnInit } from '@angular/core';
import { BackendService } from 'core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks = this.backend.tasks();
  users = this.backend.users();

  constructor(private backend: BackendService) {}

  ngOnInit() {}
}
