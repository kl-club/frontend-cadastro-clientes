import { http } from '../api/httpClient';

export const userService = {
  async findByCpf(cpf) {
    const { data } = await http.get('/users', { params: { cpf } });
    return data[0] ?? null;
  },

  async createDraft({ cpf, qrToken }) {
    const { data } = await http.post('/users', {
      cpf,
      qrToken,
      status: 'draft',
      createdAt: new Date().toISOString(),
    });
    return data;
  },

  async update(id, payload) {
    const { data } = await http.put(`/users/${id}`, payload);
    return data;
  },

  async remove(id) {
    await http.delete(`/users/${id}`);
  },
};
