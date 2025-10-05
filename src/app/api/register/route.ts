// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import { getDb } from '@/lib/db'
import {cleanupExpiredVerifications} from "@/lib/emailCleanUp";

function generateToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function POST(request: NextRequest) {
    try {
        const { email, username, password } = await request.json()

        if (!email || !username || !password) {
            return NextResponse.json({ error: 'All fields required' }, { status: 400 })
        }

        const db = await getDb()

        // Clean up expired tokens first
        await cleanupExpiredVerifications();

        // Check if user already exists
        const existingUser = await db.get('SELECT * FROM user WHERE email = ? OR username = ?', [email, username])
        if (existingUser) {
            return NextResponse.json({ error: 'Email or username already exists' }, { status: 400 })
        }

        // Check if there's already a pending verification for this email
        const existingVerification = await db.get('SELECT * FROM email_verification WHERE email = ?', [email])
        if (existingVerification) {
            // Delete old verification
            await db.run('DELETE FROM email_verification WHERE email = ?', [email])
        }

        // Hash password IMMEDIATELY - never store plain text
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Generate token and store HASHED password
        const token = generateToken();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

        await db.run(
           'INSERT INTO email_verification (token, email, username, password_hash, expires_at) VALUES (?, ?, ?, ?, ?)',
           [token, email, username, hashedPassword, expiresAt.toISOString()]
        );

        // Send verification email - FIXED CONFIGURATION
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Verify your email address',
            html: `
        <h1>Verify your account</h1>
        <p>Hi ${username},</p>
        <p>Click the link below to verify your email and create your account:</p>
        <a href="http://localhost:3000/api/verify-email?token=${token}">Verify Email Address</a>
        <p>This link will expire in 24 hours.</p>
      `
        });

        return NextResponse.json({ message: 'Registration successful! Check your email to verify your account.' })
    } catch (error) {
        console.error('Registration error:', error)
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
    }
}