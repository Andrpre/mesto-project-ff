import { closeModal } from './modal.js';

function createCard(name, link, handleDeleteCard, cardTemplate) {
    const cardElement = cardTemplate.cloneNode(true);
    const imageElement = cardElement.querySelector(".card__image");
    imageElement.src = link;
    imageElement.alt = name;
    cardElement.querySelector(".card__title").textContent = name;

    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", function () {
        handleDeleteCard(cardElement);
    });

    return cardElement;
}

function handleDeleteCard(cardElement) {
    cardElement.remove();
}

function renderCard(location, initialCards, cardTemplate) {
    initialCards.forEach(function (item) {
        location.append(createCard(item.name, item.link, handleDeleteCard, cardTemplate));
    });
}

function handleAddCard(evt, popupNewCard, nameInput, urlInput, cardTemplate, location){
    evt.preventDefault();
    location.prepend(createCard(nameInput.value, urlInput.value, handleDeleteCard, cardTemplate));
    closeModal(popupNewCard);
}

export { createCard, handleDeleteCard, renderCard, handleAddCard };