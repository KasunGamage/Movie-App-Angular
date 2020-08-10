import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/api/movie.service';
import { Movie } from '../../../models/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movieList: Movie[];
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieList = [];
    this.getList();
  }

  getList(): void {
    this.movieService.getAll().subscribe(
      (response: Movie[]) => {
        console.log(response);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
