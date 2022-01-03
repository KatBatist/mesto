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
const profileNameInput = document.querySelector('input[id="profile-name"]');
const profileJobInput = document.querySelector('input[id="profile-job"]');
const cardNameInput = document.querySelector('input[id="card-name"]');
const cardLinkInput = document.querySelector('input[id="card-link"]');

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

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openEdit() {
    profileNameInput.value = profileName.textContent;
    profileJobInput.value = profileJob.textContent;
    openPopup(popupEdit);
    clearValidation();
}

function openAdd() {
    cardNameInput.value = '';
    cardLinkInput.value = '';
    openPopup(popupAdd);
    clearValidation();
}

function openCard() {
    openPopup(popupCard);
}

function closeEdit() {
    closePopup(popupEdit);
}

function closeAdd() {
    closePopup(popupAdd);
}

function closeCard() {
    closePopup(popupCard);
}

function handleEditFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = profileNameInput.value;
    profileJob.textContent = profileJobInput.value;
    closeEdit();
}

function createCard(image, caption){
    const cardElement = templateCard.querySelector('.card').cloneNode(true);
    const elementImg = cardElement.querySelector('.card__image');
    elementImg.src = image;
    elementImg.alt = caption;
    cardElement.querySelector('.card__caption').textContent = caption;
    cardElement.querySelector('.card__delete-btn').addEventListener('click', function (evt) {
        evt.currentTarget.closest('.card').remove();
    }); 
    cardElement.querySelector('.card__like-btn').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-btn_active');
    }); 
    elementImg.addEventListener('click', function (evt) {
        cardImg.src = image
        cardImg.alt = caption
        cardCaption.textContent = caption
        openCard();
    });
    return cardElement;
}

function handleAddFormSubmit (evt) {
    evt.preventDefault(); 
    cards.prepend(createCard(cardLinkInput.value, cardNameInput.value)); 
    closeAdd();
}

initialCards.forEach(item => {
    cards.append(createCard(item.link, item.name)); 
});

openEditBtn.addEventListener('click', openEdit);
openAddBtn.addEventListener('click', openAdd);
closeEditBtn.addEventListener('click', closeEdit);
closeAddBtn.addEventListener('click', closeAdd);
closeCardBtn.addEventListener('click', closeCard);

formEdit.addEventListener('submit', handleEditFormSubmit); 
formAdd.addEventListener('submit', handleAddFormSubmit);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeEdit();
        closeAdd();
        closeCard();
    }
});

document.addEventListener('click', function(e) {
    if (e.target == popupEdit) {
        closeEdit();
    }
    if (e.target == popupAdd) {
        closeAdd();
    }
    if (e.target == popupCard) {
        closeCard();
    }
  })

  enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'form__input-type-error',
    errorClass: 'form__input-error_active'
}); 
