import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { TableComponent } from './table/table.component';
import { APIInterceptor } from './api/api.service';
import { MatTableModule } from '@angular/material/table'
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true,
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
