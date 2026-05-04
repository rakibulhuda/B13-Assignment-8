# 📚 BoiGhor - Online Book Borrowing Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel)](YOUR_LIVE_LINK_HERE)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-black?style=for-the-badge&logo=github)](YOUR_GITHUB_REPO_LINK_HERE)

**BoiGhor** (meaning "Book House") is a modern, seamless web application designed to digitize the traditional library experience. Built with **Next.js 15**, **Better Auth**, and **MongoDB**, it allows users to explore a vast collection of books, filter by categories, borrow titles digitally, and manage their profiles securely.

---

## 🌟 Live URL
🔗 **https://boighor-nine.vercel.app/**

---

## ✨ Key Features

### 🔐 Authentication & Security
- **Secure Login/Register:** Email/Password authentication powered by **Better Auth**.
- **Social Login:** One-click sign-in with **Google OAuth**.
- **Protected Routes:** Private routes for Book Details and User Profile ensure only logged-in users can access sensitive features.
- **Session Management:** Persistent sessions with secure cookie handling.

### 📖 Library & Browsing
- **Dynamic Book Catalog:** Display of 12+ books with detailed metadata (Title, Author, Category, Availability).
- **Advanced Filtering:** Sidebar filtering by category (Story, Tech, Science).
- **Real-time Search:** Instant search functionality by book title or author.
- **Book Details:** Dedicated pages for each book showing cover art, description, and availability status.

### 🛠 User Functionality
- **Borrowing System:** Users can "borrow" books with instant feedback via toast notifications.
- **Profile Management:** View user details, join date, and verification status.
- **Update Profile:** Users can update their display name and profile photo instantly.

### 🎨 UI/UX & Design
- **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop.
- **Modern Animations:** Smooth fade-ins, floating elements, and hover effects using custom CSS and **SwiperJS**.
- **Dark Theme:** A sleek, eye-friendly dark mode interface built with Tailwind CSS.
- **Interactive Marquee:** Scrolling announcements for new arrivals and discounts.

---

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router) |
| **Styling** | Tailwind CSS v4, DaisyUI |
| **Authentication** | Better Auth (Email + Google Provider) |
| **Database** | MongoDB Atlas (via Mongoose/MongoDB Driver) |
| **Animation** | SwiperJS, Custom CSS Keyframes |
| **Deployment** | Vercel |
| **Icons** | Lucide React / Custom SVGs |
| **Notifications** | React Hot Toast |

---

## 📦 NPM Packages Used

```json
{
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "better-auth": "latest",
    "mongodb": "latest",
    "mongoose": "latest",
    "tailwindcss": "latest",
    "daisyui": "latest",
    "swiper": "latest",
    "react-hot-toast": "latest",
    "lucide-react": "latest"
  }
}