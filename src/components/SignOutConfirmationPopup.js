import PopupWithForm from './PopupWithForm'
import useValidation from '../hooks/useValidation'
import CardDeleteConfirmationPopup from './CardDeleteConfirmationPopup'

function SignOutConfirmationPopup({ isOpen, onClose, signOut }) {

  const { isFormValid } = useValidation()

  function handleSubmit(evt) {
    evt.preventDefault()
    signOut()
  }

  return (

    <PopupWithForm
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Да"
      onSubmit={handleSubmit}

      isValid={isFormValid}
    />



  )
}

export default SignOutConfirmationPopup