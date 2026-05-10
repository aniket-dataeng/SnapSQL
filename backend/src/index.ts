import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      console.warn('[API] Missing name or username in test-drive request');
      return res.status(400).json({ error: 'Name and username are required' });
    }

    const payload = {
      name,
      username,
      points: 0,
      streak: 0,
      notes: notes || '',
      session_status: 'ACTIVE',
      session_start_time: new Date().toISOString()
    };

    console.log(`[Firestore] Attempting to write document to 'test_drives' collection. Payload:`, JSON.stringify(payload));

    const db = getDb();
    const docRef = await db.collection('test_drives').add(payload);
    
    console.log(`[Firestore] Document successfully created with ID: ${docRef.id}`);
    res.status(201).json({ success: true, sessionId: docRef.id, ...payload });
  } catch (err: any) {
    console.error('[Firestore] Error creating test drive document:', err);
    console.error('[Firestore] Error details:', {
      message: err.message,
      code: err.code,
      stack: err.stack
    });
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

app.put('/api/test-drives/:id/end', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'Status is required' });

    console.log(`[Firestore] Attempting to update document ${id}. New status: ${status}`);

    const db = getDb();
    const payload = {
      session_status: status,
      session_end_time: new Date().toISOString()
    };

    await db.collection('test_drives').doc(id).update(payload);
    
    console.log(`[Firestore] Document ${id} successfully updated.`);
    res.json({ success: true });
  } catch (err: any) {
    console.error(`[Firestore] Error updating test drive session ${req.params.id}:`, err);
    console.error('[Firestore] Error details:', {
      message: err.message,
      code: err.code,
      stack: err.stack
    });
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

app.get('/api/test-drives/leaderboard', async (req, res) => {
  try {
    const db = getDb();
    const snapshot = await db.collection('test_drives')
      .orderBy('points', 'desc')
      .orderBy('streak', 'desc')
      .orderBy('session_start_time', 'asc')
      .get();

    const leaderboard = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(leaderboard);
  } catch (err: any) {
    console.error('[Firestore] Error fetching leaderboard:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

app.get('/api/test-drives/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();
    const doc = await db.collection('test_drives').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (err: any) {
    console.error('[Firestore] Error fetching user:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(process.cwd(), 'frontend/dist');
  app.use(express.static(frontendPath));
  app.get(/.*/, (req, res) => {
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
