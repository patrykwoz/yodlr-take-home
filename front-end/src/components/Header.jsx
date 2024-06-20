import { Outlet, Link } from 'react-router-dom';
import NavBar from './NavBar'
import logo from '/yodlr.png';
import './Header.css'

function Header({currentUser}) {
    return (
        <>
            <header className="Header">
                <Link to="/">
                    <div className="Header-logo">
                        <img src={logo} alt='Yodlr Logo' />
                    </div>
                </Link>
                <NavBar user={currentUser} />
            </header>
            <Outlet />
        </>
    )
}

export default Header;