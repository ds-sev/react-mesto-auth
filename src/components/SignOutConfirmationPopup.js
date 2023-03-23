import PopupWithForm from './PopupWithForm'

function SignOutConfirmationPopup({ isOpen, onClose, signOut, btnText }) {

  function handleSubmit(evt) {
    evt.preventDefault()
    signOut()
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={btnText}
      onSubmit={handleSubmit}
    />
  )
}

export default SignOutConfirmationPopup