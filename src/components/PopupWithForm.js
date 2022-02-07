import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor( {popupSelector, handleSubmit} ) {
        super( {popupSelector} );
        this._handleSubmit = handleSubmit;
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', this._handleSubmit);
    } 
}