import Footer from './Footer'
import Header from './Header'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import auth from '../utils/auth'

function Register() {
  const buttonText = 'Зарегистрироваться'
  const title = 'Регистрация'

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleChange = (evt) => {
    const {name, value} = evt.target
    setFormValue({
      ...formValue, [name]: value
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    onRegister(formValue)
    console.log('hello')

  }

  function onRegister(formValue) {
    // setAddPlaceBtnText('Добавляем...')
    auth
      .register(formValue)
      .then((res) => {
        navigate('/signin', {replace: true})

      })
      .catch((err) => console.log(err))

  }




  // console.log(formValue)

  return (
    <>
    <Header linkText="Войти" link="/signin"/>

      <div className="sign-page">
        <h3 className="sign-page__title">{title}</h3>
        <form onSubmit={handleSubmit}>
        <div className="sign-page__inputs-container">

          <label>
            <input
              name="email"
              type="email"
              value={formValue.email || ''}
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
              value={formValue.password || ''}
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

    </>

  )
}

export default Register