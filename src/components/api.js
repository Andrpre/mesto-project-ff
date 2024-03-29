const apiConfig = {
    token: "dc67c79f-1c3d-4338-96c1-1207986f4fe9",
    cohortId: "wff-cohort-8",
};

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
};

const requestUserData = () => {
    return fetch(`https://nomoreparties.co/v1/${apiConfig.cohortId}/users/me`, {
        headers: {
            authorization: apiConfig.token,
        },
    }).then((res) => {
        return handleResponse(res);
    });
};

const updateUserData = (nameUpdate, descriptionUpdate) => {
    return fetch(`https://nomoreparties.co/v1/${apiConfig.cohortId}/users/me`, {
        method: "PATCH",
        headers: {
            authorization: apiConfig.token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: nameUpdate,
            about: descriptionUpdate,
        }),
    }).then((res) => {
        return handleResponse(res);
    });
};

const updateUserAvatar = (urlUpdate) => {
    return fetch(`https://nomoreparties.co/v1/${apiConfig.cohortId}/users/me/avatar`, {
        method: "PATCH",
        headers: {
            authorization: apiConfig.token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            avatar: urlUpdate,
        }),
    }).then((res) => {
        return handleResponse(res);
    });
};

const requestCardsData = () => {
    return fetch(`https://nomoreparties.co/v1/${apiConfig.cohortId}/cards`, {
        headers: {
            authorization: apiConfig.token,
        },
    }).then((res) => {
        return handleResponse(res);
    });
};

const uploadCardData = (nameUpload, linkUpload) => {
    return fetch(`https://nomoreparties.co/v1/${apiConfig.cohortId}/cards`, {
        method: "POST",
        headers: {
            authorization: apiConfig.token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: nameUpload,
            link: linkUpload,
        }),
    }).then((res) => {
        return handleResponse(res);
    });
};

const deleteCardData = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/${apiConfig.cohortId}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
            authorization: apiConfig.token,
        },
    }).then((res) => {
        return handleResponse(res);
    });
};

const pushLikeCard = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/${apiConfig.cohortId}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: {
            authorization: apiConfig.token,
        },
    }).then((res) => {
        return handleResponse(res);
    });
};

const deleteLikeCard = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/${apiConfig.cohortId}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: {
            authorization: apiConfig.token,
        },
    }).then((res) => {
        return handleResponse(res);
    });
};

export { requestUserData, updateUserData, requestCardsData, uploadCardData, deleteCardData, pushLikeCard, deleteLikeCard, updateUserAvatar };
