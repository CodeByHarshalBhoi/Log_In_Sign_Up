import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

loginForm!:FormGroup
    constructor(private formBuider:FormBuilder, private http:HttpClient, private router:Router){}


  ngOnInit(): void {
    this.loginForm = this.formBuider.group({
        email:[''],
        password:['']
    })
  }
  loginData(){
    this.http.get<any>("http://localhost:3000/Signup").subscribe(data=>{
      const user = data.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
      })
      if(user){
        alert("log in Successfully");
        this.loginForm.reset();
        this.router.navigate(['restaurent']);
      }else{
        alert("User not found");
      }
    },err=>{
      alert("Something wents wrong....")
    })
  }
}
