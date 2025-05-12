# HTTP & HTTPS Implementation

This document explains how HTTP and HTTPS are implemented in the PROJECT-WEBPR application and how to set up your environment for testing.

## Overview

The application runs both HTTP and HTTPS servers:
- The HTTPS server handles secure requests on port 3004 (default)
- The HTTP server on port 3002 redirects all traffic to HTTPS
- If HTTPS certificates are not available, the application will run in HTTP-only mode

## Implementation Details

### SSL Certificates

The application uses self-signed SSL certificates stored in the `certificates` directory:
- `cert.pem` - The SSL certificate
- `key.pem` - The private key

### Server Configuration

In `server.js`, two servers are created:
1. **HTTPS Server** (primary) - Serves the application securely
2. **HTTP Server** - Redirects traffic to the HTTPS server or serves content directly if HTTPS is unavailable

A middleware checks if requests are secure and redirects HTTP requests to HTTPS:

```javascript
app.use((req, res, next) => {
  // Check if request is already secure
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    return next();
  }
  
  // Redirect to HTTPS with same hostname and correct port
  const httpsPort = process.env.HTTPS_PORT || 3000;
  const host = req.headers.host.split(':')[0]; // Remove any existing port
  res.redirect(301, `https://${host}:${httpsPort}${req.url}`);
});
```

### Security Features

- **Session Configuration**: Sessions are configured to use secure cookies with `secure: true`
- **HTTPS Only**: Critical functionality like authentication only works over HTTPS
- **Strict Content Security**: Cookies use `sameSite: 'strict'` and `httpOnly: true`

## Setup for Testing

### 1. Configure Environment Variables

Create a `.env` file in the project root with the following settings:

```
NODE_ENV=development
HOST_NAME=localhost
PORT=3002           # HTTP port
HTTPS_PORT=3004     # HTTPS port

# Database configuration
DB_HOST=localhost
DB_PORT=3307
DB_USER=your_db_user
DB_PWD=your_db_password
DB_NAME=onlinenewspaper

# Security settings
SESSION_SECRET=your_session_secret_key
PASSWORD_ROUND=10

# For optional features
TINY_API_KEY=your_tiny_mce_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://localhost:3004/auth/google/callback
GOOGLE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
GOOGLE_RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
```

### 2. Generate SSL Certificates (if needed)
Notes: pls install OpenSSL first.


If you need to generate new self-signed certificates:

```bash
# Navigate to project directory
cd PROJECT-WEBPR

# Create certificates directory if it doesn't exist
mkdir -p certificates

# Generate self-signed certificate
openssl req -x509 -newkey rsa:2048 -keyout certificates/key.pem -out certificates/cert.pem -days 365 -nodes
```

### 3. Trust Self-Signed Certificate in Browser

When accessing the application at `https://localhost:3004`, your browser will show a security warning due to the self-signed certificate. To proceed:

- Click "Advanced" or "Details"
- Click "Proceed to localhost (unsafe)" or similar option
- For development, you can permanently trust the certificate in your browser settings

### 4. Testing the Setup

1. Start the application
2. Access the HTTP endpoint at `http://localhost:3002`
3. Verify you are automatically redirected to `https://localhost:3004`
4. Verify all features work correctly over HTTPS

## Troubleshooting

- **Certificate Issues**: Ensure the paths to `cert.pem` and `key.pem` are correct in the `certificates` directory
- **Redirect Loop**: Check middleware configuration if you experience redirect loops
- **Port Access**: Ensure ports 3004 and 3002 are available and not blocked by firewall
- **HTTPS Authentication**: If authentication fails, verify cookie settings and ensure HTTPS is properly configured
- **HTTP-Only Mode**: If you see a warning about "Running in HTTP mode only", check that your certificate files exist and are readable

## Production Considerations

For production environments:
- Replace self-signed certificates with proper CA-signed certificates
- Consider using a reverse proxy like Nginx for handling SSL termination
- Set appropriate CORS policies and security headers
- Configure auto-renewal for SSL certificates if using Let's Encrypt
- Contact Nguyen Nhat Quang for production certificates
