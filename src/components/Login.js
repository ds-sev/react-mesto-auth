import Header from './Header'
import auth from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login({handleLogin}) {
  const buttonText = 'Войти'
  const title = 'Вход'

  const navigate = useNavigate()

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

  console.log(formValue)

  function onLogin(formValue) {
    // setAddPlaceBtnText('Добавляем...')
    auth
      .login(formValue)
      .then((res) => {
        localStorage.setItem('token', res.token)
        handleLogin()
          navigate('/', { replace: true })
        console.log(localStorage.getItem('token'))
      })


      // .then((res) => {

      //   console.log(res)
      //   localStorage.setItem('token', JSON.stringify({res}))
      //   handleLogin()
      //   navigate('/', { replace: true })
      //
      // })
      .catch((err) => console.log(err))

  }

  console.log(localStorage.getItem('token'))




  // console.log(JSON.parse(localStorage.getItem('token')))

  return (
    <>
      <Header linkText="Регистрация" link="/signup" />
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
          {/*<span className="sign__hint">Уже зарегистрированы?<a className="link"*/}
          {/*                                                     href="#">Войти</a></span>*/}
        </form>
      </div>
    </>
  )
}

export default Login