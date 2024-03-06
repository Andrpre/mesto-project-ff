import { popupDeleteCard, deleteCardFormElement } from "./index.js";
import { openModal, closeModal } from "./modal.js";
import { deleteCardData, pushLikeCard, deleteLikeCard } from "./api.js";

function createCard(userDataId, itemCard, cardTemplate, handleOpenImage) {
    const cardElement = cardTemplate.cloneNode(true);
    const imageElement = cardElement.querySelector(".card__image");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    const counterCardlikes = cardElement.querySelector(".card__like-counter");

    imageElement.src = itemCard.link;
    imageElement.alt = itemCard.name;
    cardElement.querySelector(".card__title").textContent = itemCard.name;
    counterCardlikes.textContent = itemCard.likes.length;

    hasLike(itemCard.likes, userDataId, likeButton);
    isDelete(cardElement, userDataId, itemCard, deleteButton);

    imageElement.addEventListener("click", () => {
        handleOpenImage(itemCard.name, itemCard.link);
    });
    likeButton.addEventListener("click", () => {
        handleLikeCard(likeButton, itemCard._id, counterCardlikes);
    });

    return cardElement;
}

// Если мы лайкали карточку, отображаем это
function hasLike(arrayLikes, userDataId, likeButton) {
    if (arrayLikes.some((item) => item._id === userDataId)) {
        likeButton.classList.add("card__like-button_is-active");
    } else {
        likeButton.classList.remove("card__like-button_is-active");
    }
}

// Реализуем возможность удаления с подтверждением, если это наша карточка
function isDelete(cardElement, userDataId, itemCard, deleteButton) {
    if (userDataId === itemCard.owner._id) {
        deleteButton.addEventListener("click", () => {
            openModal(popupDeleteCard);
            deleteCardFormElement.addEventListener("submit", (evt) => {
                evt.preventDefault();
                handleDeleteCard(cardElement, itemCard._id);
            });
        });
    } else {
        deleteButton.remove();
    }
}

function handleDeleteCard(cardElement, cardId) {
    deleteCardData(cardId)
        .then(() => {
            cardElement.remove();
            closeModal(popupDeleteCard);
        })
        .catch((err) => {
            console.error(err);
        });
}

function handleLikeCard(likeButton, cardId, counterCardlikes) {
    if (likeButton.classList.contains("card__like-button_is-active")) {
        deleteLikeCard(cardId)
            .then((data) => {
                likeButton.classList.remove("card__like-button_is-active");
                counterCardlikes.textContent = data.likes.length;
            })
            .catch((err) => {
                console.error(err);
            });
    } else {
        pushLikeCard(cardId)
            .then((data) => {
                likeButton.classList.add("card__like-button_is-active");
                counterCardlikes.textContent = data.likes.length;
            })
            .catch((err) => {
                console.error(err);
            });
    }
}

export { createCard };
