# Student Management System - Web Version

A web-based Student Management System built with HTML, CSS, JavaScript, and Node.js.

## Features

- **Login System** - Secure authentication (admin/admin123)
- **Dashboard** - Overview statistics
- **Student Management** - Add, Edit, Delete students
- **Modern UI** - Professional web interface
- **Responsive Design** - Works on all screen sizes

## Prerequisites

- **Node.js** - Download from: https://nodejs.org/

## How to Run

### Option 1: Using Batch File (Windows)

1. Double-click `run-web.bat`
2. Open browser and go to: http://localhost:3000
3. Login with: `admin` / `admin123`

### Option 2: Using Command Line

1. Open terminal/command prompt
2. Navigate to the `web` folder
3. Run:
   ```bash
   node server.js
   ```
4. Open browser: http://localhost:3000
5. Login with: `admin` / `admin123`

## Project Structure

```
web/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Styles
├── js/
│   └── app.js          # JavaScript logic
├── server.js           # Node.js server
├── run-web.bat         # Windows batch file
└── README.md           # This file
```

## Usage

1. **Login** - Enter username: `admin`, password: `admin123`
2. **Dashboard** - View statistics
3. **Students** - Add, edit, delete students
4. **Navigation** - Use sidebar to navigate between modules

## Modules

- ✓ Dashboard
- ✓ Students Management
- ✓ Teachers Management
- ✓ Courses Management 
- ✓ Subjects Management 
- ✓ Attendance Management
- ✓ Marks Management 
- ✓ Reports

## Stopping the Server

Press `Ctrl+C` in the terminal/command prompt to stop the server.
