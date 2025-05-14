# EmailJS Troubleshooting Guide

If you're experiencing issues with the contact form email functionality, follow this troubleshooting guide to resolve common problems.

## Common Error: 400 Bad Request

A 400 error typically means there's something wrong with the data being sent to EmailJS.

### Possible Causes and Solutions:

1. **Incorrect Template Parameters**
   - Make sure the parameter names in your code match EXACTLY what your EmailJS template expects
   - Check your EmailJS template and verify the variable names (e.g., `{{from_name}}`, `{{message}}`, etc.)
   - Common parameters include: `from_name`, `from_email`, `to_name`, `subject`, `message`

2. **Incorrect Public Key (User ID)**
   - Verify your EmailJS public key in the environment files
   - The public key should look something like: `user_aBcDeFgHiJkLmNoPqR`
   - Find your public key in your EmailJS dashboard under "Account" > "API Keys"

3. **Incorrect Service ID**
   - Check your service ID in the environment files
   - Service IDs typically follow the format: `service_xxxxxxx`
   - Find your service ID in your EmailJS dashboard under "Email Services"

4. **Incorrect Template ID**
   - Verify your template ID in the environment files
   - Template IDs typically follow the format: `template_xxxxxxx`
   - Find your template ID in your EmailJS dashboard under "Email Templates"

## Testing Your EmailJS Configuration

1. Use the built-in test component (visible in development mode) to test your EmailJS setup
2. Check the browser console for detailed error messages
3. Verify that all required fields in your EmailJS template are being provided

## Other Common Issues

### 403 Forbidden Error
- This usually indicates an authentication problem
- Double-check your public key (User ID)
- Make sure your EmailJS account is active and verified

### 429 Too Many Requests
- You may have exceeded your EmailJS quota (free tier: 200 emails/month)
- Consider upgrading your plan or implementing rate limiting

### Network Errors
- Check your internet connection
- Ensure there are no browser extensions blocking the requests
- Try using a different browser

## EmailJS Template Setup

Make sure your EmailJS template is set up correctly:

1. Log in to your EmailJS account
2. Go to "Email Templates"
3. Select your template
4. Verify that the template variables match what your code is sending
5. Test the template directly from the EmailJS dashboard

## Need More Help?

- Check the [EmailJS documentation](https://www.emailjs.com/docs/)
- Contact EmailJS support
- Review the browser console for detailed error messages