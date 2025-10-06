'use client'
import styles from "./page.module.css";
import {useSession} from "next-auth/react";
import {useEffect} from "react";
import LandingPage from "@/app/components/landingPage/LandingPage";

export default function Home() {
   const {data: session, status} = useSession()

   useEffect(() => {
      if (status === 'loading') {
         console.log('Session loading...')
         return
      }

      if (status === 'authenticated' && session) {
         console.log('Session loaded!')
         console.log('Session:', session)
         console.log('User ID:', session.user?.id)
         console.log('User name:', session.user?.name)
         console.log('User email:', session.user?.email)
         console.log('User role:', session.user?.role)
      }

      if (status === 'unauthenticated') {
         console.log('Not logged in')
      }
   }, [session, status])

   return (
      <div className={styles.page}>
         <main className={styles.main}>
            <LandingPage/>
         </main>
      </div>
   );
}