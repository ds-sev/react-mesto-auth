import logoPath from '../images/logo/logo.svg'

function Header() {
  const linkText = 'Войти'
  return (
    <header className="header header_position">
      <img src={logoPath} alt="логотип" className="header__logo" id="start" />
      <a className="header__profile link" href="#">{linkText}</a>
    </header>
  )
}

export default Header
