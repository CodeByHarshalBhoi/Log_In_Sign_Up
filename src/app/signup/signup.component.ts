import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

signupForm !: FormGroup

      constructor(private formBuilder:FormBuilder, private http:HttpClient, private router:Router){}


  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:[''],
      mobile:[''],
      email:[''],
      password:['']
    })

  }

  submitSignUp(){
    this.http.post<any>("http://localhost:3000/Signup", this.signupForm.value).subscribe(data=>{
     alert("Registration Successfully....")
    this.signupForm.reset();
    this.router.navigate(['login'])
    })
  }
}
