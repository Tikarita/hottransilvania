import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react'
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 bg-pattern">
      {/* Background decorativo moderno */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-400/20 to-rose-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md animate-fadeIn">
        {/* Card de Login moderno */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta</h1>
            <p className="text-gray-600">Entre na sua conta para continuar</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email é obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido'
                    }
                  })}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  placeholder="seu@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span>•</span> {errors.email.message}
                </p>
              )}
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('senha', {
                    required: 'Senha é obrigatória',
                    minLength: {
                      value: 6,
                      message: 'Senha deve ter pelo menos 6 caracteres'
                    }
                  })}
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.senha && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span>•</span> {errors.senha.message}
                </p>
              )}
            </div>

            {/* Esqueceu a senha */}
            <div className="flex items-center justify-end">
              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                Esqueceu a senha?
              </a>
            </div>

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3.5 px-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-indigo-500/50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Entrando...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Entrar
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </button>
          </form>

          {/* Divisor */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">ou</span>
            </div>
          </div>

          {/* Links */}
          <div className="text-center">
            <p className="text-gray-600">
              Não tem uma conta?{' '}
              <Link
                to="/cadastro"
                className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors inline-flex items-center gap-1"
              >
                Criar conta
                <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            © 2024 Hotel Imperium. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
