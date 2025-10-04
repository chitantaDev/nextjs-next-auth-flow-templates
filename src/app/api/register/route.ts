import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getDb } from '@/lib/db'

export async function POST(request: NextRequest) {
    try {
        const { email, username, password } = await request.json()

        if (!email || !username || !password) {
            return NextResponse.json({ error: 'All fields required' }, { status: 400 })
        }

        const db = await getDb()

        // Check if user already exists
        const existingUser = await db.get('SELECT * FROM user WHERE email = ? OR username = ?', [email, username])

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 })
        }

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 10)

        // Insert user
        const result = await db.run('INSERT INTO user (email, username, password) VALUES (?, ?, ?)', [email, username, hashedPassword])

        // Assign USER role (role_id = 2 for 'USER')
        if (result.lastID) {
            await db.run('INSERT INTO user_role (user_id, role_id) VALUES (?, 2)', [result.lastID])
        }

        return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
    } catch (error) {
        console.error('Registration error:', error)
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
    }
}