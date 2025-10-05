// app/page.tsx
'use client'
import styles from "./page.module.css";
import {useSession} from "next-auth/react";

export default function Home() {
   const {data: session} = useSession()
   const userId = session?.user.name
   return (
      <div className={styles.page}>
         <main className={styles.main}>
            <div>Welcome {userId}</div>
         </main>
      </div>
   );
}