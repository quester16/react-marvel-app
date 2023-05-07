import error from './error.gif'

function ErrorMessage() {
    return ( 
        <img src={error} alt="ErrorMessage" style={{width: 330, height: '20%'}}/>
     );
}

export default ErrorMessage;