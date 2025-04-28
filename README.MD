# Online Newspaper Web Application

A comprehensive web programming course project developed as the final assignment for Web Programming (WEPR330479E), Semester 1, 2024-2025 at Ho Chi Minh City University of Technology and Education (HCMUTE).

## Project Overview

This project implements a full-stack online newspaper platform that demonstrates the practical application of web development concepts learned throughout the course. It features a multi-role user system, content management capabilities, and premium content features.

The application follows an MVC architecture and implements a complete publishing workflow from content creation by writers through editorial review to reader consumption, with premium subscription features for monetization.

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
- Search functionality with support for filtering
- Premium content access for subscribers
- User profile management
- PDF download of premium articles
- Comment on articles
- Search history tracking
- Premium subscription management

### Writer Features
- Create and edit articles with different statuses (draft, waiting, published, etc.)
- Rich text editor with image upload via TinyMCE
- Article status tracking (draft, waiting, need changes, archived, published)
- Category and tag assignment
- Premium content flagging
- Receive editorial feedback notifications
- Track article approval history
- Submit articles for review

### Editor Features
- Review pending articles in their assigned category
- Approve or reject submissions with detailed feedback
- Manage article tags and categories
- Monitor published content in their domain
- Category-based content management
- Process articles with different statuses (waiting, need changes, published)
- View analytics on managed content

### Admin Features
- Manage all users (readers, writers, editors)
- Assign categories to editors
- System-wide content oversight
- Tag management across the platform
- View and modify user roles
- User account management
- Monitor premium subscriptions
- System configuration

## Content Workflow

```
Writer Creates/Edits Article → Submits for Review → 
Editor Reviews → Approves/Requests Changes → 
Writer Makes Changes (if needed) → Article Published → 
Readers Access Content (Premium features for subscribers)
```

## Technology Stack

### Frontend
- EJS (Embedded JavaScript templates)
- Bootstrap 4.6
- TinyMCE Editor
- jQuery
- AJAX for asynchronous operations

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
- Local authentication strategy

### Development Tools
- `nodemon` - Development server with auto-reload

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route handlers (admin, article, editor, writer)
├── middlewares/    # Custom middleware functions
├── models/         # Database models
├── public/         # Static files (CSS, JS, images)
├── routes/         # Route definitions
├── services/       # Business logic (article, user, category, tag)
├── views/          # EJS templates
│   ├── vwAdmin/    # Admin views
│   ├── vwEditor/   # Editor views
│   ├── vwWriter/   # Writer views
│   └── layouts/    # Shared layouts
└── server.js       # Application entry point
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
git clone https://github.com/Bright-04/PROJECT-WEBPR
cd PROJECT-WEBPR
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

### Troubleshooting
- If you encounter database connection issues, verify your MySQL credentials and ensure the service is running
- For TinyMCE issues, check that your API key is correctly configured in the .env file
- For image upload problems, ensure the upload directories have proper write permissions

## API Routes Overview

### Authentication Routes
- `/auth/login` - User login
- `/auth/register` - User registration
- `/auth/google` - Google OAuth login

### Article Routes
- `/articles/:id` - View article details
- `/articles/search` - Search articles
- `/articles/:id/comments` - Post comments

### Writer Routes
- `/writer` - Writer dashboard
- `/writer/new` - Create new article
- `/writer/edit/:id` - Edit existing article

### Editor Routes
- `/editor` - Editor dashboard
- `/editor/edit/:id` - Review article
- `/editor/approve` - Approve article
- `/editor/reject` - Reject article with feedback

### Admin Routes
- `/admin` - Admin dashboard
- `/admin/writers` - Manage writers
- `/admin/editors` - Manage editors
- `/admin/readers` - Manage readers
- `/admin/tags` - Manage tags

## Implementation Status

### Completed Features
- User authentication (Local, Google)
- Article management system
- Category and tag management
- User role-based access control
- Text editor integration
- Image upload functionality
- Responsive layout design
- Article approval workflow
- Comment system

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

This project is licensed under the [MIT License](LICENSE).
