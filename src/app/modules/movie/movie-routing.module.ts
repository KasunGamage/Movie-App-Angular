import { MovieAddEditComponent } from './movie-add-edit/movie-add-edit.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MovieListComponent,
  },
  {
    path: 'add-movie',
    component: MovieAddEditComponent,
  },
  {
    path: 'edit-movie/:id',
    component: MovieAddEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieRoutingModule {}
