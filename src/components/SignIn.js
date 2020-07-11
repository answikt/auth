import React from 'react'
import IForm from './IForm'
import { Link } from 'react-router-dom'

const SignIn = () => {
    const message = <div>У вас нет аккаунта?<Link to="/register">Зарегистрируйтесь</Link></div>

    return (
        <IForm typeForm="signin" formName="Авторизация" buttonName="Войти" message={message}/>
    )
}

export default SignIn
