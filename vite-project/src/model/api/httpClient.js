import axios from 'axios';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Normaliza qualquer erro de rede/HTTP em uma mensagem amigável.
http.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error.response
      ? 'Não foi possível concluir a operação. Tente novamente.'
      : 'Sem conexão com o servidor. Verifique sua internet.';
    return Promise.reject(new Error(message));
  }
);
