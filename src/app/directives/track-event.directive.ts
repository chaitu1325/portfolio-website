import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';

@Directive({
  selector: '[trackEvent]',
  standalone: true
})
export class TrackEventDirective {
  private analyticsService = inject(AnalyticsService);
  private el = inject(ElementRef);

  @Input() trackEvent: string = ''; // Event name
  @Input() eventCategory: string = ''; // Event category
  @Input() eventLabel: string = ''; // Event label
  @Input() eventValue: number | undefined; // Event value (optional)

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    // Prevent tracking if no event name is provided
    if (!this.trackEvent) {
      return;
    }

    // Build event parameters
    const eventParams: any = {
      event_category: this.eventCategory || 'interaction',
      event_label: this.eventLabel || this.getElementText()
    };

    // Add value if provided
    if (this.eventValue !== undefined) {
      eventParams.value = this.eventValue;
    }

    // Track the event
    this.analyticsService.trackEvent(this.trackEvent, eventParams);
  }

  // Get the text content of the element as a fallback label
  private getElementText(): string {
    return this.el.nativeElement.textContent?.trim() || 'unknown';
  }
}