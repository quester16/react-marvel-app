import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Header from '../header/header'
import {MainPage, ComicsPage, SingleComicsPage} from '../pages'

function App() {

  return (
      <Router>
        <div className="wrapper">
          <div className="bg">
            <img src="src/assets/img/vision-bg.png" alt="vision-bg" />
          </div>
          <div className="container">
            <Header />
            <main>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/comics' element={<ComicsPage />} />
                    <Route path='/comics/:comicId' element={<SingleComicsPage />} />
                </Routes>
            </main>
          </div >
        </div >
      </Router>
  )
}

export default App
