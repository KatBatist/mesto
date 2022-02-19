import { Popup } from './Popup.js';
import { formInput } from '../utils/constants.js'
export class PopupWithForm extends Popup {
    constructor( {popupSelector, formSelector, handleSubmit} ) {
        super( {popupSelector} );
        this._handleSubmit = handleSubmit;
        this._formSelector = formSelector;
        this._formPopup = document.querySelector(formSelector)
    }
    
    _getInputValues() {
        const inputValues = {};
        const inputElements = Array.from(this._popupSelector.querySelectorAll(formInput))
        inputElements.forEach((inputElement) => {
            inputValues[inputElement.name] = inputElement.value;
        });
        inputValues['element'] = this._element;
        inputValues['cardId'] = this._cardId;
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (evt) => {  
            evt.preventDefault();
            this._handleSubmit(this._getInputValues(), evt);
        });
    } 

    close() {
        super.close();
        this._formPopup.reset();
    }

    open(element, cardId) {
        super.open();
        this._element = element;
        this._cardId = cardId;
    }
}