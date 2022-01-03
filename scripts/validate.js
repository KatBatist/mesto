let custome;

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add(custome.inputErrorClass);
    errorElement.classList.add(custome.errorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
    inputElement.classList.remove(custome.inputErrorClass)
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    if (errorElement != null) {
        errorElement.classList.remove(custome.errorClass);
        errorElement.textContent = '';
    }
};

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) { 
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } 
    else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(custome.inactiveButtonClass);
    } 
    else {
        buttonElement.classList.remove(custome.inactiveButtonClass);
    }
}; 

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(custome.inputSelector));
    const buttonElement = formElement.querySelector(custome.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement)
        toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = (customisation) => {  
    custome = customisation;
    const formList = Array.from(document.querySelectorAll(custome.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {    
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

const clearValidation = () => {
    const formList = Array.from(document.querySelectorAll(custome.formSelector));
    formList.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(custome.inputSelector));
        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement)
        })   
        const buttonElement = formElement.querySelector(custome.submitButtonSelector);
        toggleButtonState(inputList, buttonElement);
    })
}