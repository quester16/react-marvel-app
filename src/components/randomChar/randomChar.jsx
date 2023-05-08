import { useState, useEffect } from 'react';

import './randomChar.scss'

import useMarvelService from '../../services/marvelService'
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


const RandomChar = () => {

  const [char, setChar] = useState({})

  const {loading, error, getCharacter, cleanError} = useMarvelService();

  useEffect(() => {
    updateChar()
  }, [])


  const onLoaded = (char) => {
    setChar(char)
  };


  const updateChar = () => {
    cleanError()
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
    getCharacter(id)
      .then(onLoaded)
  }


  const errorMessage = error ? <ErrorMessage /> : null
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || errorMessage) ? <View char={char} /> : null;


  return (
    <>
      <section className="random-character">
      <div className="character">
        {errorMessage}
        {spinner}
        {content}
        </div>
        <div className="random__picker">
          <div className="random__picker-head">
            Random character for today! <br />
            Do you want to get to know him better?
          </div>
          <div className="random__picker-btn">
            Or choose another one
            <button className="btn" onClick={updateChar}>Try it</button>
          </div>
        </div>

      </section>
    </>
  );
}

const View = ({ char }) => {
  const { name, descrip, thumbnail, detail, wiki } = char

  let imgStyle;
  try {
    imgStyle = thumbnail.match('image_not_available') ? 'contain' : 'cover';
  } catch (e){ console.log(e)}

  function onFailDescrip(descrip) {
    if (!descrip) {
      return 'There is no information about this hero :(';
    } else {
      return descrip.split(' ').splice(0, 25).join(' ') + "...";

    }
  }

  return (
    <>
      <div className="character__img">
        <img src={thumbnail} alt="random-character" style={{objectFit: `${imgStyle}`}}/>
      </div>
      <div className="character__descrip">
        <div className="descrip">
          <h2>{name}</h2>
          <p>{onFailDescrip(descrip)}</p>
        </div>
        <div className="btns">
          <a className='btn' href={detail} target="_blank">Homepage</a>
          <a className='btn' href={wiki} target="_blank">Wiki</a>
        </div>
      </div>
    </>
  )
}

export default RandomChar;