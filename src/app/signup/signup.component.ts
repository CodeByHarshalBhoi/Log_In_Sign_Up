import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      name:['', [Validators.required]],
      mobile:['',[Validators.required, Validators.maxLength(10)]],
      email:['', Validators.required, Validators.email],
      password:['', Validators.required]
    })

  }

  get signupValidation(){
    return this.signupForm.controls;
  }

  submitSignUp(){
    this.http.post<any>("http://localhost:3000/Signup", this.signupForm.value).subscribe(data=>{
     alert("Registration Successfully....")
    this.signupForm.reset();
    this.router.navigate(['login'])
    })
  }
}
