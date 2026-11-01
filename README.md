# KL Club – Cadastro de Perfil (MVVM)

```bash
cd vite-project
npm install
cp .env.example .env   # URL da API
npm run dev:all        # json-server (3001) + vite (5173)
```

O `db.json` é criado automaticamente a partir do `db.example.json` na primeira execução (não é versionado).

Abra: http://localhost:5173/cadastro?token=kl-demo-123
(token `kl-expirado` simula QR Code inválido)

## Estrutura MVVM
- `src/model`     → entidades/validações, services e axios (get, post, put, delete)
- `src/viewmodel` → `useRegistrationViewModel` (estado + regras do fluxo)
- `src/view`      → componentes, etapas e página (JSX + CSS Modules)

## Endpoints (json-server / db.json)
| Ação | Método | Rota |
|---|---|---|
| Validar QR | GET | /qrSessions?token= |
| Buscar CPF | GET | /users?cpf= |
| Criar rascunho (etapa 1) | POST | /users |
| Salvar nome/telefone | PUT | /users/:id |
| Alterar CPF (descarta rascunho) | DELETE | /users/:id |