import logoPath from '../images/logo/logo.svg'

function Header({ btnLink, btnText, btnTheme, email, onSignOut }) {

  return (
    <header className="header header_position">
      <img src={logoPath} alt="логотип" className="header__logo" id="start" />
      <div className="auth-container">
        <span className="header__email">{email}</span>
        <a className={`header__profile ${btnTheme} link`} onClick={onSignOut} href={btnLink}>{btnText}</a>
      </div>
    </header>
  )
}

export default Header
