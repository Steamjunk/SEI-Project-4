import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:9000" // heroku address goes here
})


export const registerUser = async (registerData) => {
    try {
        const resp = await api.post('/auth/signup', registerData);
        localStorage.setItem('authToken', resp.data.token);
        api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
        return resp.data.user;

    } catch (err) {
        console.error(err)
    }
    return false
}

export const loginUser = async (loginData) => {
    try {
        const resp = await api.post('/auth/login', loginData);
        localStorage.setItem('authToken', resp.data.token);
        api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
        return resp.data.user;
    } catch (err) {
        console.error(err)
    }
    return false
}

export const verifyUser = async () => {
    const token = localStorage.getItem('authToken');

    if (token) {
        api.defaults.headers.common.authorization = `Bearer ${token}`;
        try {
            const resp = await api.get('/auth/verify');
            return resp.data
        } catch (err) {
            console.error(err)
        }

    }
    return false;
}


// /auth/signup
// /auth/login
// /auth