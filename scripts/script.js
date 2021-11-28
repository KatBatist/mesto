const popup = document.querySelector('.popup');
const formEdit = document.querySelector('.form-edit');

const openForm = document.querySelector('.openForm');
const closeBtn = document.querySelector('.closeForm');
const saveBtn = document.querySelector('.saveForm');

function open() {
    popup.classList.add('popup_opened');    
}
function close() {
     popup.classList.remove('popup_opened');
}

openForm.addEventListener('click', open);
closeBtn.addEventListener('click', close);

let inputName = document.querySelector('.profile__name');
let formInputName = document.querySelector('input[id="profile-name"]');
formInputName.value = inputName.textContent;

let inputJob = document.querySelector('.profile__job');
let formInputJob = document.querySelector('input[id="profile-job"]');
formInputJob.value = inputJob.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    formInputName = document.querySelector('input[id="profile-name"]');
    inputName = document.querySelector('.profile__name');
    inputName.textContent = formInputName.value;
    formInputJob = document.querySelector('input[id="profile-job"]');
    inputJob = document.querySelector('.profile__job');
    inputJob.textContent = formInputJob.value;
}

function save() {
    formEdit.addEventListener('submit', formSubmitHandler); 
    popup.classList.remove('popup_opened');
}

saveBtn.addEventListener('click', save);
