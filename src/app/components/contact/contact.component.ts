import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';
// import { EmailTestComponent } from './email-test.component';
import { environment } from '../../../environments/environment';
import { AnalyticsService } from '../../services/analytics.service';
import { TrackEventDirective } from '../../directives/track-event.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  // imports: [CommonModule, FormsModule, ReactiveFormsModule, EmailTestComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TrackEventDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;
  success = false;
  error = false;
  loading = false;
  errorMessage = '';
  environment = environment;

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Getter for easy access to form fields
  get f() { return this.contactForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.success = false;
    this.error = false;
    
    // Stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }

    this.loading = true;

    // Create template params - make sure these match EXACTLY what your EmailJS template expects
    const templateParams = {
      from_name: this.f['name'].value,
      from_email: this.f['email'].value,
      subject: this.f['subject'].value,
      message: this.f['message'].value,
      to_name: 'Portfolio Owner' // Adding a recipient name which might be required by your template
    };

    this.emailService.sendEmail(templateParams).subscribe({
      next: (response) => {
        console.log('Email sent successfully!', response);
        this.success = true;
        this.loading = false;
        this.contactForm.reset();
        this.submitted = false;
        
        // Track successful form submission
        this.analyticsService.trackEvent('contact_form_submit', {
          event_category: 'engagement',
          event_label: 'Contact Form',
          value: 1
        });
      },
      error: (error) => {
        console.error('Error sending email:', error);
        this.error = true;
        
        // Provide more specific error messages based on the error
        if (error.status === 400) {
          this.errorMessage = 'There was a problem with the email request. Please check your EmailJS configuration.';
        } else if (error.status === 403) {
          this.errorMessage = 'Authentication error. Please verify your EmailJS User ID.';
        } else if (error.status === 429) {
          this.errorMessage = 'Too many requests. You may have exceeded your EmailJS quota.';
        } else {
          this.errorMessage = 'Failed to send email. Please try again later.';
        }
        
        // Track form submission error
        this.analyticsService.trackEvent('contact_form_error', {
          event_category: 'error',
          event_label: `Contact Form Error: ${error.status || 'unknown'}`,
          value: 0
        });
        
        this.loading = false;
      }
    });
  }

  // Reset form and status flags
  resetForm(): void {
    this.contactForm.reset();
    this.submitted = false;
    this.success = false;
    this.error = false;
  }
}
