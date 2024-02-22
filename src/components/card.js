function createCard(name, link, cardTemplate, handleDeleteCard, handleLikeCard, handleOpenImage) {
    const cardElement = cardTemplate.cloneNode(true);
    const imageElement = cardElement.querySelector(".card__image");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");

    imageElement.src = link;
    imageElement.alt = name;
    cardElement.querySelector(".card__title").textContent = name;

    imageElement.addEventListener("click", () => { handleOpenImage(name, link) });
    deleteButton.addEventListener("click", () => { handleDeleteCard(cardElement) });
    likeButton.addEventListener("click", () => { handleLikeCard(likeButton) });

    return cardElement;
}

function handleDeleteCard(cardElement) {
    cardElement.remove();
}

function handleLikeCard(likeButton) {
    if (likeButton.classList.contains("card__like-button_is-active")) {
        likeButton.classList.remove("card__like-button_is-active");
    } else {
        likeButton.classList.add("card__like-button_is-active");
    }
}

export { createCard, handleDeleteCard, handleLikeCard };
