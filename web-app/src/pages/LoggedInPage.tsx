import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getPasswordlessUser } from '../api/passwordless-login';
import AuthContext from '../context/auth-context';
import { HttpStatusCode } from '../utils/http-status-code.enum';
import localStorageUtil from '../utils/local-storage/local-storage.util';

const LoggedInPage = () => {

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const onClick = async () => {
        const response = await getPasswordlessUser();
        if(response.status == HttpStatusCode.OK){
            const user = await response.json();
            user.loggedIn = true;

            localStorageUtil.setUser(user);
            authContext.updateAuthContext(user);
        }
        else{
            alert("Something went wrong, please try again!");
        }
        navigate('/');
    }


  return (
    <div>
        <p className='m-5'>
            Successfully logged in via email!
            <button className='btnGreenWhite m-2' onClick={onClick}>
                Procced
            </button>
        </p>
    </div>
  )
}

export default LoggedInPage