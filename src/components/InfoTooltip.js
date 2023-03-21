import PopupWithoutForm from './PopupWithoutForm'

function InfoTooltipPopup({isOpen, onClose}) {
  return (
    <PopupWithoutForm
      title="Вы уверены?"

      isOpen={isOpen}
      onClose={onClose}
    />



  )
}

export default InfoTooltipPopup