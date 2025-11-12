#!/bin/bash
# Script de inicialização para Render
# Este script garante que o servidor inicie mesmo com erros de banco

echo "🚀 Iniciando aplicação..."
echo "📦 Node version: $(node --version)"
echo "📦 NPM version: $(npm --version)"

# Executar o servidor
node app.js

