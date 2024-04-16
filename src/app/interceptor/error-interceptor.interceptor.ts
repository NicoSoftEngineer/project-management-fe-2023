import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  //const messeageService = inject(MessageService);


  return next(req).pipe(
    catchError((response: HttpErrorResponse) => {
      if (response.error instanceof ErrorEvent) {
        // client-side error
 
        //WebhookSender.sendAppError(response, loggedUser);
      } else {
        if (response.status === 500) {
          //messeageService.showMessage('E500 - Na serveru se vyskytla chyba!', undefined, MessageType.ERROR, true);
          console.log(response);
          //WebhookSender.sendAPIErrorMessage(response, loggedUser);
        }
      }
    
      return throwError(response);
    })
  );
}