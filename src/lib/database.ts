import { Pool } from 'pg';

const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'cozinha_compartilha_rede',
  password: '123',
  port: 5432,
});

// =============================================
// FUNÇÕES PARA COZINHAS
// =============================================

export async function getKitchens() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM kitchens ORDER BY name');
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getKitchenById(id: number) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM kitchens WHERE id = $1', [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function getKitchenStats() {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT 
        COUNT(*) as total_kitchens,
        SUM(volunteers) as total_volunteers,
        SUM(daily_meals) as total_daily_meals,
        SUM(total_meals) as total_meals_served
      FROM kitchens
    `);
    return result.rows[0];
  } finally {
    client.release();
  }
}

// =============================================
// FUNÇÕES PARA POSTS
// =============================================

export async function getPostsByKitchen(kitchenId: number) {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT p.*, k.name as kitchen_name 
      FROM posts p 
      JOIN kitchens k ON p.kitchen_id = k.id 
      WHERE p.kitchen_id = $1 
      ORDER BY p.created_at DESC
    `, [kitchenId]);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getAllPosts(limit: number = 50) {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT p.*, k.name as kitchen_name, k.location
      FROM posts p 
      JOIN kitchens k ON p.kitchen_id = k.id 
      ORDER BY p.created_at DESC
      LIMIT $1
    `, [limit]);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function createPost(kitchenId: number, type: string, content: string, imageUrl?: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      INSERT INTO posts (kitchen_id, type, content, image_url) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `, [kitchenId, type, content, imageUrl]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function likePost(postId: number) {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      UPDATE posts 
      SET likes = likes + 1 
      WHERE id = $1 
      RETURNING likes
    `, [postId]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

// =============================================
// FUNÇÕES PARA COMENTÁRIOS
// =============================================

export async function getCommentsByPost(postId: number) {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT * FROM comments 
      WHERE post_id = $1 
      ORDER BY created_at ASC
    `, [postId]);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function createComment(postId: number, content: string, authorName: string, authorEmail?: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      INSERT INTO comments (post_id, content, author_name, author_email) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `, [postId, content, authorName, authorEmail]);
    
    // Atualizar contador de comentários no post
    await client.query(`
      UPDATE posts 
      SET comments_count = comments_count + 1 
      WHERE id = $1
    `, [postId]);
    
    return result.rows[0];
  } finally {
    client.release();
  }
}

// =============================================
// FUNÇÕES PARA VOLUNTÁRIOS
// =============================================

export async function getVolunteersByKitchen(kitchenId: number) {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT * FROM volunteers 
      WHERE kitchen_id = $1 AND is_active = true
      ORDER BY joined_at DESC
    `, [kitchenId]);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function addVolunteer(kitchenId: number, name: string, email?: string, phone?: string, role: string = 'voluntario') {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      INSERT INTO volunteers (kitchen_id, name, email, phone, role) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *
    `, [kitchenId, name, email, phone, role]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

// =============================================
// FUNÇÕES PARA DOAÇÕES
// =============================================

export async function getDonationsByKitchen(kitchenId: number) {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT * FROM donations 
      WHERE kitchen_id = $1
      ORDER BY created_at DESC
    `, [kitchenId]);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function addDonation(kitchenId: number, amount: number, description: string, donorName: string, donorEmail?: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      INSERT INTO donations (kitchen_id, amount, description, donor_name, donor_email) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *
    `, [kitchenId, amount, description, donorName, donorEmail]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

// =============================================
// FUNÇÕES DE BUSCA
// =============================================

export async function searchKitchens(query: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT * FROM kitchens 
      WHERE name ILIKE $1 OR description ILIKE $1 OR location ILIKE $1
      ORDER BY name
    `, [`%${query}%`]);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getKitchensByLocation(location: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT * FROM kitchens 
      WHERE location ILIKE $1
      ORDER BY name
    `, [`%${location}%`]);
    return result.rows;
  } finally {
    client.release();
  }
}

// =============================================
// FUNÇÕES DE RELATÓRIOS
// =============================================

export async function getTopKitchensByMeals(limit: number = 10) {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT id, name, daily_meals, total_meals, volunteers
      FROM kitchens 
      ORDER BY total_meals DESC
      LIMIT $1
    `, [limit]);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getRecentActivity(limit: number = 20) {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT 
        'post' as type,
        p.id,
        p.content,
        p.created_at,
        k.name as kitchen_name,
        k.location
      FROM posts p
      JOIN kitchens k ON p.kitchen_id = k.id
      UNION ALL
      SELECT 
        'donation' as type,
        d.id,
        d.description as content,
        d.created_at,
        k.name as kitchen_name,
        k.location
      FROM donations d
      JOIN kitchens k ON d.kitchen_id = k.id
      ORDER BY created_at DESC
      LIMIT $1
    `, [limit]);
    return result.rows;
  } finally {
    client.release();
  }
}

// =============================================
// FUNÇÕES DE AUTENTICAÇÃO
// =============================================

export async function authenticateUser(email: string, password: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT u.*, k.name as kitchen_name, k.location
      FROM users u 
      JOIN kitchens k ON u.kitchen_id = k.id 
      WHERE u.email = $1 AND u.password = $2 AND u.is_active = true
    `, [email, password]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function getUserByEmail(email: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT u.*, k.name as kitchen_name, k.location
      FROM users u 
      JOIN kitchens k ON u.kitchen_id = k.id 
      WHERE u.email = $1
    `, [email]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function getAllUsers() {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT u.id, u.email, u.role, u.is_active, u.created_at, k.name as kitchen_name
      FROM users u 
      JOIN kitchens k ON u.kitchen_id = k.id 
      ORDER BY u.id
    `);
    return result.rows;
  } finally {
    client.release();
  }
}

export { pool };
