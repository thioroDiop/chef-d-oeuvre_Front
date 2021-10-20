import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WeddingTable} from "./WeddingTable";
import {RelationShip} from "./relationShip";

@Injectable({
  providedIn: 'root'
})
export class RelationService {
  baseUrl ='https://localhost:8080/api/';
  constructor(private http: HttpClient) { }


  getRelationById(idRelation:number): Observable<RelationShip> {
    return this.http.get<RelationShip>(this.baseUrl + 'relationship/'+ idRelation);
  }

  getAllRelation(): Observable<RelationShip[]> {
    return this.http.get<RelationShip[]>(this.baseUrl + 'relationship');
  }
}
