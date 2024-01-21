// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

// @todo: DOM узлы

// @todo: Функция создания карточки

function creatinCards(name, link, deletingCards) {
    const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
    cardElement.querySelector(".card__image").src = link;
    cardElement.querySelector(".card__title").textContent = name;

    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", deletingCards);

    console.log(cardElement);
    return cardElement;
}

// @todo: Функция удаления карточки
function deletingCards() {
    initialCards.forEach(function (item) {
        const listItem = deleteButton.closest('.places__item');
        listItem.remove();
    });
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
    placesList.append(creatinCards(item.name, item.link, deletingCards));
});
