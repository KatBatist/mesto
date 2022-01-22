import { openPopup } from './index.js';

export class Card {
    constructor(cardSelector, data, form) {    
        this._cardSelector = cardSelector;
        this._data = data;
        this._form = form;
    }

    _getTemplate() {    
        const element = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
        return element;
    }    

    _setEventListeners() {
        this._element.querySelector('.card__delete-btn').addEventListener('click', () => {
            this._handleDeleteClick();
        }); 
        this._element.querySelector('.card__like-btn').addEventListener('click', () => {
            this._handleLikeClick();
        }); 
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleOpenClick();
        });
      }

    _handleDeleteClick() {
        this._element.querySelector('.card__delete-btn').closest('.card').remove();
    }

    _handleLikeClick() {
        this._element.querySelector('.card__like-btn').classList.toggle('card__like-btn_active');
    }
    
    _handleOpenClick() {
        document.querySelector('.popup-card__image').src = this._data.link;
        document.querySelector('.popup-card__image').alt = this._data.name;
        document.querySelector('.popup-card__caption').textContent = this._data.name;
        openPopup(this._form);
    }
      
    generateCard() {
        this._element = this._getTemplate();
        
        this._element.querySelector('.card__image').src = this._data.link;
        this._element.querySelector('.card__image').alt = this._data.name;

        this._element.querySelector('.card__caption').textContent = this._data.name;
        this._setEventListeners();
        
        return this._element;
    } 

}    