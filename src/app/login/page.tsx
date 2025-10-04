'use client'
import { useState, FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

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
            // Keep loading true until redirect
            router.push('/')
        }
    }

    if (isLoading && !error) {
        return <div>Logging in...</div>
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    name="email" // Add name attribute
                    autoComplete="email" // Enable autofill
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password" // Add name attribute
                    autoComplete="current-password" // Enable password autofill
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <p>
                Don't have an account? <Link href="/register">Register here</Link>
            </p>

            {error && (
                <div style={{color: 'red', marginTop: '1rem'}}>
                    {error}
                </div>
            )}
        </div>
    )
}