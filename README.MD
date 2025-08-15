# NewsFlow∞ - Modern Online Newspaper Platform

A comprehensive online newspaper platform forked from the original **DHLQS News** project, which was developed as the final assignment for Web Programming (WEPR330479E), Semester 1, 2024-2025 at Ho Chi Minh City University of Technology and Education (HCMUTE).

## 🚀 Project Overview

**NewsFlow∞** is a full-stack online newspaper platform that demonstrates modern web development practices and provides a complete content management system. Built on the solid foundation of the original academic project, this fork evolves the platform with enhanced features and improved user experience.

The application follows an MVC architecture and implements a sophisticated publishing workflow from content creation by writers through editorial review to reader consumption, with premium subscription features for monetization.

## 📚 Original Project Credits

### Course Information

-   **Original Course**: Web Programming (WEPR330479E)
-   **Semester**: 1 (2024-2025)
-   **Institution**: Ho Chi Minh City University of Technology and Education
-   **Instructor**: MIT. Ngô Ngọc Đăng Khoa

### Original Team Members (DHLQS News)

-   Đặng Hữu Lộc - 22110052
-   Nguyễn Nhật Quang - 22110065
-   Nguyễn Quang Sáng - 22110067
-   Hồ Thành Đạt - 22110020
-   Nguyễn Gia Huy - 22110034

_This fork maintains full respect for the original academic work and team contributions._

## ✨ Enhanced Features

### 📖 Reader Experience

-   **Advanced Article Browsing**: Browse articles by categories and tags with intuitive filtering
-   **Rich Content Viewing**: View article details with embedded comments and social features
-   **Smart Search**: Advanced search functionality with real-time filtering and suggestions
-   **Premium Content**: Exclusive access to premium articles for subscribers
-   **Personal Dashboard**: Comprehensive user profile management with reading history
-   **PDF Export**: Download premium articles in PDF format for offline reading
-   **Interactive Comments**: Engage with content through threaded comments
-   **Search Analytics**: Track and manage your search history and preferences
-   **Subscription Management**: Easy premium subscription handling and renewal

### ✍️ Writer Workspace

-   **Rich Text Editor**: Create and edit articles with TinyMCE integration
-   **Workflow Management**: Track article status (draft, waiting, published, archived, needs changes)
-   **Content Organization**: Assign categories and tags for better content discovery
-   **Premium Content**: Flag articles as premium for monetization
-   **Editorial Feedback**: Receive and respond to editorial feedback notifications
-   **Approval Tracking**: Monitor article approval history and status changes
-   **Draft Management**: Save and manage multiple article drafts
-   **Image Integration**: Upload and manage images directly in the editor

### 🔍 Editor Dashboard

-   **Content Review**: Review pending articles in assigned categories
-   **Approval Workflow**: Approve or reject submissions with detailed feedback
-   **Category Management**: Manage article tags and categories within your domain
-   **Content Monitoring**: Track published content performance and engagement
-   **Status Processing**: Handle articles with various statuses (waiting, need changes, published)
-   **Analytics Overview**: View insights on managed content and reader engagement
-   **Quality Control**: Maintain editorial standards across your category

### ⚙️ Admin Control Center

-   **User Management**: Comprehensive management of readers, writers, and editors
-   **Role Assignment**: Assign categories to editors and manage permissions
-   **System Oversight**: Monitor and manage all platform content and users
-   **Tag Administration**: Manage tags across the entire platform
-   **User Roles**: View and modify user roles and permissions
-   **Account Management**: Handle user account creation, modification, and deactivation
-   **Subscription Monitoring**: Track premium subscriptions and revenue
-   **System Configuration**: Manage platform settings and configurations

## 🔄 Content Workflow

```
Writer Creates/Edits Article → Submits for Review →
Editor Reviews → Approves/Requests Changes →
Writer Makes Changes (if needed) → Article Published →
Readers Access Content (Premium features for subscribers)
```

## 🛠️ Technology Stack

### Frontend

-   **EJS** (Embedded JavaScript templates) - Server-side templating
-   **Bootstrap 4.6** - Responsive UI framework
-   **TinyMCE Editor** - Rich text editing capabilities
-   **jQuery** - DOM manipulation and AJAX
-   **AJAX** - Asynchronous operations for smooth UX

### Backend

-   **Node.js** - JavaScript runtime environment
-   **Express.js** - Web application framework
-   **MySQL** - Relational database with Knex.js query builder
-   **Express Session** - Session-based authentication

### Core Dependencies

-   `express` - Web application framework
-   `express-session` - Session middleware
-   `express-validator` - Input validation middleware
-   `express-ejs-layouts` - Layout support for EJS templates
-   `ejs` - Template engine
-   `mysql2` - MySQL database driver
-   `knex` - SQL query builder
-   `bcrypt` - Password hashing and security
-   `multer` - File upload handling
-   `dotenv` - Environment variable management
-   `axios` - HTTP client for API calls
-   `date-fns` - Modern date utility library

### Authentication & Security

-   `passport` - Authentication middleware
-   `passport-google-oauth20` - Google OAuth2.0 strategy
-   `passport-facebook` - Facebook OAuth strategy
-   Local authentication strategy
-   Session-based security

### Development Tools

-   `nodemon` - Development server with auto-reload

## 📁 Project Structure

```
src/
├── config/         # Configuration files (DB, Passport, View Engine)
├── controllers/    # Route handlers (admin, article, editor, writer)
├── middlewares/    # Custom middleware functions (auth, user, category)
├── models/         # Database models and data access
├── public/         # Static files (CSS, JS, images)
│   ├── css/        # Stylesheets and design system
│   ├── js/         # Client-side JavaScript
│   └── img/        # Images and media assets
├── routes/         # Route definitions and API endpoints
├── services/       # Business logic (article, user, category, tag)
├── validators/     # Input validation schemas
├── views/          # EJS templates
│   ├── vwAdmin/    # Admin interface views
│   ├── vwEditor/   # Editor dashboard views
│   ├── vwWriter/   # Writer workspace views
│   ├── vwHomepage/ # Public homepage views
│   ├── vwLogin/    # Authentication views
│   └── layouts/    # Shared layout templates
└── server.js       # Application entry point
```

## 🚀 Quick Start

### Prerequisites

-   **Node.js** (v16 or higher)
-   **MySQL** (v8.0 or higher)
-   **Git**
-   **NPM** or **Yarn** package manager
-   Modern web browser with JavaScript enabled
-   Code editor (VS Code recommended)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/NewsFlow-Infinity
cd NewsFlow-Infinity
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Configuration**
   Create a `.env` file based on the following template:

```env
# Application Configuration
NODE_ENV=development
HOST_NAME=localhost
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_database_username
DB_PWD=your_database_password
DB_NAME=onlinenewspaper

# TinyMCE Configuration
TINY_API_KEY=your_tiny_api_key

# Security Configuration
PASSWORD_ROUND=10
SESSION_SECRET=your_session_secret_key

# OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# reCAPTCHA Configuration
GOOGLE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
GOOGLE_RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
```

4. **Database Setup**

```bash
# Import the database schema
mysql -u your_username -p < database_query.sql
```

5. **Start Development Server**

```bash
npm start
```

The application will be available at `http://localhost:3000`

### Docker Support

For containerized deployment, use the provided Docker configuration:

```bash
# Using Docker Compose
docker-compose up -d

# Or build and run manually
docker build -t newsflow-infinity .
docker run -p 3000:3000 newsflow-infinity
```

## 🔧 Troubleshooting

### Common Issues

-   **Database Connection**: Verify MySQL credentials and ensure the service is running
-   **TinyMCE Issues**: Check that your API key is correctly configured in the `.env` file
-   **Image Uploads**: Ensure the `uploads/` directory has proper write permissions
-   **OAuth Problems**: Verify Google/Facebook OAuth credentials and callback URLs

### Development Tips

-   Use `npm run dev` for development with auto-reload
-   Check the console for detailed error messages
-   Verify all environment variables are properly set
-   Ensure database tables are created before starting the application

## 📡 API Overview

### Authentication Endpoints

-   `POST /auth/login` - User login
-   `POST /auth/register` - User registration
-   `GET /auth/google` - Google OAuth login
-   `GET /auth/facebook` - Facebook OAuth login

### Article Endpoints

-   `GET /article/:id` - View article details
-   `POST /article/search` - Search articles
-   `POST /article/:id/comments` - Post comments

### Writer Endpoints

-   `GET /writer` - Writer dashboard
-   `GET /writer/new` - Create new article
-   `POST /writer/new` - Submit new article
-   `GET /writer/edit/:id` - Edit existing article
-   `PUT /writer/edit/:id` - Update article

### Editor Endpoints

-   `GET /editor` - Editor dashboard
-   `GET /editor/edit/:id` - Review article
-   `POST /editor/approve` - Approve article
-   `POST /editor/reject` - Reject article with feedback

### Admin Endpoints

-   `GET /admin` - Admin dashboard
-   `GET /admin/writers` - Manage writers
-   `GET /admin/editors` - Manage editors
-   `GET /admin/readers` - Manage readers
-   `GET /admin/tags` - Manage tags

## 🎯 Implementation Status

### ✅ Completed Features

-   User authentication (Local, Google, Facebook OAuth)
-   Comprehensive article management system
-   Category and tag management
-   Role-based access control (Reader, Writer, Editor, Admin)
-   Rich text editor integration (TinyMCE)
-   Image upload and management
-   Responsive design with Bootstrap
-   Article approval workflow
-   Comment system with threading
-   Premium subscription features
-   Search functionality with filters
-   User profile management

### 🔄 In Progress

-   Real-time notifications system
-   Advanced analytics dashboard
-   Email newsletter integration
-   Content recommendation engine
-   Mobile app development

### 📋 Planned Features

-   AI-powered content suggestions
-   Advanced SEO optimization
-   Social media integration
-   Multi-language support
-   Advanced reporting and analytics

## 👥 User Roles & Permissions

### Reader

-   Browse and search articles
-   Comment on articles
-   Access premium content (with subscription)
-   Manage personal profile
-   Track reading history

### Writer

-   Create and edit articles
-   Submit articles for review
-   Receive editorial feedback
-   Manage article drafts
-   Track publication status

### Editor

-   Review submitted articles
-   Approve or reject content
-   Provide editorial feedback
-   Manage assigned categories
-   Monitor content quality

### Admin

-   Manage all users and roles
-   System-wide content oversight
-   Platform configuration
-   Analytics and reporting
-   Tag and category management

## 🤝 Contributing

We welcome contributions to improve NewsFlow∞! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

-   Follow existing code style and conventions
-   Add appropriate tests for new features
-   Update documentation for API changes
-   Ensure all tests pass before submitting

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙏 Acknowledgments

-   **Original Team**: Special thanks to the DHLQS team for the solid foundation
-   **HCMUTE**: For providing the academic framework and guidance
-   **Open Source Community**: For the amazing tools and libraries that make this possible

## 📞 Support

For support, questions, or contributions:

-   Create an issue on GitHub
-   Contact the maintainer directly
-   Check the documentation for common solutions

---

**NewsFlow∞** - Where content flows infinitely, connecting writers, editors, and readers in a seamless digital experience.
