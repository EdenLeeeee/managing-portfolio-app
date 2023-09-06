import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { SearchInputComponent, TitleHeaderComponent } from 'shared';

@NgModule({
  declarations: [TitleHeaderComponent, SearchInputComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
  providers: [],
  exports: [
    TitleHeaderComponent,
    SearchInputComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class SharedModule {}
