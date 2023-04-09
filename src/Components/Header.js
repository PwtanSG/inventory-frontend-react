import { FaSignInAlt, FaSignOutAlt, FaHome, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    // const navigate = useNavigate()
    const logout = () => {
        // localStorage.removeItem('user')
        // navigate('/login')
    }


    return (
        <header className='header'>
            <div className=''>
                <Link to='/'>
                    <span className='icon-white'>
                        <FaHome />
                    </span>
                </Link>
            </div>
            <ul>
                <li>
                    <Link to='/'>
                        <span className='icon-white'>
                            <FaSignInAlt />
                        </span>
                    </Link>
                </li>
                <li>
                    <div onClick={logout}>
                        <FaSignOutAlt />
                    </div>
                </li>
                
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