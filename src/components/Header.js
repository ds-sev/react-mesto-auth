import logoPath from '../images/logo/logo.svg'
import burgerBtnIcon from '../images/buttons/burger.svg'
import closeBtnIcon from '../images/buttons/btn_close.svg'

function Header({
                  btnLink,
                  btnText,
                  btnTheme,
                  email,
                  onClick,
                  onBurgerBtnClick,
                  isBurgerOpen,
                  hideButton,
                  hideProfileContainer,
                  hideEmail,
                }) {

  const handleBtnClick = () => onBurgerBtnClick()

  return (
    <>
      <div className={`header__menu ${isBurgerOpen
        ? 'header__menu_open'
        : ''}`}>
        <div className="header__auth-container header__auth-container_open">
          <span className="header__email">{email}</span>
          <a className={`header__button ${btnTheme} link`}
             onClick={onClick}
             href={btnLink}>{btnText}</a>
        </div>
      </div>
      <header className={`header header_position ${isBurgerOpen
        ? 'header_open-menu-position'
        : ''}`}>
        <img src={logoPath} alt="логотип" className="header__logo" id="start" />
        <button className={`header__burger-btn ${hideButton || ''} button`}
                onClick={handleBtnClick}
                style={{
                  backgroundImage: isBurgerOpen
                    ? `url(${closeBtnIcon})`
                    : `url(${burgerBtnIcon})`,
                }}
        />
        <div className={`header__auth-container ${hideProfileContainer}`}>
          <span className={`header__email ${hideEmail || ''}`}>{email}</span>
          <a className={`header__button ${btnTheme} link`}
             onClick={onClick}
             href={btnLink}>{btnText}</a>
        </div>
      </header>
    </>
  )
}

export default Header
