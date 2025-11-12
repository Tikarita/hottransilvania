import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Search } from 'lucide-react'
import toast from 'react-hot-toast'
import { loginUser } from '../services/api'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await loginUser(data)
      
      if (response.success) {
        toast.success('Login realizado com sucesso!')
        localStorage.setItem('user', JSON.stringify(response.data))
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: '420px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '6px' }}>
            <img src="/crown.svg" alt="Imperium" width="24" height="24" />
            <span style={{ fontWeight: 700, color: '#111827' }}>Hotel Imperium</span>
          </div>
          <h1 className="heading">Entrar</h1>
          <p className="muted">Acesse sua conta para continuar</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label>Email</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email é obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido'
                    }
                  })}
                  className="input"
                  placeholder="seu@email.com"
                />
              </div>
              {errors.email && (
                <p className="muted" style={{ color: '#dc2626', marginTop: '6px' }}>{errors.email.message}</p>
              )}
            </div>
            <div>
              <label>Senha</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('senha', {
                    required: 'Senha é obrigatória',
                    minLength: { value: 6, message: 'Senha deve ter pelo menos 6 caracteres' }
                  })}
                  className="input"
                  placeholder="Sua senha"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 0, cursor: 'pointer', color: '#6b7280' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.senha && (
                <p className="muted" style={{ color: '#dc2626', marginTop: '6px' }}>{errors.senha.message}</p>
              )}
            </div>
            <div style={{ textAlign: 'right' }}>
              <a href="#" className="link" style={{ fontSize: '0.9rem' }}>Esqueceu a senha?</a>
            </div>
            <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ width: '100%' }}>
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <div className="spinner"></div>
                  Entrando...
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  Entrar
                  <ArrowRight size={18} />
                </div>
              )}
            </button>
          </div>
        </form>
        <div className="divider"></div>
        <div style={{ textAlign: 'center' }}>
          <p className="muted">
            Não tem uma conta? <Link to="/cadastro" className="link">Criar conta</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
