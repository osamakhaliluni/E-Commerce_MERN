
import { Container, Typography } from '@mui/material';
import './registerstyle.css';
import { useRef, useState } from 'react';
import { useAuth } from '../context/Auth/AuthContext';

const RegisterPage = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { token, login } = useAuth();
    const onSubmit = async () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!name || !email || !password) {
            setError(true);
            setErrorMessage('All fields are required');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user/register`
                , {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                });
            if (response.status !== 201) {
                const err = await response.text();
                throw new Error(`Error register: ${err}`);
            }
            const data = await response.json();
            login(name, data.token);
            console.log(token);
        } catch (e) {
            console.error(e);
            setError(true);
            setErrorMessage(e.message);
        }
        nameRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';

    }
    return (
        <Container className='regBody'>
            <div className="container">
                <div className="brand-title">Register</div>
                <div className="inputs">
                    <label>FULL NAME</label>
                    <input ref={nameRef} type="text" name='name' placeholder="Full Name" />
                    <label>EMAIL</label>
                    <input ref={emailRef} type="email" name='email' placeholder="example@test.com" />
                    <label>PASSWORD</label>
                    <input ref={passwordRef} type="password" name='password' placeholder="Min 6 characters long" />
                    <button type="submit" onClick={onSubmit}>LOGIN</button>
                    {error &&
                        <Typography color='error'>{errorMessage}</Typography>
                    }
                </div>
            </div>
        </Container >
    )
}

export default RegisterPage;