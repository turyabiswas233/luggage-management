import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

// Dummy data
const hosts = [
    { id: 1, name: 'Host1', ip: '192.168.1.1', status: 'active' },
    { id: 2, name: 'Host2', ip: '192.168.1.2', status: 'inactive' },
    { id: 3, name: 'Host3', ip: '192.168.1.3', status: 'active' },
];

// Middleware to enable CORS
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
}));

// Endpoint to get all hosts
app.get('/api/admin/hosts', (req, res) => {
    res.json(hosts);
});

// Start the server
app.listen(port, () => {
    console.log(`Dummy API server is running at http://localhost:${port}`);
});
