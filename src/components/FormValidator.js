import { validationConfig} from '../utils/constants.js'
export class FormValidator {
    constructor(form) { 
        this._form = document.querySelector(form);
    }

    _showInputError (inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`)
        inputElement.classList.add(validationConfig.inputErrorClass);
        errorElement.classList.add(validationConfig.errorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError (inputElement) {
        inputElement.classList.remove(validationConfig.inputErrorClass)
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`)
        if (errorElement != null) {
            errorElement.classList.remove(validationConfig.errorClass);
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

    _hasInvalidInput () {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState () {
        if (this._hasInvalidInput()) {
            this._submitButton.classList.add(validationConfig.inactiveButtonClass);
            this._submitButton.disabled = true
        } 
        else {
            this._submitButton.classList.remove(validationConfig.inactiveButtonClass);
            this._submitButton.removeAttribute('disabled');
        }
    }

    _setEventListeners() {
        this._inputList = Array.from(this._form.querySelectorAll(validationConfig.inputSelector));
        this._submitButton = this._form.querySelector(validationConfig.submitButtonSelector);
        this._inputList.forEach((inputElement) => {    
            this._handleInput(inputElement);
        })
    }

    _handleInput(inputElement) {
        inputElement.addEventListener('input', () => {  
            this._isValid(inputElement)
            this._toggleButtonState();
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
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        })   
        this._toggleButtonState();
    }
}

