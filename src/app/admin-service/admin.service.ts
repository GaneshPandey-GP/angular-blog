import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiPath='http://127.0.0.1:5001';
  loginApiPath=this.apiPath+'/login';
  createApiPath=this.apiPath+'/create';
  readApiPath=this.apiPath+'/fetch';
  updateApiPath=this.apiPath+'/update';
  constructor(private http: HttpClient) { }
  createCategory(name:any){
    return this.http.post<any>(this.createApiPath,{
      database:"Blog",
      collection:"category",
      sequenceType:"categorySequence",
      idType:"categoryid",
      document:{
        name:name,
        isActive:1,
        isVisible:1
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
  viewCategories(){
    return this.http.post<any>(this.readApiPath,{
      database:"Blog",
      collection:"category",
      Filter:{
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
