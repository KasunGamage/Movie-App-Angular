import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from '../../../services/api/movie.service';
import { Movie } from '../../../models/movie';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Movie>;
  displayedColumns: string[] = ['Title', 'Year', 'Cast', 'Genres'];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Movie>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getList();
  }

  getList(): void {
    this.movieService.getAll().subscribe(
      (response: Movie[]) => {
        this.dataSource.data = response;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
