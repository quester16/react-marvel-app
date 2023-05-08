import {useEffect, useState} from "react";

import useComicsServices from "../../services/comicsServices.js";
import Spinner from "../spiner/Spinner.jsx";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";

import './comicsList.scss'
const ComicsList = () => {

   const [comics, setComics] = useState([]);
   const [offset, setOffset] = useState(56);

   const {loading, error, getAllCharacters } = useComicsServices();

   useEffect(() => {
       getComics(offset);
   }, [])

   const getComics = (offset) => {
       getAllCharacters(offset)
           .then(onComicsLoad)
    }

    const onComicsLoad = (obj) => {
       const newComics = obj.data.results.map(item => {
           return {
               name: item.title,
               thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
               price: item.prices[0].price
           }
       })

        setComics(comics => [...comics, ...newComics])
        setOffset(offset => offset + 16)
    }
    const onNewCharLoading = () => {
        getComics(offset)
    }

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null;

    return(
        <>
            <section className="comics__layout layout">
                <div className="layout__grid">
                    {errorMessage}
                    {spinner}
                    <View comics={comics}/>

                </div>
            </section>
            <button className="comics more btn" onClick={onNewCharLoading}>Load more</button>
        </>
    )
}

const View = (props) => {
    const {comics} = props


    return comics.map(({name, thumbnail, price},i) => {

        const imgStyle = thumbnail.match('image_not_available') || thumbnail.match('4c002e0305708') ? 'contain' : 'cover';

        return(
            <div className="comics-card card" key={i}>
                <div className="card__img">
                    <img src={thumbnail} alt="comic" style={{objectFit: `${imgStyle}`}}/>
                </div>
                <div className="card__descrip">
                    <span className="comic-name">{name}</span> <br/>
                    <span className="comic-price">{price}$</span>
                </div>
            </div>
        )
    })

}

export default ComicsList;