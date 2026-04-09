import axios from "./axios";

export const transactionService = {
  // Crear transacción
  create: async (transactionData) => {
    const response = await axios.post("/transactions", transactionData);
    return response.data;
  },

  // Obtener transacciones con filtros
  getAll: async (params = {}) => {
    const response = await axios.get("/transactions", { params });
    return response.data;
  },

  // Obtener una transacción
  getById: async (id) => {
    const response = await axios.get(`/transactions/${id}`);
    return response.data;
  },

  // Actualizar transacción
  update: async (id, transactionData) => {
    const response = await axios.put(`/transactions/${id}`, transactionData);
    return response.data;
  },

  // Eliminar transacción
  delete: async (id) => {
    const response = await axios.delete(`/transactions/${id}`);
    return response.data;
  }
};