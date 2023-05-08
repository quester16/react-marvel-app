import './comicsHeader.scss'
const ComicsHeader = () => {
    return(
        <div className="avengers__banner banner">
            <div className="banner__bg">
                <img src="src/assets/img/avengers.png" alt="avengers" />
            </div>
            <h2 className="banner__alert">New comics every week! <br/> Stay tuned!</h2>
            <div className="banner__logo">
                <img src="src/assets/img/avengers-logo.png" alt="avengers-logo" />
            </div>
        </div>
    );
}


export default ComicsHeader;