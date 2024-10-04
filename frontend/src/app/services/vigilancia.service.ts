import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vigilancia } from '../models/vigilancia'; // Ajusta la ruta según tu estructura de proyecto

@Injectable({
  providedIn: 'root',
})
export class VigilanciaService {
  private hostBase: string;

  constructor(private _http: HttpClient) {
    this.hostBase = 'http://localhost:3000/api/vigilancia'; // URL base para la API de Vigilancia
  }

  // Obtener todas las vigilancias
  getVigilancias(): Observable<any> {
    return this._http.get(this.hostBase + '/');
  }

  // Obtener una vigilancia por ID
  getVigilancia(id: string): Observable<any> {
    return this._http.get(this.hostBase + '/' + id);
  }

  // Crear una nueva vigilancia
  createVigilancia(data: Vigilancia): Observable<any> {
    return this._http.post(this.hostBase + '/', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  // Editar una vigilancia
  editVigilancia(id: string, data: Vigilancia): Observable<any> {
    return this._http.put(this.hostBase + '/' + id, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  // Eliminar una vigilancia
  deleteVigilancia(id: string): Observable<any> {
    return this._http.delete(this.hostBase + '/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}
