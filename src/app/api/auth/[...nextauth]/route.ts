import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import {getDb} from '@/lib/db'

//TODO: If auth complexity rises, refactor repository methods and role logic into a service
const handler = NextAuth({
   providers: [
      CredentialsProvider({
         name: 'credentials',
         credentials: {
            email: {label: 'Email', type: 'email'},
            password: {label: 'Password', type: 'password'}
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

            //existing user gets logged in (password hash being checked
            const passwordMatch = bcrypt.compareSync(credentials.password, user.password);

            if (passwordMatch) {
               const userRole = await db.get('SELECT role_id FROM user_role WHERE user_id = ?', [user.id])
               //determine and save users role into useSession for later use (role based permission)
               let role;
               switch (userRole.role_id) {
                  case 1:
                     role = "ADMIN"
                     break;
                  case 2:
                     role = "USER"
                     break;
                  case 3:
                     role = "MODERATOR"
                     break;
                  default:
                     role = "USER"
               }
               return {id: user.id, email: user.email, name: user.username, role: role};
            }

            return null;
         }
      })
   ],
   callbacks: {
      async jwt({token, user}) {
         // Add role to token when user logs in
         if (user) {
            token.role = user.role;
         }
         return token;
      },
      async session({session, token}) {
         // Add role to session
         session.user.role = token.role;
         return session;
      }
   },
   session: {strategy: 'jwt'},
   secret: process.env.NEXTAUTH_SECRET
})

export {handler as GET, handler as POST}