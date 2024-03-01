import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, handleDeleteCard, handleLikeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import { requestUserData, requestCardsData } from "./api.js";

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");

const editProfileButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const closeEditProfileButton = popupEditProfile.querySelector(".popup__close");

const profileImage = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const addCardButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const closeNewCardButton = popupNewCard.querySelector(".popup__close");

const newCardFormElement = popupNewCard.querySelector(".popup__form");
const newCardNameInput = newCardFormElement.querySelector(".popup__input_type_card-name");
const newCardUrlInput = newCardFormElement.querySelector(".popup__input_type_url");

const editProfileFormElement = popupEditProfile.querySelector(".popup__form");
const editProfileNameInput = editProfileFormElement.querySelector(".popup__input_type_name");
const editProfileJobInput = editProfileFormElement.querySelector(".popup__input_type_description");

const imageElementPopup = document.querySelector(".popup_type_image");
const popupImage = imageElementPopup.querySelector(".popup__image");
const popupImageCaption = imageElementPopup.querySelector(".popup__caption");
const popupImageCloseButton = imageElementPopup.querySelector(".popup__close");

editProfileButton.addEventListener("click", () => {
    openModal(popupEditProfile);
    fillInEditFormInputs();
    clearValidation(editProfileFormElement, validationConfig);
});
addCardButton.addEventListener("click", () => {
    openModal(popupNewCard);
    newCardFormElement.reset();
});

closeEditProfileButton.addEventListener("click", () => closeModal(popupEditProfile));
closeNewCardButton.addEventListener("click", () => closeModal(popupNewCard));
popupImageCloseButton.addEventListener("click", () => closeModal(imageElementPopup));

newCardFormElement.addEventListener("submit", (evt) => {
    submitAddCardForm(evt);
    clearValidation(newCardFormElement, validationConfig);
});
editProfileFormElement.addEventListener("submit", (evt) => submitEditProfileForm(evt));

function fillInEditFormInputs() {
    editProfileNameInput.value = profileTitle.textContent;
    editProfileJobInput.value = profileDescription.textContent;
}

function submitEditProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = evt.target.elements.name.value;
    profileDescription.textContent = evt.target.elements.description.value;
    closeModal(popupEditProfile);
}

function submitAddCardForm(evt) {
    evt.preventDefault();
    placesList.prepend(createCard(newCardNameInput.value, newCardUrlInput.value, cardTemplate, handleDeleteCard, handleLikeCard, handleOpenImage));
    closeModal(popupNewCard);
    evt.target.reset();
}

function handleOpenImage(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupImageCaption.textContent = name;
    openModal(imageElementPopup);
}

function renderCard(location, initialCards, cardTemplate, handleOpenImage) {
    initialCards.forEach(function (item) {
        location.append(createCard(item.name, item.link, cardTemplate, handleDeleteCard, handleLikeCard, handleOpenImage));
    });
}

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error"
}

enableValidation(validationConfig);

const apiConfig = {
    token: "dc67c79f-1c3d-4338-96c1-1207986f4fe9",
    cohortId: "wff-cohort-8"
}

Promise.all([requestUserData(apiConfig), requestCardsData(apiConfig)])
    .then((data) => {
        profileTitle.textContent = data[0].name;
        profileDescription.textContent = data[0].about;
        profileImage.style.backgroundImage = `url('${data[0].avatar}')`;
        
        renderCard(placesList, data[1], cardTemplate, handleOpenImage);
    })
    .catch((err) => {
        console.log(err);
    });
