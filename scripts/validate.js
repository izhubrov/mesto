
const showInputError = function(validationSettings) {
    console.log(validationSettings.fieldSelector);
  };






function enableValidation(validationSettings) {
  console.log(validationSettings.errorClass);
  showInputError(validationSettings);
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  fieldSelector: '.popup__field',
  submitButtonSelector: '.popup__btn-submit',
  inactiveButtonClass: 'popup__btn-submit_inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
});
