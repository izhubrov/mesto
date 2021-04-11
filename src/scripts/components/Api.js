export default class Api {
  constructor ({groupId, token}) {
    this._groupId = groupId;
    this._token = token;
  }

  getUser() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
  }

  getCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      });
  }

  patchUserInfo(user) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    })
      .then ((updatedUser) => {
        if (updatedUser.ok) {
          return updatedUser.json();
        } else {
          return Promise.reject(`Ошибка ${updatedUser.status}`);
        }
      });
  }

  postCard(card) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then((newCard) => {
        if (newCard.ok) {
          return newCard.json();
        } else {
          return Promise.reject(`Ошибка ${newCard.status}`);
        }
      })
  }

  deleteCard(card) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards/${card._id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
      .then ((res)=> {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
  }

  likeCard(card) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards/likes/${card._id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      }
    })
      .then ((res)=> {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
  }

  dislikeCard(card) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards/likes/${card._id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
      .then ((res)=> {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
  }

  getCountsOfLikes(card) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards/likes/${card._id}`, {
      headers: {
        authorization: this._token
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
  }

  changeAvatar(link) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          avatar: link
        })
      })
      .then ((res)=> {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
  }
}
