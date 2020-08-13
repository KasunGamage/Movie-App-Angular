import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MovieService } from '../../../services/api/movie.service';
import { Movie } from '../../../models/movie';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { MovieAddEditComponent } from '../movie-add-edit/movie-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Movie>;
  displayedColumns: string[] = ['Title', 'Year', 'Cast', 'Genres', 'actions'];
  public search = '';
  value: any;

  constructor(private movieService: MovieService, public dialog: MatDialog, public snack: MatSnackBar) {}

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

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  add(): void {
    const dialogRef = this.dialog.open(MovieAddEditComponent, {
      width: '500px',
      data: { isEdit: false, title: 'Add New Movie' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snack.open('Movie added successfully!', 'Close', {
          duration: 3000
        });
        // push to beginning of the array
        this.dataSource.data.unshift({
          title: result.title,
          year: result.year,
          cast: result.cast,
          genres: result.genres,
        });
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  edit(item: Movie): void {
    const dialogRef = this.dialog.open(MovieAddEditComponent, {
      width: '500px',
      data: { isEdit: true, title: 'Edit Movie', item },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.snack.open('Movie updated successfully!', 'Close', {
          duration: 3000
        });
        const data = this.dataSource.data.filter((value, key) => {
          if ((value.title === result.receivedItem.title) && (value.year === result.receivedItem.year)){
            value.title = result.movie.title;
            value.year = result.movie.year;
            value.cast = result.movie.cast;
            value.genres = result.movie.genres;
          }
          return true;
        });
        this.dataSource.data = [];
        this.dataSource.data = data;
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  delete(item: Movie): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: {
        title: 'Delete record',
        message: 'Are you sure you want to delete this record?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter((value, key) => {
          return value.title !== item.title;
        });
        this.snack.open('Movie deleted successfully!', 'Close', {
          duration: 3000
        });
      }
    });
  }
}
