import { Component, inject } from '@angular/core';
import { AdminService } from '../../../services/dashboard/admin.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-leaves',
  imports: [DatePipe],
  templateUrl: './leaves.component.html',
  styleUrl: './leaves.component.css',
})
export class LeavesComponent {
  leaves: any = [];
  activeFilter:string='All'
  filteredLeaves:any=[]
  adminService = inject(AdminService);
  router=inject(Router)
  ngOnInit() {
    this.getAllLeaves();
  }
  getAllLeaves() {
    this.adminService.getAllLeave().subscribe((res: any) => {
      this.leaves = res.leave;
      this.filteredLeaves=res.leave
    });
  }
  deleteLeave(id: string) {
    this.adminService.deleteLeave(id).subscribe((res: any) => {
      alert(res.message);
      this.getAllLeaves();
    });
  }
  viewLeaveDetails(id:string){
    this.router.navigate(['/admin/view-leave-details',id])
  }
  filterLeaves(status:string){
    this.activeFilter=status
    if(status==='All'){
      this.filteredLeaves=this.leaves
    }
    else{
      this.filteredLeaves=this.leaves.filter((leave:any)=>leave.status===status)
    }

  }
}
