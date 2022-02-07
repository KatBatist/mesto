export class FormValidator {
    constructor(validationConfig, form) {    
        this._validationConfig = validationConfig;
        this._form = document.querySelector(form);
    }

    _showInputError (inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`)
        inputElement.classList.add(this._validationConfig.inputErrorClass);
        errorElement.classList.add(this._validationConfig.errorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError (inputElement) {
        inputElement.classList.remove(this._validationConfig.inputErrorClass)
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`)
        if (errorElement != null) {
            errorElement.classList.remove(this._validationConfig.errorClass);
            errorElement.textContent = '';
        }
    }

    _isValid (inputElement) {
        if (!inputElement.validity.valid) { 
            this._showInputError(inputElement, inputElement.validationMessage);
        } 
        else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState (inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
            buttonElement.disabled = true
        } 
        else {
            buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    }

    _setEventListeners() {
        const inputList = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector));
        const buttonElement = this._form.querySelector(this._validationConfig.submitButtonSelector);
        inputList.forEach((inputElement) => {
            this._handleInput(inputElement, inputList, buttonElement);
        })
    }

    _handleInput(inputElement, inputList, buttonElement) {
        inputElement.addEventListener('input', () => {  
            this._isValid(inputElement)
            this._toggleButtonState(inputList, buttonElement);
        })
    }
    _handleSubmit() {
        this._form.addEventListener('submit', (evt) => {    
            evt.preventDefault();
        })
    }

    enableValidation() {     
        this._handleSubmit();
        this._setEventListeners();
    }

    clearValidation() {
        const inputList = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector));
        inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        })   
        const buttonElement = this._form.querySelector(this._validationConfig.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
    }
}

