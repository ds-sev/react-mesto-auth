import Footer from './Footer'

function Register() {
  const buttonText = 'Зарегистрироваться'
  const title = 'Регистрация'
  return (

      <div className="sign-page">
        <h3 className="sign-page__title">{title}</h3>
        <div className="sign-page__inputs-container">
          <label>
            <input
              // value={values.name || ''}
              // onChange={onChange}
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
              // value={values.link || ''}
              // onChange={onChange}
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
        <span className="sign__hint">Уже зарегистрированы?<a className="link"
                                                             href="#">Войти</a></span>
      </div>



  )
}

export default Register