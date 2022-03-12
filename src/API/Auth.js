import urlcat from 'urlcat';
import axios from 'axios';

const BASEURL = "http://localhost:8000/";
const BASE_API_URL = urlcat(BASEURL, "api");

export async function fetchRedirect() {
    const url = urlcat(BASE_API_URL, "auth");

    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.error(error)
        return error
    }
}

export async function sendCallBack(code, state) {
    const url = urlcat(BASE_API_URL, "auth/callback", { code, state });
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function getShareLink(token, details) {
    const { firstName, lastName, userName, email, password } = details;
    const url = urlcat(BASE_API_URL, "onetime/create_link", { link_password: password });
    const headers = { Authorization: "Bearer " + token }

    const body = {
        username: userName,
        first_name: firstName,
        last_name: lastName,
        email: email,
    }
    const instance = axios.create({
        headers: headers
    })

    try {
        const response = await instance.post(url, body)
        return response.data
    } catch (error) {
        console.warn(error)
        if (error.response) {
            return error.response.data
        }
        return null
    }

}


export async function getLinkInformation(linkToken, token) {
    const url = urlcat(BASE_API_URL, "onetime/check", { token: linkToken });

    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.error(error.message)
        return null
    }

}

export async function createUserWithOneTimeLink(linkToken, linkPassword, newPassword) {
    const params = { token: linkToken, link_password: linkPassword, new_password: newPassword }
    const url = urlcat(BASE_API_URL, "onetime/use_token", params);

    try {
        const response = await axios.post(url)
        return response.data
    } catch (error) {
        console.error(error.message)
        return null
    }

}

export async function fetchUserToken(username, password) {
    const url = urlcat(BASEURL, "token/");
    const body = {
        username,
        password
    }

    try {
        const response = await axios.post(url, body)
        return response.data
    } catch (error) {
        console.error(error.message)
        return null
    }

}

export async function refreshToken(token) {
    const url = urlcat(BASEURL, "token/refresh/");
    const data = { refresh: token }
    try {
        const response = await axios.post(url, data)
        return response.data
    } catch (error) {
        console.error(error.message)
        return null
    }

}