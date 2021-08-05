import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {Role} from "./role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseUrl ='http://localhost:8080/api/';
  constructor(private http: HttpClient) { }


  getRoleById(idRole:number): Observable<Role> {
    return this.http.get<Role>(this.baseUrl + 'roles/'+ idRole);
  }

  getAllRole(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl + 'roles');
  }
}
