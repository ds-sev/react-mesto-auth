import logoPath from '../images/logo/logo.svg'

function Header({ btnLink, btnText, btnTheme, email, onClick }) {


  // function signoutConfirm() {
  //   card.onCardDeteteConfirm()
  // }


  return (
    <header className="header header_position">
      <img src={logoPath} alt="логотип" className="header__logo" id="start" />
      <div className="auth-container">
        <span className="header__email">{email}</span>
        {/*<a className={`header__profile ${btnTheme} link`} onClick={onSignOutConfirm} href={btnLink}>{btnText}</a>*/}
        <a className={`header__profile ${btnTheme} link`} onClick={onClick} href={btnLink}>{btnText}</a>
      </div>
    </header>
  )
}

export default Header
