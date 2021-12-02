const popup = document.querySelector('.popup');
const formEdit = document.querySelector('.form-edit');
const openForm = document.querySelector('.profile__edit-btn');
const closeBtn = document.querySelector('.popup__close-btn');
const inputName = document.querySelector('.profile__name');
const formInputName = document.querySelector('input[id="profile-name"]');
const inputJob = document.querySelector('.profile__job');
const formInputJob = document.querySelector('input[id="profile-job"]');

function open() {
    formInputName.value = inputName.textContent;
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
    inputName.textContent = formInputName.value;
    inputJob.textContent = formInputJob.value;
    close();
}

formEdit.addEventListener('submit', formSubmitHandler); 
