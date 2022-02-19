import { Popup } from './Popup.js';

export class PopupWithConfirm extends Popup {
    constructor( {popupSelector, handleSubmit} ) {
        super( {popupSelector} );
        this._handleSubmit = handleSubmit;
        //this._formSelector = formSelector;
        //this._formPopup = document.querySelector(formSelector)
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (evt) => {  
            evt.preventDefault();
            this._handleSubmit(this._element, this._cardId);
        });
    } 

    open(element, cardId) {
        super.open();
        this._element = element;
        this._cardId = cardId;
    }
}