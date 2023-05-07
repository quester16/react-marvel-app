import { Component } from 'react';

import Spinner from '../../spiner/Spinner'
import MarvelService from '../../../services/marvelService'
import ErrorMessage from '../../errorMessage/ErrorMessage'

import SkeletonCard from '../../skeleton/Skeleton';
import './charInfo.scss'

class CharInfo extends Component{
  
  state = {
    char : null,
    loading : false,
    error : false
  }
  
  marvelService = new MarvelService;
  
  componentDidMount(){
    this.updateChar()
  }

  componentDidUpdate(prevProp){
    if(this.props !== prevProp){
      this.updateChar()
    }
  }

  updateChar = () => {
    const {heroId} = this.props
    if(!heroId){
      return;
    }

    this.onLoading()
    this.marvelService
      .getCharacter(heroId)
      .then(this.onCharLoading)
      .catch(this.onErrorMessage)
  }

  onCharLoading = (char) => {
    this.setState({
      char,
      loading: false,
      error: false
    })
  }

  onErrorMessage = () => {
    this.setState({
      loading: false,
      error: true
    })
  }

  onLoading = () => {
    this.setState({loading: true})
  }

  render() {
    const {char, loading, error} = this.state
    
    const skeleton = char || error || loading ? null : <SkeletonCard/>
    const spinner = loading ? <Spinner/> : null
    const errorMesage = error ? <ErrorMessage/> : null
    const content = !(loading || error || !char) ? <View char={char}/> : null

    return (
    <div className="character-info">
      {skeleton}
      {errorMesage}
      {spinner}
      {content}

      
    </div>
    );
  }
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