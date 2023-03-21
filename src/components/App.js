import { useState, useEffect } from 'react'
import '../index.css'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import AddPlacePopup from './AddPlacePopup'
import EditAvatarPopup from './EditAvatarPopup'
import api from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import CardDeleteConfirmationPopup from './CardDeleteConfirmationPopup'
import ProtectedRouteElement from './ProtectedRoute'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Register from './Register'
import InfoTooltipPopup from './InfoTooltip'
import Login from './Login'
import auth from '../utils/auth'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' })
  const [cards, setCards] = useState([])
  const [isCardDeleteConfirmationPopupOpen, setIsCardDeleteConfirmationPopupOpen] = useState(false)
  const [cardToDelete, setCardToDelete] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)

  const [deleteCardConfirmationBtnText, setDeleteCardConfirmationBtnText] = useState('Да')
  const [editProfileBtnText, setEditProfileBtnText] = useState('Сохранить')
  const [addPlaceBtnText, setAddPlaceBtnText] = useState('Добавить')

  const navigate = useNavigate()



  const tokenCheck = () => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      console.log(token)
      if (token) {
        auth.checkToken(token).then((res) => {
          if (res) {
            setLoggedIn(true)
            navigate('/mesto', {replace: true})
          }
        })
      }

    }
  }

  console.log(loggedIn)



  useEffect(() => {
   tokenCheck()
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData)
        setCards(cardsData)
      })
      .catch((err) => console.log(err))
  }, [])

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

  const handleLogin = () => {

    setLoggedIn(true)
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          {/*<ProtectedRouteElement*/}
          {/*path={}*/}
          {/*loggedIn={}*/}
          {/*component={}*/}
          {/*/>*/}
          {/*<Header*/}
          {/*  linkText={headerLinkText}/>*/}
          <Routes>
            {/*<ProtectedRouteElement*/}
            {/*  path="/mesto"*/}
            {/*  loggedIn={loggedIn}*/}
            {/*  component={Main}*/}
            {/*  />*/}
            <Route path="/"
                   element={loggedIn
                     ? <Navigate to="/mesto" replace />
                     : <Navigate to="/signup" replace />} />
            <Route path="/signup" element={<Register
            />} />
            <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
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
            />}
            />
          </Routes>
          {/*<Register />*/}
          <div className="push"></div>
          {/*<Main*/}
          {/*  onEditAvatar={handleEditAvatarClick}*/}
          {/*  onAddPlace={handleAddPlaceClick}*/}
          {/*  onEditProfile={handleEditProfileClick}*/}
          {/*  onCardClick={handleCardClick}*/}
          {/*  onCardLike={handleCardLike}*/}
          {/*  onCardDeleteConfirm={handleCardDeleteConfirmationClick}*/}
          {/*  cards={cards}*/}
          {/*/>*/}
          <Footer />
          <InfoTooltipPopup
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            // onUpdateUser={handleUpdateUser}
            // buttonText={editProfileBtnText}
          />
          {/*<EditProfilePopup*/}
          {/*  isOpen={isEditProfilePopupOpen}*/}
          {/*  onClose={closeAllPopups}*/}
          {/*  onUpdateUser={handleUpdateUser}*/}
          {/*  buttonText={editProfileBtnText}*/}
          {/*/>*/}
          {/*<AddPlacePopup*/}
          {/*  isOpen={isAddPlacePopupOpen}*/}
          {/*  onClose={closeAllPopups}*/}
          {/*  onAddPlace={handleAddPlaceSubmit}*/}
          {/*  buttonText={addPlaceBtnText}*/}
          {/*/>*/}
          {/*<EditAvatarPopup*/}
          {/*  isOpen={isEditAvatarPopupOpen}*/}
          {/*  onClose={closeAllPopups}*/}
          {/*  onUpdateAvatar={handleUpdateAvatar}*/}
          {/*  buttonText={editProfileBtnText}*/}
          {/*/>*/}
          {/*<CardDeleteConfirmationPopup*/}
          {/*  isOpen={isCardDeleteConfirmationPopupOpen}*/}
          {/*  onClose={closeAllPopups}*/}
          {/*  onCardDelete={handleCardDelete}*/}
          {/*  onCardDeleteComfirmSubmit={handleCardDeleteConfirmationClick}*/}
          {/*  cardToDelete={cardToDelete}*/}
          {/*  buttonText={deleteCardConfirmationBtnText}*/}
          {/*/>*/}
          {/*<ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />*/}
        </div>
      </div>
    </CurrentUserContext.Provider>

  )
}

export default App
