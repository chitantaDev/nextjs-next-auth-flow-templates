'use client'
import { useSession, signOut } from 'next-auth/react'

export default function LogoutButton() {
    const { data: session } = useSession()

    if (!session) return null

    return (
        <div style={{ position: 'fixed', top: '1rem', right: '1rem' }}>
            <span style={{ marginRight: '1rem' }}>{session.user?.role}</span>
            <button
                onClick={() => signOut({ callbackUrl: '/' })}
                style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Logout
            </button>
        </div>
    )
}