import {NextRequest, NextResponse} from 'next/server'
import {getDb} from '@/lib/db'
import {cleanupExpiredVerifications} from "@/lib/emailCleanUp";

export async function GET(request: NextRequest) {
   const token = request.nextUrl.searchParams.get('token');

   if (!token) {
      return NextResponse.redirect('http://localhost:3000/register?error=invalid-token');
   }

   try {
      const db = await getDb();

      // Clean up expired tokens first
      await cleanupExpiredVerifications();

      // Get verification data
      const verification = await db.get(
         'SELECT * FROM email_verification WHERE token = ?',
         [token]
      );

      if (!verification) {
         return NextResponse.redirect('http://localhost:3000/register?error=invalid-token');
      }

      // Check if token has expired (double check)
      const now = new Date();
      const expiresAt = new Date(verification.expires_at);
      if (now > expiresAt) {
         // Clean up expired token
         await db.run('DELETE FROM email_verification WHERE token = ?', [token]);
         return NextResponse.redirect('http://localhost:3000/register?error=token-expired');
      }

      // Password is ALREADY hashed - used directly
      const result = await db.run(
         'INSERT INTO user (email, username, password) VALUES (?, ?, ?)',
         [verification.email, verification.username, verification.password_hash]
      );

      // Assign USER role (role_id = 2 for 'USER')
      if (result.lastID) {
         await db.run('INSERT INTO user_role (user_id, role_id) VALUES (?, 2)', [result.lastID])
      }

      // Clean up verification record
      await db.run('DELETE FROM email_verification WHERE token = ?', [token]);

      // In app/api/verify-email/route.ts - change the last redirect line to:
      return NextResponse.redirect(`http://localhost:3000/login?verified=true&email=${encodeURIComponent(verification.email)}`);
   } catch (error) {
      console.error('Verification error:', error)
      return NextResponse.redirect('http://localhost:3000/register?error=verification-failed');
   }
}