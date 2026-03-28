import { Component, inject } from '@angular/core';
import { AdminService } from '../../../services/dashboard/admin.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-bank-details',
  imports: [ReactiveFormsModule],
  templateUrl: './add-bank-details.component.html',
  styleUrl: './add-bank-details.component.css',
})
export class AddBankDetailsComponent {
  adminService = inject(AdminService);
  private fb = inject(FormBuilder);
  addBankDetailsForm = this.fb.group({
    accountNumber: ['', Validators.required],
    bankName: ['', Validators.required],
    ifscCode: ['', Validators.required],
    branch: ['', Validators.required],
  });
  route=inject(ActivatedRoute)
  ngOnInit() {}

  updateBankDetails() {
    const id=this.route.snapshot.paramMap.get('id')
    this.adminService.updateBankDetails(id!,this.addBankDetailsForm.value.accountNumber!,this.addBankDetailsForm.value.bankName!,this.addBankDetailsForm.value.ifscCode!,this.addBankDetailsForm.value.branch!).subscribe((res:any)=>{
      if(res){
        alert(res.message)
        this.addBankDetailsForm.reset()
      }
      else{
        console.error("There is some error");
      }

    })
  }
}
