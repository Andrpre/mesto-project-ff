function requestUserData(api) {
    return fetch(`https://nomoreparties.co/v1/${api.cohortId}/users/me`, {
        headers: {
            authorization: api.token,
        }
    })
        .then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                return Promise.reject(console.log(`Ошибка: ${res.status}`));
            }
        })
}

function requestCardsData(api) {
    return fetch(`https://nomoreparties.co/v1/${api.cohortId}/cards`, {
        headers: {
            authorization: api.token,
        }
    })
        .then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                return Promise.reject(console.log(`Ошибка: ${res.status}`));
            }
        })
}

export { requestUserData, requestCardsData };