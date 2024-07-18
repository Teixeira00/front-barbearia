import jwt from 'jsonwebtoken';
import { Pool } from 'pg';

// Configurar a conexão com o PostgreSQL
const pool = new Pool({
  user: 'chicobarb',
  host: 'localhost',
  database: 'dom_chico',
  password: 'fs24barbchico',
  port: 5432,
});

const SECRET = process.env.JWT_SECRET;

async function createToken(user) {
  return jwt.sign({ email: user.email, name: user.name }, SECRET);
}

async function readToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    throw new Error('Token inválido');
  }
}

export async function verifica(token) {
  return readToken(token);
}

export async function register(body) {
  const client = await pool.connect();
  try {
    const existingUser = await client.query('SELECT * FROM users WHERE email = $1', [body.email]);
    if (existingUser.rows.length > 0) {
      throw new Error('Usuário já cadastrado');
    }

    const newUser = await client.query('INSERT INTO users (email, password, name, tel) VALUES ($1, $2, $3, $4) RETURNING *',
      [body.email, body.password, body.name, body.tel]);

    const token = await createToken(newUser.rows[0]);
    return token;
  } finally {
    client.release();
  }
}

export async function login(body) {
  const client = await pool.connect();
  try {
    const user = await client.query('SELECT * FROM users WHERE email = $1', [body.email]);
    if (user.rows.length === 0) {
      throw new Error('Usuário não encontrado');
    }

    const matchedUser = user.rows[0];
    if (matchedUser.password !== body.password) {
      throw new Error('Senha incorreta');
    }

    const token = await createToken(matchedUser);
    return token;
  } finally {
    client.release();
  }
}