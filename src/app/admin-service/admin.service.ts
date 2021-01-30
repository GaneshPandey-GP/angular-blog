import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiPath='http://52.237.72.43:8001';
  loginApiPath=this.apiPath+'/login';
  createApiPath=this.apiPath+'/create';
  readApiPath=this.apiPath+'/fetch';
  constructor(private http: HttpClient) { }
  createCategory(name:any){
    return this.http.post<any>(this.createApiPath,{
      database:"Blog",
      collection:"Categories",
      sequenceType:"categorySequence",
      idType:"categoryid",
      document:{
        name:name,
        isActive:1
      }
    })
    .pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err) => {
        return err;
      })
    );
  }
}
