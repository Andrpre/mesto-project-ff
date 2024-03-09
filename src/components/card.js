import { deleteCallback } from "./index.js";

function createCard(userDataId, itemCard, cardTemplate, handleOpenImage, pushLikeCard, deleteLikeCard) {
    const cardElement = cardTemplate.cloneNode(true);
    const imageElement = cardElement.querySelector(".card__image");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    const counterCardlikes = cardElement.querySelector(".card__like-counter");

    imageElement.src = itemCard.link;
    imageElement.alt = itemCard.name;
    cardElement.querySelector(".card__title").textContent = itemCard.name;
    counterCardlikes.textContent = itemCard.likes.length;

    setLikeIfExists(itemCard.likes, userDataId, likeButton);
    initDeleteButton(cardElement, userDataId, itemCard, deleteButton);

    imageElement.addEventListener("click", () => {
        handleOpenImage(itemCard.name, itemCard.link);
    });
    likeButton.addEventListener("click", () => {
        handleLikeCard(likeButton, itemCard._id, counterCardlikes, pushLikeCard, deleteLikeCard);
    });

    return cardElement;
}

function setLikeIfExists(arrayLikes, userDataId, likeButton) {
    if (arrayLikes.some((item) => item._id === userDataId)) {
        likeButton.classList.add("card__like-button_is-active");
    }
}

function initDeleteButton(cardElement, userDataId, itemCard, deleteButton) {
    if (userDataId === itemCard.owner._id) {
        deleteButton.addEventListener("click", () => {
            deleteCallback(itemCard._id, cardElement);
        });
    } else {
        deleteButton.remove();
    }
}

function handleDeleteCard(cardElement, cardId, deleteCardData, closeModal, popupDeleteCard) {
    deleteCardData(cardId)
        .then(() => {
            cardElement.remove();
            closeModal(popupDeleteCard);
        })
        .catch((err) => {
            console.error(err);
        });
}

function handleLikeCard(likeButton, cardId, counterCardlikes, pushLikeCard, deleteLikeCard) {
    const likeMethod = likeButton.classList.contains("card__like-button_is-active") ? deleteLikeCard : pushLikeCard;
    likeMethod(cardId)
        .then((data) => {
            likeButton.classList.toggle("card__like-button_is-active");
            counterCardlikes.textContent = data.likes.length;
        })
        .catch((err) => console.log(err));
}

export { createCard, handleDeleteCard };
