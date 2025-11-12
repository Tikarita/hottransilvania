import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { User, Mail, Phone, MapPin, LogOut, Edit, Trash2, Save, X, CreditCard, Search, Calendar, Bed, Star, Settings, Bell } from 'lucide-react'
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
      <div className="page">
        <div className="card" style={{ maxWidth: '420px', width: '100%', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <div className="spinner"></div>
            <p className="muted">Carregando...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      {/* Header estilo Trivago */}
      <header className="bg-white border-b border-gray-200" style={{ boxShadow: 'none' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img src="/crown.svg" alt="Imperium" width="28" height="28" />
              <div>
                <h1 className="heading" style={{ fontSize: '1rem', marginBottom: 0 }}>Hotel Imperium</h1>
                <p className="muted" style={{ fontSize: '0.8rem' }}>Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLogout}
                className="btn"
                style={{ background: '#f3f4f6', color: '#374151' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline">Sair</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="heading">Olá, {user?.nome?.split(' ')[0] || 'Usuário'}</h2>
          <p className="muted">Gerencie suas informações e aproveite nossos serviços</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="heading" style={{ fontSize: '1.25rem' }}>Informações do Perfil</h3>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Edit className="w-4 h-4" />
                      <span>Editar</span>
                    </div>
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
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        {...register('email')}
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Telefone
                      </label>
                      <input
                        type="text"
                        {...register('telefone')}
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CPF
                      </label>
                      <input
                        type="text"
                        {...register('cpf')}
                        className="input"
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
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 pt-4">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="btn btn-primary"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Save className="w-4 h-4" />
                        <span>{isSaving ? 'Salvando...' : 'Salvar alterações'}</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="btn"
                      style={{ background: '#f3f4f6', color: '#374151' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <X className="w-4 h-4" />
                        <span>Cancelar</span>
                      </div>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="muted">Nome</p>
                      <p style={{ fontWeight: 600, color: '#111827' }}>{user?.nome || 'Não informado'}</p>
                    </div>

                    <div>
                      <p className="muted">Email</p>
                      <p style={{ fontWeight: 600, color: '#111827' }}>{user?.email || 'Não informado'}</p>
                    </div>

                    {user?.telefone && (
                      <div>
                        <p className="muted">Telefone</p>
                        <p style={{ fontWeight: 600, color: '#111827' }}>{user.telefone}</p>
                      </div>
                    )}

                    <div>
                      <p className="muted">CPF</p>
                      <p style={{ fontWeight: 600, color: '#111827' }}>{user?.cpf || 'Não informado'}</p>
                    </div>

                    {user?.endereco && (
                      <div className="md:col-span-2">
                        <p className="muted">Endereço</p>
                        <p style={{ fontWeight: 600, color: '#111827' }}>{user.endereco}</p>
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
            <div className="card">
              <h3 className="heading" style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Ações Rápidas</h3>
              <div className="space-y-3">
                <button
                  onClick={handleDelete}
                  className="btn"
                  style={{ width: '100%', background: '#fee2e2', color: '#dc2626' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Trash2 className="w-5 h-5" />
                    <span className="muted" style={{ color: '#dc2626', fontWeight: 600 }}>Deletar Conta</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Services Cards estilo Trivago */}
            <div className="card">
              <h3 className="heading" style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Serviços</h3>
              <div className="space-y-3">
                <button className="btn btn-primary" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Calendar className="w-5 h-5" />
                    <span>Fazer Reserva</span>
                  </div>
                </button>
                <button className="btn" style={{ width: '100%', background: '#f3f4f6', color: '#374151' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Bed className="w-5 h-5" />
                    <span>Minhas Reservas</span>
                  </div>
                </button>
                <button className="btn" style={{ width: '100%', background: '#f3f4f6', color: '#374151' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Star className="w-5 h-5" />
                    <span>Avaliações</span>
                  </div>
                </button>
                <button className="btn" style={{ width: '100%', background: '#f3f4f6', color: '#374151' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Settings className="w-5 h-5" />
                    <span>Configurações</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="card">
              <h3 className="heading" style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Estatísticas</h3>
              <div className="space-y-4">
                <div>
                  <p className="muted">Reservas Totais</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>0</p>
                </div>
                <div>
                  <p className="muted">Noites Reservadas</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
