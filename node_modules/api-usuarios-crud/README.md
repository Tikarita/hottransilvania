# API CRUD de Usuários com Soft Delete

API completa para gerenciamento de usuários com operações CRUD e soft delete, preparada para integração com Supabase.

## 🚀 Funcionalidades

- ✅ **CRUD Completo**: Create, Read, Update, Delete
- ✅ **Soft Delete**: Usuários não são removidos fisicamente
- ✅ **Autenticação**: Login com hash de senha seguro
- ✅ **Validações**: Validação completa de dados de entrada
- ✅ **Paginação**: Listagem paginada de usuários
- ✅ **Busca**: Sistema de busca por nome, email ou CPF
- ✅ **Restauração**: Possibilidade de restaurar usuários deletados
- ✅ **Segurança**: Senhas criptografadas com bcrypt

## 📋 Estrutura da Tabela

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

## 🛠️ Instalação

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente:**
```bash
cp env-template.txt .env
# Editar o arquivo .env com suas credenciais do Supabase
```

3. **Executar a aplicação:**
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 📚 Endpoints da API

### 🔐 Autenticação

#### POST `/api/usuarios/login`
**Login de usuário**
```json
{
  "email": "usuario@email.com",
  "senha": "123456"
}
```

#### POST `/api/usuarios`
**Cadastro de novo usuário**
```json
{
  "nome": "João Silva",
  "cpf": "12345678901",
  "email": "joao@email.com",
  "telefone": "11999999999",
  "endereco": "Rua das Flores, 123",
  "senha": "123456"
}
```

### 📖 Consultas

#### GET `/api/usuarios`
**Listar todos os usuários**
- Query params: `page`, `limit`, `search`
- Exemplo: `/api/usuarios?page=1&limit=10&search=João`

#### GET `/api/usuarios/:id`
**Buscar usuário por ID**

#### GET `/api/usuarios/deletados`
**Listar usuários deletados (soft delete)**

### ✏️ Atualizações

#### PUT `/api/usuarios/:id`
**Atualizar usuário**
```json
{
  "nome": "João Silva Santos",
  "telefone": "11888888888"
}
```

### 🗑️ Exclusões

#### DELETE `/api/usuarios/:id`
**Deletar usuário (soft delete)**
```json
{
  "deletedBy": 1
}
```

#### POST `/api/usuarios/:id/restaurar`
**Restaurar usuário deletado**

## 📊 Respostas da API

### ✅ Sucesso
```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": { ... }
}
```

### ❌ Erro
```json
{
  "success": false,
  "message": "Descrição do erro",
  "errors": [ ... ]
}
```

## 🔒 Segurança

- **Senhas**: Criptografadas com bcrypt (salt rounds: 10)
- **Validações**: Validação completa de todos os campos
- **Soft Delete**: Registros não são removidos fisicamente
- **Headers**: Helmet para segurança HTTP
- **CORS**: Configurado para permitir requisições do frontend

## 🧪 Testando a API

### Health Check
```bash
curl http://localhost:3001/health
```

### Exemplo de Cadastro
```bash
curl -X POST http://localhost:3001/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "cpf": "12345678901",
    "email": "joao@email.com",
    "telefone": "11999999999",
    "endereco": "Rua das Flores, 123",
    "senha": "123456"
  }'
```

### Exemplo de Login
```bash
curl -X POST http://localhost:3001/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "senha": "123456"
  }'
```

## 🗃️ Soft Delete

A API implementa soft delete, ou seja:
- Usuários "deletados" não são removidos fisicamente
- Campo `deletedAt` marca quando foi deletado
- Campo `deletedBy` marca quem deletou
- Usuários deletados não aparecem nas consultas normais
- Possibilidade de restaurar usuários deletados

## 📝 Notas Importantes

1. **CPF e Email**: Devem ser únicos no sistema
2. **Senhas**: Mínimo 6 caracteres, criptografadas automaticamente
3. **Validações**: Todos os campos são validados antes de salvar
4. **Paginação**: Limite máximo de 100 registros por página
5. **Busca**: Funciona em nome, email e CPF

## 🔧 Configuração do Supabase

Para usar com Supabase, configure as variáveis de ambiente:

```env
DB_HOST=db.seuprojeto.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=sua-senha-do-supabase
```

## 📈 Próximos Passos

- [ ] Implementar JWT para autenticação
- [ ] Adicionar middleware de autenticação
- [ ] Implementar rate limiting
- [ ] Adicionar logs estruturados
- [ ] Criar testes automatizados
- [ ] Implementar cache com Redis
