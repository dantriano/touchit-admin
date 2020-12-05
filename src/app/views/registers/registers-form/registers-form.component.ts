import { Component} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { FormComponent } from 'app/common/form.component';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { RegisterData } from 'app/@core/data'
import { AuthenticationService } from 'app/@core/utils';

@Component({
  selector: 'registers-form',
  templateUrl: './registers-form.component.html',
})

export class RegistersFormComponent extends FormComponent {
  protected model:string = 'register';
  protected filteredEmployees:Observable<any[]>;
  protected employeeName:FormControl=new FormControl();
  constructor(public service: RegisterData, public route: ActivatedRoute, public router: Router, public toastr: ToastrService,public authService: AuthenticationService) {
    super(route,router,toastr);
  }
  loadComponent(){
    this.config={'redirect':'registers'}
    this.set('formInputs', {
      _id: [''],
      company: [this.authService.company._id],
      employee:['',this.validators.required],
      activity:['',this.validators.required],
    })
    this.onLoadContent.subscribe(data=>{
      this.filteredEmployees = this.loadAutocomplete(data.employees,this.employeeName,'firstName')
      this.employeeName.setValue(data.register._employee.firstName)
    })
  }
}

