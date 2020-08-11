import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MovieAddEditComponent } from './modules/movie/movie-add-edit/movie-add-edit.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Movie-App-Angular';
  constructor(public dialog: MatDialog) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(MovieAddEditComponent, { width: '500px'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
