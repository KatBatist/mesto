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
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
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

function handleDeleteSubmit(element, cardId) {
    api.setDeleteCard(cardId)
    .then((result) => {
        element.remove();
        element = null;
        popupDelete.close();
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {});
}
const popupDelete = new PopupWithConfirm({
    popupSelector: popupDeleteSelector,
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
        })
        .finally(() => {});   
    }
    else {
        api.setLike(cardId, false)
        .then((result) => {
            element.querySelector('.card__like-count').textContent = result.likes.length;
            element.querySelector('.card__like-btn').classList.toggle('card__like-btn_active');
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {});  
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    const _idUser = userData._id;

    cards.forEach((res) => {
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
    })
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
})
.finally(() => {}); 

function handleAvatarEditSubmit(inputValues, evt) {
    evt.submitter.textContent = "Сохранить...";
    api.setAvatar(inputValues.inputAvatar)
    .then((result) => {
        userInfo.setAvatar(result.avatar);
        popupAvatarEdit.close();
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        evt.submitter.textContent = "Сохранить";
    });
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
        userInfo.setUserInfo(result.name, result.about);
        popupEdit.close();
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        evt.submitter.textContent = "Сохранить";
    });
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
        popupAdd.close();
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        evt.submitter.textContent = "Создать";
    });
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