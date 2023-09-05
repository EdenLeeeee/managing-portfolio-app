import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent implements OnInit {
  formGroup = new FormGroup({
    description: new FormControl('', Validators.required)
  });
  constructor(private dialogRef: MatDialogRef<AddTaskDialogComponent>) {}

  ngOnInit() {}

  get description() {
    return this.formGroup.get('description');
  }

  confirm() {
    this.dialogRef.close(this.description.value);
  }
}
