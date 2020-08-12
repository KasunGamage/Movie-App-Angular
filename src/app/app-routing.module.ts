import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // children: [
    //   {
    //     path: 'movies',
    loadChildren: () =>
      import('./modules/movie/movie.module').then((m: any) => m.MovieModule),
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
