import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "./task";

@Injectable({
  providedIn: 'root'

})
export class TaskService {
  baseUrl ='https://localhost:8080/api/';
  constructor(private http: HttpClient) { }

//liste des taches
  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + 'taches');
  }

}
