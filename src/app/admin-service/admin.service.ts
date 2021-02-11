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
        isVisible:true
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

  createSubCategory(name:any, category: any, categoryid: any){
    return this.http.post<any>(this.createApiPath,{
      database:"Blog",
      collection:"subCategory",
      sequenceType:"subCategorySequence",
      idType:"subCategoryid",
      document:{
        name:name,
        category: category,
        categoryid: categoryid,
        isActive:1,
        isVisible:true
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

  createBlog(category:any, categoryid: any, subCategory: any, subCategoryid: any, title: any, content: any){
    return this.http.post<any>(this.createApiPath,{
      database:"Blog",
      collection:"blog",
      sequenceType:"blogSequence",
      idType:"blogid",
      document:{
        category: category,
        categoryid: categoryid,
        subCategory: subCategory,
        subCategoryid: subCategoryid,
        title: title,
        content: content,
        isActive:1,
        isVisible:true
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
  viewSubCategories(categoryid: any){
    return this.http.post<any>(this.readApiPath,{
      database:"Blog",
      collection:"subCategory",
      Filter:{
        categoryid: categoryid,
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

  viewBlogs(){
    return this.http.post<any>(this.readApiPath,{
      database:"Blog",
      collection:"blog",
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

  updateBlog(blogid: any, category:any, categoryid: any, subCategory: any, subCategoryid: any, title: any, content: any){
    return this.http.post<any>(this.updateApiPath,{
      database:"Blog",
      collection:"blog",
      Filter:{
        blogid: blogid
      },
      DataToBeUpdated: {
        category: category,
        categoryid: categoryid,
        subCategory: subCategory,
        subCategoryid: subCategoryid,
        title: title,
        content: content,
      }
    })
    .pipe(
      map((res: any) => {
        return res;
        this.viewBlogs()
      }),
      catchError((err) => {
        return err;
      })
    );
  }
}
