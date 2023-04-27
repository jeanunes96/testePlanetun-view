import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Inspection from '../models/Inspection';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {
  inspectionApiUrl = 'https://localhost:44387/api/Inspections'
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  get(): Observable<Inspection[]>{
    console.log(this.token);
    return this.http.get<Inspection[]>(this.inspectionApiUrl, {headers: {['Authorization']: 'Bearer ' + this.token}})
  }

  create(inspection : Inspection): Observable<Inspection>{
    return this.http.post<Inspection>(this.inspectionApiUrl, inspection, {headers: {['Authorization']: 'Bearer ' + this.token}})
  }

  update(inspection : Inspection): Observable<Inspection>{
    return this.http.put<Inspection>(this.inspectionApiUrl + "/" + inspection.companyId, inspection, {headers: {['Authorization']: 'Bearer ' + this.token}})
  }

  deleteInspection(id : number){
    return this.http.delete(this.inspectionApiUrl + "/" + id, {headers: {['Authorization']: 'Bearer ' + this.token}})
  }

  


}
