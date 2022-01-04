// popup
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupCard = document.querySelector('.popup-card');

//button
const openEditBtn = document.querySelector('.profile__edit-btn');
const openAddBtn = document.querySelector('.profile__add-btn');
const closeEditBtn = document.querySelector('.popup-edit-close');
const closeAddBtn = document.querySelector('.popup-add-close');
const closeCardBtn = document.querySelector('.popup-card-close');

//text for input
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardImg = document.querySelector('.popup-card__image');
const cardCaption = document.querySelector('.popup-card__caption');

//text from input
const profileNameInput = document.querySelector('#profile-name');
const profileJobInput = document.querySelector('#profile-job');
const cardNameInput = document.querySelector('#card-name');
const cardLinkInput = document.querySelector('#card-link');

//templateCard
const templateCard = document.querySelector('#templateCard').content; 
const cards = document.querySelector('.cards__container');

//form
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

const initialValidation = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'form__input-type-error',
    errorClass: 'form__input-error_active'
}; 

doSomething = (e) => {
    if (e.key === 'Escape') { 
        closePopup(document.querySelector('.popup_opened'));
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', doSomething);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', doSomething);
}

function openEdit() {
    profileNameInput.value = profileName.textContent;
    profileJobInput.value = profileJob.textContent;
    openPopup(popupEdit);
    clearValidation(initialValidation);
}

function openAdd() {
    cardNameInput.value = '';
    cardLinkInput.value = '';
    openPopup(popupAdd);
    clearValidation(initialValidation);
}

function openCard() {
    openPopup(popupCard);
}

function handleEditFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = profileNameInput.value;
    profileJob.textContent = profileJobInput.value;
    closePopup(popupEdit);
}

function createCard(cardDate){    
    const cardElement = templateCard.querySelector('.card').cloneNode(true);
    const elementImg = cardElement.querySelector('.card__image');
    elementImg.src = cardDate[0];
    elementImg.alt = cardDate[1];
    cardElement.querySelector('.card__caption').textContent = cardDate[1];
    cardElement.querySelector('.card__delete-btn').addEventListener('click', function (evt) {
        evt.currentTarget.closest('.card').remove();
    }); 
    cardElement.querySelector('.card__like-btn').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-btn_active');
    }); 
    elementImg.addEventListener('click', function (evt) {
        cardImg.src = cardDate[0]
        cardImg.alt = cardDate[1]
        cardCaption.textContent = cardDate[1]
        openCard();
    });
    return cardElement;
}

function handleAddFormSubmit (evt) {
    evt.preventDefault(); 
    let cardDate = [cardLinkInput.value, cardNameInput.value];
    cards.prepend(createCard(cardDate));
    closePopup(popupAdd);
}

initialCards.forEach(item => {
    let cardDate = [item.link, item.name];
    cards.append(createCard(cardDate));
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

enableValidation(initialValidation);
