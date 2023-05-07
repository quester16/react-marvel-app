import './header.scss'

function Header() {
  return (
    <header>
      <div className="logo">
        <div className="logo__wrap"> <img src="src/assets/img/logo.png" alt="logo Marvel" /></div>
        <span>Information portal</span>
      </div>
      <div className="pages">
        <span className="active">Characters</span> / <span>Comics</span>
      </div>
    </header>
  );
}

export default Header;