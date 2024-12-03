import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
   // AGREGAR EXPLICAION

  private API_SERVER = 'http://localhost:8080/pais/';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllPaises(): Observable<any> {
    return this.httpClient.get(this.API_SERVER);
  }
}
