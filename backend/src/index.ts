import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SnapSQL API is running' });
});

app.get('/api/lessons', (req, res) => {
  const lessonsPath = path.join(__dirname, 'data', 'lessons.json');
  if (fs.existsSync(lessonsPath)) {
    const lessons = JSON.parse(fs.readFileSync(lessonsPath, 'utf8'));
    res.json(lessons);
  } else {
    res.status(404).json({ error: 'Lessons not found' });
  }
});

import { getDb } from './db.js';

app.post('/api/test-drives', async (req, res) => {
  try {
    const { name, username, notes } = req.body;
    if (!name || !username) {
      return res.status(400).json({ error: 'Name and username are required' });
    }
    const db = getDb();
    const docRef = await db.collection('test_drives').add({
      name,
      username,
      notes: notes || '',
      session_status: 'ACTIVE',
      session_start_time: new Date().toISOString()
    });
    res.status(201).json({ success: true, sessionId: docRef.id });
  } catch (err) {
    console.error('Error saving test drive:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/test-drives/:id/end', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'Status is required' });

    const db = getDb();
    await db.collection('test_drives').doc(id).update({
      session_status: status,
      session_end_time: new Date().toISOString()
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Error ending test drive session:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(process.cwd(), 'frontend/dist');
  app.use(express.static(frontendPath));
  app.get('*', (req, res) => {
    // If it's an API route that doesn't exist, don't serve index.html
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'Not Found' });
    }
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Triggering nodemon restart
