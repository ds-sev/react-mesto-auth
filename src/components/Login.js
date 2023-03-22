import Header from './Header'
import { useState } from 'react'

function Login({onLogin}) {
  const buttonText = 'Войти'
  const title = 'Вход'

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = (evt) => {
    const {name, value} = evt.target
    setFormValue({
      ...formValue, [name]: value
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    onLogin(formValue)
  }

  return (
    <>
      <Header btnText="Регистрация" btnLink="/signup" />
      <div className="sign-page">
        <h3 className="sign-page__title">{title}</h3>
        <form onSubmit={handleSubmit}>
          <div className="sign-page__inputs-container">
            <label>
              <input
                value={formValue.email || ''}
                onChange={handleChange}
                type="email"
                className="sign-page__input-field"
                placeholder="Email"
                name="email"
                minLength="2"
                maxLength="30"
                required
              />
              {/*<span className="edit-form__field-error place-input-error">{errors.name}</span>*/}
            </label>
            <label>
              <input
                value={formValue.password || ''}
                onChange={handleChange}
                type="password"
                className="sign-page__input-field"
                placeholder="Пароль"
                name="password"
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
          >
            {buttonText}
          </button>
        </form>
      </div>
    </>
  )
}

export default Login