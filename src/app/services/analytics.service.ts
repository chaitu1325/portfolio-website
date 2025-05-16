import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { filter } from 'rxjs/operators';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

// Define gtag as a property of window
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private isEnabled: boolean;
  private gtagInitialized = false;

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Use the setting from environment
    this.isEnabled = environment.googleAnalytics.enabled;
    console.log('Environment settings:', this.isEnabled);
    // Only proceed if we're in a browser and analytics is enabled
    if (isPlatformBrowser(this.platformId) && this.isEnabled) {
      this.initializeGoogleAnalytics();
      
      // Subscribe to router events to track page views
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
        this.trackPageView(event.urlAfterRedirects);
      });
      
      console.log('Google Analytics initialized with tracking ID:', environment.googleAnalytics.measurementId);
    } else {
      console.log('Google Analytics is disabled');
    }
  }
  
  /**
   * Dynamically load the Google Analytics script
   */
  private initializeGoogleAnalytics(): void {
    try {
      // Create the measurement ID script element
      const gaScript = this.document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${environment.googleAnalytics.measurementId}`;
      this.document.head.appendChild(gaScript);
      
      // Initialize the dataLayer and gtag function
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      
      // Mark as initialized
      this.gtagInitialized = true;
    } catch (error) {
      console.error('Error initializing Google Analytics:', error);
    }
  }

  /**
   * Track a page view
   * @param pagePath The path of the page being viewed
   */
  trackPageView(pagePath: string): void {
    if (!this.isEnabled || !isPlatformBrowser(this.platformId) || !this.gtagInitialized) {
      return;
    }
    
    try {
      window.gtag('config', environment.googleAnalytics.measurementId, {
        'page_path': pagePath
      });
      console.log('GA page view tracked:', pagePath);
    } catch (error) {
      console.warn('Error tracking page view:', error);
    }
  }

  /**
   * Track a custom event
   * @param eventName The name of the event
   * @param eventParams Additional parameters for the event
   */
  trackEvent(eventName: string, eventParams: any = {}): void {
    if (!this.isEnabled || !isPlatformBrowser(this.platformId) || !this.gtagInitialized) {
      return;
    }
    
    try {
      window.gtag('event', eventName, eventParams);
      console.log('GA event tracked:', eventName, eventParams);
    } catch (error) {
      console.warn('Error tracking event:', error);
    }
  }
  
  // No toggle methods needed
}