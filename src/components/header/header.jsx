import {Link, NavLink} from "react-router-dom";

import './header.scss'

function Header() {
  return (
    <header>
      <div className="logo">
          <Link to='/' className='logo__link'>
            <div className="logo__wrap"> <img src="src/assets/img/logo.png" alt="logo Marvel" /></div>
            <span>Information portal</span>
          </Link>
      </div>
      <div className="pages">
        <NavLink end className={({isActive}) => (isActive ? " active" : "")} to='/'>Characters</NavLink> /
         <NavLink className={({isActive}) => (isActive ? " active" : "")}  to='/comics'>Comics</NavLink>
      </div>
    </header>
  );
}

export default Header;