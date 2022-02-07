import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator} from '../components/FormValidator.js'
import { initialCards } from '../components/initialCards.js'
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const cardSelector = '#templateCard';
const popupEditSelector = '.popup-edit';
const popupAddSelector = '.popup-add';
const popupCardSelector = '.popup-card';

const cardImageSelector = '.popup-card__image';
const cardCaptionSelector= '.popup-card__caption';

const formEditSelector = '.form-edit';
const formAddSelector = '.form-add';

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const profileNameInput = document.querySelector('#profile-name');
const profileJobInput = document.querySelector('#profile-job');

const openEditBtn = document.querySelector('.profile__edit-btn');
const openAddBtn = document.querySelector('.profile__add-btn');

const cardNameInput = document.querySelector('#card-name');
const cardLinkInput = document.querySelector('#card-link');

const cardsContainer = '.cards__container';

const initialFormValidator = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'form__input-type-error',
    errorClass: 'form__input-error_active'
}; 

const popupEdit = new Popup({popupSelector: popupEditSelector});
const popupAdd = new Popup({popupSelector: popupAddSelector});
const popupCard = new PopupWithImage({
    popupSelector: popupCardSelector, 
    cardImageSelector: cardImageSelector,
    cardCaptionSelector: cardCaptionSelector});

const userInfo = new UserInfo({
    profileNameSelector: profileName, 
    profileJobSelector: profileJob});

const formEdit = new PopupWithForm({
    popupSelector: formEditSelector,
    handleSubmit: (evt) => { 
        evt.preventDefault(); 
        userInfo.setUserInfo(profileNameInput.value, profileJobInput.value)
        popupEdit.close();
    }
});

const formAdd = new PopupWithForm({
    popupSelector: formAddSelector,
    handleSubmit: (evt) => { 
        evt.preventDefault(); 
        const cardsList = new Section({
            items: {name: cardNameInput.value, link: cardLinkInput.value},
            renderer: (cardItem) => { 
                const cardElement = createCard(cardItem);
                cardsList.addBeginItem(cardElement);
            }
          },
          cardsContainer
        );
        cardsList.renderItem();
        popupAdd.close();
    }
});

function openEdit() {
    userInfo.getUserInfo();    
    profileNameInput.value = userInfo.name; 
    profileJobInput.value = userInfo.job;
    popupEdit.open();
    formEditValidation.clearValidation();
}

function openAdd() {
    document.querySelector(formAddSelector).reset();
    popupAdd.open();
    formAddValidation.clearValidation();
}

function createCard(cardItem) { 
    const handleOpenClick = () => {
        popupCard.open(cardItem)
    }
    const card = new Card({
        cardSelector: cardSelector, 
        cardItem: cardItem, 
        handleOpenClick: handleOpenClick});
    const cardElement = card.generateCard();
    return cardElement;
}

const cardsList = new Section({
    items: initialCards,
    renderer: (cardItem) => { 
        const cardElement = createCard(cardItem);
        cardsList.addItem(cardElement);
    }
  },
  cardsContainer
);
cardsList.renderItems();

openEditBtn.addEventListener('click', openEdit);
openAddBtn.addEventListener('click', openAdd);

popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupCard.setEventListeners();

formEdit.setEventListeners();
formAdd.setEventListeners();

const formEditValidation = new FormValidator(initialFormValidator, formEditSelector); 
formEditValidation.enableValidation();
const formAddValidation = new FormValidator(initialFormValidator, formAddSelector);
formAddValidation.enableValidation();
