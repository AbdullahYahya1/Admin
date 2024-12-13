import { Injectable } from '@angular/core';
import { ToastrService as NgxToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private toastr: NgxToastrService) {}

  success(message: string, title: string = 'Success') {
    this.toastr.success(message, title);
  }

  error(message: string, title: string = 'Error') {
    this.toastr.error(message, title);
  }

  info(message: string, title: string = 'Information') {
    this.toastr.info(message, title);
  }

  warning(message: string, title: string = 'Warning') {
    this.toastr.warning(message, title);
  }
}
