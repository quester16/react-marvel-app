import {useHttps} from "../hooks/http.hook.js";

const useComicsServices = () => {
    const {loading, error, request, cleanError} = useHttps();

    // https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=16&apikey=0cdc5bd3908bc4dbfd0abf8154619cf4

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=0cdc5bd3908bc4dbfd0abf8154619cf4';
    const _offsetBase = 56;


    const getAllCharacters = (offset = _offsetBase) => {
        return request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    }

    const _transformCharacter = (res) => {
        return {
            name: res.title,
            descrip: res.description,
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            price: res.prices[0].price,
        }
    }

    return {loading, error, getCharacter, getAllCharacters, cleanError}
}

export default useComicsServices;