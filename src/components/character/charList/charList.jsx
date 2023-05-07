import React from 'react';
import './charList.scss'


const CharList = (props) => {

  const addClass = (e) => {
    let target = e.target.closest('.character-card')
    target.classList.add('active')
    setTimeout(() => {
      target.classList.remove('active')
    }, 200);
    
    props.selectedChar(target.dataset.key)
  }

  const CharCards = () => {
    const data = Array.from(props.data)

    return data.map(({name, thumbnail, id}) => {
        return (
          <div className="character-card" key={id} data-key={id} onClick={addClass} >
            <div className="character-card__img">
              <img src={`${thumbnail}`} alt="placeholder" />
            </div>
            <div className="character-card__name">
              {name}
            </div>
          </div>
        )
      })
  };


  const {newItemLoading, onNewCharLoading, charEnded} = props;
  return (
    <div className="layout__grid">
      {<CharCards/>}
      <button
        className="more btn"
        onClick={onNewCharLoading}
        style={{display: charEnded ? 'none' : 'block'}}
        disabled={newItemLoading}>Load more</button>
    </div>
  );
}

// just for checking
export default CharList;


