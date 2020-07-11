import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { Redirect } from 'react-router-dom';
import { getTokenData, refreshTokenData } from '../fetcher'

const IForm = ({typeForm, formName, buttonName, message}) => {
    const [registered, setRegistered] = useState(false)
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [state, setState] = useState({
        email: '',
        password: '',
        errorMessage: null
    })
    let history = useHistory()

    const { setAuthTokens } = useAuth()

    if (isLoggedIn) {
        return <Redirect to="/"/>
    }

    return (
        <>
            {registered && typeForm === "signup" && 
                <div className="container">
                    <div className="row justify-content-center mt-4">
                        <Alert variant="success">Регистрация прошла успешно. Вы будете перенаправлены на страницу авторизации</Alert>
                    </div>
                </div>        
            }
            {!registered && <Form className="form">
                <h1 className="m-3">{formName}</h1>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" name="email" value={state.email} onChange={(e) => handleChange(e.target)} placeholder="Введите email"/>         
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" name="password" value={state.password} onChange={(e) => handleChange(e.target)} placeholder="Введите пароль"/>         
                </Form.Group>
                {state.errorMessage && <Form.Text className="font-weight-bold text-danger">{state.errorMessage}</Form.Text>}
                <Button className="m-3" type="submit" onClick={(e) => submit(e)} variant="primary">
                    {buttonName}
                </Button>
                {message}
            </Form>}
        </>
    )

    // Functions:

    function handleChange(el) {
        setState({
            ...state,
            [el.name]: el.value
        });
    };

    function submit(e) {
        e.preventDefault()
        const {email, password} = state;
        getTokenData(email, password, typeForm).then(res => {
            if (res.status === 200 && typeForm === "signup") {
                setRegistered(true)
                setTimeout(() => history.push('/login'), 1800)
            }
            if (res.status === 401 && res.message === 'jwt expired') {
                refreshTokenData()            
            }
            res.json().then(result => {
                if (typeForm === "signin" && result.access) {
                    setAuthTokens(result)
                    setLoggedIn(true)
                } else if (result.message) {
                    setState({
                        ...state,
                        errorMessage: result.message
                    });
                }
            })
        })
    }
}

export default IForm
