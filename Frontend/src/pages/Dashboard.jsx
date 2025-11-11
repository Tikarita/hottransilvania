import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { User, Mail, Phone, MapPin, LogOut, Edit, Trash2, CreditCard, Save, X, Calendar, Bed, Sparkles, Settings } from 'lucide-react'
import toast from 'react-hot-toast'
import { getUserById, updateUser, deleteUser } from '../services/api'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      navigate('/login')
      return
    }
    
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    reset(parsedUser)
    setIsLoading(false)
  }, [navigate, reset])

  const handleLogout = () => {
    localStorage.removeItem('user')
    toast.success('Logout realizado com sucesso!')
    navigate('/login')
  }

  const onSubmit = async (data) => {
    setIsSaving(true)
    try {
      const response = await updateUser(user.id, data)
      if (response.success) {
        setUser(response.data)
        localStorage.setItem('user', JSON.stringify(response.data))
        toast.success('Dados atualizados com sucesso!')
        setIsEditing(false)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao atualizar dados')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja deletar sua conta? Esta ação pode ser revertida.')) {
      try {
        await deleteUser(user.id, user.id)
        toast.success('Conta deletada com sucesso!')
        handleLogout()
      } catch (error) {
        toast.error(error.response?.data?.message || 'Erro ao deletar conta')
      }
    }
  }

  const handleCancelEdit = () => {
    reset(user)
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header moderno */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Hotel Imperium</h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Olá, {user?.nome?.split(' ')[0] || 'Usuário'}! 👋
          </h2>
          <p className="text-gray-600">
            Gerencie suas informações e aproveite nossos serviços
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Informações do Perfil</h3>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Editar</span>
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        {...register('nome')}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        {...register('email')}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Telefone
                      </label>
                      <input
                        type="text"
                        {...register('telefone')}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CPF
                      </label>
                      <input
                        type="text"
                        {...register('cpf')}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                        disabled
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Endereço
                      </label>
                      <input
                        type="text"
                        {...register('endereco')}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 pt-4">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isSaving ? 'Salvando...' : 'Salvar alterações'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancelar</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Nome</p>
                        <p className="text-gray-900 font-semibold">{user?.nome || 'Não informado'}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Email</p>
                        <p className="text-gray-900 font-semibold">{user?.email || 'Não informado'}</p>
                      </div>
                    </div>

                    {user?.telefone && (
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Phone className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Telefone</p>
                          <p className="text-gray-900 font-semibold">{user.telefone}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">CPF</p>
                        <p className="text-gray-900 font-semibold">{user?.cpf || 'Não informado'}</p>
                      </div>
                    </div>

                    {user?.endereco && (
                      <div className="flex items-start space-x-4 md:col-span-2">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Endereço</p>
                          <p className="text-gray-900 font-semibold">{user.endereco}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <button
                  onClick={handleDelete}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                  <span className="font-medium">Deletar Conta</span>
                </button>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Serviços</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-[1.02]">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">Fazer Reserva</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
                  <Bed className="w-5 h-5" />
                  <span className="font-medium">Minhas Reservas</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-medium">Serviços Extras</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Configurações</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
