import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent  {
  @Output() inputChanged = new EventEmitter<string>();

  inputValue: string = '';

  onChange(event?: Event) {
    this.inputValue = (event?.target as HTMLInputElement)?.value || '';
    this.inputChanged.emit(this.inputValue.trim().toLowerCase());
  }
}
