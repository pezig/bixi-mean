import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Station } from '../map/map.component';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  constructor(private httpClient: HttpClient) {}

  private stationData: Array<Station> = [];
  dataSource = new MatTableDataSource<Station>();
  displayedColumns: string[] = ['code', 'name', 'latitude', 'longitude'];

  ngOnInit(): void {
    this.httpClient.get('stations').subscribe((data: Station[]) => {
      this.stationData = data;
      this.dataSource.data = data;
    });
  }

  sortColumn(sort: Sort) {
    this.httpClient
      .post('stations/sort', { col: sort.active, direction: sort.direction })
      .subscribe((data: Station[]) => {
        this.dataSource.data = data;
      });
  }
}
