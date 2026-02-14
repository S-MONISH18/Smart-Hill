# Smart Hill

Smart Hill is a comprehensive application designed for monitoring and managing hill-side agricultural or environmental data. It features a modern web dashboard, a robust backend API, and a mobile application for on-the-go access.

## 🚀 Features

- **Real-time Monitoring**: Dashboard for visualizing sensor data (NPK, etc.).
- **Email Notifications**: Automated alerts and reports via email.
- **Mobile Access**: Dedicated Android application built with Capacitor.
- **Modern UI**: Responsive design using Shadcn UI and Tailwind CSS.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **State Management**: React Query
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Email Service**: Nodemailer

### Mobile
- **Framework**: Capacitor (Android)

## 📂 Project Structure

```
├── android/        # Android project files
├── backend/        # Node.js backend server
├── src/            # React frontend source code
├── public/         # Static assets
└── ...
```

## 🏁 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB installed and running locally or a cloud connection string.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory with your configuration:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the root directory (if not already there):
   ```bash
   cd ..
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 📱 Building Android App

To build the Android application:

1. Sync the project with Capacitor:
   ```bash
   npx cap sync
   ```

2. Open the project in Android Studio:
   ```bash
   npx cap open android
   ```

3. Build and run the app on an emulator or physical device.

## 📄 License

This project is licensed under the ISC License.

