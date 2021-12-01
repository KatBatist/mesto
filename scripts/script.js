const popup = document.querySelector('.popup');
const formEdit = document.querySelector('.form-edit');

const openForm = document.querySelector('.profile__edit-btn');
const closeBtn = document.querySelector('.popup__close-btn');

function open() {
    let inputName = document.querySelector('.profile__name');
    let formInputName = document.querySelector('input[id="profile-name"]');
    formInputName.value = inputName.textContent;

    let inputJob = document.querySelector('.profile__job');
    let formInputJob = document.querySelector('input[id="profile-job"]');
    formInputJob.value = inputJob.textContent;

    popup.classList.add('popup_opened');    
}

function close() {
     popup.classList.remove('popup_opened');
}

openForm.addEventListener('click', open);
closeBtn.addEventListener('click', close);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    formInputName = document.querySelector('input[id="profile-name"]');
    inputName = document.querySelector('.profile__name');
    inputName.textContent = formInputName.value;
    console.log(inputName.textContent);
    formInputJob = document.querySelector('input[id="profile-job"]');
    inputJob = document.querySelector('.profile__job');
    inputJob.textContent = formInputJob.value;
    console.log(inputJob.textContent);
    popup.classList.remove('popup_opened');
}

formEdit.addEventListener('submit', formSubmitHandler); 
