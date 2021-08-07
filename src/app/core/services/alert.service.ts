import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { AlertInfo } from '../enums/alert-info';
import { CommonEnum } from '../enums/common';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  showStickyMessage(err: any, arg1: null, error: any) {
    throw new Error('Method not implemented.');
  }
  constructor() { }

  showStatusMessage(message, position, icon, confirmButton) {
    Swal.fire({
      position: position,
      icon: icon,
      title: message,
      showConfirmButton: confirmButton,
      timer: 2500
    })
  }

  showMessage(icon, title) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      // onOpen: (toast ) => {
      //   toast.addEventListener('mouseenter', Swal.stopTimer);
      //   toast.addEventListener('mouseleave', Swal.resumeTimer);
      // },
    });

    Toast.fire({
      icon: icon,
      title: title,
    });
  }


  closePopup(message, callback) {
    Swal.fire({
      title: message,
      showCancelButton: true,
      confirmButtonText: CommonEnum.YES,
    }).then((result) => {
      if (result.isConfirmed) {
        callback(result.isConfirmed);
      }
    })

  }
  DeleteConfirmation(callback) {
    Swal.fire({
      title: CommonEnum.CONFIRM,
      text: CommonEnum.FILEREMOVE,
      icon: AlertInfo.WARNING,
      showCancelButton: true,
      confirmButtonColor: CommonEnum.CONFIRM_BUTTON_COLOR,
      cancelButtonColor: CommonEnum.CANCEL_BUTTON_COLOR,
      confirmButtonText: CommonEnum.YES_DELETE,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {

        callback(result.isConfirmed);
        // Swal.fire(
        //   CommonEnum.DELETED,
        //   CommonEnum.DELETED_SUCCESS,
        //   AlertInfo.SUCCESS
        // )
      }
    })
  }
  requiredConfirmation(titleHeader, message, callback) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-green ml-10',
        cancelButton: 'btn btn-blue mr-10'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: titleHeader,
      text: message,
      icon: AlertInfo.WARNING,
      showCancelButton: true,
      confirmButtonText: CommonEnum.YES,
      cancelButtonText: CommonEnum.CONFIRM_LATER,
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        callback(result.isConfirmed);
      } else {
        callback(false);
      }
      // else if (
      //   /* Read more about handling dismissals below */
      //   result.dismiss === Swal.DismissReason.cancel
      // ) {
      //   swalWithBootstrapButtons.fire(
      //     'Cancelled',
      //     'Your imaginary file is safe :)',
      //     'error'
      //   )
      // }
    })
  }
}
