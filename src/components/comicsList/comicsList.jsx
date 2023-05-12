import {useEffect, useState} from "react";
import { Link } from 'react-router-dom'

import useMarvelService from "../../services/marvelService.js";
import Spinner from "../spiner/Spinner.jsx";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";

import './comicsList.scss'
const ComicsList = () => {

   const [comics, setComics] = useState([]);
   const [offset, setOffset] = useState(56);
   const [newItemLoading, setNewItemLoading] = useState(false)
   const [charEnded, setCharEnded] = useState(false)

   const {loading, error, getAllComics } = useMarvelService();

   useEffect(() => {
       getComics(offset, true);
   }, [])

   const getComics = (offset, initial) => {
       initial ? setNewItemLoading(false) : setNewItemLoading(true)
       getAllComics(offset)
           .then(onComicsLoad)
    }

    const onComicsLoad = (obj) => {
       const newComics = obj.data.results.map(item => {
           return {
               id: item.id,
               name: item.title,
               thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
               price: item.prices[0].price
           }
       })

        let ended;
        if(obj.length < 8){
            ended = true
        }

        setComics(comics => [...comics, ...newComics])
        setOffset(offset => offset + 16)
        setNewItemLoading(false)
        setCharEnded(ended)
    }

    const onNewCharLoading = () => {
        getComics(offset, false)
    }

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading && !newItemLoading? <Spinner /> : null;

    return(
        <>
            <section className="comics__layout layout">
                <div className="layout__grid">
                    {errorMessage}
                    {spinner}
                    <View comics={comics}/>

                </div>
            </section>
            <button
                className="comics more btn"
                onClick={onNewCharLoading}
                style={{display: charEnded ? 'none' : 'block'}}
                disabled={newItemLoading}>Load more</button>
        </>
    )
}

const View = (props) => {
    const {comics} = props

        return comics.map(({id, name, thumbnail, price},i) => {

            const imgStyle = thumbnail.match('image_not_available') || thumbnail.match('4c002e0305708') ? 'contain' : 'cover';
                console.log(id)
            return(
                <Link to={`/comics/${id}`} className="comics-card card" key={i}>
                    <div className="card__img">
                        <img src={thumbnail} alt="comic" style={{objectFit: `${imgStyle}`}}/>
                    </div>
                    <div className="card__descrip">
                        <span className="comic-name">{name}</span> <br/>
                        <span className="comic-price">{price}$</span>
                    </div>
                </Link>
            )
    })

}

export default ComicsList;