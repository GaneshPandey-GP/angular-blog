import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiPath='https://scapi.shivalikcollege.edu.in';
  loginApiPath = this.apiPath+'/login';
  createApiPath = this.apiPath+'/create';
  readApiPath = this.apiPath+'/fetch';
  updateApiPath = this.apiPath+'/update';
  paginationFetch = this.apiPath+'/fetchWithLimit';
  blogs: any = [];

  constructor(private http: HttpClient) { }

  register(username:any, email: any, password: any){
    return this.http.post<any>(this.createApiPath,{
      database:"ShivalikCollege",
      collection:"user",
      sequenceType:"userSequence",
      idType:"userid",
      document:{
        username:username,
        email:email,
        password:password,
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

  login(username: any, password: any){
    return this.http.post<any>(this.readApiPath,{
      database:"ShivalikCollege",
      collection:"user",
      Filter:{
        username:username,
        password:password,
      }
    })
    .pipe(
      map((res: any) => {
        return res;
        console.log(res)
      }),
      catchError((err) => {
        return err;
      })
    );
  }

  createCategory(name:any){
    return this.http.post<any>(this.createApiPath,{
      database:"ShivalikCollege",
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
      database:"ShivalikCollege",
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

  createBlog(category:any, categoryid: any, subCategory: any, subCategoryid: any, title: any, desc: any, content: any, thumbnail: any){
    return this.http.post<any>(this.createApiPath,{
      database:"ShivalikCollege",
      collection:"blog",
      sequenceType:"blogSequence",
      idType:"blogid",
      document:{
        category: category,
        categoryid: categoryid,
        subCategory: subCategory,
        subCategoryid: subCategoryid,
        title: title,
        desc: desc,
        content: content,
        thumbnail: thumbnail,
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
      database:"ShivalikCollege",
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
      database:"ShivalikCollege",
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
      database:"ShivalikCollege",
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

  updateBlog(blogid: any, category:any, categoryid: any, subCategory: any, subCategoryid: any, title: any, desc: any, content: any, thumbnail: any){
    return this.http.post<any>(this.updateApiPath,{
      database:"ShivalikCollege",
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
        desc: desc,
        content: content,
        thumbnail: thumbnail
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

  getBlog(blogid: any){
    return this.http.post<any>(this.readApiPath,{
      database:"ShivalikCollege",
      collection:"blog",
      Filter:{
        blogid: blogid,
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

  updateCategory(categoryid: any, name: any){
    return this.http.post<any>(this.updateApiPath,{
      database:"ShivalikCollege",
      collection:"category",
      Filter:{
        categoryid: categoryid
      },
      DataToBeUpdated: {
        name: name,
      }
    })
    .pipe(
      map((res: any) => {
        return res;
        this.viewCategories()
      }),
      catchError((err) => {
        return err;
      })
    );
  }

  updateSubCategory(subCategoryid: any, name: any){
    return this.http.post<any>(this.updateApiPath,{
      database:"ShivalikCollege",
      collection:"category",
      Filter:{
        subCategoryid: subCategoryid
      },
      DataToBeUpdated: {
        name: name,
      }
    })
    .pipe(
      map((res: any) => {
        return res;
        this.viewSubCategories('')
      }),
      catchError((err) => {
        return err;
      })
    );
  }


pagination(number:any){
  return this.http.post<any>(this.paginationFetch,{
    database:"ShivalikCollege",
    collection:"blog",
    Limit:4,
    Skip:number,
    Filter:{
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

filterByCategory(categoryid: any){
  return this.http.post<any>(this.readApiPath,{
    database:"ShivalikCollege",
    collection:"blog",
    Filter:{
      categoryid: categoryid
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

// getRecentBlog(){
//   return this.http.post<any>(this.readApiPath,{
//     database:"ShivalikCollege",
//     collection:"sequences",
//     Filter:{
//       blogid: blogid,
//       isActive:1
//     }
//   })
//   .pipe(
//     map((res: any) => {
//       return res;
//     }),
//     catchError((err) => {
//       return err;
//     })
//   );
// }


}
