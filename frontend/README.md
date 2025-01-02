# Ritematch Frontend

## Description

The Ritematch frontend complements the Django ritematch backend, providing a user-friendly interface for signing up, signing in, and interacting with job listings. The "Check My Job Score" page reveals job scores based on user-selected skills, utilizing the backend's scoring algorithms.

## Installation

### Step 1: Clone the repository

```bash
git clone <repository-url>
cd <project-directory>/frontend
```

### Step 2: Install necessary packages

```bash
npm install
```

### Step 3: Run the development server

```bash
npm start
```
The above command will start the development server. Open your browser and visit http://localhost:3000 to access the React app.

## Deployment

### Step 1: Build the project

```bash
npm run build
```
This command will create a build directory with the production-ready files.

### Step 2: Install Firebase CLI (if not already installed)

```bash
npm install -g firebase-tools
```

### Step 3: Login to Firebase

```bash
firebase login
```
Follow the prompts to authenticate and log in.

### Step 4: Initialize Firebase

```bash
firebase init
```
Follow the prompts and select the hosting option. Configure the project by choosing the build directory as the public directory.

### Step 5: Deploy to Firebase

```bash
firebase deploy
```
Firebase will provide you with a hosting URL where your React app is now deployed.

The app is now ready for deployment on Firebase hosting!
