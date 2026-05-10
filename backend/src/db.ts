import { Firestore } from '@google-cloud/firestore';

let db: Firestore | null = null;

export function getDb(): Firestore {
  if (!db) {
    db = new Firestore({
      // Falls back to Application Default Credentials automatically in GCP.
      projectId: process.env.GOOGLE_CLOUD_PROJECT || 'demo-project',
    });
  }
  return db;
}
