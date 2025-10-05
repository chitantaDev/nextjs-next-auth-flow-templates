import { getDb } from '@/lib/db'

export async function cleanupExpiredVerifications() {
   const db = await getDb();
   const now = new Date().toISOString();

   const result = await db.run('DELETE FROM email_verification WHERE expires_at < ?', [now]);
   console.log(`Cleaned up ${result.changes} expired verification tokens`);
}