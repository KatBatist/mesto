const showInputError = (formElement, inputElement, errorMessage, initial) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add(initial.inputErrorClass);
    errorElement.classList.add(initial.errorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, initial) => {
    inputElement.classList.remove(initial.inputErrorClass)
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    if (errorElement != null) {
        errorElement.classList.remove(initial.errorClass);
        errorElement.textContent = '';
    }
};

const isValid = (formElement, inputElement, initial) => {
    if (!inputElement.validity.valid) { 
        showInputError(formElement, inputElement, inputElement.validationMessage, initial);
    } 
    else {
        hideInputError(formElement, inputElement, initial);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, initial) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(initial.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } 
    else {
        buttonElement.classList.remove(initial.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}; 

const setEventListeners = (formElement, initial) => {
    const inputList = Array.from(formElement.querySelectorAll(initial.inputSelector));
    const buttonElement = formElement.querySelector(initial.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, initial)
        toggleButtonState(inputList, buttonElement, initial);
        });
    });
};

const enableValidation = (initial) => {  
    const formList = Array.from(document.querySelectorAll(initial.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {    
            evt.preventDefault();
        });
        setEventListeners(formElement, initial);
    });
};

const clearValidation = (initial) => {
    const formList = Array.from(document.querySelectorAll(initial.formSelector));
    formList.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(initial.inputSelector));
        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement, initial)
        })   
        const buttonElement = formElement.querySelector(initial.submitButtonSelector);
        toggleButtonState(inputList, buttonElement, initial);
    })
}