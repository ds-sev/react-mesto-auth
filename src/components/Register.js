import Header from './Header'
import { useState } from 'react'

import InfoTooltip from './InfoTooltip'

function Register({onRegister}) {
  const buttonText = 'Зарегистрироваться'
  const title = 'Регистрация'

  const [regFormValue, setRegFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = (evt) => {
    const {name, value} = evt.target
    setRegFormValue({
      ...regFormValue, [name]: value
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    onRegister(regFormValue)

  }

  return (
    <>
    <Header btnText="Войти" btnLink="/signin"/>

      <div className="sign-page">
        <h3 className="sign-page__title">{title}</h3>
        <form onSubmit={handleSubmit}>
        <div className="sign-page__inputs-container">

          <label>
            <input
              name="email"
              type="email"
              value={regFormValue.email || ''}
              onChange={handleChange}
              className="sign-page__input-field"
              placeholder="Email"

              minLength="2"
              maxLength="30"
              required
            />
            {/*<span className="edit-form__field-error place-input-error">{errors.name}</span>*/}
          </label>
          <label>
            <input
              name="password"
              type="password"
              value={regFormValue.password || ''}
              onChange={handleChange}
              className="sign-page__input-field"
              placeholder="Пароль"

              minLength="6"
              maxLength="30"
              required
            />
            {/*<span className="edit-form__field-error link-input-error">{errors.link}</span>*/}
          </label>

        </div>
        <button
          className={`edit-form__button-save sign-button button `}
          type="submit"
          // onSubmit={handleSubmit}
          // onClick={onRegister}
        >
          {buttonText}
        </button>
        </form>
        <span className="sign__hint">Уже зарегистрированы?<a className="link"
                                                             href="/signin">Войти</a></span>
      </div>

      <InfoTooltip />

    </>

  )
}

export default Register