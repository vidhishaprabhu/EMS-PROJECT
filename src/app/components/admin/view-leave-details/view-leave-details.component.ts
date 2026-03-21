import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/dashboard/admin.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-leave-details',
  imports: [DatePipe,CommonModule],
  templateUrl: './view-leave-details.component.html',
  styleUrl: './view-leave-details.component.css',
})
export class ViewLeaveDetailsComponent {
  leaves: any = [];
  route = inject(ActivatedRoute);
  router=inject(Router)
  adminService = inject(AdminService);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.adminService.getLeaveById(id!).subscribe((res: any) => {
      this.leaves = res.leave;
    });
  }
  updateStatus(status:string){
    this.adminService.updateStatusInLeave(this.leaves._id,status).subscribe((res:any)=>{
      alert(res.message);
      this.leaves.status=status
      this.router.navigate(['admin/get-all-leave'])
    })
  }
}
