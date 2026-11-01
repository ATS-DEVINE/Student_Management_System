// Application State
let students = [];
let currentPage = 'dashboard';

// DOM Elements
const loginPage = document.getElementById('loginPage');
const dashboardPage = document.getElementById('dashboardPage');
const studentsPage = document.getElementById('studentsPage');
const teachersPage = document.getElementById('teachersPage');
const coursesPage = document.getElementById('coursesPage');
const subjectsPage = document.getElementById('subjectsPage');
const attendancePage = document.getElementById('attendancePage');
const marksPage = document.getElementById('marksPage');
const reportsPage = document.getElementById('reportsPage');
const loginForm = document.getElementById('loginForm');
const studentModal = document.getElementById('studentModal');
const studentForm = document.getElementById('studentForm');
const teacherModal = document.getElementById('teacherModal');
const teacherForm = document.getElementById('teacherForm');
const courseModal = document.getElementById('courseModal');
const courseForm = document.getElementById('courseForm');
const subjectModal = document.getElementById('subjectModal');
const subjectForm = document.getElementById('subjectForm');
const attendanceModal = document.getElementById('attendanceModal');
const attendanceForm = document.getElementById('attendanceForm');
const marksModal = document.getElementById('marksModal');
const marksForm = document.getElementById('marksForm');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

// Load Students from Database
async function loadStudents() {
    try {
        const response = await fetch('/api/students');
        students = await response.json();
        renderStudentsTable();
    } catch (error) {
        console.error('Error loading students:', error);
    }
}

// Load Stats from Database
async function loadStats() {
    try {
        const response = await fetch('/api/stats');
        const stats = await response.json();
        document.getElementById('totalStudents').textContent = stats.students;
        document.getElementById('totalTeachers').textContent = stats.teachers;
        document.getElementById('totalCourses').textContent = stats.courses;
        document.getElementById('totalSubjects').textContent = stats.subjects;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Login
    loginForm.addEventListener('submit', handleLogin);
    
    // Navigation
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Logout buttons
    for (let i = 1; i <= 8; i++) {
        const logoutBtn = document.getElementById(`logoutBtn${i}`);
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }
    }
    
    // Student Management
    document.getElementById('addStudentBtn').addEventListener('click', () => openStudentModal());
    document.getElementById('cancelStudentBtn').addEventListener('click', closeStudentModal);
    studentForm.addEventListener('submit', handleStudentSubmit);
    
    // Teacher Management
    document.getElementById('addTeacherBtn').addEventListener('click', () => openTeacherModal());
    document.getElementById('cancelTeacherBtn').addEventListener('click', closeTeacherModal);
    teacherForm.addEventListener('submit', handleTeacherSubmit);
    
    // Course Management
    document.getElementById('addCourseBtn').addEventListener('click', () => openCourseModal());
    document.getElementById('cancelCourseBtn').addEventListener('click', closeCourseModal);
    courseForm.addEventListener('submit', handleCourseSubmit);
    
    // Subject Management
    document.getElementById('addSubjectBtn').addEventListener('click', () => openSubjectModal());
    document.getElementById('cancelSubjectBtn').addEventListener('click', closeSubjectModal);
    subjectForm.addEventListener('submit', handleSubjectSubmit);
    
    // Attendance Management
    document.getElementById('markAttendanceBtn').addEventListener('click', () => openAttendanceModal());
    document.getElementById('cancelAttendanceBtn').addEventListener('click', closeAttendanceModal);
    attendanceForm.addEventListener('submit', handleAttendanceSubmit);
    
    // Marks Management
    document.getElementById('addMarksBtn').addEventListener('click', () => openMarksModal());
    document.getElementById('cancelMarksBtn').addEventListener('click', closeMarksModal);
    marksForm.addEventListener('submit', handleMarksSubmit);
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'admin' && password === 'admin123') {
        loginPage.classList.add('hidden');
        dashboardPage.classList.remove('hidden');
        navigateTo('dashboard');
    } else {
        alert('Invalid credentials!');
    }
}

// Handle Logout
function handleLogout() {
    dashboardPage.classList.add('hidden');
    studentsPage.classList.add('hidden');
    teachersPage.classList.add('hidden');
    coursesPage.classList.add('hidden');
    subjectsPage.classList.add('hidden');
    attendancePage.classList.add('hidden');
    marksPage.classList.add('hidden');
    reportsPage.classList.add('hidden');
    loginPage.classList.remove('hidden');
    loginForm.reset();
}

// Handle Navigation
function handleNavigation(e) {
    e.preventDefault();
    const page = e.target.dataset.page;
    navigateTo(page);
}

function navigateTo(page) {
    currentPage = page;
    
    // Hide all pages
    dashboardPage.classList.add('hidden');
    studentsPage.classList.add('hidden');
    teachersPage.classList.add('hidden');
    coursesPage.classList.add('hidden');
    subjectsPage.classList.add('hidden');
    attendancePage.classList.add('hidden');
    marksPage.classList.add('hidden');
    reportsPage.classList.add('hidden');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });
    
    // Show selected page
    if (page === 'dashboard') {
        dashboardPage.classList.remove('hidden');
        document.getElementById('pageTitle').textContent = 'Dashboard';
        loadStats();
    } else if (page === 'students') {
        studentsPage.classList.remove('hidden');
        document.getElementById('pageTitle').textContent = 'Students Management';
        loadStudents();
    } else if (page === 'teachers') {
        teachersPage.classList.remove('hidden');
        document.getElementById('pageTitle').textContent = 'Teachers Management';
        loadTeachers();
    } else if (page === 'courses') {
        coursesPage.classList.remove('hidden');
        document.getElementById('pageTitle').textContent = 'Courses Management';
        loadCourses();
    } else if (page === 'subjects') {
        subjectsPage.classList.remove('hidden');
        document.getElementById('pageTitle').textContent = 'Subjects Management';
        loadSubjects();
    } else if (page === 'attendance') {
        attendancePage.classList.remove('hidden');
        document.getElementById('pageTitle').textContent = 'Attendance Management';
        loadAttendance();
    } else if (page === 'marks') {
        marksPage.classList.remove('hidden');
        document.getElementById('pageTitle').textContent = 'Marks Management';
        loadMarks();
    } else if (page === 'reports') {
        reportsPage.classList.remove('hidden');
        document.getElementById('pageTitle').textContent = 'Reports';
    }
}

// Render Students Table
function renderStudentsTable() {
    const tbody = document.getElementById('studentsTableBody');
    tbody.innerHTML = '';
    
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.student_id}</td>
            <td>${student.university_uid}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.department}</td>
            <td>${student.semester}</td>
            <td class="action-buttons">
                <button class="btn btn-success" onclick="editStudent(${student.student_id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteStudent(${student.student_id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Open Student Modal
function openStudentModal(student = null) {
    studentModal.classList.remove('hidden');
    document.getElementById('modalTitle').textContent = student ? 'Edit Student' : 'Add Student';
    
    if (student) {
        document.getElementById('studentId').value = student.student_id;
        document.getElementById('studentUid').value = student.university_uid;
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentEmail').value = student.email;
        document.getElementById('studentPhone').value = student.phone;
        document.getElementById('studentDepartment').value = student.department;
        document.getElementById('studentSemester').value = student.semester;
    } else {
        studentForm.reset();
        document.getElementById('studentId').value = '';
    }
}

// Close Student Modal
function closeStudentModal() {
    studentModal.classList.add('hidden');
    studentForm.reset();
}

// Handle Student Form Submit
async function handleStudentSubmit(e) {
    e.preventDefault();
    
    const studentId = document.getElementById('studentId').value;
    const studentData = {
        uid: document.getElementById('studentUid').value,
        name: document.getElementById('studentName').value,
        email: document.getElementById('studentEmail').value,
        phone: document.getElementById('studentPhone').value,
        department: document.getElementById('studentDepartment').value,
        semester: document.getElementById('studentSemester').value
    };
    
    try {
        if (studentId) {
            // Edit existing student
            await fetch(`/api/students/${studentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });
            alert('Student updated successfully!');
        } else {
            // Add new student
            await fetch('/api/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });
            alert('Student added successfully!');
        }
        
        closeStudentModal();
        loadStudents();
        loadStats();
    } catch (error) {
        console.error('Error saving student:', error);
        alert('Error saving student!');
    }
}

// Edit Student
function editStudent(id) {
    const student = students.find(s => s.student_id === id);
    if (student) {
        openStudentModal(student);
    }
}

// Delete Student
async function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        try {
            await fetch(`/api/students/${id}`, { method: 'DELETE' });
            loadStudents();
            loadStats();
            alert('Student deleted successfully!');
        } catch (error) {
            console.error('Error deleting student:', error);
            alert('Error deleting student!');
        }
    }
}

// Load Teachers
async function loadTeachers() {
    try {
        const response = await fetch('/api/teachers');
        const teachers = await response.json();
        renderTeachersTable(teachers);
    } catch (error) {
        console.error('Error loading teachers:', error);
    }
}

function renderTeachersTable(teachers) {
    const tbody = document.getElementById('teachersTableBody');
    tbody.innerHTML = '';
    
    teachers.forEach(teacher => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${teacher.teacher_id}</td>
            <td>${teacher.name}</td>
            <td>${teacher.email}</td>
            <td>${teacher.phone}</td>
            <td>${teacher.department}</td>
            <td>${teacher.qualification || 'N/A'}</td>
            <td class="action-buttons">
                <button class="btn btn-success" onclick="editTeacher(${teacher.teacher_id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteTeacher(${teacher.teacher_id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Load Courses
async function loadCourses() {
    try {
        const response = await fetch('/api/courses');
        const courses = await response.json();
        renderCoursesTable(courses);
    } catch (error) {
        console.error('Error loading courses:', error);
    }
}

function renderCoursesTable(courses) {
    const tbody = document.getElementById('coursesTableBody');
    tbody.innerHTML = '';
    
    courses.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.course_id}</td>
            <td>${course.course_name}</td>
            <td>${course.course_code}</td>
            <td>${course.department}</td>
            <td>${course.duration}</td>
            <td class="action-buttons">
                <button class="btn btn-success" onclick="editCourse(${course.course_id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteCourse(${course.course_id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Load Subjects
async function loadSubjects() {
    try {
        const response = await fetch('/api/subjects');
        const subjects = await response.json();
        renderSubjectsTable(subjects);
    } catch (error) {
        console.error('Error loading subjects:', error);
    }
}

function renderSubjectsTable(subjects) {
    const tbody = document.getElementById('subjectsTableBody');
    tbody.innerHTML = '';
    
    subjects.forEach(subject => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${subject.subject_id}</td>
            <td>${subject.subject_name}</td>
            <td>${subject.subject_code}</td>
            <td>${subject.course}</td>
            <td>${subject.semester}</td>
            <td>${subject.credits}</td>
            <td class="action-buttons">
                <button class="btn btn-success" onclick="editSubject(${subject.subject_id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteSubject(${subject.subject_id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Load Attendance
async function loadAttendance() {
    try {
        const response = await fetch('/api/attendance');
        const attendance = await response.json();
        renderAttendanceTable(attendance);
    } catch (error) {
        console.error('Error loading attendance:', error);
    }
}

function renderAttendanceTable(attendance) {
    const tbody = document.getElementById('attendanceTableBody');
    tbody.innerHTML = '';
    
    attendance.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.attendance_id}</td>
            <td>${record.student_id}</td>
            <td>${record.subject_id}</td>
            <td>${record.attendance_date}</td>
            <td>${record.status}</td>
            <td class="action-buttons">
                <button class="btn btn-success">Edit</button>
                <button class="btn btn-danger">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Load Marks
async function loadMarks() {
    try {
        const response = await fetch('/api/marks');
        const marks = await response.json();
        renderMarksTable(marks);
    } catch (error) {
        console.error('Error loading marks:', error);
    }
}

function renderMarksTable(marks) {
    const tbody = document.getElementById('marksTableBody');
    tbody.innerHTML = '';
    
    marks.forEach(mark => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${mark.mark_id}</td>
            <td>${mark.student_id}</td>
            <td>${mark.subject_id}</td>
            <td>${mark.examination_name}</td>
            <td>${mark.marks_obtained}</td>
            <td>${mark.max_marks}</td>
            <td class="action-buttons">
                <button class="btn btn-success">Edit</button>
                <button class="btn btn-danger">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Generate Report
async function generateReport(type) {
    try {
        let data = [];
        let reportTitle = '';
        
        if (type === 'students') {
            const response = await fetch('/api/students');
            data = await response.json();
            reportTitle = 'Student Details Report';
        } else if (type === 'attendance') {
            const response = await fetch('/api/attendance');
            data = await response.json();
            reportTitle = 'Attendance Report';
        } else if (type === 'marks') {
            const response = await fetch('/api/marks');
            data = await response.json();
            reportTitle = 'Marks Report';
        } else if (type === 'performance') {
            const students = await fetch('/api/students').then(r => r.json());
            const marks = await fetch('/api/marks').then(r => r.json());
            data = students.map(student => {
                const studentMarks = marks.filter(m => m.student_id === student.student_id);
                const totalMarks = studentMarks.reduce((sum, m) => sum + parseFloat(m.marks_obtained), 0);
                const totalMax = studentMarks.reduce((sum, m) => sum + parseFloat(m.max_marks), 0);
                const percentage = totalMax > 0 ? (totalMarks / totalMax * 100).toFixed(2) : 0;
                return {
                    ...student,
                    totalMarks,
                    percentage
                };
            });
            reportTitle = 'Performance Report';
        }
        
        displayReport(reportTitle, data, type);
    } catch (error) {
        console.error('Error generating report:', error);
        alert('Error generating report!');
    }
}

function displayReport(title, data, type) {
    const reportWindow = window.open('', '_blank', 'width=1000,height=600');
    reportWindow.document.write(`
        <html>
        <head>
            <title>${title}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #1a1a70; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                th { background-color: #1a1a70; color: white; }
                tr:nth-child(even) { background-color: #f2f2f2; }
                .summary { background: #f8f9fa; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            <div class="summary">
                <p><strong>Total Records:</strong> ${data.length}</p>
                <p><strong>Generated On:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <table>
    `);
    
    if (data.length > 0) {
        const headers = Object.keys(data[0]);
        reportWindow.document.write('<tr>');
        headers.forEach(header => {
            reportWindow.document.write(`<th>${header.toUpperCase()}</th>`);
        });
        reportWindow.document.write('</tr>');
        
        data.forEach(row => {
            reportWindow.document.write('<tr>');
            headers.forEach(header => {
                reportWindow.document.write(`<td>${row[header] || ''}</td>`);
            });
            reportWindow.document.write('</tr>');
        });
    } else {
        reportWindow.document.write('<tr><td colspan="100%">No data available</td></tr>');
    }
    
    reportWindow.document.write(`
            </table>
            <script>
                window.print();
            </script>
        </body>
        </html>
    `);
    reportWindow.document.close();
}

// Teacher Modal Functions
function openTeacherModal(teacher = null) {
    teacherModal.classList.remove('hidden');
    document.getElementById('teacherModalTitle').textContent = teacher ? 'Edit Teacher' : 'Add Teacher';
    
    if (teacher) {
        document.getElementById('teacherId').value = teacher.teacher_id;
        document.getElementById('teacherName').value = teacher.name;
        document.getElementById('teacherEmail').value = teacher.email;
        document.getElementById('teacherPhone').value = teacher.phone;
        document.getElementById('teacherDepartment').value = teacher.department;
        document.getElementById('teacherQualification').value = teacher.qualification || '';
    } else {
        teacherForm.reset();
        document.getElementById('teacherId').value = '';
    }
}

function closeTeacherModal() {
    teacherModal.classList.add('hidden');
    teacherForm.reset();
}

async function handleTeacherSubmit(e) {
    e.preventDefault();
    
    const teacherId = document.getElementById('teacherId').value;
    const teacherData = {
        name: document.getElementById('teacherName').value,
        email: document.getElementById('teacherEmail').value,
        phone: document.getElementById('teacherPhone').value,
        department: document.getElementById('teacherDepartment').value,
        qualification: document.getElementById('teacherQualification').value
    };
    
    try {
        if (teacherId) {
            await fetch(`/api/teachers/${teacherId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(teacherData)
            });
            alert('Teacher updated successfully!');
        } else {
            await fetch('/api/teachers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(teacherData)
            });
            alert('Teacher added successfully!');
        }
        
        closeTeacherModal();
        loadTeachers();
    } catch (error) {
        console.error('Error saving teacher:', error);
        alert('Error saving teacher!');
    }
}

function editTeacher(id) {
    fetch(`/api/teachers`)
        .then(res => res.json())
        .then(teachers => {
            const teacher = teachers.find(t => t.teacher_id === id);
            if (teacher) {
                openTeacherModal(teacher);
            }
        });
}

async function deleteTeacher(id) {
    if (confirm('Are you sure you want to delete this teacher?')) {
        try {
            await fetch(`/api/teachers/${id}`, { method: 'DELETE' });
            loadTeachers();
            alert('Teacher deleted successfully!');
        } catch (error) {
            console.error('Error deleting teacher:', error);
            alert('Error deleting teacher!');
        }
    }
}

// Course Modal Functions
function openCourseModal(course = null) {
    courseModal.classList.remove('hidden');
    document.getElementById('courseModalTitle').textContent = course ? 'Edit Course' : 'Add Course';
    
    if (course) {
        document.getElementById('courseId').value = course.course_id;
        document.getElementById('courseName').value = course.course_name;
        document.getElementById('courseCode').value = course.course_code;
        document.getElementById('courseDepartment').value = course.department;
        document.getElementById('courseDuration').value = course.duration;
    } else {
        courseForm.reset();
        document.getElementById('courseId').value = '';
    }
}

function closeCourseModal() {
    courseModal.classList.add('hidden');
    courseForm.reset();
}

async function handleCourseSubmit(e) {
    e.preventDefault();
    
    const courseId = document.getElementById('courseId').value;
    const courseData = {
        course_name: document.getElementById('courseName').value,
        course_code: document.getElementById('courseCode').value,
        department: document.getElementById('courseDepartment').value,
        duration: document.getElementById('courseDuration').value
    };
    
    try {
        if (courseId) {
            await fetch(`/api/courses/${courseId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(courseData)
            });
            alert('Course updated successfully!');
        } else {
            await fetch('/api/courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(courseData)
            });
            alert('Course added successfully!');
        }
        
        closeCourseModal();
        loadCourses();
    } catch (error) {
        console.error('Error saving course:', error);
        alert('Error saving course!');
    }
}

function editCourse(id) {
    fetch(`/api/courses`)
        .then(res => res.json())
        .then(courses => {
            const course = courses.find(c => c.course_id === id);
            if (course) {
                openCourseModal(course);
            }
        });
}

async function deleteCourse(id) {
    if (confirm('Are you sure you want to delete this course?')) {
        try {
            await fetch(`/api/courses/${id}`, { method: 'DELETE' });
            loadCourses();
            alert('Course deleted successfully!');
        } catch (error) {
            console.error('Error deleting course:', error);
            alert('Error deleting course!');
        }
    }
}

// Subject Modal Functions
function openSubjectModal(subject = null) {
    subjectModal.classList.remove('hidden');
    document.getElementById('subjectModalTitle').textContent = subject ? 'Edit Subject' : 'Add Subject';
    
    if (subject) {
        document.getElementById('subjectId').value = subject.subject_id;
        document.getElementById('subjectName').value = subject.subject_name;
        document.getElementById('subjectCode').value = subject.subject_code;
        document.getElementById('subjectCourse').value = subject.course;
        document.getElementById('subjectSemester').value = subject.semester;
        document.getElementById('subjectCredits').value = subject.credits;
    } else {
        subjectForm.reset();
        document.getElementById('subjectId').value = '';
    }
}

function closeSubjectModal() {
    subjectModal.classList.add('hidden');
    subjectForm.reset();
}

async function handleSubjectSubmit(e) {
    e.preventDefault();
    
    const subjectId = document.getElementById('subjectId').value;
    const subjectData = {
        subject_name: document.getElementById('subjectName').value,
        subject_code: document.getElementById('subjectCode').value,
        course: document.getElementById('subjectCourse').value,
        semester: document.getElementById('subjectSemester').value,
        credits: document.getElementById('subjectCredits').value
    };
    
    try {
        if (subjectId) {
            await fetch(`/api/subjects/${subjectId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(subjectData)
            });
            alert('Subject updated successfully!');
        } else {
            await fetch('/api/subjects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(subjectData)
            });
            alert('Subject added successfully!');
        }
        
        closeSubjectModal();
        loadSubjects();
    } catch (error) {
        console.error('Error saving subject:', error);
        alert('Error saving subject!');
    }
}

function editSubject(id) {
    fetch(`/api/subjects`)
        .then(res => res.json())
        .then(subjects => {
            const subject = subjects.find(s => s.subject_id === id);
            if (subject) {
                openSubjectModal(subject);
            }
        });
}

async function deleteSubject(id) {
    if (confirm('Are you sure you want to delete this subject?')) {
        try {
            await fetch(`/api/subjects/${id}`, { method: 'DELETE' });
            loadSubjects();
            alert('Subject deleted successfully!');
        } catch (error) {
            console.error('Error deleting subject:', error);
            alert('Error deleting subject!');
        }
    }
}

// Attendance Modal Functions
function openAttendanceModal() {
    attendanceModal.classList.remove('hidden');
    attendanceForm.reset();
}

function closeAttendanceModal() {
    attendanceModal.classList.add('hidden');
    attendanceForm.reset();
}

async function handleAttendanceSubmit(e) {
    e.preventDefault();
    
    const attendanceData = {
        student_id: document.getElementById('attendanceStudentId').value,
        subject_id: document.getElementById('attendanceSubjectId').value,
        attendance_date: document.getElementById('attendanceDate').value,
        status: document.getElementById('attendanceStatus').value
    };
    
    try {
        await fetch('/api/attendance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(attendanceData)
        });
        alert('Attendance marked successfully!');
        closeAttendanceModal();
        loadAttendance();
    } catch (error) {
        console.error('Error marking attendance:', error);
        alert('Error marking attendance!');
    }
}

// Marks Modal Functions
function openMarksModal() {
    marksModal.classList.remove('hidden');
    marksForm.reset();
}

function closeMarksModal() {
    marksModal.classList.add('hidden');
    marksForm.reset();
}

async function handleMarksSubmit(e) {
    e.preventDefault();
    
    const marksData = {
        student_id: document.getElementById('marksStudentId').value,
        subject_id: document.getElementById('marksSubjectId').value,
        examination_name: document.getElementById('marksExamName').value,
        marks_obtained: document.getElementById('marksObtained').value,
        max_marks: document.getElementById('marksMax').value
    };
    
    try {
        await fetch('/api/marks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(marksData)
        });
        alert('Marks added successfully!');
        closeMarksModal();
        loadMarks();
    } catch (error) {
        console.error('Error adding marks:', error);
        alert('Error adding marks!');
    }
}
