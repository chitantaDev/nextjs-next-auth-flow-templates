'use client'
import { useState, FormEvent } from 'react'
import Link from 'next/link'

export default function Register() {
   const [email, setEmail] = useState('')
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')
   const [success, setSuccess] = useState(false)

   const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setError('')

      const response = await fetch('/api/register', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ email, username, password })
      })

      if (response.ok) {
         setSuccess(true)
      } else {
         const data = await response.json()
         setError(data.error || 'Registration failed')
      }
   }

   if (success) {
      return (
         <div className="auth-container">
            <div className="auth-form">
               <h1>Check Your Email</h1>
               <p>We&apos;ve sent a verification link to <strong>{email}</strong></p>
               <p>Click the link in the email to complete your registration.</p>
               <p className="auth-link">
                  Already verified? <Link href="/login">Login here</Link>
               </p>
            </div>
         </div>
      )
   }

   return (
      <div className="auth-container">
         <div className="auth-form">
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
               <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
               />
               <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
               />
               <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
               />
               <button type="submit">Register</button>
            </form>

            <p className="auth-link">
               Already have an account? <Link href="/login">Login here</Link>
            </p>

            {error && <p className="error-message">{error}</p>}
         </div>
      </div>
   )
}