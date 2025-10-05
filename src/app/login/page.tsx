'use client'
import { useState, FormEvent, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const verified = searchParams.get('verified')
        const verifiedEmail = searchParams.get('email')

        if (verified === 'true' && verifiedEmail) {
            setShowSuccess(true)
            setEmail(decodeURIComponent(verifiedEmail))
        }
    }, [searchParams])

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false
        })

        if (result?.error) {
            setError('Login failed. Please check your credentials.')
            setIsLoading(false)
        } else if (result?.ok) {
            router.push('/')
        }
    }

    return (
       <div className="auth-container">
           <div className="auth-form">
               {showSuccess && (
                  <div className="success-message">
                      Your account is verified!
                      <br/>
                      You can now log in.
                  </div>
               )}

               <h1>Login</h1>
               <form onSubmit={handleLogin}>
                   <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                   />
                   <input
                      type="password"
                      name="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                   />
                   <button type="submit" disabled={isLoading}>
                       {isLoading ? 'Logging in...' : 'Login'}
                   </button>
               </form>

               <p className="auth-link">
                   Don't have an account? <Link href="/register">Register here</Link>
               </p>

               {error && (
                  <div className="error-message">
                      {error}
                  </div>
               )}
           </div>
       </div>
    )
}