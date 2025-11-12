import axios from 'axios'

// Configuração base do axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user')
    if (user) {
      const userData = JSON.parse(user)
      // Se houver token JWT no futuro, adicionar aqui
      // config.headers.Authorization = `Bearer ${userData.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para tratar respostas
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Serviços da API
export const apiService = {
  // Usuários
  async createUser(userData) {
    return await api.post('/usuarios', userData)
  },

  async loginUser(credentials) {
    return await api.post('/usuarios/login', credentials)
  },

  async getUserById(id) {
    return await api.get(`/usuarios/${id}`)
  },

  async updateUser(id, userData) {
    return await api.put(`/usuarios/${id}`, userData)
  },

  async deleteUser(id, deletedBy = null) {
    return await api.delete(`/usuarios/${id}`, {
      data: { deletedBy }
    })
  },

  async restoreUser(id) {
    return await api.post(`/usuarios/${id}/restaurar`)
  },

  async getUsers(params = {}) {
    return await api.get('/usuarios', { params })
  },

  async getDeletedUsers(params = {}) {
    return await api.get('/usuarios/deletados', { params })
  }
}

// Funções específicas para os componentes
export const createUser = apiService.createUser
export const loginUser = apiService.loginUser
export const getUserById = apiService.getUserById
export const updateUser = apiService.updateUser
export const deleteUser = apiService.deleteUser
export const restoreUser = apiService.restoreUser
export const getUsers = apiService.getUsers
export const getDeletedUsers = apiService.getDeletedUsers

export default api


