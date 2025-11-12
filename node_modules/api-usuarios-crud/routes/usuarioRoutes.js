const express = require('express');
const UsuarioController = require('../controllers/usuarioController');
const { body, param, query } = require('express-validator');
const { validationResult } = require('express-validator');

const router = express.Router();

// Middleware de validação
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: errors.array()
    });
  }
  next();
};

// Validações para criação de usuário
const validarCriacaoUsuario = [
  body('nome')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres'),
  body('cpf')
    .optional()
    .isLength({ min: 11, max: 11 })
    .isNumeric()
    .withMessage('CPF deve ter exatamente 11 dígitos numéricos'),
  body('email')
    .optional()
    .isEmail()
    .isLength({ min: 5, max: 100 })
    .withMessage('Email deve ser válido e ter entre 5 e 100 caracteres'),
  body('telefone')
    .optional()
    .isLength({ min: 10, max: 15 })
    .withMessage('Telefone deve ter entre 10 e 15 caracteres'),
  body('endereco')
    .optional()
    .isLength({ min: 5, max: 50 })
    .withMessage('Endereço deve ter entre 5 e 50 caracteres'),
  body('senha')
    .optional()
    .isLength({ min: 6, max: 255 })
    .withMessage('Senha deve ter entre 6 e 255 caracteres'),
  validateRequest
];

// Validações para atualização de usuário
const validarAtualizacaoUsuario = [
  param('id').isInt().withMessage('ID deve ser um número inteiro'),
  body('nome')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres'),
  body('cpf')
    .optional()
    .isLength({ min: 11, max: 11 })
    .isNumeric()
    .withMessage('CPF deve ter exatamente 11 dígitos numéricos'),
  body('email')
    .optional()
    .isEmail()
    .isLength({ min: 5, max: 100 })
    .withMessage('Email deve ser válido e ter entre 5 e 100 caracteres'),
  body('telefone')
    .optional()
    .isLength({ min: 10, max: 15 })
    .withMessage('Telefone deve ter entre 10 e 15 caracteres'),
  body('endereco')
    .optional()
    .isLength({ min: 5, max: 50 })
    .withMessage('Endereço deve ter entre 5 e 50 caracteres'),
  body('senha')
    .optional()
    .isLength({ min: 6, max: 255 })
    .withMessage('Senha deve ter entre 6 e 255 caracteres'),
  validateRequest
];

// Validações para login
const validarLogin = [
  body('email')
    .notEmpty()
    .isEmail()
    .withMessage('Email é obrigatório e deve ser válido'),
  body('senha')
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('Senha é obrigatória e deve ter pelo menos 6 caracteres'),
  validateRequest
];

// Validações para parâmetros de ID
const validarId = [
  param('id').isInt().withMessage('ID deve ser um número inteiro'),
  validateRequest
];

// Validações para query parameters
const validarQueryParams = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Página deve ser um número inteiro maior que 0'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limite deve ser um número inteiro entre 1 e 100'),
  query('search')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Busca deve ter entre 1 e 100 caracteres'),
  validateRequest
];

// ROTAS DA API

// POST /api/usuarios - Criar novo usuário (Cadastro)
router.post('/', validarCriacaoUsuario, UsuarioController.criarUsuario);

// GET /api/usuarios - Listar todos os usuários
router.get('/', validarQueryParams, UsuarioController.listarUsuarios);

// GET /api/usuarios/deletados - Listar usuários deletados
router.get('/deletados', validarQueryParams, UsuarioController.listarUsuariosDeletados);

// GET /api/usuarios/:id - Buscar usuário por ID
router.get('/:id', validarId, UsuarioController.buscarUsuarioPorId);

// PUT /api/usuarios/:id - Atualizar usuário
router.put('/:id', validarAtualizacaoUsuario, UsuarioController.atualizarUsuario);

// DELETE /api/usuarios/:id - Deletar usuário (soft delete)
router.delete('/:id', validarId, UsuarioController.deletarUsuario);

// POST /api/usuarios/:id/restaurar - Restaurar usuário deletado
router.post('/:id/restaurar', validarId, UsuarioController.restaurarUsuario);

// POST /api/usuarios/login - Login de usuário
router.post('/login', validarLogin, UsuarioController.login);

module.exports = router;
