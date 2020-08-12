import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieAddEditComponent } from './movie-add-edit/movie-add-edit.component';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentSharedModule } from '../../shared/components/component-shared.module';
@NgModule({
  declarations: [MovieListComponent, MovieAddEditComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentSharedModule
  ]
})
export class MovieModule { }
