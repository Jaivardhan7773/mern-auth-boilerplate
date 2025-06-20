 ## 📦 Installation

To scaffold a new MERN Auth project, run:
```bash

npx mern-auth-boilerplate

```
# 🧱 MERN Auth Boilerplate CLI

A simple and powerful CLI tool to scaffold a fully functional **MERN Stack Authentication** boilerplate. Includes **JWT**, **Zustand**, and modern best practices for fullstack apps.

---

## 🚀 Quick Start


## Usage/Examples

```
📌 Usage / Examples
Once both frontend and backend servers are running:

🔐 1. Automatic Redirect to Signup/Login
If you're not logged in, you’ll be automatically redirected to the /signup page

If you already have an account, click “Already have an account?” to switch to /login

🔑 2. Login with Credentials
Enter your registered email and password

A JWT token is securely stored in an HTTP-only cookie

🔒 3. Access Protected Pages
Once authenticated, you can access:

✅ /profile – View and update your profile with a profile picture (Cloudinary integration)

✅ /home – A protected page (currently minimal content)

🔐 Trying to access these routes without authentication will auto-redirect you to /signup
```


## 🚀 Tech Stack

**Client:** React.js, Zustand, Axios,  CSS  
**Server:** Node.js, Express.js, MongoDB, Cloudinary  
**Authentication:** JWT (via HTTP-only Cookies)  
**Tools & Services:** Vite, dotenv, Cloudinary, Mongoose


## 👨‍💻 Author

- [@Jaivardhan7773](https://github.com/Jaivardhan7773) – Full-Stack Web Developer  
  🚀 Passionate about building scalable web apps with MERN stack & modern tools.  
  💻 Loves React, Node.js, Zustand, MongoDB & experimenting with new tech.  
  🧠 Always learning. Always building. Always leveling up.

### 🌐 Connect with me

- 💼 [LinkedIn](https://www.linkedin.com/in/jaivardhan7773)
- 🐙 [GitHub](https://github.com/Jaivardhan7773)
- 📷 [Instagram](https://www.instagram.com/jaivardhan7773_)

## 📸 Screenshots

### 🔐 Login Page
![Login Page](https://i.ibb.co/BVNZ5t99/Screenshot-2025-06-19-173012.png)

### 📝 Sign Up Page
![Sign Up Page](https://i.ibb.co/HLBRB8v5/Screenshot-2025-06-19-173023.png)

### 👤 Profile Page (Protected)
![Profile Page](https://i.ibb.co/qHL3gDp/Screenshot-2025-06-19-173144.png)

### 🏠 Home Page (Protected)
![Home Page](https://i.ibb.co/LzfL4sXF/Screenshot-2025-06-19-173527.png)


##  🚀   Features

- 🔒 JWT-based authentication with HttpOnly cookies
- 📸 Profile image upload using Cloudinary
- ⚙️ Protected routes (Home & Profile pages)
- 🔁 Auto-redirect to Sign Up/Login based on auth state
- 🧠 Zustand for global state management
- 🌙 Default dark theme UI
- 📱 Fully responsive design for all devices
- 🧭 Dynamic Navbar based on authentication
