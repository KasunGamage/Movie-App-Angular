import { Movie } from './../../../models/movie';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-movie-add-edit',
  templateUrl: './movie-add-edit.component.html',
  styleUrls: ['./movie-add-edit.component.scss'],
})
export class MovieAddEditComponent implements OnInit {
  movieAddEditForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<MovieAddEditComponent>
  ) {}

  ngOnInit(): void {
    this.createForm();
    if (this.data.isEdit === true) {
      this.movieAddEditForm.patchValue({
        Title: this.data.item.title,
        Year: this.data.item.year,
        Cast: this.data.item.cast,
        Genres: this.data.item.genres,
      });
    }
  }

  createForm(): void {
    this.movieAddEditForm = this.formBuilder.group({
      Title: [null, [Validators.required, Validators.maxLength(100)]],
      Year: [null, [Validators.required]],
      Cast: this.formBuilder.array([]),
      Genres: this.formBuilder.array([]),
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
      cast: this.movieAddEditForm.value.Cast,
      genres: this.movieAddEditForm.value.Genres,
    };
    this.matDialogRef.close(movie);
  }

  edit(): void {
    const updatedMovie: any = {
      movie: {
        title: this.movieAddEditForm.value.Title,
        year: this.movieAddEditForm.value.Year,
        cast: this.movieAddEditForm.value.Cast,
        genres: this.movieAddEditForm.value.Genres,
      },
      receivedItem: this.data.item,
    };
    this.matDialogRef.close(updatedMovie);
  }
}
