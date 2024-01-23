const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");
const placesList = document.querySelector(".places__list");

function createCard(name, link, handleDeleteCard) {
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

function renderCard(location) {
    initialCards.forEach(function (item) {
        location.append(createCard(item.name, item.link, handleDeleteCard));
    });
}

renderCard(placesList);