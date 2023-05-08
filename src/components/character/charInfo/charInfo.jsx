import { useEffect, useState } from 'react';

import Spinner from '../../spiner/Spinner'
import useMarvelService from '../../../services/marvelService'
import ErrorMessage from '../../errorMessage/ErrorMessage'

import SkeletonCard from '../../skeleton/Skeleton';
import './charInfo.scss'

const CharInfo = (props) => {

  const [char, setChar] = useState(null)

  const {loading, error, getCharacter, cleanError} = useMarvelService();

  useEffect(() => {
    updateChar()
  }, [])

  useEffect(() => {
      updateChar()
  }, [props.heroId])


  const updateChar = () => {
    cleanError()
    const {heroId} = props
    if(!heroId){
      return;
    }

    getCharacter(heroId)
      .then(onCharLoading)
  }

  const onCharLoading = (char) => {
    setChar(char)
  }


  const skeleton = char || error || loading ? null : <SkeletonCard/>
  const spinner = loading ? <Spinner/> : null
  const errorMessage = error ? <ErrorMessage/> : null
  const content = !(loading || error || !char) ? <View char={char}/> : null

  return (
  <div className="character-info">
    {skeleton}
    {errorMessage}
    {spinner}
    {content}
  </div>
  );
}

const View = ({char}) => {

  const {name, descrip, thumbnail, wiki, homepage, comics} = char
  const imgStyle = thumbnail.match('image_not_available') || thumbnail.match('4c002e0305708') ? 'contain' : 'cover';

  return(
    <>
      <div className="info__header">
        <div className="info__header-img">
          <div className="hero-img">
            <img src={thumbnail} alt={name} style={{objectFit: `${imgStyle}`}}/>
          </div>
          <div className="hero-actions">
            <h2>{name}</h2>
            <div className="btns">
              <a className="btn" href={homepage} target="_blank">homepage</a>
              <a className="btn" href={wiki} target="_blank">wiki</a>
            </div>
          </div>
        </div>
        <p className="hero-descrip">{descrip}</p>
      </div>
      <div className="hero-comics">
        <h2>Comics:</h2>
        <ul className="comics__list">
          {comics.length ? null : <p>We haven't found any comics' with this character :(</p>}
          {
            comics.map((item,i) => {
              if(i <= 10){
                return (
                  <li className="comics__list-item" key={i}>
                    {item.name}
                  </li>
                )
              } 
            })
          }
        </ul>
      </div>
    </>
  )
}

export default CharInfo;