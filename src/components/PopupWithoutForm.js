import Popup from './Popup'

function PopupWithoutForm({ title, name, isOpen, children, onClose, onSubmit }) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose} >
      <div className="popup__container">
        <form onSubmit={onSubmit} className="edit-form" method="post" name={`${name}`}>
          <button
            className="button_type_close button"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
          />

          <fieldset className="edit-form__fields">
            {children}
          </fieldset>
          <h3 className="edit-form__title">{title}</h3>
        </form>
      </div>
    </Popup>
  )
}

export default PopupWithoutForm