import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get(
    url: string,
    header: any = { 'content-Type': 'application/json' }
  ): Observable<any> {
    return this.http.get(url, this.createHeader(header));
  }

  post(
    url: string,
    body: any,
    header: any = { 'content-Type': 'application/json' }
  ): Observable<any> {
    return this.http.post(url, body, this.createHeader(header));
  }

  private createHeader(headers: any): any {
    headers = headers || {};
    const r1: {} = {
      // add other headers here
      'Access-Control-Allow-Origin': '*'
    };
    const x: any = { ...r1, ...headers };

    return {
      headers: new HttpHeaders(x),
    };
  }
}
