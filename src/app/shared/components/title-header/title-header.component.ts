import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-title-header',
  templateUrl: './title-header.component.html',
  styleUrls: ['./title-header.component.scss']
})
export class TitleHeaderComponent {
  @Input() titleStr: string;
  @Input() isEdit: boolean;
  @Input() isShowSave: boolean;
  @Input() isDisabledSave: boolean;

  @Output() save = new EventEmitter();
  @Output() close = new EventEmitter();

  onSave() {
    this.save.emit();
  }

  onClose() {
    this.close.emit();
  }
}
