import { Firestore } from '@google-cloud/firestore';

let db: Firestore | null = null;

export function getDb(): Firestore {
  if (!db) {
    const projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCP_PROJECT;
    const databaseId = process.env.FIRESTORE_DATABASE_ID || 'snapsql-db';

    console.log(`[Firestore] Initializing for project: ${projectId || 'auto-detect'}, database: ${databaseId}`);

    try {
      const settings: any = { databaseId };
      if (projectId) settings.projectId = projectId;
      
      db = new Firestore(settings);
      console.log(`[Firestore] Client created successfully.`);
    } catch (error) {
      console.error(`[Firestore] Failed to initialize Firestore client:`, error);
      throw error;
    }
  }
  return db;
}
