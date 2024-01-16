import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RestaurantData } from './restaurent.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-restaurent',
  templateUrl: './restaurent.component.html',
  styleUrls: ['./restaurent.component.css']
})
export class RestaurentComponent implements OnInit{
[x: string]: any;
formValue !: FormGroup
restaurantModelObj : RestaurantData = new RestaurantData;

showAdd !:boolean ;
addBtn !: boolean ;

//obj for get all data of restaurant
getAllRestaurantData:any;
constructor(private formBuider:FormBuilder, private api:ApiService){}



  ngOnInit(): void {
    this.formValue = this.formBuider.group({
      name:[null, [Validators.required, Validators.minLength(3)]],
      email:[null, [Validators.required, Validators.email]],
      mobile:[null,[Validators.required, Validators.maxLength(10)]],
      address:[null,Validators.required],
      services:['',Validators.required]
    });
    this.getAllData();
  }


  get f(){
    return this.formValue.controls;
  }


  clickAddrestaurant(){
    this.formValue.reset();
    this.getAllData();
    this.addBtn = true;
    this.showAdd = false;

  }


    //subscribe data
    addRestaurant(){
      this.restaurantModelObj.name = this.formValue.value.name;
      this.restaurantModelObj.email = this.formValue.value.email;
      this.restaurantModelObj.mobile = this.formValue.value.mobile;
      this.restaurantModelObj.address = this.formValue.value.address;
      this.restaurantModelObj.services = this.formValue.value.services;
      this.api.postRestaurant(this.restaurantModelObj).subscribe(res=>{
        alert("record added successfully");
        console.log(res);
        this.formValue.reset();
        this.getAllData();
      },err=>{
        alert("something wents wrong");
      })
    }


    //Get all data
    getAllData(){
      this.api.getRestaurant().subscribe(res=>{
        this.getAllRestaurantData = res;
      })
    }

    //Delete Data
    deleteData(data:any){
      this.api.deleteRestaurant(data.id).subscribe(res=>{
        alert("record deleted");
        this.getAllData();
      })
    }

    //Edit Data

    editData(data:any){
        this.addBtn = false;
        this.showAdd = true;
        this.restaurantModelObj.id = data.id;
        this.formValue.controls['name'].setValue(data.name);
        this.formValue.controls['email'].setValue(data.email);
        this.formValue.controls['mobile'].setValue(data.mobile);
        this.formValue.controls['address'].setValue(data.address);
        this.formValue.controls['services'].setValue(data.services);
    }

    upateDetails(){
      this.restaurantModelObj.name = this.formValue.value.name;
      this.restaurantModelObj.email = this.formValue.value.email;
      this.restaurantModelObj.mobile = this.formValue.value.mobile;
      this.restaurantModelObj.address = this.formValue.value.address;
      this.restaurantModelObj.services = this.formValue.value.services;

      this.api.updateRestaurant(this.restaurantModelObj, this.restaurantModelObj.id).subscribe(res=>{
        alert("data update successfully");
        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset()
        this.getAllData();
      });
    }


}
