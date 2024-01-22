const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function creatinCards(name, link, deletingCards) {
    const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
    cardElement.querySelector(".card__image").src = link;
    cardElement.querySelector(".card__image").alt = name;
    cardElement.querySelector(".card__title").textContent = name;

    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", function () {
        deletingCards(cardElement);
    });

    return cardElement;
}

function deletingCards(cardElement) {
    cardElement.remove();
}

function outputCard(location) {
    initialCards.forEach(function (item) {
        location.append(creatinCards(item.name, item.link, deletingCards));
    });
}

outputCard(placesList);
