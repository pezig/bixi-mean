import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Station } from '../map/map.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  private stationData: Array<Station> = [];
  dataSource = new MatTableDataSource<Station>();
  displayedColumns: string[] = ['code', 'name', 'latitude', 'longitude'];

  ngOnInit(): void {
    this.httpClient.get('stations').subscribe((data: Station[]) => {
      this.stationData = data;
      this.dataSource.data = data;
    });


    
  }

}
