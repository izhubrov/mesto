export default class Api {
  constructor ({baseUrl, groupId, token}) {
    this._baseUrl = baseUrl;
    this._groupId = groupId;
    this._token = token;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  getUser() {
    return fetch(`${this._baseUrl}/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._checkResponse)
  }

  getCards() {
    return fetch(`${this._baseUrl}/${this._groupId}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._checkResponse);
  }

  patchUserInfo(user) {
    return fetch(`${this._baseUrl}/${this._groupId}/users/me`, {
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
      .then(this._checkResponse);
  }

  postCard(card) {
    return fetch(`${this._baseUrl}/${this._groupId}/cards`, {
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
      .then(this._checkResponse)
  }

  deleteCard(card) {
    return fetch(`${this._baseUrl}/${this._groupId}/cards/${card._id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
      .then(this._checkResponse)
  }

  likeCard(card) {
    return fetch(`${this._baseUrl}/${this._groupId}/cards/likes/${card._id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      }
    })
      .then(this._checkResponse)
  }

  dislikeCard(card) {
    return fetch(`${this._baseUrl}/${this._groupId}/cards/likes/${card._id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
      .then(this._checkResponse)
  }

  getCountsOfLikes(card) {
    return fetch(`${this._baseUrl}/${this._groupId}/cards/likes/${card._id}`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._checkResponse)
  }

  changeAvatar(link) {
    return fetch(`${this._baseUrl}/${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          avatar: link
        })
      })
      .then(this._checkResponse)
  }
}
