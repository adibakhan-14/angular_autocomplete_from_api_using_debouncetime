import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs';
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
 
 
  constructor(private fb: FormBuilder, private service: ServService){}

  ngOnInit(): void {
    this.getNames(); 
    
    this.iniForm();

    
  
}
    iniForm(){
      this.form= this.fb.group({
      'truck_reg': ['']
    });
  

    this.form.get('truck_reg').valueChanges.subscribe(response =>{
      console.log(response);
      
      this.filterData(response);

    })
  }
  filterData(enteredData){
    this.options = this.filteredOptions.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }

getNames(){
  this.service.getData().subscribe(response =>{
    this.filteredOptions= response;
    this.options= response;
   
  });
}

get truck_reg(){
    return this.form.get('truck_reg');
}


  
}
