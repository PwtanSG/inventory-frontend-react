import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../Services/cognitoAuth';
import { FaSpinner, FaSignInAlt } from 'react-icons/fa';
import { setUserSession, resetUserSession } from '../Services/userSession';
import { useAuth } from '../Context/Auth/useAuth';

const CognitoUserLogin = () => {

  const navigate = useNavigate();
  resetUserSession();

  const [loginErr, setLoginErr] = useState('');
  const initLoginForm = { username: '', password: '' };
  const [loginFormData, setLoginFormData] = useState(initLoginForm)
  const [isLogging, setLogging] = useState(false);
  const { setAuth } = useAuth();

  const onChangeHandler = (e) => {
    setLoginFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (loginFormData.username.trim() === '' || loginFormData.password.trim() === '') {
      setLoginErr('Both username and password are required.');
      return;
    }
    if (loginFormData.username !== '' || loginFormData.password !== '') {
      setLogging(true)
      try {
        const res = await authenticate(loginFormData.username, loginFormData.password);
        if (res.accessToken) {
          // console.log(res)
          setLoginErr('');
          setUserSession(res.accessToken.payload.username, res.idToken.jwtToken)
          const username = res.accessToken.payload.username
          const token = res.idToken.jwtToken
          setAuth({ username, token })
          navigate('/')
        }
      } catch (err) {
        console.log(err);
        setLoginErr(err.message)
      }
    }
    setLogging(false)
  }

  return (
    <div className='full-page-ctn'>
      <form onSubmit={onSubmitHandler} className='col-xs-5 col-sm-5 col-lg-4 col-10 border border-1 px-3 py-3 rounded-4'>
        {loginErr && <p className="message text-danger">{loginErr}</p>}
        <div className="mb-3 mt-3">
          <h2><FaSignInAlt /><span className='px-2 py-2'>Login</span></h2>
        </div>
        <div className="mb-3 mt-3">
          <input
            type="username"
            className="form-control"
            placeholder="Enter username (admin)"
            name="username"
            value={loginFormData.username}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter password (abcd1234)"
            name="password"
            value={loginFormData.password}
            onChange={onChangeHandler}
          />
        </div>
        <button type="submit" className="btn btn-primary col-12 my-2" onClick={onSubmitHandler} disabled={isLogging}>
          Login
          {isLogging && <span className='mx-3'><FaSpinner className="icon_pulse" /></span>}
        </button>
      </form>
    </div>
  )
}

export default CognitoUserLogin