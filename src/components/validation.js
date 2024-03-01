function enableValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, obj.inputSelector, obj.submitButtonSelector, obj.inputErrorClass, obj.inactiveButtonClass);
    });
}

function clearValidation(formElement, obj) {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.classList.remove(obj.inputErrorClass);
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = "";
    });

    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    buttonElement.classList.add(obj.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
}

const checkInputValidity = (formElement, inputElement, classNameErrorElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (inputElement.validity.valid) {
        hideError(formElement, inputElement, classNameErrorElement);
    } else {
        showError(formElement, inputElement, classNameErrorElement, inputElement.validationMessage);
    }
};

const showError = (formElement, inputElement, classNameErrorElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(classNameErrorElement);
    errorElement.textContent = errorMessage;
};

const hideError = (formElement, inputElement, classNameErrorElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(classNameErrorElement);
    errorElement.textContent = "";
};

function setEventListeners(formElement, classNameInputElement, classNameButtonElement, classNameErrorElement, classNameDisabledElement) {
    const inputList = Array.from(formElement.querySelectorAll(classNameInputElement));
    const buttonElement = formElement.querySelector(classNameButtonElement);
    toggleButtonState(inputList, buttonElement, classNameDisabledElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement, classNameErrorElement);
            toggleButtonState(inputList, buttonElement, classNameDisabledElement);
        });
    });
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement, classNameDisabledElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(classNameDisabledElement);
        buttonElement.setAttribute("disabled", "disabled");
    } else {
        buttonElement.classList.remove(classNameDisabledElement);
        buttonElement.removeAttribute("disabled");
    }
}

export { enableValidation, clearValidation };
