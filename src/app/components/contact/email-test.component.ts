import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-email-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="card">
        <div class="card-header">
          EmailJS Test
        </div>
        <div class="card-body">
          <h5 class="card-title">Test your EmailJS configuration</h5>
          <p class="card-text">Click the button below to test your EmailJS setup.</p>
          
          <div *ngIf="status === 'success'" class="alert alert-success">
            Email test successful! Check your inbox.
          </div>
          
          <div *ngIf="status === 'error'" class="alert alert-danger">
            Error: {{ errorMessage }}
          </div>
          
          <button 
            class="btn btn-primary" 
            (click)="testEmailJS()" 
            [disabled]="status === 'loading'">
            {{ status === 'loading' ? 'Testing...' : 'Test EmailJS' }}
          </button>
        </div>
        <div class="card-footer text-muted">
          <strong>Configuration:</strong><br>
          User ID: {{ maskString(environment.emailjs.userId) }}<br>
          Service ID: {{ maskString(environment.emailjs.serviceId) }}<br>
          Template ID: {{ maskString(environment.emailjs.templateId) }}
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class EmailTestComponent {
  status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  errorMessage = '';
  environment = environment;

  testEmailJS(): void {
    this.status = 'loading';
    this.errorMessage = '';

    // Initialize EmailJS
    emailjs.init(environment.emailjs.userId);

    // Create test parameters
    const templateParams = {
      from_name: 'Test User',
      from_email: 'test@example.com',
      to_name: 'Portfolio Owner',
      subject: 'EmailJS Test',
      message: 'This is a test message from the EmailJS test component.'
    };

    // Log the configuration
    console.log('EmailJS Test Configuration:', {
      userId: environment.emailjs.userId,
      serviceId: environment.emailjs.serviceId,
      templateId: environment.emailjs.templateId,
      templateParams
    });

    // Send the test email
    emailjs.send(
      environment.emailjs.serviceId,
      environment.emailjs.templateId,
      templateParams
    ).then(
      (response) => {
        console.log('EmailJS TEST SUCCESS:', response);
        this.status = 'success';
      },
      (error) => {
        console.error('EmailJS TEST ERROR:', error);
        this.status = 'error';
        this.errorMessage = this.getErrorMessage(error);
      }
    );
  }

  // Helper method to mask sensitive information
  maskString(str: string): string {
    if (!str) return 'Not configured';
    const firstFour = str.substring(0, 4);
    const lastFour = str.substring(str.length - 4);
    return `${firstFour}...${lastFour}`;
  }

  // Get a user-friendly error message
  getErrorMessage(error: any): string {
    if (error.status === 400) {
      return 'Bad Request (400): Check if your template parameters match what your template expects.';
    } else if (error.status === 403) {
      return 'Forbidden (403): Your EmailJS User ID may be incorrect or your account may have issues.';
    } else if (error.status === 429) {
      return 'Too Many Requests (429): You may have exceeded your EmailJS quota.';
    } else {
      return `Error (${error.status || 'unknown'}): ${error.text || error.message || 'Unknown error'}`;
    }
  }
}