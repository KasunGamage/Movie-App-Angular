import { Movie } from './../../../models/movie';
import {
  Component,
  OnInit,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-movie-add-edit',
  templateUrl: './movie-add-edit.component.html',
  styleUrls: ['./movie-add-edit.component.scss'],
})
export class MovieAddEditComponent implements OnInit {
  movieAddEditForm: FormGroup;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  // cast
  castCtrl = new FormControl();
  casts: string[] = [];

  // genre
  genreCtrl = new FormControl();
  genres: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<MovieAddEditComponent>
  ) {}

  ngOnInit(): void {
    this.createForm();
    if (this.data.isEdit === true) {
      this.casts = this.data.item.cast;
      this.genres = this.data.item.genres;
      this.movieAddEditForm.patchValue({
        Title: this.data.item.title,
        Year: this.data.item.year,
      });
    }
  }

  createForm(): void {
    this.movieAddEditForm = this.formBuilder.group({
      Title: [null, [Validators.required, Validators.maxLength(100)]],
      Year: [null, [Validators.required]],
    });
  }

  save(): void {
    if (this.movieAddEditForm.invalid) {
      Object.keys(this.movieAddEditForm.controls).forEach((field: string) => {
        const control: AbstractControl = this.movieAddEditForm.get(field);
        control.markAsDirty({ onlySelf: true });
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      if (this.data.isEdit === true) {
        // edit
        this.edit();
      } else {
        // add
        this.add();
      }
    }
  }

  add(): void {
    const movie: Movie = {
      title: this.movieAddEditForm.value.Title,
      year: this.movieAddEditForm.value.Year,
      cast: this.casts,
      genres: this.genres,
    };
    this.matDialogRef.close(movie);
  }

  edit(): void {
    const updatedMovie: any = {
      movie: {
        title: this.movieAddEditForm.value.Title,
        year: this.movieAddEditForm.value.Year,
        cast: this.casts,
        genres: this.genres,
      },
      receivedItem: this.data.item,
    };
    this.matDialogRef.close(updatedMovie);
  }

  addCast(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add cast
    if ((value || '').trim()) {
      this.casts.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.castCtrl.setValue(null);
  }

  removeCast(cast: string): void {
    const index = this.casts.indexOf(cast);

    if (index >= 0) {
      this.casts.splice(index, 1);
    }
  }

  addGenre(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add genre
    if ((value || '').trim()) {
      this.genres.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.genreCtrl.setValue(null);
  }

  removeGenre(genre: string): void {
    const index = this.genres.indexOf(genre);

    if (index >= 0) {
      this.genres.splice(index, 1);
    }
  }
}
