import { popupOpened, popupCloseBtn, popup } from '../utils/constants.js'
export class Popup {
    constructor( {popupSelector} ) {
        this._popupSelector = document.querySelector(popupSelector);
    }

    _handleEscClose = (e) => {
        if (e.key === 'Escape') { 
            this.close();
        }
    }

    open() {
        this._popupSelector.classList.add(popupOpened);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close(){    
        this._popupSelector.classList.remove(popupOpened);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._popupSelector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains(popup) || evt.target.classList.contains(popupCloseBtn)) {
                this.close();
            }
        });
    }
}
