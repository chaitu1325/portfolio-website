import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor() {
    // Initialize EmailJS with your user ID once when the service is created
    emailjs.init(environment.emailjs.userId);
  }

  /**
   * Send an email using EmailJS
   * @param templateParams The parameters to send in the email template
   * @returns An Observable that resolves when the email is sent
   */
  sendEmail(templateParams: any): Observable<any> {
    // console.log('Sending email with params:', templateParams);
    // console.log('Using service ID:', environment.emailjs.serviceId);
    // console.log('Using template ID:', environment.emailjs.templateId);
    
    // Convert the promise to an observable
    return from(
      emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        templateParams
      )
    );
  }
}