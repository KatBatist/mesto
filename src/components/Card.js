export class Card {
    constructor( {cardSelector, cardItem, handleOpenClick, handleDeleteClick, handleLikeClick} ) {        
        this._cardSelector = cardSelector;
        this._cardItem = cardItem;
        this._handleOpenClick = handleOpenClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }

    _getTemplate() {    
        const element = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
        return element;
    }    

    _setEventListeners() {
        if (this._cardItem.isDeleteEnable) {
            this._element.querySelector('.card__delete-btn').addEventListener('click', () => {
                this._handleDeleteClick(this._element, this._cardItem._id);
            }); 
        }
        this._element.querySelector('.card__like-btn').addEventListener('click', () => {
            this._handleLikeClick(this._element, this._cardItem._id);
        }); 
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleOpenClick(this._cardItem);
        });
      }
      
    generateCard() {
        this._element = this._getTemplate();
        
        this._image = this._element.querySelector('.card__image');
        this._image.src = this._cardItem.link;
        this._image.alt = this._cardItem.name;

        this._element.querySelector('.card__caption').textContent = this._cardItem.name;
        this._element.querySelector('.card__like-count').textContent = this._cardItem.like;

        if (this._cardItem.isDeleteEnable) {
            this._element.querySelector('.card__delete-btn').classList.add('card__delete-btn_opened');
        }
        
        if (this._cardItem.isLike) {
            this._element.querySelector('.card__like-btn').classList.add('card__like-btn_active');
        }
        this._setEventListeners();
        
        return this._element;
    } 

}    