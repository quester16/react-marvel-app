import Header from '../header/header'
import Character from '../character/character'
import RandomChar from '../randomChar/randomChar'
import ComicsHeader from "../comicsHeader/comicsHeader.jsx"
import ComicsList from "../comicsList/comicsList.jsx";

function App() {

  return (
    <div className="wrapper">
      <div className="bg">
        <img src="src/assets/img/vision-bg.png" alt="vision-bg" />
      </div>
      <div className="container">
        <Header />
        <main>
          {/*<RandomChar />*/}
          {/*<Character />*/}
            <ComicsHeader />
            <ComicsList/>
        </main>
      </div >
    </div >
  )
}

export default App
