CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email varchar(255) UNIQUE NOT NULL,
    username varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL
);

CREATE TABLE role (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name varchar(255) UNIQUE NOT NULL
);

CREATE TABLE user_role (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE email_verification (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token varchar(255) UNIQUE NOT NULL,
    email varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    password_hash varchar(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL
);

CREATE INDEX idx_user_id ON user_role(user_id);
CREATE INDEX idx_role_id ON user_role(role_id);
CREATE INDEX idx_verification_token ON email_verification(token);
CREATE INDEX idx_verification_email ON email_verification(email);

INSERT INTO role (name) VALUES
('ADMIN'),
('USER'),
('MODERATOR');

-- Hashed value for password "admin"
-- bcrypt
INSERT INTO user (email, username, password) VALUES
('admin@admin.com', 'admin','$2b$10$7RzJs.kF6VHuT2mzwxU5r.qFRJxzLtKPvJiwE9f2Xj7OTiX69K05e');

INSERT INTO user_role (user_id, role_id)
SELECT u.id, r.id
FROM user u, role r
WHERE u.email = 'admin@admin.com' AND r.name = 'ADMIN';


DROP TABLE user;
DROP TABLE role;
DROP TABLE user_role;
DROP TABLE email_verification;

-- ignore everything below
export async function isAdmin(userId: number): Promise<boolean> {
  const result = await db.query(`
    SELECT role_id 
    FROM user_role 
    WHERE user_id = ? AND role_id = 1
  `, [userId]);
  
  if (result.length === 1) {
    return true;
  } else {
    return false;
  }
}

// app/api/protected/route.ts
export async function GET(request: NextRequest) {
  const userId = 1; // your user ID however you get it
  
  const userIsAdmin = await isAdmin(userId);
  
  if (!userIsAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const firstUser = await db.query(`SELECT * FROM user LIMIT 1`);
  
  return NextResponse.json(firstUser[0], { status: 200 });
}


//frontend 
const response = await fetch('/api/protected');
const data = await response.json();

console.log(data.user.email); // "admin@admin.com"
console.log(data.user.username); // "admin"

//payload would look like 
{
  "user": {
    "id": 1,
    "email": "admin@admin.com", 
    "username": "admin",
    "password": "admin"
  }
}

// lib/db.ts
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function getDb() {
  return await open({
    filename: './database.db',
    driver: sqlite3.Database
  });
}


// lib/auth.ts
export async function isAdmin(userId: number): Promise<boolean> {
  const db = await getDb();
  const result = await db.all(`
    SELECT role_id 
    FROM user_role 
    WHERE user_id = ? AND role_id = 1
  `, [userId]);
  
  if (result.length === 1) {
    return true;
  } else {
    return false;
  }
}