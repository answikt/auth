import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, ListGroup, Navbar, Button } from 'react-bootstrap'
import { getDataList } from '../fetcher'

const Users = () => {
    const [list, setList] = useState([])

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
            getDataList(token).then(res => {
                res.json().then(result => {
                    setList(result)
                })
            })    
        }
    }, [])

    return (
        <>
            <Navbar className="justify-content-end" bg="dark" variant="dark">
                <Link to="/login" onClick={() => localStorage.removeItem('token')}>
                    <Button variant="outline-info">Выйти</Button>
                </Link>
            </Navbar>
            <div className="container">
                <div className="row justify-content-center">
                    <h2>Список пользователей</h2>
                </div>
                <div className="row justify-content-center">
                    <Card style={{ width: '30rem' }}>
                    <ListGroup variant="flush">
                        {list.map((i, idx) => (
                            <ListGroup.Item key={i._id}><strong>{idx + 1}. </strong>{i.email}</ListGroup.Item>
                        ))}
                    </ListGroup>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Users
