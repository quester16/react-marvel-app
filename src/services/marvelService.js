import {useHttps} from "../hooks/http.hook.js";

const useMarvelService = () => {

  const {loading, error, request, cleanError} = useHttps()

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=0cdc5bd3908bc4dbfd0abf8154619cf4';
  const _offsetBase = 210;


  const getAllCharacters = (offset = _offsetBase) => {
    return request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
    return _transformCharacter(res.data.results[0])
  }

  const _transformCharacter = (res) => {
    return {
      name: res.name,
      descrip: res.description,
      thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
      detail: res.urls[0].url,
      wiki: res.urls[1].url,
      comics: res.comics.items
    }
  }

  return {loading, error, getCharacter, getAllCharacters, cleanError}
}

export default useMarvelService;