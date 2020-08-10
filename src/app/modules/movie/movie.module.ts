import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieAddEditComponent } from './movie-add-edit/movie-add-edit.component';


@NgModule({
  declarations: [MovieListComponent, MovieAddEditComponent],
  imports: [
    CommonModule,
    MovieRoutingModule
  ]
})
export class MovieModule { }
