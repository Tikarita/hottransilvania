# 🔧 Troubleshooting - Erro ao Iniciar Servidor

## Erro: `npm error Lifecycle script 'start' failed`

Este erro geralmente ocorre quando o servidor não consegue iniciar. Siga estes passos:

## ✅ Checklist de Verificação

### 1. Variáveis de Ambiente no Render

**CRÍTICO**: Configure as seguintes variáveis no Render Dashboard:

1. Acesse: https://dashboard.render.com
2. Vá até o serviço **hottransilvania-backend**
3. Clique em **Environment**
4. Adicione as seguintes variáveis:

```
NODE_ENV=production
DATABASE_URL=postgresql://postgres:[SENHA]@db.[PROJETO].supabase.co:5432/postgres
```

**Como obter DATABASE_URL:**
- Acesse seu projeto no Supabase
- Vá em **Settings** → **Database**
- Copie a **Connection String (URI)**
- Substitua `[YOUR-PASSWORD]` pela senha do seu banco

### 2. Verificar Logs no Render

1. No Render Dashboard, vá até o serviço
2. Clique em **Logs**
3. Procure por mensagens de erro que começam com:
   - `❌ ERRO`
   - `❌ Erro ao`
   - `Error:`

### 3. Erros Comuns e Soluções

#### Erro: "Configuração de banco de dados não encontrada"
**Solução**: Configure a variável `DATABASE_URL` no Render Dashboard

#### Erro: "Connection refused" ou "ECONNREFUSED"
**Solução**: 
- Verifique se a `DATABASE_URL` está correta
- Verifique se o banco do Supabase está acessível
- Verifique se o SSL está habilitado (já configurado no código)

#### Erro: "password authentication failed"
**Solução**: 
- Verifique se a senha na `DATABASE_URL` está correta
- Verifique se o usuário está correto (geralmente `postgres`)

#### Erro: "database does not exist"
**Solução**: 
- Verifique se o nome do banco está correto (geralmente `postgres` para Supabase)
- A `DATABASE_URL` do Supabase já inclui o nome do banco

### 4. Testar Localmente

Para testar se o código funciona localmente:

1. Crie um arquivo `.env` no diretório `Backend/`:
```env
DATABASE_URL=postgresql://postgres:[SENHA]@db.[PROJETO].supabase.co:5432/postgres
NODE_ENV=development
PORT=3001
```

2. Execute:
```bash
cd Backend
npm install
npm start
```

### 5. Verificar Estrutura do Projeto

Certifique-se de que a estrutura está correta:
```
Backend/
├── app.js
├── config/
│   └── database.js
├── controllers/
│   └── usuarioController.js
├── models/
│   └── Usuario.js
├── routes/
│   └── usuarioRoutes.js
└── package.json
```

### 6. Re-deploy no Render

Após configurar as variáveis de ambiente:

1. No Render Dashboard, vá até o serviço
2. Clique em **Manual Deploy** → **Clear build cache & deploy**
3. Aguarde o deploy completar
4. Verifique os logs

## 📝 Formato Correto da DATABASE_URL

A `DATABASE_URL` do Supabase deve ter este formato:

```
postgresql://postgres:[SENHA]@db.[PROJETO-ID].supabase.co:5432/postgres
```

Exemplo:
```
postgresql://postgres:minhasenha123@db.abcdefghijklmnop.supabase.co:5432/postgres
```

## 🔍 Logs Detalhados

O código agora imprime logs detalhados. Procure por:

- `🔄 Iniciando servidor...` - Servidor iniciando
- `📦 Variáveis de ambiente:` - Mostra quais variáveis estão configuradas
- `🔌 Tentando conectar ao banco de dados...` - Tentando conectar
- `✅ Conexão com o banco de dados estabelecida` - Sucesso na conexão
- `❌ ERRO` - Qualquer erro será mostrado aqui

## 🆘 Ainda com Problemas?

Se ainda estiver com problemas:

1. **Copie os logs completos** do Render
2. **Verifique se todas as variáveis estão configuradas**
3. **Teste a conexão localmente** com as mesmas credenciais
4. **Verifique se o banco do Supabase está acessível**

## 📞 Próximos Passos

1. Configure `DATABASE_URL` no Render Dashboard
2. Faça um novo deploy
3. Verifique os logs
4. Se ainda houver erro, os logs mostrarão exatamente o problema

