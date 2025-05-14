import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { filter } from 'rxjs/operators';

declare const gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private router: Router) {
    // Subscribe to router events to track page views
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (typeof gtag === 'function') {
        gtag('config', environment.googleAnalytics.measurementId, {
          'page_path': event.urlAfterRedirects
        });
        console.log('GA page view tracked:', event.urlAfterRedirects);
      }
    });
  }

  /**
   * Track a custom event
   * @param eventName The name of the event
   * @param eventParams Additional parameters for the event
   */
  trackEvent(eventName: string, eventParams: any = {}): void {
    if (typeof gtag === 'function') {
      gtag('event', eventName, eventParams);
      console.log('GA event tracked:', eventName, eventParams);
    } else {
      console.warn('Google Analytics not loaded');
    }
  }
}