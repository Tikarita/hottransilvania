const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Importar rotas
const usuarioRoutes = require('./routes/usuarioRoutes');

// Importar e configurar banco de dados
const { sequelize } = require('./config/database');

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
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      DATABASE_URL: process.env.DATABASE_URL ? 'Configurada' : 'Não configurada',
      DB_HOST: process.env.DB_HOST || 'Não configurado'
    });

    // Testar conexão com o banco
    console.log('🔌 Tentando conectar ao banco de dados...');
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');

    // Sincronizar modelos (criar tabelas se não existirem)
    console.log('🔄 Sincronizando modelos...');
    await sequelize.sync({ alter: false }); // Alterado para false para evitar alterações automáticas em produção
    console.log('✅ Modelos sincronizados com o banco de dados.');

    // Iniciar servidor
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📊 Health check: http://0.0.0.0:${PORT}/health`);
      console.log(`👥 API de usuários: http://0.0.0.0:${PORT}/api/usuarios`);
    });

  } catch (error) {
    console.error('❌ Erro ao inicializar servidor:');
    console.error('Erro completo:', error);
    console.error('Stack trace:', error.stack);
    if (error.original) {
      console.error('Erro original:', error.original);
    }
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Recebido SIGTERM, encerrando servidor...');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 Recebido SIGINT, encerrando servidor...');
  await sequelize.close();
  process.exit(0);
});

// Inicializar servidor
startServer();

module.exports = app;
