import { FaSignInAlt, FaSignOutAlt, FaHome, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../Services/cognitoAuth';
import { resetUserSession, getSessionUser } from '../Services/userSession';
import { useAuth } from '../Context/Auth/useAuth';

const Header = () => {
    const currentUser = getSessionUser();
    const location = useLocation();
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth()
    
    const onLogout = () => {
        resetUserSession()
        setAuth({})
        logout();
        navigate('/login')
    }

    return (
        <header className='header'>
            {/* <div className=''>
                <Link to='/'>
                    <span className='icon-white'>
                        <FaHome />
                    </span>
                </Link>
            </div> */}
            <ul>
                {location.pathname !== '/login' && <li>
                    <Link to='/'>
                        <span className='icon-white'>
                            <FaHome />
                        </span>
                    </Link>
                </li>}
            </ul>
            <ul>
                {/* <li>
                    <Link to='/login'>
                        <span className='icon-white'>
                            <FaSignInAlt />
                        </span>
                    </Link>
                </li> */}
                {location.pathname !== '/login' && (
                    <>
                        <li>
                            {/* {currentUser ? currentUser : ""} */}
                            {auth?.username ? auth.username ? auth.username : "" : ""}
                        </li>
                        <li>
                            <Link to='/login'>
                                <span className='icon-white' onClick={onLogout}>
                                    <FaSignOutAlt />
                                </span>
                            </Link>
                        </li></>
                )}
                {/* <li>
                    {auth?.user?.username ? auth.user?.username ? auth.user.username : "" : ""}
                </li>
                <li>
                    {isAuthenticated &&
                        <div onClick={logout}>
                            <FaSignOutAlt />
                        </div>
                    }
                </li> */}

                {/* <li>
                    <Link to='/register'>
                        <FaUser />
                    </Link>
                </li> */}
            </ul>
        </header>
    )
}

export default Header