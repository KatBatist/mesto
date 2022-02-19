export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
  
    getInitialCards() {
        return fetch(this._baseUrl+'cards', {headers: this._headers})
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    setLike(cardId, isLike) {
        let method = 'DELETE';
        if (isLike)
            method = 'PUT';
        return fetch(this._baseUrl+'cards/' + cardId + '/likes', { method: method, headers: this._headers})
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
  
    getUserInfo() {
        return fetch(this._baseUrl+'users/me', {headers: this._headers})
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    setDeleteCard(cardId) {
        return fetch(this._baseUrl+'cards/' + cardId, { method: 'DELETE', headers: this._headers})
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    setAvatar(avatar) {
        return fetch(this._baseUrl+'users/me/avatar', { method: 'PATCH', headers: this._headers,
            body: JSON.stringify({
                avatar: avatar})})
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    setProfileInfo(name, about) {
        return fetch(this._baseUrl+'users/me', { method: 'PATCH', headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about})})
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    setAddCard(name, link) {
        return fetch(this._baseUrl+'cards', { method: 'POST', headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link})})
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
}
  
 