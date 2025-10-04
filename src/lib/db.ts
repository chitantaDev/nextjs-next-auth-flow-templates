import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export async function getDb() {
    if (db) {
        return db;
    }

    const dbPath = path.join(process.cwd(), 'database.db');

    db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    return db;
}