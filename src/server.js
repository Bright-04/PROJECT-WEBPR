import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
import configurePassport from "./config/passport.js";

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import adminRoutes from "./routes/admin.routes.js";
import apiRoutes from "./routes/api.routes.js";
import articleRoutes from "./routes/article.routes.js";
import defaultRoute from "./routes/default.routes.js";
import writerRoute from "./routes/writer.routes.js";
import homepageRoute from "./routes/homepage.routes.js";
import editorRoute from "./routes/editor.routes.js";
import profileRoute from "./routes/profile.routes.js";
import authRoutes from "./routes/auth.routes.js";
// Note: categoryRoutes are handled through apiRoutes

import configViewEngine from "./config/viewEngine.js";
import { setLocalCategories } from "./middlewares/category.mdw.js";
import { setUser } from "./middlewares/user.mdw.js";
import { isAuth, isEditor, isWriter, isAdmin } from "./middlewares/auth.mdw.js";
import { publish } from "./middlewares/publish.js";

// Initialize express app
const app = express();

configViewEngine(app);

app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use("/api", apiRoutes);

// Improve HTTP to HTTPS redirect middleware - place this before other routes
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

// Quang: Middleware to set category variable - using direct DB access for better performance
app.use(setLocalCategories);

// Dùng session để lưu trạng thái đăng nhập
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 60, // 1 h
			secure: true, // Changed to true for HTTPS
			httpOnly: true,
			sameSite: 'strict'
		},
	})
);

configurePassport(app);

app.use(setUser);
app.use(publish);

// Add reCAPTCHA site key to locals
app.use((req, res, next) => {
	res.locals.GOOGLE_RECAPTCHA_SITE_KEY = process.env.GOOGLE_RECAPTCHA_SITE_KEY;
	next();
});

// Public routes
app.use("/", defaultRoute); // Lộc: Sửa route để khỏi trùng
app.use("/article", articleRoutes); // Lộc: Thêm route còn thiếu
app.use("/homepage", homepageRoute);
app.use("/auth", authRoutes);

// Protected routes with role-specific middleware
app.use("/editor", isAuth, isEditor, editorRoute);
app.use("/writer", isAuth, isWriter, writerRoute);
app.use("/admin", isAuth, isAdmin, adminRoutes);

// Protected routes - no specific role required
app.use("/profile", isAuth, profileRoute);

// Create HTTPS server only if certificates exist
let httpsServer;
try {
  const certPath = './certificates/cert.pem';
  const keyPath = './certificates/key.pem';
  
  if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
    const sslOptions = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath)
    };
    
    httpsServer = https.createServer(sslOptions, app);
    httpsServer.listen(process.env.HTTPS_PORT || 3000, () => {
      console.log(`HTTPS Server running on ${process.env.HOST_NAME}:${process.env.HTTPS_PORT || 3000}`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ HTTPS Port ${process.env.HTTPS_PORT || 3000} is already in use. Try a different port in your .env file.`);
        process.exit(1);
      } else {
        console.error('❌ HTTPS server error:', err);
      }
    });
  } else {
    console.warn('⚠️ SSL certificates not found. HTTPS server not started.');
    console.warn('YOu can contact Nguyen Nhat Quang for production certificates.');
  }
} catch (error) {
  console.error('❌ Failed to start HTTPS server:', error.message);
}

// HTTP server - will serve directly if HTTPS is not available
const httpServer = app.listen(process.env.PORT || 3001, function () {
  if (httpsServer) {
    console.log(`HTTP Server running on ${process.env.HOST_NAME}:${process.env.PORT || 3001} (redirecting to HTTPS)`);
  } else {
    console.log(`HTTP Server running on ${process.env.HOST_NAME}:${process.env.PORT || 3001} (HTTPS not available)`);
    console.log('⚠️ Running in HTTP mode only.');
  }
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${process.env.PORT || 3001} is already in use. Try a different port in your .env file.`);
    process.exit(1);
  } else {
    console.error('❌ HTTP server error:', err);
  }
});