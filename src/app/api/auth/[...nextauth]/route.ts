import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { getDb } from '@/lib/db'

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }

                const db = await getDb();
                const user = await db.get('SELECT * FROM user WHERE email = ?', [credentials.email]);

                if (!user) {
                    return null;
                }

                const passwordMatch = bcrypt.compareSync(credentials.password, user.password);

                if (passwordMatch) {
                    return { id: user.id, email: user.email, name: user.username };
                }

                return null;
            }
        })
    ],
    session: { strategy: 'jwt' },
    secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }