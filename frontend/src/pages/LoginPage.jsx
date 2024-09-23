
import { Button, Typography } from '@mui/material';
import './registerstyle.css';
import { useRef, useState } from 'react';
import { useAuth } from '../context/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    }

    const onSubmit = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email || !password) {
            setError(true);
            setErrorMessage('All fields are required');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user/login`
                , {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });
            if (response.status !== 200) {
                const err = await response.text();
                throw new Error(`Error login: ${err}`);
            }
            const data = await response.json();
            login(email, data.token);
            navigate('/');
        } catch (e) {
            console.error(e);
            setError(true);
            setErrorMessage(e.message);
        }
        emailRef.current.value = '';
        passwordRef.current.value = '';

    }
    return (
        <div className='regBody'>
            <div className="container">
                <div className="brand-title">Login</div>
                <div className="inputs">
                    <label>EMAIL</label>
                    <input ref={emailRef} type="email" name='email' placeholder="example@test.com" />
                    <label>PASSWORD</label>
                    <input ref={passwordRef} type="password" name='password' placeholder="Min 6 characters long" />
                    <button className='btn' type="submit" onClick={onSubmit}>LOGIN</button>
                    <Typography>
                        Don`t have account? <Button onClick={handleRegister}>Register</Button>
                    </Typography>
                    {error &&
                        <Typography color='error'>{errorMessage}</Typography>
                    }
                </div>
            </div>
        </div >
    )
}

export default LoginPage;