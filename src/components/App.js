import '../index.css'
import { useState, useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import auth from '../utils/auth'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import ProtectedRouteElement from './ProtectedRoute'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import AddPlacePopup from './AddPlacePopup'
import EditAvatarPopup from './EditAvatarPopup'
import EditProfilePopup from './EditProfilePopup'
import CardDeleteConfirmationPopup from './CardDeleteConfirmationPopup'
import SignOutConfirmationPopup from './SignOutConfirmationPopup'
import InfoTooltipPopup from './InfoTooltip'
import Register from './Register'
import Login from './Login'
import SuccessIcon from '../images/icons/success.svg'
import FailIcon from '../images/icons/failure.svg'

function App() {
  /* STATES */
  //popups states
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false)
  const [isSignOutConfirmPopupOpen, setIsSignOutConfirmPopupOpen] = useState(false)
  const [isCardDeleteConfirmationPopupOpen, setIsCardDeleteConfirmationPopupOpen] = useState(false)
  //elements states
  const [currentUser, setCurrentUser] = useState({})
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' })
  const [cards, setCards] = useState([])
  const [cardToDelete, setCardToDelete] = useState({})
  const [deleteCardConfirmationBtnText, setDeleteCardConfirmationBtnText] = useState('Да')
  const [editProfileBtnText, setEditProfileBtnText] = useState('Сохранить')
  const [addPlaceBtnText, setAddPlaceBtnText] = useState('Добавить')
  //sign states
  const [loggedIn, setLoggedIn] = useState(false)
  const [infoTooltipText, setInfoTooltipText] = useState('')
  const [infoTooltipImage, setInfoTooltipImage] = useState(null)
  const [email, setEmail] = useState('')
  const [signOutBtnText, setSignOutBtnText] = useState('Да')

  const navigate = useNavigate()

  useEffect(() => {
    tokenCheck()
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData)
        setCards(cardsData)
      })
      .catch((err) => console.log(err))
  }, [])

  /* FUNCTIONS */
  const tokenCheck = () => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      if (token) {
        auth.checkToken(token).then((res) => {
          if (res) {
            setLoggedIn(true)
            navigate('/mesto', { replace: true })
            setEmail(res.data.email)
          }
        })
      }
    }
  }

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true)
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true)
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true)
  const handleCardClick = (card) => {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  }
  const handleCardDeleteConfirmationClick = (targetCard) => {
    setIsCardDeleteConfirmationPopupOpen(true)
    setCardToDelete(targetCard)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsCardDeleteConfirmationPopupOpen(false)
    setIsInfoTooltipPopupOpen(false)
    setIsSignOutConfirmPopupOpen(false)
    setSelectedCard({ name: '', link: '' })
    setEditProfileBtnText('Сохранить')
    setAddPlaceBtnText('Добавить')
    setDeleteCardConfirmationBtnText('Да')
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id)
    api
      .changeLikeCardStatus(card.id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) => (currentCard._id === card.id
            ? newCard
            : currentCard)),
        )
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(targetCard) {
    setDeleteCardConfirmationBtnText('Удаляем...')
    api
      .deleteCard(targetCard.id)
      .then(() => {
        setCards(cards.filter((card) => card._id !== targetCard.id))
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateUser(userData) {
    setEditProfileBtnText('Сохраняем...')
    api
      .setUserInfo(userData)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(data) {
    setEditProfileBtnText('Сохраняем...')
    api
      .setUserAvatar(data.link)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(newCardData) {
    setAddPlaceBtnText('Добавляем...')
    api
      .postNewCard(newCardData)
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleLogin(formValue) {
    auth
      .login(formValue)
      .then((res) => {
        localStorage.setItem('token', res.token)
        setLoggedIn(true)
        tokenCheck()
        navigate('/', { replace: true })
      })
      .catch((err) => console.log(err))
  }

  function handleRegister(regFormValue) {
    auth
      .register(regFormValue)
      .then(() => {
        setInfoTooltipImage(SuccessIcon)
        setInfoTooltipText('Вы успешно зарегистрировались!')
        setIsInfoTooltipPopupOpen(true)
        setTimeout(() => {
          setIsInfoTooltipPopupOpen(false)
        }, 3000)
        navigate('/signin', { replace: true })
      })
      .catch((err) => {
        setInfoTooltipImage(FailIcon)
        setInfoTooltipText('Что-то пошло не так! Попробуйте ещё раз.')
        setIsInfoTooltipPopupOpen(true)
        setTimeout(() => setIsInfoTooltipPopupOpen(false), 3000)
        console.log(err)
      })
  }

  function handleSignOut() {
    setSignOutBtnText('Выходим...')
    localStorage.removeItem('token')
    navigate('/signin', { replace: true })
    setIsBurgerOpen(false)
    closeAllPopups()
  }

  const handleSignOutConfirmation = () => {
    setSignOutBtnText('Да')
    setIsSignOutConfirmPopupOpen(true)
  }


  const [isBurgerOpen, setIsBurgerOpen] = useState(false)

  const handleBurgerViewToggle = (evt) => {

    setIsBurgerOpen(!isBurgerOpen)


  }



  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        {/*<div className={`page ${isBurgerOpen ? 'header__open' : ''}`}>*/}
        <div className="page">
          <Routes>
            <Route path="/"
                   element={loggedIn
                     ? <Navigate to="/mesto" replace />
                     : <Navigate to="/signup" replace />} />
            <Route path="/signup"
                   element={<Register
                     onRegister={handleRegister}
                     title="Регистрация"
                     btnText="Зарегистрироваться" />} />
            <Route path="/signin"
                   element={<Login
                     title="Вход"
                     onLogin={handleLogin}
                     btnText="Войти" />} />
            <Route path="/mesto" element={<ProtectedRouteElement
              element={Main}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onEditProfile={handleEditProfileClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDeleteConfirm={handleCardDeleteConfirmationClick}
              cards={cards}
              loggedIn={loggedIn}
              email={email}
              onSignOutConfirm={handleSignOutConfirmation}

              onBurgerBtnClick={handleBurgerViewToggle}
              isBurgerOpen={isBurgerOpen}
            />}
            />
          </Routes>
          <div className="push"></div>
          <Footer />
          <InfoTooltipPopup
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            image={infoTooltipImage}
            text={infoTooltipText}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            buttonText={editProfileBtnText}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            buttonText={addPlaceBtnText}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            buttonText={editProfileBtnText}
          />
          <CardDeleteConfirmationPopup
            isOpen={isCardDeleteConfirmationPopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            onCardDeleteComfirmSubmit={handleCardDeleteConfirmationClick}
            cardToDelete={cardToDelete}
            buttonText={deleteCardConfirmationBtnText}
            signOut={handleSignOut}
          />
          <SignOutConfirmationPopup
            isOpen={isSignOutConfirmPopupOpen}
            onClose={closeAllPopups}
            signOut={handleSignOut}
            btnText={signOutBtnText}
          />
          <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
