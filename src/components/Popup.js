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
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close()
    {    
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._popupSelector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
                this.close();
            }
        });
    }
}
