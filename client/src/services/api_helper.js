import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:9000" // heroku address goes here
})


export const registerUser = async (registerData) => {
    // add try-catch
    const resp = await api.post('/auth/signup', registerData);
    localStorage.setItem('authToken', resp.data.token);
    api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
    return resp.data.user;
}

export const loginUser = async (loginData) => {
    const resp = await api.post('/auth/login', loginData);
    localStorage.setItem('authToken', resp.data.token);
    api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
    return resp.data.user;
}

export const verifyUser = async () => {
    const token = localStorage.getItem('authToken');
    console.log(token)

    if (token) {
        api.defaults.headers.common.authorization = `Bearer ${token}`;
        console.log('here2')

        try {
            const resp = await api.get('/auth/verify');
            console.log(resp)
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