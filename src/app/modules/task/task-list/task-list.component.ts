import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  _taskData: Task[];
  get taskData(): Task[] {
    return this._taskData;
  }
  @Input()
  set taskData(value: Task[]) {
    this._taskData = value;
    this.dataSource.data = value;
  }

  @Input() isLoading: boolean;
  @Output() addTask = new EventEmitter<string>();
  @Output() completed = new EventEmitter<number>();

  displayedColumns: string[] = [
    'description',
    'assignee',
    'completed',
    'action'
    // 'progress'
  ];
  dataSource = new MatTableDataSource<Task>([]);

  constructor(private router: Router) {}

  ngOnInit() {
    console.log(this.taskData);
  }

  add() {
    this.addTask.emit();
  }

  onCompleted(taskId: number) {
    this.completed.emit(taskId);
  }

  onGoToDetail(taskId: number) {
    this.router.navigate(['tasks', taskId]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
