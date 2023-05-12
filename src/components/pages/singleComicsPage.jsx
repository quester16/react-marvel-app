import {useEffect, useState} from "react";
import { Link, useParams } from 'react-router-dom';

import useMarvelService from "../../services/marvelService.js";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import Spinner from "../spiner/Spinner.jsx";

import './singleComicsPage.scss';
const SingleComic = () => {

    let { comicId } = useParams();
    const [comic, setComic] = useState(null)
    const {loading, error, getComics, cleanError } = useMarvelService();

    console.log(comicId)

    useEffect(() => {
        request()
    }, [comicId])

    const request = () => {
        cleanError()
        getComics(comicId)
            .then(onLoadComic)
    }

    const onLoadComic = (comic) => {
        console.log(comic)
        setComic(comic)
    }

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}
const View = ({comic}) => {
    const {thumbnail, name, pages, price, language, descrip } = comic

        return(
            <div className="single-comic">
                <img src={thumbnail} alt={name} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{descrip}</p>
                    <p className="single-comic__descr">{pages > 1 ? `${pages} p.` : 'No information about the number of pages'} </p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price > 1 ? `${price} $` : 'Not available'}</div>
                </div>
                <Link to='/comics' className="single-comic__back">Back to all</Link>
            </div>
        )
}

export default SingleComic;