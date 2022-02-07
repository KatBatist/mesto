import { Popup } from './Popup.js';
import { FormValidator} from '../components/FormValidator.js'
import { formInput } from '../utils/constants.js'
export class PopupWithForm extends Popup {
    constructor( {popupSelector, formSelector, handleSubmit} ) {
        super( {popupSelector} );
        this._handleSubmit = handleSubmit;
        this._formSelector = formSelector;
        this._formPopup = document.querySelector(formSelector)
        this._formValidation = new FormValidator(formSelector); 
        this._formValidation.enableValidation();
    }
    
    _getInputValues() {
        const inputValues = {};
        const inputElements = Array.from(this._popupSelector.querySelectorAll(formInput))
        inputElements.forEach((inputElement) => {
            inputValues[inputElement.name] = inputElement.value;
        });
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (evt) => {  
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());
        });
    } 

    open() {
        super.open();
        this._formValidation.clearValidation();
    }

    close() {
        super.close();
        this._formPopup.reset();
    }
}