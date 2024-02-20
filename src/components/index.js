import "../pages/index.css";
import { initialCards } from "./cards.js";
import { renderCard, addCard } from "./card.js";
import { openModal, closeModal, closeWithEsc, closeWithOverlay, addCurrentData, handleFormSubmit, handleOpenImage } from "./modal.js";

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");

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

const editProfileFormElement = popupEditProfile.querySelector(".popup__form");
const editProfileNameInput = editProfileFormElement.querySelector(".popup__input_type_name");
const editProfileJobInput = editProfileFormElement.querySelector(".popup__input_type_description");

const imageElementPopup = document.querySelector(".popup_type_image");

editProfileButton.addEventListener("click", () => {
    openModal(popupEditProfile, closeWithEsc, closeWithOverlay);
    addCurrentData(profileTitle, profileDescription, editProfileNameInput, editProfileJobInput);
    closeEditProfileButton.addEventListener("click", () => closeModal(popupEditProfile, closeWithEsc, closeWithOverlay));
});

addCardButton.addEventListener("click", () => {
    openModal(popupNewCard, closeWithEsc, closeWithOverlay);
    closeNewCardButton.addEventListener("click", () => closeModal(popupNewCard, closeWithEsc, closeWithOverlay));
});

newCardFormElement.addEventListener("submit", (evt) => addCard(evt, popupNewCard, newCardNameInput, newCardUrlInput, cardTemplate, placesList, imageElementPopup, handleOpenImage, closeModal));
editProfileFormElement.addEventListener("submit", (evt) => handleFormSubmit(evt, popupEditProfile, profileTitle, profileDescription));

renderCard(placesList, initialCards, cardTemplate, imageElementPopup, handleOpenImage);
