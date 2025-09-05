const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'cozinha_compartilha_rede',
  password: '123',
  port: 5432,
});

// Routes
app.get('/api/kitchens', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM kitchens ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar cozinhas:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/api/kitchens/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM kitchens WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cozinha não encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar cozinha:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.put('/api/kitchens/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, location, contact_phone, contact_email, volunteers, daily_meals, avatar_url } = req.body;
    
    const result = await pool.query(`
      UPDATE kitchens 
      SET 
        name = $1,
        description = $2,
        location = $3,
        contact_phone = $4,
        contact_email = $5,
        volunteers = $6,
        daily_meals = $7,
        avatar_url = $8,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $9 
      RETURNING *
    `, [name, description, location, contact_phone, contact_email, volunteers, daily_meals, avatar_url, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cozinha não encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar cozinha:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/api/kitchens/:id/posts', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT p.*, k.name as kitchen_name 
      FROM posts p 
      JOIN kitchens k ON p.kitchen_id = k.id 
      WHERE p.kitchen_id = $1 
      ORDER BY p.created_at DESC
    `, [id]);
    
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar posts:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total_kitchens,
        SUM(volunteers) as total_volunteers,
        SUM(daily_meals) as total_daily_meals,
        SUM(total_meals) as total_meals_served
      FROM kitchens
    `);
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar estatísticas:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const { kitchen_id, type, content, image_url } = req.body;
    
    const result = await pool.query(`
      INSERT INTO posts (kitchen_id, type, content, image_url) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `, [kitchen_id, type, content, image_url]);
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar post:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(`
      DELETE FROM posts 
      WHERE id = $1 
      RETURNING *
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }
    
    res.json({ success: true, message: 'Post deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar post:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// =============================================
// ROTAS DE AUTENTICAÇÃO
// =============================================

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
    
    const result = await pool.query(`
      SELECT u.*, k.name as kitchen_name, k.location, k.id as kitchen_id
      FROM users u 
      JOIN kitchens k ON u.kitchen_id = k.id 
      WHERE u.email = $1 AND u.password = $2 AND u.is_active = true
    `, [email, password]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    const user = result.rows[0];
    
    // Remover senha da resposta
    delete user.password;
    
    res.json({
      success: true,
      user: user,
      message: 'Login realizado com sucesso'
    });
    
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT u.id, u.email, u.role, u.is_active, u.created_at, k.name as kitchen_name
      FROM users u 
      JOIN kitchens k ON u.kitchen_id = k.id 
      ORDER BY u.id
    `);
    
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor API rodando em http://localhost:${port}`);
  console.log(`📊 Conectado ao banco PostgreSQL`);
});
