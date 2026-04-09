import api from '../api/axios';

// 🔥 Servicio de autenticación
const authService = {
  // Login del usuario
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // Guardar el token en localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error en login' };
    }
  },

  // Registro del usuario
  register: async (email, password) => {
    try {
      const response = await api.post('/auth/register', { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error en registro' };
    }
  },

  // Obtener token del storage
  getToken: () => localStorage.getItem('token'),

  // Limpiar token (logout)
  logout: () => {
    localStorage.removeItem('token');
  },

  // Verificar si hay sesión activa
  isAuthenticated: () => !!localStorage.getItem('token')
};

export default authService;
