import React, {useState, useEffect} from 'react';
import './Register.scss';
import { Link } from 'react-router-dom';
import Validation from './Validation/Validation';
import axios from 'axios';

function Register() {

    const {handleBlur, Validate} = Validation();

    const [infoResgister, setInfoRegister] = useState({
        userName: '',
        email: '',
        password: ''
    });
    const [error, setErr] = useState({})

    const [disableButton, setDisableButton] = useState(true)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInfoRegister({...infoResgister, [name]:value})
    }

    const errors = Validate(infoResgister.userName, infoResgister.email, infoResgister.password);

    useEffect(() => {
            setDisableButton(false);
        if (errors.email !== '' || errors.password !== '') {
            setDisableButton(true);
        }
    }, [errors.password, errors.email]);

    const registerSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8800/server/auth/register', {
                username: infoResgister.userName,
                email: infoResgister.email,
                password: infoResgister.password
            });
            setInfoRegister({userName:'', email:'', password:''});
            console.log('aaa', res.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='register tr-all-ease-in-out-5 w-100vw h-100vh d-flex align-items-center justify-content-center'>
            <form className='form-register wrap-form w-350 h-370 d-flex flex-direction-column border-radius-8 position-relative' onSubmit={registerSubmit}>
                <input value={infoResgister.userName} onChange={handleChange} onBlur={handleBlur('userName')} name='userName' className='p-8 mx-16 mt-48 border-radius-4 border-none color-gray-700 font-weight-bold tr-all-ease-in-out-3 opacity-9' type='text' placeholder='UserName...' />
                <p className='font-size-12 color-red pt-8 mx-16 font-weight-normal'>{errors.userName}</p>
                <input value={infoResgister.email} onChange={handleChange} onBlur={handleBlur('email')} name='email' className='p-8 mx-16 mt-12 border-radius-4 border-none color-gray-700 font-weight-bold tr-all-ease-in-out-3 opacity-9' type='email' placeholder='Email...' />
                <p className='font-size-12 color-red pt-8 mx-16 font-weight-normal'>{errors.email}</p>
                <input value={infoResgister.password} onChange={handleChange} onBlur={handleBlur('password')} name='password' className='p-8 mx-16 mt-12 border-radius-4 border-none color-gray-700 font-weight-bold tr-all-ease-in-out-3 opacity-9' type='password' placeholder='Password...' />
                <p className='font-size-12 color-red pt-8 mx-16 font-weight-normal'>{errors.password}</p>
                <div className='mx-16 mt-12 font-size-16 font-weight-bold d-flex'>
                    <Link className='link-item mr-16 color-blue px-4' to='/login'>Sign in</Link> if you have an account?
                </div>
                <button type='submit' className='btns py-8 mr-16 my-40 w-50% d-flex align-self-end justify-content-center border-radius-8 border-none text-align-center font-size-16 font-weight-bold cursor bg-gray-500 opacity-8' type='submit'>Sign up</button>
            </form>
        </div>
    )
}

export default Register;
