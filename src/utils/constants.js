export const popup = 'popup';
export const popupOpened = 'popup_opened';
export const popupCloseBtn = 'popup__close-btn';

export const formEditSelector = '.form-edit';
export const formAddSelector = '.form-add';
export const formInput = '.form__input';

export const cardSelector = '#templateCard';

export const popupEditSelector = '.popup-edit';
export const popupAddSelector = '.popup-add';
export const popupCardSelector = '.popup-card';

export const cardImageSelector = '.popup-card__image';
export const cardCaptionSelector= '.popup-card__caption';

export const form = document.querySelector(formAddSelector);

export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');

export const profileNameInput = document.querySelector('#profile-name');
export const profileJobInput = document.querySelector('#profile-job');

export const openEditBtn = document.querySelector('.profile__edit-btn');
export const openAddBtn = document.querySelector('.profile__add-btn');

export const cardsContainer = '.cards__container';

export const cards = document.querySelector('.cards__container');

export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'    
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'    
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'    
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'    
    }
]

export const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'form__input-type-error',
    errorClass: 'form__input-error_active'
}; 