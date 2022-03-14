import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ServService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'autocomplete';
  form: FormGroup;
  options;
  filteredOptions: any= [];
  object;
 
 
  constructor(private fb: FormBuilder, private service: ServService){}

  ngOnInit(): void {
    this.getNames(); 
    
    this.iniForm();
    this.onSelectRegistrationNumber();
    



    

    
  
}
    iniForm(){
      this.form= this.fb.group({
      'truck_reg': [''],
      'truck_reg2': ['']
    });

 
  

    this.form.get('truck_reg').valueChanges.pipe(debounceTime(200))
    .subscribe(response =>{
     if(response && response.length){
      console.log(response);
      this.removeSelectedItem()
      this.filterData(response);
     }
     else{
       this.options=[];
     }

    });

    this.form.get('truck_reg2').valueChanges.pipe(debounceTime(200)).subscribe(response =>{
      if(response && response.length){
       console.log(response);
       this.removeSelectedItem()
       this.filterData(response);
      }
      else{
        this.options=[];
      }
 
     });
  }
  filterData(enteredData){
    this.options = this.filteredOptions.filter(item => {
      this.removeSelectedItem()
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }

  removeSelectedItem(){
    console.log(this.truck_reg.value, "this is the value");
    var val= this.truck_reg.value;
    var index = this.filteredOptions.indexOf(val);
    if (index !== -1) {
      this.filteredOptions.splice(index, 1);
    }
    
  }

getNames(){
  this.service.getData().subscribe(response =>{
    this.filteredOptions= response;
    // this.options= response;
   
  });
}

get truck_reg(){
    return this.form.get('truck_reg');
}
get truck_reg2(){
  return this.form.get('truck_reg2');
}

onSelectRegistrationNumber(){
  const truck= this.options.find((item) => item.truck_reg == this.truck_reg);
  this.object = {
    trip_id: truck.trip_id,
    orientation: truck.orientation,
    vendor_id: truck.vendor_id,
    truck_reg: truck.truck_reg,
  }

 console.log(this.object,"this.objectthis.objectthis.objectthis.object" );
 
  
}



  
}
