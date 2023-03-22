import logoPath from '../images/logo/logo.svg'

function Header({link, linkText, btnTheme, email}) {

  return (
    <header className="header header_position">
      <img src={logoPath} alt="логотип" className="header__logo" id="start" />
      <div className="auth-container">
        <span className="header__email">{email}</span>
      <a className={`header__profile ${btnTheme} link`} href={link}>{linkText}</a>
      </div>
    </header>
  )
}

export default Header
