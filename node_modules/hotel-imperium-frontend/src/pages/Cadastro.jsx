import './Cadastro.css'

export default function Cadastro() {
  return (
    <div className="login-page rustic-page">
      <div className="card rustic-card">
        <div className="logo">
          <h1 className="hotel-name">Hotel Imperium</h1>
          <p className="muted">Crie sua conta</p>
        </div>

        <h2 className="page-title">Crie sua conta para começar</h2>

        <form className="form">
          <div className="form-group">
            <label>Nome Completo</label>
            <input type="text" placeholder="Seu nome completo" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="seu@email.com" />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input type="password" placeholder="Sua senha" />
          </div>

          <div className="form-group">
            <label>Confirmar Senha</label>
            <input type="password" placeholder="Confirme sua senha" />
          </div>

          <button type="submit" className="btn-primary">Criar Conta →</button>
        </form>

        <div className="divider"><span>ou</span></div>

        <div className="signup">
          <p className="muted">
            Já tem uma conta?{' '}
            <a href="/login" className="link">Fazer login →</a>
          </p>
        </div>
      </div>
    </div>
  )
}