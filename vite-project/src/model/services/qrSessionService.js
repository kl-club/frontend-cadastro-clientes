import { http } from '../api/httpClient';

export const qrSessionService = {
  /** Valida o token lido do QR Code. Retorna a sessão ou null. */
  async validate(token) {
    if (!token) return null;
    const { data } = await http.get('/qrSessions', { params: { token } });
    const session = data[0];
    return session?.active ? session : null;
  },
};
