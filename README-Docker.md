# Docker Setup Guide for Online Newspaper Application

This guide will help you set up the Online Newspaper application using Docker, eliminating the need for manual MySQL, XAMPP, and other local installations.

## Prerequisites

1. **Docker Desktop** (for Windows/Mac) or **Docker Engine** (for Linux)

    - Download from: https://www.docker.com/products/docker-desktop
    - Ensure Docker is running

2. **Docker Compose** (usually included with Docker Desktop)
    - Verify installation: `docker-compose --version`

## 🚀 Quick Start (Recommended)

### For Windows:

```bash
# Option 1: Quick start (if .env already exists)
quick-start.bat

# Option 2: Full setup with environment creation
docker-setup.bat
```

### For Linux/Mac:

```bash
# Option 1: Quick start (if .env already exists)
docker-compose up -d

# Option 2: Full setup with environment creation
chmod +x docker-setup.sh
./docker-setup.sh
```

## Detailed Setup Options

### Option 1: Automated Setup (Recommended)

#### For Windows:

```bash
# Run the Windows batch file
docker-setup.bat
```

#### For Linux/Mac:

```bash
# Make the script executable and run it
chmod +x docker-setup.sh
./docker-setup.sh
```

### Option 2: Manual Setup

1. **Clone the repository** (if not already done):

```bash
git clone <repository-url>
cd PROJECT-WEBPR
```

2. **Create environment file**:

```bash
cp .env.example .env
```

3. **Edit the `.env` file** with your actual API keys:

```bash
# Edit .env file with your actual values
nano .env  # or use your preferred editor
```

4. **Build and start containers**:

```bash
docker-compose up --build -d
```

5. **Wait for services to be ready** (about 30-60 seconds):

```bash
# Check container status
docker-compose ps
```

## Accessing the Application

Once setup is complete, you can access:

-   **Main Application**: http://localhost:3000
-   **phpMyAdmin**: http://localhost:8080
    -   Username: `root`
    -   Password: `rootpassword`

## Docker Services

The setup includes three main services:

### 1. MySQL Database (`mysql`)

-   **Port**: 3306
-   **Database**: `onlinenewspaper`
-   **User**: `newspaper_user`
-   **Password**: `newspaper_password`
-   **Root Password**: `rootpassword`

### 2. Node.js Application (`app`)

-   **Port**: 3000
-   **Environment**: Development
-   **Health Check**: Available at `/health`

### 3. phpMyAdmin (`phpmyadmin`)

-   **Port**: 8080
-   **Purpose**: Database management interface

## Development vs Production

### Development Mode (Default)

-   Uses `docker-compose.yml` + `docker-compose.override.yml`
-   Live code reloading with nodemon
-   Source code mounted as volumes
-   Development-friendly health checks

### Production Mode

-   Use `Dockerfile.prod` for optimized builds
-   Multi-stage build for smaller images
-   Production-only dependencies
-   Enhanced security

```bash
# For production build
docker build -f Dockerfile.prod -t newspaper-app:prod .
```

## Useful Docker Commands

### View Logs

```bash
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View logs for specific service
docker-compose logs app
docker-compose logs mysql
```

### Container Management

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: This will delete all data)
docker-compose down -v

# Restart services
docker-compose restart

# Rebuild and restart
docker-compose up --build -d
```

### Database Operations

```bash
# Access MySQL directly
docker-compose exec mysql mysql -u root -prootpassword onlinenewspaper

# Backup database
docker-compose exec mysql mysqldump -u root -prootpassword onlinenewspaper > backup.sql

# Restore database
docker-compose exec -T mysql mysql -u root -prootpassword onlinenewspaper < backup.sql
```

### Application Operations

```bash
# Access application container
docker-compose exec app sh

# Run npm commands inside container
docker-compose exec app npm install <package-name>

# View application files
docker-compose exec app ls -la
```

## Environment Variables

The following environment variables are configured in `docker-compose.yml`:

| Variable         | Default Value              | Description                         |
| ---------------- | -------------------------- | ----------------------------------- |
| `NODE_ENV`       | `development`              | Application environment             |
| `HOST_NAME`      | `localhost`                | Application hostname                |
| `PORT`           | `3000`                     | Application port                    |
| `DB_HOST`        | `mysql`                    | Database host (Docker service name) |
| `DB_PORT`        | `3306`                     | Database port                       |
| `DB_USER`        | `newspaper_user`           | Database username                   |
| `DB_PWD`         | `newspaper_password`       | Database password                   |
| `DB_NAME`        | `onlinenewspaper`          | Database name                       |
| `SESSION_SECRET` | `your_session_secret_here` | Session encryption key              |
| `PASSWORD_ROUND` | `10`                       | Password hashing rounds             |
| `UPLOAD_PATH`    | `/app/uploads`             | Upload directory path               |

## Troubleshooting

### Common Issues

1. **Port Already in Use**

    ```bash
    # Check what's using the port
    netstat -ano | findstr :3000  # Windows
    lsof -i :3000                 # Linux/Mac

    # Change ports in docker-compose.yml if needed
    ```

2. **Database Connection Issues**

    ```bash
    # Check if MySQL is running
    docker-compose ps mysql

    # Check MySQL logs
    docker-compose logs mysql

    # Wait longer for MySQL to initialize
    docker-compose restart mysql
    ```

3. **Permission Issues (Linux/Mac)**

    ```bash
    # Fix upload directory permissions
    sudo chown -R $USER:$USER uploads/
    chmod 755 uploads/
    ```

4. **Container Won't Start**

    ```bash
    # Check detailed logs
    docker-compose logs app

    # Rebuild without cache
    docker-compose build --no-cache
    docker-compose up -d
    ```

### Reset Everything

If you need to start completely fresh:

```bash
# Stop and remove everything
docker-compose down -v

# Remove all images
docker rmi $(docker images -q)

# Remove all volumes
docker volume prune

# Start over
./docker-setup.sh  # or docker-setup.bat on Windows
```

## Development Workflow

### Making Code Changes

1. **Edit your code** in your local directory
2. **Changes are automatically detected** (nodemon will restart the app)
3. **Or restart manually**:
    ```bash
    docker-compose restart app
    ```

### Adding New Dependencies

1. **Add to package.json** in your local directory
2. **Rebuild the container**:
    ```bash
    docker-compose build app
    docker-compose up -d
    ```

### Database Changes

1. **Update database_query.sql** with your schema changes
2. **Recreate the database**:
    ```bash
    docker-compose down -v
    docker-compose up -d
    ```

## Production Considerations

For production deployment:

1. **Change default passwords** in `docker-compose.yml`
2. **Use environment-specific .env files**
3. **Configure proper SSL certificates**
4. **Set up database backups**
5. **Use Docker secrets for sensitive data**
6. **Configure proper logging**
7. **Use production Dockerfile**: `Dockerfile.prod`

## Benefits of Docker Setup

✅ **No XAMPP installation required**  
✅ **No manual MySQL setup**  
✅ **Consistent environment across team members**  
✅ **Easy port management**  
✅ **Isolated development environment**  
✅ **Quick setup and teardown**  
✅ **Built-in health checks**  
✅ **Easy database management with phpMyAdmin**  
✅ **Live code reloading in development**  
✅ **Production-ready configurations**

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review Docker and application logs
3. Ensure Docker Desktop is running
4. Verify all prerequisites are installed
5. Check for port conflicts

For additional help, refer to the main README.md file or contact the development team.
