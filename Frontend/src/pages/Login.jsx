import './Login.css'

export default function Login() {
  return (
    <div className="login-page">
      <div className="card">
        <div className="logo">
          <h1 className="hotel-name">Hotel Imperium</h1>
          <p className="muted">Entre na sua conta</p>
        </div>

        <h2 className="page-title">Acesse sua conta para continuar</h2>

        <form className="form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="seu@email.com" />
          </div>

          <div className="form-group">
            <div className="label-row">
              <label>Senha</label>
              <a className="forgot" href="#">Esqueceu a senha?</a>
            </div>
            <input type="password" placeholder="Sua senha" />
          </div>

          <button type="submit" className="btn-primary">Entrar →</button>
        </form>

        <div className="divider"><span>ou</span></div>

        <div className="signup">
          <p className="muted">
            Não tem uma conta?{' '}
            <a href="/cadastro" className="link">Criar conta →</a>
          </p>
        </div>
      </div>
    </div>
  )
}