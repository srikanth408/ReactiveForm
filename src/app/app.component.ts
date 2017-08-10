import { Component } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators } from '@angular/forms';
import {TestComponent} from 'app/test/test.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   form: FormGroup;
   radio :any;
   showId:boolean=false;
   formSubmitAttempt: boolean;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null],
      phone:[null],
      terms:[null, Validators.required],
      state:[null, Validators.required],
      zipcode:[null, Validators.required],
      address:[null, Validators.required],

    },{validator:requiredOptional('email', 'phone')});
  }

isFieldValid(field: string) {
  return !this.form.get(field).valid && this.form.get(field).touched;
}

displayFieldCss(field: string) {
  return {
    'has-error': this.isFieldValid(field),
    'has-feedback': this.isFieldValid(field)
  };
}
onSubmit() {
   this.formSubmitAttempt = true;
  if (this.form.valid) {
    console.log('form submitted');
    console.log(this.form.value);
    this.form.reset();
    this.showId=false;
    
  } else {
    this.validateAllFormFields(this.form); //{7}
  }
}

validateAllFormFields(formGroup: FormGroup) {       
  Object.keys(formGroup.controls).forEach(field => { 
    const control = formGroup.get(field);            
    if (control instanceof FormControl) {           
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {      
      this.validateAllFormFields(control);           
    }
  });
}


onClick(){
if(this.radio==='yes'){
  this.showId=true;
}else if(this.radio==='no'){
   this.showId=false;
}
}

reset(){
    this.form.reset();
    this.showId=false;
     this.formSubmitAttempt = false;
  }

}

export function requiredOptional(emailVal: string, phoneVal: string) {
  return (group: FormGroup): {[key: string]: any} => {
    let email = group.controls[emailVal];
    let phone = group.controls[phoneVal];

    if (!email.value && !phone.value) {
      return {
        isRequired: true
      };
    }
  }
}