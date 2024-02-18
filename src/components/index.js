import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, handleDeleteCard, renderCard, handleAddCard } from './card.js';
import { openModal, closeModal, closeWithEsc, closeWithOverlay, addingCurrentData, handleFormSubmit } from './modal.js';

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");

const editProfileButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const closeEditProfileButton = popupEditProfile.querySelector(".popup__close");

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const addCardButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const closeNewCardButton = popupNewCard.querySelector(".popup__close");

const formElement = popupNewCard.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_card-name");
const urlInput = formElement.querySelector(".popup__input_type_url");

editProfileButton.addEventListener('click', () => {
    const formElement = popupEditProfile.querySelector(".popup__form");
    const nameInput = formElement.querySelector(".popup__input_type_name");
    const jobInput = formElement.querySelector(".popup__input_type_description");

    openModal(popupEditProfile, closeWithEsc, closeWithOverlay);
    
    addingCurrentData(profileTitle, profileDescription, nameInput, jobInput);
    formElement.addEventListener('submit', (evt) => handleFormSubmit(evt, popupEditProfile));

    closeEditProfileButton.addEventListener('click', () => closeModal(popupEditProfile, closeWithEsc, closeWithOverlay));
});

addCardButton.addEventListener('click', () => {
    openModal(popupNewCard, closeWithEsc, closeWithOverlay);
    closeNewCardButton.addEventListener('click', () => closeModal(popupNewCard, closeWithEsc, closeWithOverlay));
});

formElement.addEventListener('submit', (evt) => handleAddCard(evt, popupNewCard, nameInput, urlInput, cardTemplate, placesList));

renderCard(placesList, initialCards, cardTemplate);