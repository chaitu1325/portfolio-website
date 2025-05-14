# Setting Up EmailJS for Contact Form

This project uses EmailJS to send emails from the contact form. Follow these steps to set it up:

## 1. Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) and sign up for a free account
2. Verify your email address

## 2. Create an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Give your service a name (e.g., "portfolio-contact")
6. Note down the Service ID

## 3. Create an Email Template

1. In your EmailJS dashboard, go to "Email Templates"
2. Click "Create New Template"
3. Design your email template with the following variables:
   - `{{from_name}}` - The name of the person sending the message
   - `{{from_email}}` - The email of the person sending the message
   - `{{subject}}` - The subject of the message
   - `{{message}}` - The message content
4. Save your template
5. Note down the Template ID

## 4. Update Environment Variables

1. Open `src/environments/environment.ts` and `src/environments/environment.prod.ts`
2. Update the EmailJS configuration with your actual values:

```typescript
export const environment = {
  production: false, // or true for environment.prod.ts
  emailjs: {
    userId: 'YOUR_EMAILJS_USER_ID', // Your EmailJS User ID (from Account Settings)
    serviceId: 'YOUR_EMAILJS_SERVICE_ID', // The Service ID you noted down
    templateId: 'YOUR_EMAILJS_TEMPLATE_ID' // The Template ID you noted down
  }
};
```

## 5. Test the Contact Form

1. Run the application
2. Fill out the contact form
3. Submit the form
4. Check your email to ensure the message was received

## EmailJS Free Tier Limitations

The free tier of EmailJS allows:
- 200 emails per month
- 2 email templates
- 2 email services

If you need more, consider upgrading to a paid plan.