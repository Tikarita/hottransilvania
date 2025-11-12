# Hotel Imperium - Frontend

Frontend moderno e elegante para o Hotel Imperium, desenvolvido com React e Vite.

## 🎨 Características

- ✅ **Design Luxuoso**: Interface elegante com tema do Hotel Imperium
- ✅ **Responsivo**: Funciona perfeitamente em desktop e mobile
- ✅ **Validações**: Formulários com validação completa
- ✅ **Animações**: Transições suaves e efeitos visuais
- ✅ **Integração**: Conectado com API backend
- ✅ **Roteamento**: Navegação entre páginas
- ✅ **Toast Notifications**: Feedback visual para o usuário

## 🚀 Funcionalidades

### 🔐 Página de Login
- Design elegante com glass effect
- Validação de email e senha
- Integração com API de login
- Redirecionamento automático

### 📝 Página de Cadastro
- Formulário completo com todos os campos
- Validação em tempo real
- Máscaras para CPF e telefone
- Confirmação de senha
- Design responsivo

### 🏠 Dashboard
- Informações do usuário
- Opções de edição
- Serviços do hotel
- Logout seguro

## 🛠️ Tecnologias

- **React 18** - Biblioteca principal
- **Vite** - Build tool e dev server
- **React Router** - Roteamento
- **React Hook Form** - Gerenciamento de formulários
- **Axios** - Cliente HTTP
- **React Hot Toast** - Notificações
- **Lucide React** - Ícones
- **Tailwind CSS** - Estilização (via classes customizadas)

## 📦 Instalação

1. **Instalar dependências:**
```bash
cd Frontend
npm install
```

2. **Configurar variáveis de ambiente:**
```bash
cp env.example .env
# Editar o arquivo .env com a URL da API
```

3. **Executar em desenvolvimento:**
```bash
npm run dev
```

4. **Build para produção:**
```bash
npm run build
```

## 🔧 Configuração

### Variáveis de Ambiente

```env
# URL da API backend
VITE_API_URL=http://localhost:3001/api

# Configurações da aplicação
VITE_APP_NAME=Hotel Imperium
VITE_APP_VERSION=1.0.0
```

### Estrutura de Arquivos

```
Frontend/
├── public/
│   └── crown.svg
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Cadastro.jsx
│   │   └── Dashboard.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design System

### Cores
- **Primária**: Gradiente dourado (yellow-400 to yellow-600)
- **Secundária**: Gradiente roxo (purple-500 to purple-600)
- **Background**: Gradiente azul/roxo
- **Glass Effect**: Transparência com blur

### Componentes
- **Cards**: Glass effect com bordas arredondadas
- **Botões**: Gradientes com hover effects
- **Inputs**: Transparência com focus states
- **Ícones**: Lucide React para consistência

## 📱 Responsividade

- **Mobile First**: Design otimizado para mobile
- **Breakpoints**: sm, md, lg, xl
- **Grid System**: CSS Grid e Flexbox
- **Typography**: Escalas responsivas

## 🔐 Segurança

- **Validação**: Formulários validados no frontend e backend
- **Sanitização**: Dados sanitizados antes do envio
- **Autenticação**: Token-based (preparado para JWT)
- **CORS**: Configurado para comunicação segura

## 🚀 Deploy

### Vercel
```bash
npm run build
# Upload da pasta dist/
```

### Netlify
```bash
npm run build
# Deploy automático via Git
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🧪 Testes

```bash
# Executar testes
npm test

# Testes com coverage
npm run test:coverage
```

## 📈 Performance

- **Code Splitting**: Lazy loading de componentes
- **Tree Shaking**: Remoção de código não utilizado
- **Minificação**: Assets otimizados
- **Caching**: Headers de cache configurados

## 🔄 Integração com Backend

A aplicação está configurada para se comunicar com a API backend:

- **Base URL**: Configurável via `.env`
- **Timeout**: 10 segundos
- **Interceptors**: Para autenticação e tratamento de erros
- **Error Handling**: Tratamento global de erros

## 🎯 Próximos Passos

- [ ] Implementar JWT authentication
- [ ] Adicionar testes unitários
- [ ] Implementar PWA
- [ ] Adicionar internacionalização
- [ ] Implementar dark mode
- [ ] Adicionar animações avançadas
- [ ] Implementar cache offline

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato com a equipe de desenvolvimento.

---

**Hotel Imperium** - Luxo e Conforto em cada detalhe 🏨✨


