// app/components/Header.tsx
'use client'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Header() {
   const { data: session } = useSession()

   return (
      <header className="header">
         <div className="header-content">
            <Link href="/" className="home-link">
               <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
               >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
               </svg>
            </Link>

            {session && (
               <div className="header-right">
                  <span className="username">{session.user?.name}</span>
                  <button
                     onClick={() => signOut({ callbackUrl: '/' })}
                     className="logout-btn"
                  >
                     Logout
                  </button>
               </div>
            )}
         </div>
      </header>
   )
}