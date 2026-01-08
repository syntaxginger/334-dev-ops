const http = require('http');

// Mock student data
const students = [
    { id: 'S001', name: 'Alice Johnson', department: 'Civil', gpa: 3.8 },
    { id: 'S002', name: 'Bob Smith', department: 'Mechanical', gpa: 3.6 },
    { id: 'S003', name: 'Carol White', department: 'Electrical', gpa: 3.9 },
    { id: 'S004', name: 'David Brown', department: 'Chemical', gpa: 3.5 },
    { id: 'S005', name: 'Eve Davis', department: 'Civil', gpa: 3.7 },
    { id: 'S006', name: 'Frank Miller', department: 'Mechanical', gpa: 3.4 },
    { id: 'S007', name: 'Grace Lee', department: 'Electrical', gpa: 3.85 },
];

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    // API to get all students' GPA
    if (req.url === '/api/students' && req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({ success: true, data: students }));
    }
    // API to get student GPA by ID
    else if (req.url.startsWith('/api/students/') && req.method === 'GET') {
        const studentId = req.url.split('/')[3];
        const student = students.find(s => s.id === studentId);

        if (student) {
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, data: student }));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ success: false, message: 'Student not found' }));
        }
    }
    // Invalid route
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ success: false, message: 'Route not found' }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});