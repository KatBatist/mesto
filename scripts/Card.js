//import { openPopup } from '../utils/utils.js'

export class Card {
    constructor(cardSelector, data, cardForm, handleOpenClick) {        
        this._cardSelector = cardSelector;
        this._data = data;
        this._cardForm = cardForm;
        this._handleOpenClick = handleOpenClick;
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
      
    generateCard() {
        this._element = this._getTemplate();
        
        this._image = this._element.querySelector('.card__image');
        this._image.src = this._data.link;
        this._image.alt = this._data.name;

        this._element.querySelector('.card__caption').textContent = this._data.name;
        this._setEventListeners();
        
        return this._element;
    } 

}    