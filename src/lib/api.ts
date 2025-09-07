const API_BASE_URL = '/api';

// Funções para cozinhas
export async function getKitchens() {
  const response = await fetch(`${API_BASE_URL}/kitchens`);
  if (!response.ok) {
    throw new Error('Erro ao carregar cozinhas');
  }
  return response.json();
}

export async function getKitchenById(id: number) {
  const response = await fetch(`${API_BASE_URL}/kitchens/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Erro ao carregar cozinha');
  }
  return response.json();
}

export async function updateKitchen(id: number, data: any) {
  const response = await fetch(`${API_BASE_URL}/kitchens/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Erro ao atualizar cozinha');
  }
  return response.json();
}

export async function createKitchen(data: any) {
  const response = await fetch(`${API_BASE_URL}/kitchens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Erro ao criar cozinha');
  }
  return response.json();
}

export async function deleteKitchen(id: number) {
  const response = await fetch(`${API_BASE_URL}/kitchens/${id}`, {
    method: 'DELETE'
  });
  
  if (!response.ok) {
    throw new Error('Erro ao deletar cozinha');
  }
  return response.json();
}

export async function getKitchenStats() {
  const response = await fetch(`${API_BASE_URL}/stats`);
  if (!response.ok) {
    throw new Error('Erro ao carregar estatísticas');
  }
  return response.json();
}

// Funções para posts
export async function getPostsByKitchen(kitchenId: number) {
  const response = await fetch(`${API_BASE_URL}/kitchens/${kitchenId}/posts`);
  if (!response.ok) {
    throw new Error('Erro ao carregar posts');
  }
  return response.json();
}

export async function createPost(kitchenId: number, type: string, content: string, imageUrl?: string) {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      kitchen_id: kitchenId,
      type,
      content,
      image_url: imageUrl
    })
  });
  
  if (!response.ok) {
    throw new Error('Erro ao criar post');
  }
  return response.json();
}

export async function deletePost(postId: number) {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: 'DELETE'
  });
  
  if (!response.ok) {
    throw new Error('Erro ao deletar post');
  }
  return response.json();
}

// =============================================
// FUNÇÕES DE AUTENTICAÇÃO
// =============================================

export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao fazer login');
  }
  
  return response.json();
}

export async function getAllUsers() {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error('Erro ao carregar usuários');
  }
  return response.json();
}
