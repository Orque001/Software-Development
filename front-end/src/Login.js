
import React, { useState } from 'react'
import { InputAdornment, makeStyles, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import chart from './assets/login/chart.svg';
import contract from './assets/login/contract.svg';
import dollarSymbol from './assets/login/dollarSymbol.svg';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Navigate } from 'react-router-dom';


const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#384859"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#384859"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#384859"
        },
        "& .MuiOutlinedInput-input": {
            color: "#384859"
        },
        "&:hover .MuiOutlinedInput-input": {
            color: "#384859"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#384859"
        },
        "& .MuiInputLabel-outlined": {
            color: "#384859"
        },
        "&:hover .MuiInputLabel-outlined": {
            color: "#384859"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "#384859"
        },
        display: 'flex',
        height: '100vh',
        width: '100vw',
        background: '#aa4b6b',

        background: 'linear-gradient(to right, #8e9eab, #eef2f3)'

    },
    appInfo: {
        height: '85%',
        width: '50%',
        backgroundColor: '#384859',
        position: 'absolute',
        top: '5%',
        left: '10%',
        borderTopLeftRadius: '12px',
        borderBottomLeftRadius: '12px'
    },
    image: {
        maxHeight: '140px',
        maxWidth: '140px',
        color: 'white'
    },
    mainText: {
        marginTop: '2.4em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '2.15rem',
        fontWeight: '500'
    },
    login: {
        height: '85%',
        width: '30%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        top: '5%',
        right: '10%',
        borderTopRightRadius: '12px',
        borderBottomRightRadius: '12px'
    },
    form: {
        height: '60vh',
        width: '60%',
        marginTop: '35%',
        display: 'flex',
        flexDirection: 'column'
    },
    button: {

        border: 'none',
        color: 'white',
        backgroundColor: '#384859',
        height: '48px',
        width: '164px',
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        fontSize: '1rem',
        cursor: 'pointer',
    },

    buttonSignUp: {
        border: 'none',
        color: '#676767',
        backgroundColor: '#EAEAEA',
        height: '48px',
        width: '164px',
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        fontSize: '1rem',
        cursor: 'pointer',
    },

    span: {
        backgroundColor: 'black',
        padding: '0 50px'
    },
    circle: {
        height: '0.9rem',
        width: '0.9rem',
        color: 'white',
        margin: '0 1rem'
    },
    passIcon: {
        position: 'absolute',
        top: '20%',
        right: '20%'
    }, visibileIcons: {
        height: '24px',
        width: '24px'
    }
})



export default function Login() {


    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [shouldRedirect, setShouldRedirect] = React.useState(false);
    const [message, setMessage] = React.useState('');

    function updateUserName(event) {
        setMessage('');
        setUserName(event.target.value); // updating react state variable
    }

    function updatePassword(event) {
        setMessage('');
        setPassword(event.target.value);
    }

    function register() {
        setMessage('');
        console.log('Registering ' + userName + ' ' + password);
        // send request to back end
        const userDto = {
            userName: userName,
            password: password
        };
        console.log(userDto);
        const options = {
            method: 'POST',
            body: JSON.stringify(userDto)
        };
        fetch('/createUser', options) // network call = lag
            .then((res) => res.json()) // it worked, parse result
            .then((apiRes) => {
                console.log(apiRes); // RestApiAppResponse
                if (apiRes.status) { // at the app layer, tell if worked or not
                    setUserName('');
                    setPassword('');
                    setMessage('Your account has been created!');
                } else {
                    setMessage(apiRes.message); // tell end user why?
                }
            })
            .catch((error) => {
                console.log(error);
            }) // it did not work
    }

    function logIn() {
        setMessage('');
        console.log('Loging in ' + userName + ' ' + password);
        // send request to back end
        const userDto = {
            userName: userName,
            password: password
        };
        console.log(userDto);
        const options = {
            method: 'POST',
            body: JSON.stringify(userDto)
        };
        fetch('/login', options) // network call = lag
            //.then((res) => res.json()) // it worked, parse result
            .then((apiRes) => {
                console.log(apiRes);
                if (apiRes.ok) {
                    console.log('Login worked');
                    setShouldRedirect(true);
                } else {
                    setMessage('Failed to log in');
                }
                console.log('Worked'); // RestApiAppResponse

            })
            .catch((error) => {
                console.log(error);
                setMessage('Failed to log in');
            }) // it did not work
    }




    // show/hide password 
    const [values, setValues] = useState({
        showPassword: false
    });

    const handleShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    }

    const handleMouseDown = (e) => {
        e.preventDefault();
    }

    const classes = useStyles();

    // redirect
    if (shouldRedirect) {
        return <Navigate to="/main/overview" replace={true} />;
    }

    return (
        <div
            className={classes.root}>
            <div
                style={{
                    display: 'flex',
                    width: '80vh',
                    height: '80%'
                }}>
                <div
                    className={classes.appInfo}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '63%',
                            margin: '25% auto 0 auto'
                        }}>
                        <img
                            className={classes.image}
                            src={chart}
                            alt="chart" />
                        <img
                            className={classes.image}
                            style={{ paddingLeft: '1.95rem' }}
                            src={contract}
                            alt="contract" />
                        <img
                            className={classes.image}
                            src={dollarSymbol}
                            alt="dollarSymbol" />
                    </div>
                    <h2
                        className={classes.mainText}>
                        Team GG Banking App
                    </h2>
                    <p
                        style={{
                            width: '35%',
                            margin: '0 auto',
                            color: 'white',
                            fontWeight: 'lighter',
                            fontSize: '1.2rem'
                        }}>

                    </p>

                </div>
                <div
                    className={classes.login}>


                    <div
                        className={classes.form}
                        action="">
                        <label
                            style={{
                                with: '100%',
                                textAlign: 'start',
                                fontSize: '1.5rem',
                                fontWeight: '500',
                                color: '#183346'
                            }}
                        >Welcome!</label>
                        {message}
                        <TextField
                            value={userName}
                            type='text'
                            label='Username'
                            onChange={updateUserName}
                            variant='outlined'
                            style={{
                                marginTop: '3rem',
                            }}
                            required />
                        <TextField
                            id='standard-password'
                            type={values.showPassword ? 'text' : 'password'}
                            label='Password'
                            value={password}
                            variant='outlined'
                            style={{
                                marginTop: '2rem',
                                borderColor: 'green'
                            }}
                            onChange={updatePassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            className={classes.visibileIcons}
                                            onClick={handleShowPassword}
                                            onMouseDown={handleMouseDown}>
                                            {values.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            required />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '2.9em'
                            }}>
                            <button
                                className={classes.button}
                                onClick={logIn}
                            >Log in
                                <ArrowForwardIcon
                                    style={{
                                        height: '22px',
                                    }} /></button>

                            &nbsp;&nbsp;&nbsp;

                            <button
                                className={classes.buttonSignUp}
                                onClick={register}
                            >Sign up
                            </button>


                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}