# 🔧 Correção do Erro de Build no Render

## Problema
O Render está tentando executar `npm intall` (com erro de digitação) em vez de `npm install`.

## Solução

O erro pode estar vindo de uma configuração manual no dashboard do Render. Siga estes passos:

### 1. Verificar Configuração no Dashboard

1. Acesse o [Render Dashboard](https://dashboard.render.com)
2. Vá até o serviço **hottransilvania-backend**
3. Clique em **Settings**
4. Role até a seção **Build & Deploy**
5. Verifique o campo **Build Command**
6. **Deve estar**: `npm install` (sem o `cd Backend`, pois já está configurado no `rootDir`)
7. Se estiver diferente, **delete o comando manual** e deixe o Render usar o `render.yaml`

### 2. Limpar e Re-deploy

1. No dashboard do serviço, clique em **Manual Deploy** → **Clear build cache & deploy**
2. Isso forçará o Render a usar as configurações do `render.yaml` novamente

### 3. Verificar render.yaml

O arquivo `render.yaml` está correto com:
```yaml
rootDir: Backend
buildCommand: npm install
```

**Importante**: Com `rootDir: Backend`, o comando `npm install` já executa dentro do diretório Backend, então não precisa de `cd Backend &&`.

### 4. Se o Problema Persistir

Se ainda houver problemas:

1. **Delete o serviço** no Render
2. **Crie um novo Blueprint** conectando o repositório novamente
3. O Render lerá o `render.yaml` do zero

## Comandos Corretos

- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Root Directory**: `Backend`

## Nota

O arquivo `render.yaml` no repositório está correto. O problema geralmente é uma configuração manual no dashboard que sobrescreve o arquivo YAML.

