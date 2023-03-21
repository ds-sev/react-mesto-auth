import logoPath from '../images/logo/logo.svg'

function Header({link, linkText}) {

  return (
    <header className="header header_position">
      <img src={logoPath} alt="логотип" className="header__logo" id="start" />
      <a className="header__profile link" href={link}>{linkText}</a>
    </header>
  )
}

export default Header
