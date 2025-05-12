# Online Newspaper Web Application

A web programming course project developed as the final assignment for Web Programming (WEPR330479E), Semester 1, 2024-2025 at Ho Chi Minh City University of Technology and Education (HCMUTE).

## Project Overview

This project implements a full-stack online newspaper platform that demonstrates the practical application of web development concepts learned throughout the course. It features a multi-role user system, content management capabilities, and premium content features.

## Course Information
- **Course**: Web Programming (WEPR330479E)
- **Semester**: 1 (2024-2025)
- **Institution**: Ho Chi Minh City University of Technology and Education
- **Instructor**: MIT. Ngô Ngọc Đăng Khoa

### Team Members
- Đặng Hữu Lộc - 22110052
- Nguyễn Nhật Quang - 22110065
- Nguyễn Quang Sáng - 22110067
- Hồ Thành Đạt - 22110020
- Nguyễn Gia Huy - 22110034

## Features

### Reader Features
- Browse articles by categories and tags
- View article details with comments
- Search functionality
- Premium content access for subscribers
- User profile management

### Writer Features
- Create and edit articles
- Rich text editor with image upload
- Article status tracking
- Category assignment
- Premium content flagging

### Editor Features
- Review pending articles
- Approve or reject submissions with feedback
- Manage article tags
- Monitor published content
- Category-based content management

## Technology Stack

### Frontend
- EJS (Embedded JavaScript templates)
- Bootstrap 4.6
- TinyMCE Editor
- jQuery

### Backend
- Node.js
- Express.js
- MySQL (with Knex.js query builder)
- Express Session for authentication

### Core Dependencies
- `express` - Web application framework
- `express-session` - Session middleware
- `express-validator` - Validation middleware 
- `express-ejs-layouts` - Layout support for EJS templates
- `ejs` - Template engine
- `mysql2` - MySQL database driver
- `knex` - SQL query builder
- `bcrypt` - Password hashing
- `multer` - File upload handling
- `dotenv` - Environment variable management
- `axios` - HTTP client
- `date-fns` - Date utility library

### Authentication
- `passport` - Authentication middleware
- `passport-google-oauth20` - Google OAuth2.0 strategy

### Development Tools
- `nodemon` - Development server with auto-reload

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route handlers
├── middlewares/    # Custom middleware functions
├── models/        # Database models
├── public/        # Static files (CSS, JS, images)
├── routes/        # Route definitions
├── services/      # Business logic
├── views/         # EJS templates
└── server.js      # Application entry point
```

## Development Requirements

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- Git
- NPM or Yarn package manager
- Web browser with JavaScript enabled
- Code editor (VS Code recommended)

## Setup and Installation

1. Clone the repository
```bash
git clone [repository-url]
cd [project-directory]
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file based on `.env.example`
```
NODE_ENV= this could be development or production
HOST_NAME= your website host name
PORT= your website port number

# DB config
DB_HOST=your database host name
DB_PORT= your database port number
DB_USER=your database username
DB_PWD=your database password
DB_NAME=your database name

TINY_API_KEY=your tiny api key

PASSWORD_ROUND=your password round (random number for password hashing, should be small) 

SESSION_SECRET=your session secret (random string)

# For captcha and google login
GOOGLE_CLIENT_ID=google client id
GOOGLE_CLIENT_SECRET=google client secret
GOOGLE_CALLBACK_URL=google callback url
GOOGLE_RECAPTCHA_SITE_KEY=google recaptcha site key
GOOGLE_RECAPTCHA_SECRET_KEY=google recaptcha secret key
```

4. Set up the database
```bash
# Import the database schema
mysql -u your_username -p < database_query.sql
```

5. Start the development server
```bash
npm start
```

## Implementation Status

### Completed Features
- User authentication (Local, Google)
- Article management system
- Category and tag management
- User role-based access control
- Text editor integration
- Image upload functionality
- Responsive layout design

### In Progress
- Comment system enhancement
- Premium subscription features
- Profile management improvements
- Search optimization

### Planned Features
- Real-time notifications
- Article analytics
- Email newsletter system
- Content recommendation engine

## User Roles

- **Reader**: Browse articles, comment, and access premium content (if subscribed)
- **Writer**: Create and edit articles
- **Editor**: Review and manage content
- **Admin**: System administration

### Current Category Management
- "Kinh tế" category is managed by editor1

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Academic Integrity Statement

This project is submitted as coursework for the Web Programming course at HCMUTE. All work presented is original and completed in accordance with academic integrity guidelines.

## License

This project is licensed under the MIT License.
