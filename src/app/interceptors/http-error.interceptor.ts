import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { MessageService } from "primeng/api";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor{
  constructor(private messageService: MessageService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage = this.getErrorMessage(error);
          this.displayError(error, errorMessage);
          return throwError(() => new Error(errorMessage))
        })
      )
  }

  private getErrorMessage(error: HttpErrorResponse): string{
    if(error.error instanceof ErrorEvent){
      return `Client-side error: ${error.error.message}`
    }
    else{
      return `Server-side error: ${error.error}`
    }
  }

  private displayError(error: HttpErrorResponse, errorMessage: string): void {
    const summary = `${error.status}`;
    this.messageService.add({
      severity: 'error',
      summary,
      detail: errorMessage,
      sticky: true
    })
  }
}
