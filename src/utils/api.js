class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl
    this.headers = headers
  }

  _handleOriginalResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(new Error(`Что-то пошло не так: ${res.status}`))
  }

  getSongs() {
    return fetch(`${this.baseUrl}`, {
      headers: this.headers,
    }).then(this._handleOriginalResponse)
  }

  addLyrics(item) {
    return fetch(`${this.baseUrl}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(item),
    }).then(this._handleOriginalResponse)
  }

}

const api = new Api({
  baseUrl: '',
  headers: {
    'Content-Type': 'application/json',
  },
})
export default api
