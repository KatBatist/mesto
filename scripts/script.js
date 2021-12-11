// popup
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupCard = document.querySelector('.popup-card');

//open popup
const openPopupEdit = document.querySelector('.profile__edit-btn');
const openPopupAdd = document.querySelector('.profile__add-btn');

//close popup
const closePopupEdit = document.querySelector('.popup-edit-close');
const closePopupAdd = document.querySelector('.popup-add-close');
const closePopupCard = document.querySelector('.popup-card-close');

//text for popup
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
//const cardImgOld = document.querySelector('.card__image');
const cardImgPopup = document.querySelector('.popup-card__image');
const cardCaptionPopup = document.querySelector('.popup-card__caption');

//text from popup
const profileNamePopup = document.querySelector('input[id="profile-name"]');
const profileJobPopup = document.querySelector('input[id="profile-job"]');
const cardNamePopup = document.querySelector('input[id="card-name"]');
const cardLinkPopup = document.querySelector('input[id="card-link"]');

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

function openEdit() {
    profileNamePopup.value = profileName.textContent;
    profileJobPopup.value = profileJob.textContent;
    popupEdit.classList.add('popup_opened');    
}

function openAdd() {
    cardNamePopup.value = '';
    cardLinkPopup.value = '';
    popupAdd.classList.add('popup_opened');    
}

function openCard() {
    popupCard.classList.add('popup_opened');    
}

function closeEdit() {
     popupEdit.classList.remove('popup_opened');
}

function closeAdd() {
    popupAdd.classList.remove('popup_opened');
}

function closeCard() {
    popupCard.classList.remove('popup_opened');
}

function formEditSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = profileNamePopup.value;
    profileJob.textContent = profileJobPopup.value;
    closeEdit();
}

function formCardSubmitHandler (evt) {
    evt.preventDefault(); 
    closeCard();
}

function createCard(element, image, caption){
    element.querySelector('.card__image').src = image;
    element.querySelector('.card__caption').textContent = caption;
    element.querySelector('.card__delete-btn').addEventListener('click', function (evt) {
        evt.currentTarget.closest('.card').remove();
    }); 
    element.querySelector('.card__like-btn').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-btn_active');
    }); 
    element.querySelector('.card__image').addEventListener('click', function (evt) {
        cardImgPopup.src = evt.currentTarget.src;
        cardCaptionPopup.textContent = element.querySelector('.card__caption').textContent;
        openCard();
    });
}

function formAddSubmitHandler (evt) {
    evt.preventDefault(); 
    const userElement = templateCard.querySelector('.card').cloneNode(true);
    createCard(userElement, cardLinkPopup.value, cardNamePopup.value);
    cards.prepend(userElement); 
    closeAdd();
}

initialCards.forEach(item => {
    const userElement = templateCard.querySelector('.card').cloneNode(true);
    console.log(item.link, item.name)
    createCard(userElement, item.link, item.name);
    cards.append(userElement); 
});

openPopupEdit.addEventListener('click', openEdit);
openPopupAdd.addEventListener('click', openAdd);

closePopupEdit.addEventListener('click', closeEdit);
closePopupAdd.addEventListener('click', closeAdd);
closePopupCard.addEventListener('click', closeCard);

formEdit.addEventListener('submit', formEditSubmitHandler); 
formAdd.addEventListener('submit', formAddSubmitHandler);


