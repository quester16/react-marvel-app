import React, { Component } from 'react';
import './charList.scss'


class CharList extends Component {


  addClass = (e) => {
    let target = e.target.closest('.character-card')
    target.classList.add('active')
    setTimeout(() => {
      target.classList.remove('active')
    }, 200);
    
    this.props.selectedChar(target.dataset.key)
  }

  charCards = () => {
    const data = Array.from(this.props.data)
    const char = data.map(({name, thumbnail, id}) => {
      return (
        <div className="character-card" key={id} data-key={id} onClick={this.addClass} >
          <div className="character-card__img">
            <img src={`${thumbnail}`} alt="placeholder" />
          </div>
          <div className="character-card__name">
            {name}
          </div>
        </div>
      )
    })
    return char
  }

  onCharLoading = () => {
    this.props.onNewCharLoading()

   
  }

  render(){
    const {newItemLoading, charEnded} = this.props
    console.log(charEnded);
    return (
      <div className="layout__grid">
        {<this.charCards/>}
        <button 
          className="more btn" 
          onClick={this.onCharLoading}
          style={{display: charEnded ? 'none' : 'block'}}
          disabled={newItemLoading}>Load more</button>
      </div>
    );
  }
}


export default CharList;


