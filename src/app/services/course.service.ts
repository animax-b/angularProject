import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  httpHeaders: HttpHeaders;
  constructor(private httpClient: HttpClient) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
  GetAll(): Observable<HttpResponse<Course[]>> {
    return this.httpClient.get<Course[]>(environment.apiAddress + '/Course/GetAll', { headers: this.httpHeaders, observe: 'response' });
  }
  Get(id:number): Observable<HttpResponse<Course>> {
    return this.httpClient.get<Course>(environment.apiAddress + '/Course/Get/'+id, { headers: this.httpHeaders, observe: 'response' });
  }
  Add(course: Course): Observable<HttpResponse<any>> {
    return this.httpClient.post<HttpResponse<any>>(environment.apiAddress + '/Course/Add', course, { headers: this.httpHeaders, observe: 'response' });
  }
  Update(course: Course): Observable<HttpResponse<any>> {
    return this.httpClient.put<HttpResponse<any>>(environment.apiAddress + '/Course/Update', course, { headers: this.httpHeaders, observe: 'response' });
  }
  Delete(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete<HttpResponse<any>>(environment.apiAddress + '/Course/Delete/' + id, { headers: this.httpHeaders, observe: 'response' });
  }
}
