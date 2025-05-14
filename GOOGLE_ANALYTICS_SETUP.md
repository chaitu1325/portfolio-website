# Google Analytics 4 Setup Guide

This project uses Google Analytics 4 (GA4) to track user interactions. Follow these steps to set up GA4 for your portfolio website.

## 1. Create a Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/) and sign in with your Google account
2. Click on "Admin" in the bottom left corner
3. In the "Account" column, click "Create Account" if you don't have one, or select an existing account
4. In the "Property" column, click "Create Property"
5. Select "Web" as the platform
6. Enter your website details and follow the setup wizard
7. Complete the setup to get your Measurement ID (it starts with "G-")

## 2. Update Environment Configuration

1. Open `src/environments/environment.ts` and `src/environments/environment.prod.ts`
2. Replace the placeholder Measurement ID with your actual GA4 Measurement ID:

```typescript
export const environment = {
  production: false, // or true for environment.prod.ts
  // ... other configurations
  googleAnalytics: {
    measurementId: 'G-XXXXXXXXXX' // Replace with your actual GA4 Measurement ID
  }
};
```

## 3. Update the Google Analytics Script in index.html

1. Open `src/index.html`
2. Find the Google Analytics script tag
3. Replace the placeholder Measurement ID with your actual GA4 Measurement ID:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  // Measurement ID will be set dynamically in the app
</script>
```

## 4. Custom Event Tracking

The application is set up to track various events automatically:

- **Page Views**: Tracked automatically when navigating between pages
- **Contact Form Submissions**: Tracked when a form is successfully submitted
- **Contact Form Errors**: Tracked when there's an error submitting the form
- **Button Clicks**: Tracked using the `trackEvent` directive

### Using the trackEvent Directive

You can easily track any element click by adding the `trackEvent` directive:

```html
<button 
  trackEvent="button_click"
  eventCategory="engagement"
  eventLabel="Download Resume">
  Download Resume
</button>
```

### Tracking Custom Events in Code

You can also track custom events in your TypeScript code:

```typescript
import { AnalyticsService } from './services/analytics.service';

constructor(private analyticsService: AnalyticsService) {}

trackDownload(): void {
  this.analyticsService.trackEvent('file_download', {
    event_category: 'engagement',
    event_label: 'Resume PDF',
    value: 1
  });
}
```

## 5. Verifying Your Setup

1. Deploy your application
2. Open the deployed site
3. Open the Google Analytics Real-Time reports
4. Interact with your site and verify that events are being tracked

## 6. Privacy Considerations

- Make sure to add a privacy policy to your website
- Consider adding a cookie consent banner
- Comply with GDPR, CCPA, and other privacy regulations as applicable

## Additional Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GA4 Event Parameters Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [GA4 Enhanced Measurement](https://support.google.com/analytics/answer/9216061)