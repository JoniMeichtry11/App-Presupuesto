import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Plantilla } from '../model/plantilla';

@Injectable({
  providedIn: 'root'
})
export class PlantillasService {

  URL_API = "https://presupuestoapp-11.herokuapp.com/home";

  presupuesto: Plantilla[] = [];

  constructor(private http: HttpClient) { }

  // METODOS HTTP

  getPresupuesto(id: any){
    return this.http.get(`${this.URL_API}/${id}`);
  }

  getPresupuestos(): Observable<any>{
    return this.http.get(this.URL_API)
  }

  setPresupuesto(plantilla: any): Observable<any>{
    return this.http.post(this.URL_API, plantilla);
  }

  updatePresupuesto(_id: string, plantilla: any): Observable<any>{
    return this.http.put(`${this.URL_API}/${_id}`, plantilla);
  }

  deletePresupuesto(_id: string): Observable<Object>{
    return this.http.delete(`${this.URL_API}/${_id}`)
  }

}
