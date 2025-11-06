import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Crown, User, Mail, Phone, MapPin, LogOut, Edit, Trash2, RotateCcw } from 'lucide-react'
import toast from 'react-hot-toast'
import { getUserById, updateUser, deleteUser, restoreUser } from '../services/api'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      navigate('/login')
      return
    }
    
    setUser(JSON.parse(userData))
    setIsLoading(false)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('user')
    toast.success('Logout realizado com sucesso!')
    navigate('/login')
  }

  const handleSave = async (updatedData) => {
    setIsSaving(true)
    try {
      const response = await updateUser(user.id, updatedData)
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Hotel Imperium</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-effect rounded-2xl p-8 shadow-luxury">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Bem-vindo, {user?.nome || 'Usuário'}!
            </h2>
            <p className="text-white/80">
              Gerencie suas informações e aproveite nossos serviços
            </p>
          </div>

          {/* User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Card */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Informações Pessoais</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-white/60 text-sm">Nome</p>
                    <p className="text-white font-medium">{user?.nome || 'Não informado'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-white/60 text-sm">Email</p>
                    <p className="text-white font-medium">{user?.email || 'Não informado'}</p>
                  </div>
                </div>

                {user?.telefone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="text-white/60 text-sm">Telefone</p>
                      <p className="text-white font-medium">{user.telefone}</p>
                    </div>
                  </div>
                )}

                {user?.endereco && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="text-white/60 text-sm">Endereço</p>
                      <p className="text-white font-medium">{user.endereco}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-white/60 text-sm">CPF</p>
                    <p className="text-white font-medium">{user?.cpf || 'Não informado'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Ações</h3>
              
              <div className="space-y-4">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.02]"
                >
                  <Edit className="w-5 h-5" />
                  <span>{isEditing ? 'Cancelar Edição' : 'Editar Perfil'}</span>
                </button>

                <button
                  onClick={handleDelete}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-[1.02]"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Deletar Conta</span>
                </button>
              </div>

              {/* Hotel Services */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-white mb-4">Serviços do Hotel</h4>
                <div className="grid grid-cols-1 gap-3">
                  <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-[1.02]">
                    Fazer Reserva
                  </button>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-[1.02]">
                    Minhas Reservas
                  </button>
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-[1.02]">
                    Serviços Adicionais
                  </button>
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


