import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, CreditCard, ArrowRight, Search } from 'lucide-react'
import toast from 'react-hot-toast'
import { createUser } from '../services/api'

const Cadastro = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const password = watch('senha')

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await createUser(data)
      
      if (response.success) {
        toast.success('Cadastro realizado com sucesso!')
        navigate('/login')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao criar conta')
    } finally {
      setIsLoading(false)
    }
  }

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .slice(0, 14)
  }

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
      .slice(0, 15)
  }

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: '680px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '6px' }}>
            <img src="/crown.svg" alt="Imperium" width="24" height="24" />
            <span style={{ fontWeight: 700, color: '#111827' }}>Hotel Imperium</span>
          </div>
          <h1 className="heading">Criar conta</h1>
          <p className="muted">Preencha seus dados para começar</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ gridColumn: 'span 1' }}>
              <label>Nome Completo *</label>
              <input
                type="text"
                {...register('nome', {
                  required: 'Nome é obrigatório',
                  minLength: { value: 2, message: 'Nome deve ter pelo menos 2 caracteres' },
                  maxLength: { value: 100, message: 'Nome deve ter no máximo 100 caracteres' }
                })}
                className="input"
                placeholder="Seu nome completo"
              />
              {errors.nome && (
                <p className="muted" style={{ color: '#dc2626', marginTop: '6px' }}>{errors.nome.message}</p>
              )}
            </div>
            <div style={{ gridColumn: 'span 1' }}>
              <label>CPF *</label>
              <input
                type="text"
                {...register('cpf', {
                  required: 'CPF é obrigatório',
                  pattern: { value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, message: 'CPF deve estar no formato 000.000.000-00' }
                })}
                onChange={(e) => { e.target.value = formatCPF(e.target.value) }}
                className="input"
                placeholder="000.000.000-00"
              />
              {errors.cpf && (
                <p className="muted" style={{ color: '#dc2626', marginTop: '6px' }}>{errors.cpf.message}</p>
              )}
            </div>
            <div style={{ gridColumn: 'span 1' }}>
              <label>Email *</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email é obrigatório',
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Email inválido' }
                })}
                className="input"
                placeholder="seu@email.com"
              />
              {errors.email && (
                <p className="muted" style={{ color: '#dc2626', marginTop: '6px' }}>{errors.email.message}</p>
              )}
            </div>
            <div style={{ gridColumn: 'span 1' }}>
              <label>Telefone</label>
              <input
                type="text"
                {...register('telefone', { pattern: { value: /^\(\d{2}\) \d{4,5}-\d{4}$/, message: 'Telefone deve estar no formato (00) 0000-0000' } })}
                onChange={(e) => { e.target.value = formatPhone(e.target.value) }}
                className="input"
                placeholder="(00) 0000-0000"
              />
              {errors.telefone && (
                <p className="muted" style={{ color: '#dc2626', marginTop: '6px' }}>{errors.telefone.message}</p>
              )}
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label>Endereço</label>
              <input
                type="text"
                {...register('endereco', { maxLength: { value: 50, message: 'Endereço deve ter no máximo 50 caracteres' } })}
                className="input"
                placeholder="Rua, número, bairro, cidade"
              />
              {errors.endereco && (
                <p className="muted" style={{ color: '#dc2626', marginTop: '6px' }}>{errors.endereco.message}</p>
              )}
            </div>
            <div style={{ gridColumn: 'span 1' }}>
              <label>Senha *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('senha', { required: 'Senha é obrigatória', minLength: { value: 6, message: 'Senha deve ter pelo menos 6 caracteres' } })}
                  className="input"
                  placeholder="Mínimo 6 caracteres"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 0, cursor: 'pointer', color: '#6b7280' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.senha && (
                <p className="muted" style={{ color: '#dc2626', marginTop: '6px' }}>{errors.senha.message}</p>
              )}
            </div>
            <div style={{ gridColumn: 'span 1' }}>
              <label>Confirmar Senha *</label>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('confirmarSenha', { required: 'Confirmação de senha é obrigatória', validate: value => value === password || 'Senhas não coincidem' })}
                className="input"
                placeholder="Confirme sua senha"
              />
              {errors.confirmarSenha && (
                <p className="muted" style={{ color: '#dc2626', marginTop: '6px' }}>{errors.confirmarSenha.message}</p>
              )}
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
            {isLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <div className="spinner"></div>
                Criando conta...
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Criar conta
                <ArrowRight size={18} />
              </div>
            )}
          </button>
        </form>
        <div className="divider"></div>
        <div style={{ textAlign: 'center' }}>
          <p className="muted">Já tem uma conta? <Link to="/login" className="link">Fazer login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Cadastro
