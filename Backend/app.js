const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Importar rotas
const usuarioRoutes = require('./routes/usuarioRoutes');

// Importar e configurar banco de dados
const { sequelize: sequelizeConfig, initializeSequelize, initializeModels } = require('./config/database');

const app = express();
// Render define PORT automaticamente, mas usamos 3000 como fallback
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(helmet()); // Segurança
app.use(cors()); // CORS
app.use(morgan('combined')); // Logs
app.use(express.json({ limit: '10mb' })); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL encoded

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Erro interno'
  });
});

// Rota de health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rotas da API
app.use('/api/usuarios', usuarioRoutes);

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
    path: req.originalUrl
  });
});

// Função para inicializar o servidor
async function startServer() {
  try {
    console.log('🔄 Iniciando servidor...');
    console.log('📦 Variáveis de ambiente:', {
      NODE_ENV: process.env.NODE_ENV || 'não definido',
      PORT: process.env.PORT || 'não definido',
      DATABASE_URL: process.env.DATABASE_URL ? '✅ Configurada' : '❌ Não configurada',
      DB_HOST: process.env.DB_HOST || '❌ Não configurado',
      DB_NAME: process.env.DB_NAME || '❌ Não configurado'
    });

    // Verificar se há configuração de banco
    if (!process.env.DATABASE_URL && !process.env.DB_HOST) {
      console.error('❌ ERRO CRÍTICO: Nenhuma configuração de banco de dados encontrada!');
      console.error('Por favor, configure DATABASE_URL no Render Dashboard');
      console.error('Ou configure DB_HOST, DB_NAME, DB_USER, DB_PASSWORD');
      console.error('');
      console.error('📝 Como configurar no Render:');
      console.error('1. Acesse o dashboard do Render');
      console.error('2. Vá em Settings → Environment Variables');
      console.error('3. Adicione DATABASE_URL com a string de conexão do seu banco');
      throw new Error('Configuração de banco de dados não encontrada');
    }

    // Inicializar banco de dados se ainda não foi inicializado
    let sequelize = sequelizeConfig;
    if (!sequelize) {
      console.log('🔄 Inicializando banco de dados...');
      try {
        sequelize = initializeSequelize();
        initializeModels();
      } catch (initError) {
        console.error('❌ Erro ao inicializar banco de dados:');
        console.error('Mensagem:', initError.message);
        throw initError;
      }
    }

    // Testar conexão com o banco
    console.log('🔌 Tentando conectar ao banco de dados...');
    try {
      await sequelize.authenticate();
      console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
    } catch (dbError) {
      console.error('❌ Erro ao conectar ao banco de dados:');
      console.error('Mensagem:', dbError.message);
      if (dbError.original) {
        console.error('Erro original:', dbError.original.message);
        console.error('Código:', dbError.original.code);
      }
      console.error('');
      console.error('💡 Dicas para resolver:');
      console.error('1. Verifique se a DATABASE_URL está correta');
      console.error('2. Verifique se o banco de dados está acessível');
      console.error('3. Verifique se as credenciais estão corretas');
      console.error('4. Para Supabase, certifique-se de usar a Connection String (URI)');
      throw dbError;
    }

    // Sincronizar modelos (criar tabelas se não existirem)
    console.log('🔄 Sincronizando modelos...');
    try {
      await sequelize.sync({ alter: false }); // Alterado para false para evitar alterações automáticas em produção
      console.log('✅ Modelos sincronizados com o banco de dados.');
    } catch (syncError) {
      console.error('❌ Erro ao sincronizar modelos:');
      console.error('Mensagem:', syncError.message);
      if (syncError.original) {
        console.error('Erro original:', syncError.original.message);
      }
      // Não lançar erro aqui, continuar mesmo se a sincronização falhar
      console.warn('⚠️ Continuando sem sincronização de modelos...');
    }

    // Iniciar servidor
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📊 Health check: http://0.0.0.0:${PORT}/health`);
      console.log(`👥 API de usuários: http://0.0.0.0:${PORT}/api/usuarios`);
    });

  } catch (error) {
    console.error('❌ Erro ao inicializar servidor:');
    console.error('Tipo do erro:', error.constructor.name);
    console.error('Mensagem:', error.message);
    console.error('Stack trace:', error.stack);
    if (error.original) {
      console.error('Erro original:', error.original.message);
      console.error('Stack original:', error.original.stack);
    }
    console.error('Encerrando processo...');
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Recebido SIGTERM, encerrando servidor...');
  try {
    const { sequelize: db } = require('./config/database');
    if (db) {
      await db.close();
    }
  } catch (error) {
    console.error('Erro ao fechar conexão:', error.message);
  }
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 Recebido SIGINT, encerrando servidor...');
  try {
    const { sequelize: db } = require('./config/database');
    if (db) {
      await db.close();
    }
  } catch (error) {
    console.error('Erro ao fechar conexão:', error.message);
  }
  process.exit(0);
});

// Inicializar servidor
startServer();

module.exports = app;
