import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  httpHeaders: HttpHeaders;
  constructor(private httpClient: HttpClient) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
  GetAll(): Observable<HttpResponse<Course[]>> {
    return this.httpClient.get<Course[]>(environment.apiAddress + '/Catalog/GetAll', { headers: this.httpHeaders, observe: 'response' });
  }
  GetCourseWithLessons(url:string): Observable<HttpResponse<Course[]>> {
    return this.httpClient.get<Course[]>(environment.apiAddress + '/Catalog/GetCourseWithLessons/'+url, { headers: this.httpHeaders, observe: 'response' });
  }
}
