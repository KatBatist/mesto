import './index.css';
import { Card } from '../components/Card.js';
import { initialCards, formEditSelector, formAddSelector, cardSelector, popupEditSelector,
         popupAddSelector, popupCardSelector, cardImageSelector, cardCaptionSelector, form,
         profileName, profileJob, profileNameInput, profileJobInput, openEditBtn, openAddBtn, 
         cardsContainer} from '../utils/constants.js'
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const popupCard = new PopupWithImage({
    popupSelector: popupCardSelector, 
    cardImageSelector: cardImageSelector,
    cardCaptionSelector: cardCaptionSelector});

const userInfo = new UserInfo({
    profileNameSelector: profileName, 
    profileJobSelector: profileJob
});

function handleEditSubmit(inputValues) {
    userInfo.setUserInfo(inputValues.inputName, inputValues.inputJob)
    popupEdit.close();
}

const popupEdit = new PopupWithForm({
    popupSelector: popupEditSelector,
    formSelector: formEditSelector,
    handleSubmit: handleEditSubmit
});

function openEdit() {
    userInfo.getUserInfo();   
    profileNameInput.value = userInfo.name; 
    profileJobInput.value = userInfo.job;
    popupEdit.open();
}

const handleOpenClick = (cardItem) => {
    popupCard.open(cardItem)
}

function createCard(cardItem) { 
    const card = new Card({
        cardSelector: cardSelector, 
        cardItem: cardItem, 
        handleOpenClick: handleOpenClick});
    const cardElement = card.generateCard();
    return cardElement;
}

function handleAddSubmit(inputValues) {
    const cardItem = {name: inputValues.inputCardName, link: inputValues.inputCardLink}
    const cardElement = createCard(cardItem);
    cardsList.addBeginItem(cardElement);
    popupAdd.close();
}

const popupAdd = new PopupWithForm({
    popupSelector: popupAddSelector,
    formSelector: formAddSelector,
    handleSubmit: handleAddSubmit});

function openAdd() {
    form.reset();
    popupAdd.open();
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