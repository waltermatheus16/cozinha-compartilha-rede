const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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

// Criar nova cozinha (apenas admin)
app.post('/api/kitchens', async (req, res) => {
  try {
    const { name, description, location, contact_phone, contact_email, volunteers, daily_meals, avatar_url } = req.body;
    
    if (!name || !location) {
      return res.status(400).json({ error: 'Nome e localização são obrigatórios' });
    }
    
    const result = await pool.query(`
      INSERT INTO kitchens (name, description, location, contact_phone, contact_email, volunteers, daily_meals, avatar_url) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *
    `, [name, description, location, contact_phone, contact_email, volunteers || 0, daily_meals || 0, avatar_url]);
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar cozinha:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Deletar cozinha (apenas admin)
app.delete('/api/kitchens/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar se a cozinha existe
    const checkResult = await pool.query('SELECT id FROM kitchens WHERE id = $1', [id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Cozinha não encontrada' });
    }
    
    // Deletar cozinha (cascade vai deletar posts, voluntários, etc.)
    const result = await pool.query('DELETE FROM kitchens WHERE id = $1 RETURNING *', [id]);
    
    res.json({ 
      success: true, 
      message: 'Cozinha deletada com sucesso',
      deletedKitchen: result.rows[0]
    });
  } catch (err) {
    console.error('Erro ao deletar cozinha:', err);
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

app.get('/api/posts/kitchen/:kitchenId', async (req, res) => {
  try {
    const { kitchenId } = req.params;
    
    const result = await pool.query(`
      SELECT p.*, k.name as kitchen_name, k.location
      FROM posts p
      JOIN kitchens k ON p.kitchen_id = k.id
      WHERE p.kitchen_id = $1
      ORDER BY p.created_at DESC
    `, [kitchenId]);
    
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar posts da cozinha:', err);
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
      SELECT u.*, k.name as kitchen_name, k.location
      FROM users u 
      LEFT JOIN kitchens k ON u.kitchen_id = k.id 
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

// Alterar senha do próprio usuário
app.put('/api/auth/change-password', async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;
    
    if (!userId || !currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    // Verificar senha atual
    const userResult = await pool.query(
      'SELECT id, password FROM users WHERE id = $1',
      [userId]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    const user = userResult.rows[0];
    
    if (user.password !== currentPassword) {
      return res.status(401).json({ error: 'Senha atual incorreta' });
    }
    
    // Atualizar senha
    await pool.query(
      'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [newPassword, userId]
    );
    
    res.json({ success: true, message: 'Senha alterada com sucesso' });
    
  } catch (err) {
    console.error('Erro ao alterar senha:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Admin alterar senha de qualquer usuário
app.put('/api/admin/change-password', async (req, res) => {
  try {
    const { targetUserId, newPassword, adminUserId } = req.body;
    
    if (!targetUserId || !newPassword || !adminUserId) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    // Verificar se o usuário é admin
    const adminResult = await pool.query(
      'SELECT role FROM users WHERE id = $1',
      [adminUserId]
    );
    
    if (adminResult.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário admin não encontrado' });
    }
    
    if (adminResult.rows[0].role !== 'admin') {
      return res.status(403).json({ error: 'Apenas administradores podem alterar senhas de outros usuários' });
    }
    
    // Verificar se o usuário alvo existe
    const targetResult = await pool.query(
      'SELECT id FROM users WHERE id = $1',
      [targetUserId]
    );
    
    if (targetResult.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário alvo não encontrado' });
    }
    
    // Atualizar senha
    await pool.query(
      'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [newPassword, targetUserId]
    );
    
    res.json({ success: true, message: 'Senha alterada com sucesso' });
    
  } catch (err) {
    console.error('Erro ao alterar senha (admin):', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor API rodando em http://localhost:${port}`);
  console.log(`📊 Conectado ao banco PostgreSQL`);
});
