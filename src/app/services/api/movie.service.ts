import { Injectable } from '@angular/core';
import { HttpService } from '../utilities/http.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private httpService: HttpService) {}

  getAll(): Observable<Movie[]>{
    const url = `${environment.apiUrl}`;
    return this.httpService.get(url);
  }

  fetchById(Id: number): Observable<Movie> {
    const url = `${environment.apiUrl}`;
    return this.httpService.get(url);
  }

  // add(){

  // }

  // edit(){

  // }
}
