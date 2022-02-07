import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor( {popupSelector, cardImageSelector, cardCaptionSelector} ) {
        super( {popupSelector} );
        this._cardImageSelector = document.querySelector(cardImageSelector);
        this._cardCaptionSelector = document.querySelector(cardCaptionSelector);
    }

    open(cardItem) {
        this._cardImageSelector.src = cardItem.link;
        this._cardImageSelector.alt = cardItem.name;
        this._cardCaptionSelector.textContent = cardItem.name;
        super.open();
    }
}