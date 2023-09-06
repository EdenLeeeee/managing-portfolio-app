import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatRow, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Constant, Task } from 'core';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @ViewChildren(MatRow, { read: ElementRef }) rows!: QueryList<
  ElementRef<HTMLTableRowElement>
>;

  private paginator: MatPaginator;
  @ViewChild(MatPaginator , {static: false}) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

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
  ];
  dataSource = new MatTableDataSource<Task>([]);
  pageSize: number;

  constructor(private router: Router, private constant: Constant) {
    this.pageSize = this.constant.PAGE_SIZE;
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
