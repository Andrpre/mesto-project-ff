import "../pages/index.css";
import { createCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import { requestUserData, updateUserData, requestCardsData, uploadCardData, updateUserAvatar } from "./api.js";

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
};

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");

const editProfileAvatarButton = document.querySelector(".profile__image");
const popupEditProfileAvatar = document.querySelector(".popup_type_edit_avatar");
const closeEditProfileAvatarButton = popupEditProfileAvatar.querySelector(".popup__close");

const editProfileButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const closeEditProfileButton = popupEditProfile.querySelector(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const addCardButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const closeNewCardButton = popupNewCard.querySelector(".popup__close");

const newCardFormElement = popupNewCard.querySelector(".popup__form");
const newCardNameInput = newCardFormElement.querySelector(".popup__input_type_card-name");
const newCardUrlInput = newCardFormElement.querySelector(".popup__input_type_url");

export const popupDeleteCard = document.querySelector(".popup_type_delete-card");
const closeDeleteCardButton = popupDeleteCard.querySelector(".popup__close");
export const deleteCardFormElement = popupDeleteCard.querySelector(".popup__form");

const editProfileAvatarFormElement = popupEditProfileAvatar.querySelector(".popup__form");
const editProfileAvatarInput = editProfileAvatarFormElement.querySelector(".popup__input_type_url_avatar");

const editProfileFormElement = popupEditProfile.querySelector(".popup__form");
const editProfileNameInput = editProfileFormElement.querySelector(".popup__input_type_name");
const editProfileJobInput = editProfileFormElement.querySelector(".popup__input_type_description");

const imageElementPopup = document.querySelector(".popup_type_image");
const popupImage = imageElementPopup.querySelector(".popup__image");
const popupImageCaption = imageElementPopup.querySelector(".popup__caption");
const popupImageCloseButton = imageElementPopup.querySelector(".popup__close");

editProfileAvatarButton.addEventListener("click", () => {
    openModal(popupEditProfileAvatar);
    editProfileAvatarFormElement.reset();
});
editProfileButton.addEventListener("click", () => {
    fillInEditFormInputs();
    clearValidation(editProfileFormElement, validationConfig);
    openModal(popupEditProfile);
});
addCardButton.addEventListener("click", () => {
    openModal(popupNewCard);
    newCardFormElement.reset();
});

closeEditProfileAvatarButton.addEventListener("click", () => closeModal(popupEditProfileAvatar));
closeEditProfileButton.addEventListener("click", () => closeModal(popupEditProfile));
closeNewCardButton.addEventListener("click", () => closeModal(popupNewCard));
closeDeleteCardButton.addEventListener("click", () => closeModal(popupDeleteCard));
popupImageCloseButton.addEventListener("click", () => closeModal(imageElementPopup));

editProfileAvatarFormElement.addEventListener("submit", (evt) => submitEditProfileAvatarForm(evt));
editProfileFormElement.addEventListener("submit", (evt) => submitEditProfileForm(evt));
newCardFormElement.addEventListener("submit", (evt) => {
    submitAddCardForm(evt);
    clearValidation(newCardFormElement, validationConfig);
});

function fillInEditFormInputs() {
    editProfileNameInput.value = profileTitle.textContent;
    editProfileJobInput.value = profileDescription.textContent;
}

function displayDownloadProcess(button, display) {
    display ? (button.textContent = "Сохранение...") : (button.textContent = "Сохранить");
}

function submitEditProfileAvatarForm(evt) {
    evt.preventDefault();
    const url = editProfileAvatarInput.value;
    const submitButton = evt.target.querySelector(validationConfig.submitButtonSelector);

    displayDownloadProcess(submitButton, true);

    updateUserAvatar(url)
        .then((data) => {
            editProfileAvatarButton.style.backgroundImage = `url('${data.avatar}')`;
            closeModal(popupEditProfileAvatar);
            displayDownloadProcess(submitButton, false);
        })
        .catch((err) => {
            console.error(err);
        });
}

function submitEditProfileForm(evt) {
    evt.preventDefault();
    const name = evt.target.elements.name.value;
    const description = evt.target.elements.description.value;
    const submitButton = evt.target.querySelector(validationConfig.submitButtonSelector);

    displayDownloadProcess(submitButton, true);

    updateUserData(name, description)
        .then((data) => {
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
            closeModal(popupEditProfile);
            displayDownloadProcess(submitButton, false);
        })
        .catch((err) => {
            console.error(err);
        });
}

function submitAddCardForm(evt) {
    evt.preventDefault();
    const submitButton = evt.target.querySelector(validationConfig.submitButtonSelector);

    displayDownloadProcess(submitButton, true);

    Promise.all([requestUserData(), uploadCardData(newCardNameInput.value, newCardUrlInput.value)])
        .then((data) => {
            placesList.prepend(createCard(data[0]._id, data[1], cardTemplate, handleOpenImage));
            closeModal(popupNewCard);
            displayDownloadProcess(submitButton, false);
            evt.target.reset();
        })
        .catch((err) => {
            console.error(err);
        });
}

function handleOpenImage(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupImageCaption.textContent = name;
    openModal(imageElementPopup);
}

function renderCard(location, userDataId, initialCards) {
    initialCards.forEach((itemCard) => {
        location.append(createCard(userDataId, itemCard, cardTemplate, handleOpenImage));
    });
}

Promise.all([requestUserData(), requestCardsData()])
    .then((data) => {
        profileTitle.textContent = data[0].name;
        profileDescription.textContent = data[0].about;
        editProfileAvatarButton.style.backgroundImage = `url('${data[0].avatar}')`;

        renderCard(placesList, data[0]._id, data[1]);
    })
    .catch((err) => {
        console.error(err);
    });

enableValidation(validationConfig);
