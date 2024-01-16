import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //  url="http://localhost:3000/Signup";

  constructor(private http:HttpClient) { }
    //create record using post method

    postRestaurant(data:any){
      return this.http.post<any>("http://localhost:3000/restaurant", data).pipe(map((res:any)=>{
          return res;
      }))
    };

    //Get restaurant data using get method

    getRestaurant(){
      return this.http.get<any>("http://localhost:3000/restaurant").pipe(map((res:any)=>{
        return res;
      }))
    }

    //Update data using put method
    updateRestaurant(data:any,id:number){
        return this.http.put<any>("http://localhost:3000/restaurant/"+id, data).pipe(map((res:any)=>{
          return res;
        }))
    }

    //Delete record using delete method

    deleteRestaurant(id:number){
      return this.http.delete<any>("http://localhost:3000/restaurant/"+id).pipe(map((res:any)=>{
        return res;
      }))
    }
}

