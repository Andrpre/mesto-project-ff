function enableValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, obj);
    });
}

function clearValidation(formElement, obj) {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    inputList.forEach((inputElement) => {
        hideError(formElement, inputElement, obj.inputErrorClass);
    });

    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    disableSubmitButton(buttonElement, obj.inactiveButtonClass);
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

const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
};

const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
};

function setEventListeners(formElement, obj) {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, obj);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement, obj.inputErrorClass);
            toggleButtonState(inputList, buttonElement, obj);
        });
    });
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement, obj) {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, obj.inactiveButtonClass);
    } else {
        enableSubmitButton(buttonElement, obj.inactiveButtonClass);
    }
}

export { enableValidation, clearValidation };
