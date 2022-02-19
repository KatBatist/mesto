import './index.css';
import { Card } from '../components/Card.js';
import { formAvatarEditSelector, formEditSelector, formAddSelector, formDeleteSelector,  
    popupAvatarEditSelector, popupEditSelector, popupAddSelector, popupCardSelector, popupDeleteSelector, 
    cardImageSelector, cardCaptionSelector, form,
    profileName, profileJob, profileAvatar, 
    profileNameInput, profileJobInput, profileAvatarInput,
    openAvatarEditBtn, openEditBtn, openAddBtn,  
    cardSelector, cardsContainer} from '../utils/constants.js'
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator} from '../components/FormValidator.js'
import { Api } from '../components/Api.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36/',
    headers: {
      authorization: 'cf727bdb-2020-41f6-a216-3739201168c5',
      'Content-Type': 'application/json'
    }
}); 

let _idUser = 0;

api.getUserInfo()
.then((result) => {
    profileName.textContent = result.name;
    profileJob.textContent = result.about;
    profileAvatar.src = result.avatar;
    _idUser = result._id;
})

const userInfo = new UserInfo({
    profileNameSelector: profileName, 
    profileJobSelector: profileJob,
    profileAvatarSelector: profileAvatar
});

const popupCard = new PopupWithImage({
    popupSelector: popupCardSelector, 
    cardImageSelector: cardImageSelector,
    cardCaptionSelector: cardCaptionSelector
});

function handleDeleteSubmit(inputValues) {
    api.setDeleteCard(inputValues.cardId)
    .then((result) => {
        inputValues.element.remove();
        inputValues.element = null;
    })
    .catch((err) => {
        console.log(err);
    });
    popupDelete.close();
}
const popupDelete = new PopupWithForm({
    popupSelector: popupDeleteSelector,
    formSelector: formDeleteSelector,
    handleSubmit: handleDeleteSubmit
});

const handleOpenClick = (cardItem) => {
    popupCard.open(cardItem)
}
const handleDeleteClick = (element, cardId) => {
    popupDelete.open(element, cardId);
}
const handleLikeClick = (element, cardId) => {
    if(!element.querySelector('.card__like-btn_active')) {
        api.setLike(cardId, true)
        .then((result) => {
            element.querySelector('.card__like-count').textContent = result.likes.length;
            element.querySelector('.card__like-btn').classList.toggle('card__like-btn_active');
        })
        .catch((err) => {
            console.log(err);
        });  
    }
    else {
        api.setLike(cardId, false)
        .then((result) => {
            element.querySelector('.card__like-count').textContent = result.likes.length;
            element.querySelector('.card__like-btn').classList.toggle('card__like-btn_active');
        })
        .catch((err) => {
            console.log(err);
        }); 
    }
}
function createCard(cardItem) { 
    const card = new Card({
        cardSelector: cardSelector, 
        cardItem: cardItem, 
        handleOpenClick: handleOpenClick,
        handleDeleteClick: handleDeleteClick,
        handleLikeClick: handleLikeClick
    });
    const cardElement = card.generateCard();
    return cardElement;
}

let initialCards = [];
let cardsList;
api.getInitialCards()
.then((result) => {
    result.forEach((res) => {
        const isDeleteEnable = res.owner._id === _idUser;
        const isLike = res.likes.find(item => item._id == _idUser) != undefined;
        initialCards.push({
            name: res.name,
            link: res.link,
            like: res.likes.length,
            isDeleteEnable: isDeleteEnable,
            isLike: isLike,
            _id: res._id    
        });
    });
    cardsList = new Section({
        items: initialCards,
        renderer: (cardItem) => { 
            const cardElement = createCard(cardItem);
            cardsList.addItem(cardElement);
        }
    }, cardsContainer);
    cardsList.renderItems();
})
.catch((err) => {
    console.log(err);
});

function handleAvatarEditSubmit(inputValues, evt) {
    evt.submitter.textContent = "Сохранить...";
    api.setAvatar(inputValues.inputAvatar)
    .then((result) => {
        userInfo.setAvatar(result.avatar);
    })
    .catch((err) => {
        console.log(err);
    });
    evt.submitter.textContent = "Сохранить";
    popupAvatarEdit.close();
}
const popupAvatarEdit = new PopupWithForm({
    popupSelector: popupAvatarEditSelector,
    formSelector: formAvatarEditSelector,
    handleSubmit: handleAvatarEditSubmit
});

function handleEditSubmit(inputValues, evt) {
    evt.submitter.textContent = "Сохранить...";
    api.setProfileInfo(inputValues.inputName, inputValues.inputJob)
    .then((result) => {
        console.log(result)
        userInfo.setUserInfo(result.name, result.about);
    })
    .catch((err) => {
        console.log(err);
    });
    evt.submitter.textContent = "Сохранить";
    popupEdit.close();
}
const popupEdit = new PopupWithForm({
    popupSelector: popupEditSelector,
    formSelector: formEditSelector,
    handleSubmit: handleEditSubmit
});

function handleAddSubmit(inputValues, evt) {
    evt.submitter.textContent = "Создать...";
    api.setAddCard(inputValues.inputCardName, inputValues.inputCardLink)
    .then((result) => {
        const cardItem = {
            name: result.name, 
            link: result.link, 
            like: result.likes.length,
            isDeleteEnable: true,
            isLike: false,
            _id: result._id  
        } 
        const cardElement = createCard(cardItem);
        cardsList.addBeginItem(cardElement);
    })
    .catch((err) => {
        console.log(err);
    });
    evt.submitter.textContent = "Создать";
    popupAdd.close();
}
const popupAdd = new PopupWithForm({
    popupSelector: popupAddSelector,
    formSelector: formAddSelector,
    handleSubmit: handleAddSubmit
});

function openAvatarEdit() {
    userInfo.getUserInfo();   
    profileAvatarInput.value = userInfo.avatar; 
    popupAvatarEdit.open();
    formAvatarEditValidation.clearValidation();
}
function openEdit() {
    userInfo.getUserInfo();   
    profileNameInput.value = userInfo.name; 
    profileJobInput.value = userInfo.job;
    popupEdit.open();
    formEditValidation.clearValidation();
}
function openAdd() {
    form.reset();
    popupAdd.open();
    formAddValidation.clearValidation();
}
openAvatarEditBtn.addEventListener('click', openAvatarEdit);
openEditBtn.addEventListener('click', openEdit);
openAddBtn.addEventListener('click', openAdd);

popupAvatarEdit.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupCard.setEventListeners();
popupDelete.setEventListeners();

const formAvatarEditValidation = new FormValidator(formAvatarEditSelector);  
formAvatarEditValidation.enableValidation();
const formEditValidation = new FormValidator(formEditSelector);  
formEditValidation.enableValidation();
const formAddValidation = new FormValidator(formAddSelector);
formAddValidation.enableValidation();