const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const PORT = 3000;

// MySQL Connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'student_management',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// MIME Types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
    // Handle API requests
    if (req.url.startsWith('/api/')) {
        await handleAPI(req, res);
        return;
    }
    
    // Serve static files
    let filePath = '.' + req.url;
    
    if (filePath === './') {
        filePath = './index.html';
    }
    
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                fs.readFile('./index.html', (error, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

async function handleAPI(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const url = req.url;
    const method = req.method;

    // Helper to get request body
    const getBody = () => {
        return new Promise((resolve, reject) => {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                try {
                    resolve(body ? JSON.parse(body) : {});
                } catch (e) {
                    reject(e);
                }
            });
        });
    };

    try {
        // GET /api/students
        if (url === '/api/students' && method === 'GET') {
            const [rows] = await pool.query('SELECT * FROM students');
            res.writeHead(200);
            res.end(JSON.stringify(rows));
        }
        // POST /api/students
        else if (url === '/api/students' && method === 'POST') {
            const data = await getBody();
            const [result] = await pool.query(
                'INSERT INTO students (university_uid, name, email, phone, gender, date_of_birth, address, department, course, semester, admission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())',
                [data.uid, data.name, data.email, data.phone, data.gender || 'Male', data.dob || null, data.address || '', data.department, data.course || data.department, data.semester]
            );
            res.writeHead(201);
            res.end(JSON.stringify({ id: result.insertId, ...data }));
        }
        // PUT /api/students/:id
        else if (url.match(/\/api\/students\/\d+/) && method === 'PUT') {
            const id = url.split('/').pop();
            const data = await getBody();
            await pool.query(
                'UPDATE students SET university_uid=?, name=?, email=?, phone=?, department=?, semester=? WHERE student_id=?',
                [data.uid, data.name, data.email, data.phone, data.department, data.semester, id]
            );
            res.writeHead(200);
            res.end(JSON.stringify({ id, ...data }));
        }
        // DELETE /api/students/:id
        else if (url.match(/\/api\/students\/\d+/) && method === 'DELETE') {
            const id = url.split('/').pop();
            await pool.query('DELETE FROM students WHERE student_id=?', [id]);
            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Student deleted' }));
        }
        // GET /api/stats
        else if (url === '/api/stats' && method === 'GET') {
            const [students] = await pool.query('SELECT COUNT(*) as count FROM students');
            const [teachers] = await pool.query('SELECT COUNT(*) as count FROM teachers');
            const [courses] = await pool.query('SELECT COUNT(*) as count FROM courses');
            const [subjects] = await pool.query('SELECT COUNT(*) as count FROM subjects');
            res.writeHead(200);
            res.end(JSON.stringify({
                students: students[0].count,
                teachers: teachers[0].count,
                courses: courses[0].count,
                subjects: subjects[0].count
            }));
        }
        // GET /api/teachers
        else if (url === '/api/teachers' && method === 'GET') {
            const [rows] = await pool.query('SELECT * FROM teachers');
            res.writeHead(200);
            res.end(JSON.stringify(rows));
        }
        // GET /api/courses
        else if (url === '/api/courses' && method === 'GET') {
            const [rows] = await pool.query('SELECT * FROM courses');
            res.writeHead(200);
            res.end(JSON.stringify(rows));
        }
        // GET /api/subjects
        else if (url === '/api/subjects' && method === 'GET') {
            const [rows] = await pool.query('SELECT * FROM subjects');
            res.writeHead(200);
            res.end(JSON.stringify(rows));
        }
        // GET /api/attendance
        else if (url === '/api/attendance' && method === 'GET') {
            const [rows] = await pool.query('SELECT * FROM attendance');
            res.writeHead(200);
            res.end(JSON.stringify(rows));
        }
        // GET /api/marks
        else if (url === '/api/marks' && method === 'GET') {
            const [rows] = await pool.query('SELECT * FROM marks');
            res.writeHead(200);
            res.end(JSON.stringify(rows));
        }
        // POST /api/teachers
        else if (url === '/api/teachers' && method === 'POST') {
            const data = await getBody();
            const [result] = await pool.query(
                'INSERT INTO teachers (name, email, phone, qualification, department, specialization, joining_date) VALUES (?, ?, ?, ?, ?, ?, CURDATE())',
                [data.name, data.email, data.phone, data.qualification || null, data.department, data.specialization || null]
            );
            res.writeHead(201);
            res.end(JSON.stringify({ id: result.insertId, ...data }));
        }
        // PUT /api/teachers/:id
        else if (url.match(/\/api\/teachers\/\d+/) && method === 'PUT') {
            const id = url.split('/').pop();
            const data = await getBody();
            await pool.query(
                'UPDATE teachers SET name=?, email=?, phone=?, department=?, qualification=? WHERE teacher_id=?',
                [data.name, data.email, data.phone, data.department, data.qualification, id]
            );
            res.writeHead(200);
            res.end(JSON.stringify({ id, ...data }));
        }
        // DELETE /api/teachers/:id
        else if (url.match(/\/api\/teachers\/\d+/) && method === 'DELETE') {
            const id = url.split('/').pop();
            await pool.query('DELETE FROM teachers WHERE teacher_id=?', [id]);
            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Teacher deleted' }));
        }
        // POST /api/courses
        else if (url === '/api/courses' && method === 'POST') {
            const data = await getBody();
            const [result] = await pool.query(
                'INSERT INTO courses (course_name, course_code, department, duration) VALUES (?, ?, ?, ?)',
                [data.course_name, data.course_code, data.department, data.duration]
            );
            res.writeHead(201);
            res.end(JSON.stringify({ id: result.insertId, ...data }));
        }
        // PUT /api/courses/:id
        else if (url.match(/\/api\/courses\/\d+/) && method === 'PUT') {
            const id = url.split('/').pop();
            const data = await getBody();
            await pool.query(
                'UPDATE courses SET course_name=?, course_code=?, department=?, duration=? WHERE course_id=?',
                [data.course_name, data.course_code, data.department, data.duration, id]
            );
            res.writeHead(200);
            res.end(JSON.stringify({ id, ...data }));
        }
        // DELETE /api/courses/:id
        else if (url.match(/\/api\/courses\/\d+/) && method === 'DELETE') {
            const id = url.split('/').pop();
            await pool.query('DELETE FROM courses WHERE course_id=?', [id]);
            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Course deleted' }));
        }
        // POST /api/subjects
        else if (url === '/api/subjects' && method === 'POST') {
            const data = await getBody();
            const [result] = await pool.query(
                'INSERT INTO subjects (subject_name, subject_code, course, semester, credits) VALUES (?, ?, ?, ?, ?)',
                [data.subject_name, data.subject_code, data.course, data.semester, data.credits]
            );
            res.writeHead(201);
            res.end(JSON.stringify({ id: result.insertId, ...data }));
        }
        // PUT /api/subjects/:id
        else if (url.match(/\/api\/subjects\/\d+/) && method === 'PUT') {
            const id = url.split('/').pop();
            const data = await getBody();
            await pool.query(
                'UPDATE subjects SET subject_name=?, subject_code=?, course=?, semester=?, credits=? WHERE subject_id=?',
                [data.subject_name, data.subject_code, data.course, data.semester, data.credits, id]
            );
            res.writeHead(200);
            res.end(JSON.stringify({ id, ...data }));
        }
        // DELETE /api/subjects/:id
        else if (url.match(/\/api\/subjects\/\d+/) && method === 'DELETE') {
            const id = url.split('/').pop();
            await pool.query('DELETE FROM subjects WHERE subject_id=?', [id]);
            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Subject deleted' }));
        }
        // POST /api/attendance
        else if (url === '/api/attendance' && method === 'POST') {
            const data = await getBody();
            const [result] = await pool.query(
                'INSERT INTO attendance (student_id, subject_id, attendance_date, status) VALUES (?, ?, ?, ?)',
                [data.student_id, data.subject_id, data.attendance_date, data.status]
            );
            res.writeHead(201);
            res.end(JSON.stringify({ id: result.insertId, ...data }));
        }
        // POST /api/marks
        else if (url === '/api/marks' && method === 'POST') {
            const data = await getBody();
            const [result] = await pool.query(
                'INSERT INTO marks (student_id, subject_id, examination_name, marks_obtained, max_marks) VALUES (?, ?, ?, ?, ?)',
                [data.student_id, data.subject_id, data.examination_name, data.marks_obtained, data.max_marks]
            );
            res.writeHead(201);
            res.end(JSON.stringify({ id: result.insertId, ...data }));
        }
        else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Not found' }));
        }
    } catch (error) {
        console.error('API Error:', error);
        res.writeHead(500);
        res.end(JSON.stringify({ error: error.message }));
    }
}

server.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`  Student Management System`);
    console.log(`  Web Server with MySQL`);
    console.log(`========================================`);
    console.log(`  Server running at http://localhost:${PORT}`);
    console.log(`  MySQL: student_management`);
    console.log(`  Press Ctrl+C to stop the server`);
    console.log(`========================================`);
});
