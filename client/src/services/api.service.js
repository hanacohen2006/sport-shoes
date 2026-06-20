const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const getHeaders = () => ({
    'Content-Type': 'application/json',
    ...(localStorage.getItem('token') && {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    })
})

// SHOES
export const getAllShoes = async () => {
    const res = await fetch(`${API_URL}/shoe`, { headers: getHeaders() })
    return res.json()
}

export const getShoeById = async (id) => {
    const res = await fetch(`${API_URL}/shoe/getById/${id}`, { headers: getHeaders() })
    return res.json()
}

export const addShoe = async (shoe) => {
    const res = await fetch(`${API_URL}/shoe`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(shoe)
    })
    return res.json()
}

export const updateShoe = async (id, shoe) => {
    const res = await fetch(`${API_URL}/shoe/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(shoe)
    })
    return res.json()
}

export const deleteShoe = async (id) => {
    const res = await fetch(`${API_URL}/shoe/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    })
    return res.json()
}

// USERS
export const login = async (credentials) => {
    const res = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(credentials)
    })
    return res.json()
}

export const register = async (userData) => {
    const res = await fetch(`${API_URL}/user/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(userData)
    })
    return res.json()
}

// ORDERS
export const createOrder = async (orderData) => {
    const res = await fetch(`${API_URL}/order`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(orderData)
    })
    return res.json()
}

export const getMyOrders = async () => {
    const res = await fetch(`${API_URL}/order/my`, { headers: getHeaders() })
    return res.json()
}

export const getAllOrders = async () => {
    const res = await fetch(`${API_URL}/order`, { headers: getHeaders() })
    return res.json()
}

export const updateOrderStatus = async (id, status) => {
    const res = await fetch(`${API_URL}/order/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ status })
    })
    return res.json()
}
export const getPublicShoes = async () => {
    const res = await fetch(`${API_URL}/shoe/public`)
    return res.json()
}