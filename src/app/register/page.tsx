'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password })
        })

        if (response.ok) {
            router.push('/login')
        } else {
            const data = await response.json()
            setError(data.error || 'Registration failed')
        }
    }

    return (
        <div>
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
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    )
}