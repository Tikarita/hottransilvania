# Hotel Transilvania - Monorepo

Monorepo contendo o Backend e Frontend do projeto Hotel Transilvania.

## 📁 Estrutura do Projeto

```
.
├── Backend/          # API Node.js com Express e Sequelize
├── Frontend/         # Aplicação React com Vite
├── render.yaml       # Configuração de deploy no Render
└── package.json      # Configuração do monorepo
```

## 🚀 Deploy no Render

Este projeto está configurado para deploy automático no Render usando o arquivo `render.yaml`.

### Configuração dos Serviços

1. **Backend (Web Service)**
   - Tipo: Web Service
   - Root Directory: `Backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Porta: Configurada via variável de ambiente `PORT`

2. **Frontend (Static Site)**
   - Tipo: Static Site
   - Root Directory: `Frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

### Variáveis de Ambiente Necessárias

#### Backend
Configure as seguintes variáveis no dashboard do Render para o serviço do Backend:

- `SUPABASE_URL` - URL do seu projeto Supabase
- `SUPABASE_ANON_KEY` - Chave pública do Supabase
- `DATABASE_URL` - String de conexão do PostgreSQL (opcional)
- `NODE_ENV` - `production`
- `PORT` - Porta do servidor (Render define automaticamente)

#### Frontend
Configure as seguintes variáveis no dashboard do Render para o serviço do Frontend:

- `VITE_API_URL` - URL completa da API do backend (ex: `https://hottransilvania-backend.onrender.com/api`)
- `NODE_ENV` - `production`

### Passos para Deploy

1. **Conecte seu repositório GitHub ao Render**
   - Acesse [Render Dashboard](https://dashboard.render.com)
   - Clique em "New" → "Blueprint"
   - Conecte seu repositório GitHub
   - O Render detectará automaticamente o arquivo `render.yaml`

2. **Configure as variáveis de ambiente**
   - No dashboard do Render, vá em cada serviço
   - Adicione as variáveis de ambiente necessárias
   - Para o Frontend, use a URL do Backend após o primeiro deploy

3. **Deploy**
   - O Render fará o deploy automaticamente
   - Aguarde o build e deploy completarem

## 🛠️ Desenvolvimento Local

### Pré-requisitos
- Node.js >= 16.0.0
- npm >= 8.0.0

### Instalação

```bash
# Instalar dependências de todos os projetos
npm run install:all
```

### Executar em Desenvolvimento

```bash
# Backend (porta 3001)
npm run dev:backend

# Frontend (porta 3000)
npm run dev:frontend
```

## 📝 Notas

- O arquivo `.env` não é versionado (está no `.gitignore`)
- Use o `Backend/env-template.txt` como referência para criar o `.env` do backend
- Use o `Frontend/env.example` como referência para criar o `.env` do frontend

## 🔗 Links Úteis

- [Render Documentation](https://render.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Documentation](https://vitejs.dev)
