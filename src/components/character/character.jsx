import {useEffect, useState} from 'react';
import './character.scss'

import CharInfo from "./charInfo/charInfo";
import CharList from "./charList/charList";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import MarvelService from "../../services/marvelService";
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const Character = () => {

  const [heroes, setHeroes] = useState([])
  const [heroId, setHeroId] = useState(null)
  const [newItemLoading, setNewItemLoading] = useState(false)
  const [offset, setOffset] = useState(210)
  const [charEnded, setCharEnded] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)



  
  const marvelService = new MarvelService()

  useEffect(() => {
    onRequest()
  }, [])


  const onRequest = (offset) => {
    onNewItemLoaded()
    marvelService
      .getAllCharacters(offset)
      .then(onCharLoad)
      .catch(onError)
  }

  const onNewItemLoaded = () => {
    setNewItemLoading(true)

  }

  const onError = () => {
    setError(true)
    setLoading(false)
  }

  const onCharLoad = (heroes) => {
    const newCharsId = heroes.data.results.map(item => {
      return {
        name: item.name,
        thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
        id: item.id
      }
    })

    let ended;
    if(newCharsId.length < 9){
      ended = true
    }

    setHeroes(heroes => [...heroes, ...newCharsId])
    setLoading(false)
    setError(false)
    setNewItemLoading(false)
    setOffset(offset => offset + 9)
    setCharEnded(ended)

  };

  const selectedChar = (id) => {
    setHeroId(id)
    
    window.scrollTo({
      top: 350,
      behavior: 'smooth'
    })
  }

  const onNewCharLoading = () => {
    onRequest(offset)

  }



  const errorMessage = error ? <ErrorMessage /> : null
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || errorMessage) ?
    <CharList
    newItemLoading={newItemLoading}
    onNewCharLoading={onNewCharLoading}
    data={heroes}
    charEnded={charEnded}
    selectedChar={selectedChar} /> : null;

  return (
    <section className="character__layout layout">
      <ErrorBoundary>
        {errorMessage}
        {spinner}
        {content}
      </ErrorBoundary>
      <ErrorBoundary>
        <CharInfo heroId={heroId}/>
      </ErrorBoundary>
    </section>
  );
}

export default Character;