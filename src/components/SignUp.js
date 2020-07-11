import React from 'react'
import IForm from './IForm'
import { Link } from 'react-router-dom'

const SignUp = () => {
    const message = <div>У вас есть аккаунт?<Link to="/login">Войдите</Link></div> 

    return (
        <IForm typeForm="signup" formName="Регистрация" buttonName="Зарегистрироваться" message={message}/>
    )
}

export default SignUp
