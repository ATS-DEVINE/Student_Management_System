# Student Management System

A complete Java Swing desktop application for managing student information, teachers, courses, attendance, and examination marks in educational institutions.

**Subject:** Project Based Learning in Java (24CSH-301/24ITH-301)  
**Technology:** Java Swing + Core Java + MySQL + JDBC

---

## Features

- **Student Management:** Add, view, edit, delete, and search students
- **Teacher Management:** Complete CRUD operations for teachers
- **Course Management:** Manage courses and departments
- **Subject Management:** Manage subjects with teacher assignments
- **Attendance Management:** Mark attendance and calculate percentages
- **Marks Management:** Enter marks and calculate grades automatically
- **Reports:** Generate various academic reports
- **Authentication:** Secure login system
- **Professional UI:** Modern Java Swing interface with sidebar navigation

---

## Technology Stack

### Frontend
- **Java Swing:** JFrame, JPanel, JButton, JLabel, JTextField, JTable, JComboBox, JOptionPane
- **AWT:** Graphics, Layout Managers, Event Handling

### Backend
- **Core Java:** OOP, Collections, Streams, Lambda, Multithreading
- **JDBC:** DriverManager, Connection, PreparedStatement, ResultSet

### Database
- **MySQL 8.0:** Relational database management system

### Design Patterns
- **Singleton Pattern:** Database connection
- **DAO Pattern:** Data access objects
- **MVC Pattern:** Model-View-Controller architecture
- **Strategy Pattern:** Grade calculation

---

## Java Concepts Demonstrated

### Unit 1 - Core Java
- Classes, Objects, Constructors
- Access Modifiers (private, public, protected)
- Static Members
- Encapsulation (private fields, getters/setters)
- Inheritance (Student, Teacher extend Person)
- Abstraction (Person abstract class)
- Polymorphism (Method overriding)
- Exception Handling (try-catch, custom exceptions)

### Unit 2 - Advanced Java
- **Collections:** ArrayList, HashMap, HashSet, TreeMap
- **Multithreading:** Runnable, Thread lifecycle, background tasks
- **Wrapper Classes:** Integer, Double, Boolean, autoboxing
- **Lambda & Streams:** filter(), map(), sorted(), collect(), groupingBy()
- **JDBC:** DriverManager, PreparedStatement, CRUD operations

### Unit 3 - Enterprise Java
- **IoC & DI:** Dependency injection in constructors
- **Design Patterns:** Singleton, DAO, MVC, Strategy

---

## Project Structure

```
Student-Management-System-main/
├── src/
│   ├── Main.java                          # Application entry point
│   ├── database/
│   │   └── DBConnection.java              # Singleton database connection
│   ├── model/
│   │   ├── Person.java                    # Abstract base class
│   │   ├── Student.java                   # Student entity
│   │   ├── Teacher.java                   # Teacher entity
│   │   ├── Course.java                    # Course entity
│   │   ├── Subject.java                   # Subject entity
│   │   ├── Attendance.java                # Attendance entity
│   │   └── Marks.java                     # Marks entity
│   ├── dao/
│   │   ├── StudentDAO.java                # Student data access
│   │   ├── TeacherDAO.java                # Teacher data access
│   │   ├── CourseDAO.java                 # Course data access
│   │   ├── SubjectDAO.java                # Subject data access
│   │   ├── AttendanceDAO.java             # Attendance data access
│   │   └── MarksDAO.java                  # Marks data access
│   ├── service/
│   │   ├── StudentService.java            # Student business logic
│   │   ├── TeacherService.java            # Teacher business logic
│   │   ├── CourseService.java             # Course business logic
│   │   ├── SubjectService.java            # Subject business logic
│   │   ├── AttendanceService.java         # Attendance business logic
│   │   └── MarksService.java              # Marks business logic
│   ├── view/
│   │   ├── LoginFrame.java                # Login screen
│   │   ├── DashboardFrame.java            # Main dashboard
│   │   ├── StudentManagementFrame.java    # Student management
│   │   ├── TeacherManagementFrame.java    # Teacher management
│   │   ├── CourseManagementFrame.java     # Course management
│   │   ├── SubjectManagementFrame.java    # Subject management
│   │   ├── AttendanceManagementFrame.java # Attendance management
│   │   ├── MarksManagementFrame.java      # Marks management
│   │   └── ReportsFrame.java              # Reports generation
│   ├── exception/
│   │   ├── StudentNotFoundException.java   # Custom exception
│   │   ├── DuplicateStudentException.java # Custom exception
│   │   └── InvalidMarksException.java     # Custom exception
│   └── util/
│       ├── StudentAnalyticsUtil.java      # Collections & Streams demo
│       └── ReportGenerator.java           # Multithreading demo
├── database/
│   ├── schema.sql                         # Database schema
│   └── sample-data.sql                    # Sample data
├── documentation/
│   └── project-report.md                  # Complete project report
└── README.md                              # This file
```

---

## Prerequisites

1. **Java Development Kit (JDK):** Java 21 or higher
   - Download from: https://www.oracle.com/java/technologies/downloads/
   
2. **IDE:** IntelliJ IDEA (recommended) or Eclipse
   - Download IntelliJ IDEA Community Edition: https://www.jetbrains.com/idea/download/

3. **MySQL Server:** MySQL 8.0 or higher
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Or install MySQL Workbench: https://dev.mysql.com/downloads/workbench/

4. **MySQL Connector/J:** JDBC driver
   - Download from: https://dev.mysql.com/downloads/connector/j/
   - Or add via Maven/Gradle

---

## Installation Guide

### Step 1: Install Java

1. Download and install JDK 21 or higher
2. Set JAVA_HOME environment variable
3. Verify installation:
   ```bash
   java -version
   javac -version
   ```

### Step 2: Install MySQL

1. Download and install MySQL Server
2. Set root password (remember it for configuration)
3. Start MySQL service
4. Verify installation:
   ```bash
   mysql --version
   ```

### Step 3: Setup Database

1. Open MySQL Workbench or Command Line
2. Login to MySQL:
   ```bash
   mysql -u root -p
   ```
3. Run the schema script:
   ```bash
   source path/to/database/schema.sql
   ```
   Or from command line:
   ```bash
   mysql -u root -p < database/schema.sql
   ```
4. Run the sample data script (optional):
   ```bash
   mysql -u root -p student_management < database/sample-data.sql
   ```

### Step 4: Configure Database Connection

Open `src/database/DBConnection.java` and update the database credentials:

```java
private static final String URL = "jdbc:mysql://localhost:3306/student_management";
private static final String USERNAME = "root";
private static final String PASSWORD = "123456"; // Already configured
```

### Step 5: Add MySQL Connector/J

**Option 1: Using IntelliJ IDEA**
1. Right-click on project → Open Module Settings
2. Go to Libraries → Click + → Java
3. Select the MySQL Connector JAR file
4. Apply and close

**Option 2: Using Command Line**
```bash
javac -cp .;mysql-connector-j-8.0.33.jar src/*.java src/**/*.java
java -cp .;mysql-connector-j-8.0.33.jar src.Main
```

---

## Execution Guide

### Using IntelliJ IDEA

1. Open IntelliJ IDEA
2. Click "Open" and select the project folder
3. Wait for project to load
4. Add MySQL Connector JAR to project libraries (if not done)
5. Open `src/Main.java`
6. Click the green run button or press Shift+F10

### Using Command Line

1. Navigate to project directory:
   ```bash
   cd "c:\Users\this\Downloads\java project\Student-Management-System-main"
   ```

2. Compile the project:
   ```bash
   javac -cp .;mysql-connector-j-8.0.33.jar src/*.java src/**/*.java src/**/**/*.java
   ```

3. Run the application:
   ```bash
   java -cp .;mysql-connector-j-8.0.33.jar src.Main
   ```

---

## Login Credentials

**Default Admin Login:**
- Username: `admin`
- Password: `admin123`

---

## Usage Guide

### 1. Login
- Enter username and password
- Click Login or press Enter
- Default credentials: admin / admin123

### 2. Dashboard
- View overall statistics
- Navigate to different modules using sidebar
- Quick access to all features

### 3. Student Management
- **Add Student:** Click "Add Student" button, fill form, save
- **View Students:** Browse all students in table
- **Edit Student:** Select row, click "Edit Student"
- **Delete Student:** Select row, click "Delete Student", confirm
- **Search:** Enter name in search field, click Search
- **Filter:** Select department/semester from dropdowns

### 4. Teacher Management
- Similar CRUD operations as Student Management
- View teacher list, add, edit, delete teachers

### 5. Course Management
- Manage courses and departments
- Add new courses with duration

### 6. Subject Management
- Manage subjects with semester and credits
- Assign teachers to subjects

### 7. Attendance Management
- Select student, subject, and date
- Mark Present or Absent
- View attendance history
- Calculate attendance percentage

### 8. Marks Management
- Enter examination marks
- View marks records
- Automatic grade calculation

### 9. Reports
- Generate various reports
- Student details, attendance, marks, performance

---

## Database Schema

### Tables

1. **admin** - Administrator accounts
2. **students** - Student information
3. **teachers** - Teacher information
4. **courses** - Course details
5. **subjects** - Subject details with teacher assignments
6. **attendance** - Attendance records
7. **marks** - Examination marks

### Key Features
- Primary keys with auto-increment
- Foreign key relationships
- Unique constraints (UID, email)
- NOT NULL constraints
- Indexes for performance
- Cascade delete for referential integrity

---

## Design Patterns Implemented

### 1. Singleton Pattern
**Class:** `DBConnection.java`
- Ensures only one database connection instance
- Private constructor
- Static getInstance() method

### 2. DAO Pattern
**Classes:** All DAO classes (StudentDAO, TeacherDAO, etc.)
- Separates data access logic from business logic
- Each entity has its own DAO
- Standard CRUD operations

### 3. MVC Pattern
**Architecture:**
- **Model:** Entity classes (Student, Teacher, etc.)
- **View:** Swing frames (LoginFrame, DashboardFrame, etc.)
- **Controller:** Event handlers and service layer

### 4. Strategy Pattern
**Class:** `Marks.java`
- Grade calculation strategy
- Configurable grading scale
- Easy to modify grading rules

---

## Java Syllabus Mapping

### Unit 1 - Core Java ✓
- Classes and Objects ✓
- Constructors ✓
- Methods and Access Modifiers ✓
- Static Members ✓
- Encapsulation ✓
- Inheritance ✓
- Abstraction ✓
- Polymorphism ✓
- Exception Handling ✓

### Unit 2 - Advanced Java ✓
- Collections (ArrayList, HashMap, HashSet, TreeMap) ✓
- Multithreading (Runnable, Thread) ✓
- Wrapper Classes ✓
- Lambda Expressions ✓
- Stream API ✓
- JDBC ✓

### Unit 3 - Enterprise Java ✓
- IoC and DI ✓
- Design Patterns ✓

---

## Testing

### Manual Testing Checklist

- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Add student with valid data
- [ ] Add student with duplicate UID (should fail)
- [ ] Add student with duplicate email (should fail)
- [ ] Search student by name
- [ ] Filter students by department
- [ ] Filter students by semester
- [ ] Edit student information
- [ ] Delete student
- [ ] Add teacher
- [ ] Add course
- [ ] Add subject
- [ ] Mark attendance
- [ ] Check duplicate attendance (should fail)
- [ ] Calculate attendance percentage
- [ ] Enter marks
- [ ] Enter invalid marks (should fail)
- [ ] Calculate grades
- [ ] Navigate between modules
- [ ] Logout

---

## Troubleshooting

### Issue: ClassNotFoundException for MySQL Driver
**Solution:** Add MySQL Connector JAR to project classpath

### Issue: Unable to connect to database
**Solution:**
- Check MySQL service is running
- Verify database credentials in DBConnection.java
- Ensure database 'student_management' exists

### Issue: Table not found
**Solution:** Run schema.sql to create tables

### Issue: Compilation errors
**Solution:**
- Ensure JDK 21+ is installed
- Check all imports are correct
- Verify MySQL Connector JAR is in classpath

---

## Java Viva Questions and Answers

### Q1: What is the difference between ArrayList and LinkedList?
**A:** ArrayList uses dynamic array, good for random access. LinkedList uses doubly-linked list, good for frequent insertions/deletions.

### Q2: Explain the Singleton pattern.
**A:** Singleton ensures a class has only one instance and provides global access. Used in DBConnection class.

### Q3: What is JDBC?
**A:** JDBC (Java Database Connectivity) is a Java API for connecting and executing queries with databases.

### Q4: Difference between Statement and PreparedStatement?
**A:** PreparedStatement is precompiled, prevents SQL injection, allows parameterized queries. Statement is not precompiled.

### Q5: What is the purpose of DAO pattern?
**A:** DAO (Data Access Object) separates data access logic from business logic, making code more maintainable.

### Q6: Explain Stream API in Java.
**A:** Stream API provides functional-style operations on streams of elements, enabling filter, map, reduce operations.

### Q7: What is a lambda expression?
**A:** Lambda is an anonymous function that enables functional programming. Syntax: (parameters) -> expression.

### Q8: Difference between Runnable and Thread?
**A:** Runnable is an interface, Thread is a class. Runnable is preferred as it allows extending other classes.

### Q9: What is the MVC pattern?
**A:** MVC (Model-View-Controller) separates application into three components: Model (data), View (UI), Controller (logic).

### Q10: Explain exception handling in Java.
**A:** Java uses try-catch-finally blocks. Custom exceptions extend Exception class. throw keyword throws exceptions, throws declares them.

---

## Future Enhancements

1. Multi-user support with role-based access (Admin, Teacher, Student)
2. Web-based version using Spring Boot
3. PDF/CSV export for reports
4. Email notifications for attendance shortage
5. Fee management module
6. Library management module
7. Automated database backup
8. Advanced analytics dashboard
9. Mobile companion app
10. Cloud database integration

---

## Project Team

**Developer:** [Your Name]  
**Roll No:** [Your Roll No]  
**Semester:** 5th Semester BE CSE  
**Academic Year:** 2024-2025

---

## License

This project is developed for academic purposes.

---

## Acknowledgments

- Faculty mentors for guidance
- Java documentation and tutorials
- MySQL documentation
- Open-source community

---

**Project Status:** Completed  
**Last Updated:** October 2024
# Student_Management_System
