# 🚀 Guia de Deploy no Render

Este guia vai te ajudar a fazer o deploy do seu projeto no Render passo a passo.

## 📋 Pré-requisitos

1. Conta no [Render](https://render.com) (gratuita)
2. Conta no [Supabase](https://supabase.com) (gratuita)
3. Repositório GitHub configurado

## 🔧 Passo 1: Configurar Supabase

1. Acesse [Supabase Dashboard](https://app.supabase.com)
2. Crie um novo projeto ou use um existente
3. Vá em **Settings** → **API**
4. Copie as seguintes informações:
   - **Project URL** (SUPABASE_URL)
   - **anon public** key (SUPABASE_ANON_KEY)
   - **service_role** key (SUPABASE_SERVICE_ROLE_KEY) - opcional

5. Vá em **Settings** → **Database**
6. Copie a **Connection String** (URI) - será sua DATABASE_URL

## 🎯 Passo 2: Conectar Repositório no Render

1. Acesse [Render Dashboard](https://dashboard.render.com)
2. Clique em **New** → **Blueprint**
3. Conecte sua conta do GitHub
4. Selecione o repositório: `Tikarita/hottransilvania`
5. O Render detectará automaticamente o arquivo `render.yaml`

## ⚙️ Passo 3: Configurar Variáveis de Ambiente

### Backend (hottransilvania-backend)

No dashboard do Render, vá até o serviço do backend e adicione:

```
NODE_ENV=production
DATABASE_URL=postgresql://postgres:[SUA-SENHA]@db.[SEU-PROJETO].supabase.co:5432/postgres
SUPABASE_URL=https://[SEU-PROJETO].supabase.co
SUPABASE_ANON_KEY=[SUA-CHAVE-ANON]
```

**Como obter DATABASE_URL:**
- No Supabase: Settings → Database → Connection String → URI
- Substitua `[YOUR-PASSWORD]` pela senha do seu banco

### Frontend (hottransilvania-frontend)

Após o backend estar deployado, adicione:

```
NODE_ENV=production
VITE_API_URL=https://hottransilvania-backend.onrender.com/api
```

**Importante:** Substitua `hottransilvania-backend.onrender.com` pela URL real do seu backend no Render.

## 🚀 Passo 4: Deploy

1. O Render iniciará o deploy automaticamente após conectar o repositório
2. Aguarde o build completar (pode levar alguns minutos)
3. Verifique os logs se houver erros

## ✅ Passo 5: Verificar Deploy

### Backend
- Acesse: `https://hottransilvania-backend.onrender.com/health`
- Deve retornar: `{"success":true,"message":"API funcionando",...}`

### Frontend
- Acesse a URL fornecida pelo Render
- Deve carregar a aplicação React

## 🔍 Troubleshooting

### Erro: "Build failed"
- Verifique os logs no Render
- Certifique-se de que todas as dependências estão no `package.json`
- Verifique se o `rootDir` está correto no `render.yaml`

### Erro: "Database connection failed"
- Verifique se a `DATABASE_URL` está correta
- Certifique-se de que o banco do Supabase está acessível
- Verifique se o SSL está habilitado (já configurado no código)

### Erro: "Port already in use"
- O Render define a porta automaticamente via `process.env.PORT`
- Não configure PORT manualmente

### Frontend não conecta ao Backend
- Verifique se `VITE_API_URL` está configurada corretamente
- Certifique-se de que o backend está rodando
- Verifique CORS no backend (já configurado)

## 📝 Notas Importantes

1. **Plano Gratuito**: Serviços podem "dormir" após inatividade
2. **Build Time**: Primeiro build pode levar 5-10 minutos
3. **Variáveis de Ambiente**: Sempre configure no dashboard do Render, não no código
4. **Logs**: Use os logs do Render para debugar problemas

## 🔗 Links Úteis

- [Render Documentation](https://render.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Render Status](https://status.render.com)

## 🆘 Suporte

Se encontrar problemas:
1. Verifique os logs no Render Dashboard
2. Consulte a documentação do Render
3. Verifique se todas as variáveis de ambiente estão configuradas

