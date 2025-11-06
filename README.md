# 🏨 Hotel Imperium - Sistema Completo

Sistema completo de gerenciamento de usuários para o Hotel Imperium, com backend API REST e frontend React moderno.

## 📋 Sobre o Projeto

Sistema desenvolvido para o Hotel Imperium com funcionalidades completas de:
- ✅ Cadastro e autenticação de usuários
- ✅ CRUD completo com soft delete
- ✅ Interface moderna e responsiva
- ✅ API REST robusta e segura

## 🚀 Tecnologias

### Backend
- **Node.js** + **Express**
- **Sequelize** (ORM)
- **PostgreSQL** (Supabase)
- **Bcrypt** (Hash de senhas)
- **Express Validator** (Validações)

### Frontend
- **React 18**
- **Vite**
- **React Router**
- **React Hook Form**
- **Axios**
- **React Hot Toast**

## 📁 Estrutura do Projeto

```
.
├── Backend/
│   ├── config/          # Configurações do banco
│   ├── controllers/     # Lógica de negócio
│   ├── models/          # Modelos Sequelize
│   ├── routes/          # Rotas da API
│   ├── app.js           # Aplicação principal
│   └── package.json
│
├── Frontend/
│   ├── public/          # Arquivos estáticos
│   ├── src/
│   │   ├── pages/       # Páginas React
│   │   ├── services/    # Serviços API
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 16+ instalado
- Conta no Supabase (ou PostgreSQL local)
- Git

### Backend

1. **Instalar dependências:**
```bash
cd Backend
npm install
```

2. **Configurar variáveis de ambiente:**
```bash
cp env-template.txt .env
# Editar .env com suas credenciais do Supabase
```

3. **Executar:**
```bash
npm run dev  # Desenvolvimento
npm start    # Produção
```

A API estará disponível em `http://localhost:3001`

### Frontend

1. **Instalar dependências:**
```bash
cd Frontend
npm install
```

2. **Configurar variáveis de ambiente:**
```bash
cp env.example .env
# Editar VITE_API_URL=http://localhost:3001/api
```

3. **Executar:**
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:3000`

## 📚 Documentação da API

### Endpoints Principais

#### Autenticação
- `POST /api/usuarios/login` - Login
- `POST /api/usuarios` - Cadastro

#### CRUD
- `GET /api/usuarios` - Listar usuários
- `GET /api/usuarios/:id` - Buscar por ID
- `PUT /api/usuarios/:id` - Atualizar
- `DELETE /api/usuarios/:id` - Soft delete
- `POST /api/usuarios/:id/restaurar` - Restaurar deletado

### Exemplo de Requisição

```bash
# Login
curl -X POST http://localhost:3001/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@email.com",
    "senha": "123456"
  }'
```

## 🎨 Funcionalidades

### Backend
- ✅ CRUD completo de usuários
- ✅ Soft delete com auditoria
- ✅ Hash de senhas com bcrypt
- ✅ Validações completas
- ✅ Paginação e busca
- ✅ Restauração de registros deletados

### Frontend
- ✅ Página de login elegante
- ✅ Página de cadastro completa
- ✅ Dashboard do usuário
- ✅ Validações em tempo real
- ✅ Máscaras de input (CPF, telefone)
- ✅ Design responsivo
- ✅ Notificações toast

## 🔒 Segurança

- Senhas criptografadas com bcrypt
- Validação de dados no frontend e backend
- Soft delete para auditoria
- Headers de segurança (Helmet)
- CORS configurado

## 📝 Estrutura da Tabela

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  cpf CHAR(11) UNIQUE,
  email VARCHAR(100) UNIQUE,
  telefone CHAR(15),
  endereco VARCHAR(50),
  senha VARCHAR(255),
  deletedAt TIMESTAMP,
  deletedBy INTEGER,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
```

## 🚀 Deploy

### Backend
- Configure as variáveis de ambiente no servidor
- Execute `npm install` e `npm start`
- Configure o banco de dados PostgreSQL

### Frontend
- Configure `VITE_API_URL` com a URL da API em produção
- Execute `npm run build`
- Deploy da pasta `dist/` em Vercel, Netlify, etc.

## 📄 Licença

Este projeto foi desenvolvido para o Hotel Imperium.

## 👥 Desenvolvido por

Equipe de desenvolvimento Hotel Imperium

---

**Hotel Imperium** - Luxo e Conforto em cada detalhe 🏨✨
