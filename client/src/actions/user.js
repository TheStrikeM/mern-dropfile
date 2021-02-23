import axios from "axios";
import {setUser} from "../reducers/userReducer";


export const registerUser = async ({email, password}) => {
    try {
        const response = axios.post("http://127.0.0.1:5000/api/auth/reg", {
            email,
            password
        })

        alert((await response).data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const loginUser = async ({email, password}, dispatch) => {
    try {
        const response = axios.post("http://127.0.0.1:5000/api/auth/login", {
            email,
            password
        })

        const info = (await response).data

        console.log(info)
        dispatch(setUser(info.user))

        localStorage.setItem('token', info.token)
    } catch (e) {
        alert(e.response.data.message)
    }
}