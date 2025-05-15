import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { filter } from 'rxjs/operators';

declare const gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private isEnabled: boolean;

  constructor(private router: Router) {
    // Check if user has a saved preference
    const savedPreference = localStorage.getItem('analytics-enabled');
    
    if (savedPreference !== null) {
      // Use the user's saved preference
      this.isEnabled = savedPreference === 'true';
    } else {
      // Use the default from environment
      this.isEnabled = environment.googleAnalytics.enabled;
    }
    
    // Subscribe to router events to track page views (will only track if enabled)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.trackPageView(event.urlAfterRedirects);
    });
    
    if (this.isEnabled) {
      console.log('Google Analytics initialized with tracking ID:', environment.googleAnalytics.measurementId);
    } else {
      console.log('Google Analytics is disabled');
    }
  }

  /**
   * Track a page view
   * @param pagePath The path of the page being viewed
   */
  trackPageView(pagePath: string): void {
    if (!this.isEnabled) {
      return;
    }
    
    if (typeof gtag === 'function') {
      gtag('config', environment.googleAnalytics.measurementId, {
        'page_path': pagePath
      });
      console.log('GA page view tracked:', pagePath);
    } else {
      console.warn('Google Analytics not loaded');
    }
  }

  /**
   * Track a custom event
   * @param eventName The name of the event
   * @param eventParams Additional parameters for the event
   */
  trackEvent(eventName: string, eventParams: any = {}): void {
    if (!this.isEnabled) {
      return;
    }
    
    if (typeof gtag === 'function') {
      gtag('event', eventName, eventParams);
      console.log('GA event tracked:', eventName, eventParams);
    } else {
      console.warn('Google Analytics not loaded');
    }
  }
  
  /**
   * Check if Google Analytics is enabled
   * @returns boolean indicating if GA is enabled
   */
  isAnalyticsEnabled(): boolean {
    return this.isEnabled;
  }
  
  /**
   * Enable or disable Google Analytics
   * @param enabled Boolean to enable or disable analytics
   */
  setAnalyticsEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    console.log(`Google Analytics ${enabled ? 'enabled' : 'disabled'}`);
  }
}