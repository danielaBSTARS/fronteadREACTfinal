import axios from 'axios';

const API = axios.create({
  baseURL: 'https://backend-finanzasmj-fuoqk7m4j-daniela-s-projects-f35cb109.vercel.app/api',
});

// Lee el token en CADA request, no solo al crear la instancia
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('🔑 Token enviado:', token ? 'SÍ' : 'NO — token ausente');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta — maneja 401 globalmente
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('❌ 401 — token inválido o expirado');
    }
    return Promise.reject(error);
  }
);

export default API;