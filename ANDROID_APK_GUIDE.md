# 📱 Android APK Creation Guide

This guide explains how to turn your web application into an Android APK using Capacitor.

## Prerequisites

1.  **Android Studio**: Download and install [Android Studio](https://developer.android.com/studio).
2.  **Java/JDK**: Ensure Java Development Kit (JDK) 17 is installed.

## Step 0: Ensure Dependencies are Installed

I have already installed the necessary dependencies for you:
*   `@capacitor/core`
*   `@capacitor/cli`
*   `@capacitor/android`

And initialized the project.

## Step 1: Build the Web App

Before syncing with Android, you must build your React application. I have already triggered a build, but if you make changes, run:

```bash
npm run build
```

This creates a `dist` folder with your compiled web assets.

## Step 2: Sync with Capacitor

Every time you build your web app, you must sync it to the Android project:

```bash
npx cap sync
```

This copies the `dist` folder into the `android` project.

## Step 3: Open in Android Studio

To build the APK, open the `android` folder in Android Studio:

```bash
npx cap open android
```

Or manually launch Android Studio and open the `android` directory inside your project folder.

## Step 4: Build the APK

1.  In Android Studio, wait for Gradle sync to complete (this might take a few minutes the first time).
2.  Go to **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
3.  Once the build completes, a notification will appear. Click **locate** to find your `.apk` file.
    *   It's usually in `android/app/build/outputs/apk/debug/app-debug.apk`.

## Step 5: Run on Emulator or Device

*   **Emulator**: Create a virtual device (AVD) using the Device Manager and click the **Run** (green play) button.
*   **Physical Device**: Enable **USB Debugging** on your phone, connect it via USB, and run the app from Android Studio.

## Troubleshooting

*   **Gradle Errors**: If you see errors about Gradle versions, Android Studio usually suggests a fix (like "Upgrade Gradle Wrapper"). Click the suggested fix.
*   **API Connection**: Ensure your `VITE_API_URL` uses `https` (like your Render URL). Android blocks `http` (cleartext) traffic by default unless configured otherwise.
*   **Assets Not Updating**: Did you run `npm run build` and `npx cap sync`? If not, the native app won't see your latest changes.
