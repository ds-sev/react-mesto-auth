import logoPath from '../images/logo/logo.svg'
import burgerBtnIcon from '../images/buttons/burger.svg'
import closeBtnIcon from '../images/buttons/btn_close.svg'
import { useState } from 'react'

function Header({ btnLink, btnText, btnTheme, email, onClick, onBurgerBtnClick, isBurgerOpen, hideButton, hideProfileContainer, hideEmail }) {

  // const [menuBtnImage, setMenuBtnImage] = useState(null)
  // setMenuBtnImage(closeBtnIcon)

  const handleBtnClick = () => {
    onBurgerBtnClick()
  }


  return (
    <>
      <div className={`menu ${isBurgerOpen
        ? 'menu__open'
        : ''}`}>
        <div className="auth-container auth-container__open">
          <span className="header__email">{email}</span>
          <a className={`header__profile ${btnTheme} link`}
             onClick={onClick}
             href={btnLink}>{btnText}</a>
        </div>
      </div>



      <header className={`header header_position ${isBurgerOpen ? 'header_open-menu-position' : ''}`}>
        <img src={logoPath} alt="логотип" className="header__logo" id="start" />
        <button className={`header__burger-btn ${hideButton || ''} button`}
          // style={{backgroundImage: `url(${isBurgerOpen ? closeBtnIcon : burgerBtnIcon}}`}}
                style={{
                  backgroundImage: isBurgerOpen
                    ? `url(${closeBtnIcon})`
                    : `url(${burgerBtnIcon})`,
                }}
          // style={{backgroundImage: `url(${closeBtnIcon})`  }}
                onClick={handleBtnClick}
        />
        <div className={`auth-container ${hideProfileContainer}`}>
          <span className={`header__email ${hideEmail || ''}`}>{email}</span>
          <a className={`header__profile ${btnTheme} link`}
             onClick={onClick}
             href={btnLink}>{btnText}</a>
        </div>
      </header>
    </>
  )
}

export default Header
