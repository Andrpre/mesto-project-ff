import "../pages/index.css";
import { initialCards } from "./cards.js";
import { renderCard, createCard, handleDeleteCard, handleLikeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";

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
const popupImage = imageElementPopup.querySelector(".popup__image");
const popupImageCaption = imageElementPopup.querySelector(".popup__caption");
const popupImageCloseButton = imageElementPopup.querySelector(".popup__close");

editProfileButton.addEventListener("click", () => {
    openModal(popupEditProfile);
    fillInEditFormInputs();
});
addCardButton.addEventListener("click", () => { openModal(popupNewCard) });

closeEditProfileButton.addEventListener("click", () => closeModal(popupEditProfile));
closeNewCardButton.addEventListener("click", () => closeModal(popupNewCard));
popupImageCloseButton.addEventListener("click", () => closeModal(imageElementPopup));

newCardFormElement.addEventListener("submit", (evt) => submitAddCardForm(evt));
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

renderCard(placesList, initialCards, cardTemplate, handleOpenImage);
