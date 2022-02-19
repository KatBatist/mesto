export const popup = 'popup';
export const popupOpened = 'popup_opened';
export const popupCloseBtn = 'popup__close-btn';
export const deleteBtnOpened = 'delete-btn_opened';

export const formAvatarEditSelector = '.form-avatar-edit';
export const formEditSelector = '.form-edit';
export const formAddSelector = '.form-add';
export const formDeleteSelector = '.form-delete';

export const formInput = '.form__input';

export const cardSelector = '#templateCard';

export const popupAvatarEditSelector = '.popup-avatar-edit';
export const popupEditSelector = '.popup-edit';
export const popupAddSelector = '.popup-add';
export const popupCardSelector = '.popup-card';
export const popupDeleteSelector = '.popup-delete';

export const cardImageSelector = '.popup-card__image';
export const cardCaptionSelector= '.popup-card__caption';

export const form = document.querySelector(formAddSelector);

export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const profileAvatar = document.querySelector('.profile__avatar');

export const profileNameInput = document.querySelector('#profile-name');
export const profileJobInput = document.querySelector('#profile-job');
export const profileAvatarInput = document.querySelector('#profile-avatar-edit');

export const openEditBtn = document.querySelector('.profile__edit-btn');
export const openAddBtn = document.querySelector('.profile__add-btn');
export const openAvatarEditBtn = document.querySelector('.profile__avatar-btn');

export const cardsContainer = '.cards__container';
export const cards = document.querySelector('.cards__container');

export const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'form__input-type-error',
    errorClass: 'form__input-error_active'
}; 