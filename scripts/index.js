import { Card } from './Card.js';
import { FormValidator}  from './FormValidator.js'

const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupCard = document.querySelector('.popup-card');

const openEditBtn = document.querySelector('.profile__edit-btn');
const openAddBtn = document.querySelector('.profile__add-btn');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const profileNameInput = document.querySelector('#profile-name');
const profileJobInput = document.querySelector('#profile-job');
const cardNameInput = document.querySelector('#card-name');
const cardLinkInput = document.querySelector('#card-link');

const cards = document.querySelector('.cards__container');

const formEdit = document.querySelector('.form-edit');
const formAdd = document.querySelector('.form-add');

const initialCards = [
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

const initialFormValidator = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'form__input-type-error',
    errorClass: 'form__input-error_active'
}; 

const handleClosePopup = (e) => {
    if (e.key === 'Escape') { 
        closePopup(document.querySelector('.popup_opened'));
    }
}

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleClosePopup);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleClosePopup);
}

function openEdit() {
    profileNameInput.value = profileName.textContent;
    profileJobInput.value = profileJob.textContent;
    openPopup(popupEdit);
    const form = new FormValidator(initialFormValidator, formEdit); 
    form.enableValidation();
}

function openAdd() {
    cardNameInput.value = '';
    cardLinkInput.value = '';
    openPopup(popupAdd);
    const form = new FormValidator(initialFormValidator, formAdd); 
    form.enableValidation();
}

function handleEditFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = profileNameInput.value;
    profileJob.textContent = profileJobInput.value;
    closePopup(popupEdit);
}

function createCard(cardData){    
    const card = new Card('#templateCard', cardData, popupCard); 
    const cardElement = card.generateCard();
    
    return cardElement;
}

function handleAddFormSubmit (evt) {
    evt.preventDefault(); 
    const cardData = {name: cardNameInput.value, link: cardLinkInput.value}
    cards.prepend(createCard(cardData));
    closePopup(popupAdd);
}

initialCards.forEach(item => {
    cards.append(createCard(item));
});

openEditBtn.addEventListener('click', openEdit);
openAddBtn.addEventListener('click', openAdd);

popupEdit.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        closePopup(popupEdit);
    }
}); 

popupAdd.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        closePopup(popupAdd);
    }
}); 

popupCard.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        closePopup(popupCard);
    }
}); 

formEdit.addEventListener('submit', handleEditFormSubmit); 
formAdd.addEventListener('submit', handleAddFormSubmit);
