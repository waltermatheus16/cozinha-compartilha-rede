const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

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
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const { id } = req.params;
    const { name, description, location, contact_phone, contact_email, volunteers, daily_meals, avatar_url, password } = req.body;
    
    // Atualizar a cozinha
    const result = await client.query(`
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
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Cozinha não encontrada' });
    }
    
    // Se uma nova senha foi fornecida, atualizar a senha do usuário
    if (password && password.trim() !== '') {
      // Criptografar nova senha
      const hashedPassword = await bcrypt.hash(password, 10);
      
      await client.query(`
        UPDATE users 
        SET password = $1, updated_at = CURRENT_TIMESTAMP
        WHERE kitchen_id = $2
      `, [hashedPassword, id]);
    }
    
    await client.query('COMMIT');
    res.json(result.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Erro ao atualizar cozinha:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    client.release();
  }
});

// Criar nova cozinha (apenas admin)
app.post('/api/kitchens', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const { name, description, location, contact_phone, contact_email, volunteers, daily_meals, avatar_url, password } = req.body;
    
    if (!name || !location || !password) {
      return res.status(400).json({ error: 'Nome, localização e senha são obrigatórios' });
    }
    
    // Criar a cozinha
    const kitchenResult = await client.query(`
      INSERT INTO kitchens (name, description, location, contact_phone, contact_email, volunteers, daily_meals, avatar_url) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *
    `, [name, description, location, contact_phone, contact_email, volunteers || 0, daily_meals || 0, avatar_url]);
    
    const kitchen = kitchenResult.rows[0];
    
    // Criar usuário para a cozinha
    const email = contact_email || `${name.toLowerCase().replace(/\s+/g, '')}@comsea.com`;
    
    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await client.query(`
      INSERT INTO users (kitchen_id, email, password, role) 
      VALUES ($1, $2, $3, 'kitchen')
    `, [kitchen.id, email, hashedPassword]);
    
    await client.query('COMMIT');
    res.status(201).json(kitchen);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Erro ao criar cozinha:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    client.release();
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
    
    // Buscar usuário pelo email
    const result = await pool.query(`
      SELECT u.*, k.name as kitchen_name, k.location
      FROM users u 
      LEFT JOIN kitchens k ON u.kitchen_id = k.id 
      WHERE u.email = $1 AND u.is_active = true
    `, [email]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    const user = result.rows[0];
    
    console.log('🔐 Login debug:', {
      email: user.email,
      providedPassword: password,
      storedPasswordHash: user.password,
      isBcrypt: user.password.startsWith('$2b$')
    });
    
    // Comparar senha com bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    console.log('🔐 Password comparison result:', isPasswordValid);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
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

// Alterar senha do próprio usuário - APENAS ADMIN
app.put('/api/auth/change-password', async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;
    
    if (!userId || !currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    // Verificar se o usuário é admin
    const userResult = await pool.query(
      'SELECT id, password, role FROM users WHERE id = $1',
      [userId]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    const user = userResult.rows[0];
    
    // Verificar se é admin
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Apenas administradores podem alterar senhas' });
    }
    
    // Verificar senha atual (com criptografia)
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({ error: 'Senha atual incorreta' });
    }
    
    // Criptografar nova senha
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    
    // Atualizar senha (com criptografia)
    await pool.query(
      'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [hashedNewPassword, userId]
    );
    
    res.json({ success: true, message: 'Senha alterada com sucesso' });
    
  } catch (err) {
    console.error('Erro ao alterar senha:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Debug endpoint para verificar contraseña de usuario
app.get('/api/debug/user-password', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, password FROM users WHERE email = $1', ['apae@comsea.com']);
    if (result.rows.length > 0) {
      res.json({ 
        id: result.rows[0].id,
        email: result.rows[0].email,
        password: result.rows[0].password,
        passwordLength: result.rows[0].password.length
      });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (err) {
    console.error('Error en debug:', err);
    res.status(500).json({ error: 'Error interno' });
  }
});

// Admin alterar senha de qualquer usuário
app.put('/api/admin/change-password', async (req, res) => {
  try {
    const { targetUserId, targetKitchenId, newPassword, adminUserId } = req.body;
    
    if ((!targetUserId && !targetKitchenId) || !newPassword || !adminUserId) {
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
    
    let finalTargetUserId = targetUserId;
    
    // Se targetKitchenId foi fornecido, encontrar o usuário da cozinha
    if (targetKitchenId && !targetUserId) {
      const kitchenUserResult = await pool.query(
        'SELECT id FROM users WHERE kitchen_id = $1',
        [targetKitchenId]
      );
      
      if (kitchenUserResult.rows.length === 0) {
        return res.status(404).json({ error: 'Usuário da cozinha não encontrado' });
      }
      
      finalTargetUserId = kitchenUserResult.rows[0].id;
    }
    
    // Verificar se o usuário alvo existe
    const targetResult = await pool.query(
      'SELECT id FROM users WHERE id = $1',
      [finalTargetUserId]
    );
    
    if (targetResult.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário alvo não encontrado' });
    }
    
    // Criptografar nova senha
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    
    // Atualizar senha (com criptografia)
    await pool.query(
      'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [hashedNewPassword, finalTargetUserId]
    );
    
    res.json({ success: true, message: 'Senha alterada com sucesso' });
    
  } catch (err) {
    console.error('Erro ao alterar senha (admin):', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Buscar mensagens de contato (apenas admin)
app.get('/api/contact-messages', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM contact_messages 
      ORDER BY created_at DESC
    `);
    
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar mensagens de contato:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Enviar email de contato
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }
    
    // Simular envio de email (em produção, usar serviço como SendGrid, Nodemailer, etc.)
    console.log('📧 Email de contato recebido:');
    console.log(`Nome: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Assunto: ${subject}`);
    console.log(`Mensagem: ${message}`);
    console.log('---');
    
    // Salvar no banco de dados (opcional)
    await pool.query(`
      INSERT INTO contact_messages (name, email, subject, message, created_at) 
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
    `, [name, email, subject, message]);
    
    res.json({ 
      success: true, 
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' 
    });
    
  } catch (err) {
    console.error('Erro ao enviar mensagem de contato:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor API rodando em http://localhost:${port}`);
  console.log(`📊 Conectado ao banco PostgreSQL`);
});
