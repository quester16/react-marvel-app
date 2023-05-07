class MarvelService {

  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=0cdc5bd3908bc4dbfd0abf8154619cf4';
  _offsetBase = 210;

  getData = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  }

  getAllCharacters = (offset = this._offsetBase) => {
    return this.getData(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)
  }

  getCharacter = async (id) => {
    const res = await this.getData(`${this._apiBase}characters/${id}?${this._apiKey}`)
    return this._transformCharacter(res.data.results[0])
  }

  _transformCharacter(res) {
    return {
      name: res.name,
      descrip: res.description,
      thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
      detail: res.urls[0].url,
      wiki: res.urls[1].url,
      comics: res.comics.items
    }
  }
}

export default MarvelService;