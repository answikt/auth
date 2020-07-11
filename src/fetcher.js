function getTokenData(email, password, typeForm) {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/${typeForm}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },            
        body: JSON.stringify({email, password})
    })
}

function refreshTokenData() {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },            
        body: JSON.stringify({value: JSON.parse(localStorage.getItem('token')).refresh})
    })
}

function getDataList(token) {
    return fetch(`${process.env.REACT_APP_API_URL}/user/list`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        }      
    })
}

export { getTokenData, refreshTokenData, getDataList}