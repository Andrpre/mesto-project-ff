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
        });
}

function updateUserData(api, nameUpdate, descriptionUpdate) {
    return fetch(`https://nomoreparties.co/v1/${api.cohortId}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: api.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nameUpdate,
          about: descriptionUpdate
        })
      })
      .then((res) => {
          if(res.ok) {
              return res.json();
          } else {
              return Promise.reject(console.log(`Ошибка: ${res.status}`));
          }
      });
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
        });
}

function uploadCardData(api,nameUpload, linkUpload) {
    return fetch(`https://nomoreparties.co/v1/${api.cohortId}/cards`, {
        method: 'POST',
        headers: {
            authorization: api.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nameUpload,
          link: linkUpload
        })
    })
        .then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                return Promise.reject(console.log(`Ошибка: ${res.status}`));
            }
        });
}

export { requestUserData, updateUserData, requestCardsData, uploadCardData };