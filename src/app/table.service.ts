import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WeddingTable} from "./WeddingTable";
import {Guest} from "./guest";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }


  getAllTable(): Observable<WeddingTable[]> {
    return this.http.get<WeddingTable[]>(this.baseUrl + 'tables');
  }


  getTableNotFull(): Observable<WeddingTable> {
    return this.http.get<WeddingTable>(this.baseUrl + 'tables/listeTableNonRempli')
  }
}
