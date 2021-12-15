import React, {useState, useEffect} from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import Validation from './Validation/Validation';
import axios from 'axios';
import history from '../../../history';


function Login({setUsers}) {

    const {handleBlur, Validate} = Validation();

    const [infoLogin, setInfoLogin] = useState({
        email: '',
        password: ''
    });
    const [disableButton, setDisableButton] = useState(true);
    const [error, setErr] = useState({})
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInfoLogin({...infoLogin, [name]:value})
    };
    const errors = Validate(infoLogin.email, infoLogin.password);

    useEffect(() => {
            setDisableButton(false);
        if (errors.email !== '' || errors.password !== '') {
            setDisableButton(true);
        }
    }, [errors.password, errors.email]);

    const loginSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8800/server/auth/login', {
                email: infoLogin.email,
                password: infoLogin.password
            });
            setInfoLogin({email:'', password:''});
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('_id', res.data._id);
            setUsers(true);
            history.push('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='login tr-all-ease-in-out-5 w-100vw h-100vh d-flex align-items-center justify-content-center'>
            <form className='form-login wrap-form w-350 h-370 d-flex flex-direction-column border-radius-8 position-relative' onSubmit={loginSubmit}>
                <input value={infoLogin.email} onChange={handleChange} onBlur={handleBlur('email')} name='email' className='p-8 mx-16 mt-80 border-radius-4 border-none color-gray-700 font-weight-bold tr-all-ease-in-out-3' type='email' placeholder='Email...' />
                <p className='font-size-12 color-red pt-8 mx-16 font-weight-bold'>{errors.email}</p>
                <input value={infoLogin.password} onChange={handleChange} onBlur={handleBlur('password')} name='password' className='p-8 mx-16 mt-12 border-radius-4 border-none color-gray-700 font-weight-bold tr-all-ease-in-out-3' type='password' placeholder='Password...' />
                <p className='font-size-12 color-red pt-8 mx-16 font-weight-normal'>{errors.password}</p>
                <div className='mx-16 my-8 font-size-16 font-weight-normal d-flex'>
                    <Link className='link-item mr-16 color-blue px-4' to='/register'>Sign up</Link> if you haven't an account?
                </div>
                <button type='submit' className='btns py-8 mr-16 my-40 w-50% d-flex align-self-end justify-content-center border-radius-8 border-none text-align-center font-size-16 font-weight-bold cursor bg-gray-500 opacity-8' type='submit'>Sign in</button>
            </form>
        </div>
    )
}

export default Login;
