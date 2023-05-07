import { Component } from 'react';
import './character.scss'

import CharInfo from "./charInfo/charInfo";
import CharList from "./charList/charList";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import MarvelService from "../../services/marvelService";
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class Character extends Component {
  
  state = {
    heroes : [],
    heroId : null,
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false
  }
  
  marvelService = new MarvelService()
  
  componentDidMount(){
    this.onRequest()
  }

  onRequest = (offset) => {
    this.onNewItemLoaded()
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharLoad)
      .catch(this.onError)
  }

  onNewItemLoaded = () => {
    this.setState({
      newItemLoading: true
    })
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true
    })
  }

  onCharLoad = (heros) => {
    const newCharsId = heros.data.results.map(item => {
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
    this.setState(({offset, heroes}) => ({
      heroes: [...heroes, ...newCharsId],
      loading: false,
      error: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended
    }))
    
  };

  selectedChar = (id) => {
    this.setState({
      heroId: id
    })

    
    window.scrollTo({
      top: 350,
      behavior: 'smooth'
    })
    console.log('450')
  }

  onNewCharLoading = () => {
    this.onRequest(this.state.offset)

    window.scrollBy(-450)
  }

  render(){

    const { heroes, loading, error, heroId, newItemLoading, charEnded } = this.state;

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || errorMessage) ? 
      <CharList 
      newItemLoading={newItemLoading} 
      onNewCharLoading={this.onNewCharLoading} 
      data={heroes} 
      charEnded={charEnded}
      selectedChar={this.selectedChar} /> : null;

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
}

export default Character;