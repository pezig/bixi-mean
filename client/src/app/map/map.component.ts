import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ApplicationRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import L from 'leaflet';
import { FourDService, LeafletHelper } from '4d-mapper';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private stationData: Array<Station> = [];
  private leafMap: L;
  private leafletHelper: LeafletHelper;

  constructor(private httpClient: HttpClient) {}



  ngOnInit(): void {
    this.initLeaflet();
    this.httpClient.get('stations').subscribe((data: Station[]) => {
      this.stationData = data;
      this.stationData.forEach((station) => {
        L.marker([station.latitude, station.longitude])
          .bindPopup(station.name)
          .addTo(this.leafMap);
      });
    });
  }

  initLeaflet() {
    this.leafMap = new L.Map('leaflet-map');
    this.leafletHelper = new LeafletHelper(this.leafMap, L);
    this.leafMap.setView(new L.LatLng(45.5, -73.56), 12);
    L.tileLayer(`https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png`, {
      maxZoom: 20,
      attribution: 'HOT',
    }).addTo(this.leafMap);
  }
}

export type Station = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Code: string;
  name: string;
  latitude: string;
  longitude: string;
};
