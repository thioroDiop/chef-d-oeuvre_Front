import {Component, OnInit} from '@angular/core';
import {TableService} from "../table.service";
import {WeddingTable} from "../WeddingTable";
import {Guest} from "../guest";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  tableList: WeddingTable[] = [];
  guestlist: Guest[]=[];


  constructor(private tableService: TableService) {
  }

  ngOnInit(): void {
    this.tableService.getAllTable().subscribe(result => {
      this.tableList = result;
    });

  };



}
