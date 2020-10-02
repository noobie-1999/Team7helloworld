import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setToken from '../utils/setToken'
import { SET_USER, GET_ERRORS } from './types'

export const register = (userData, history) => dispatch => {
    axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, userData)
        .then(res => history.push('/'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};

export const login = userData => dispatch => {
    axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setToken(token);
            const decode = jwt_decode(token);
            dispatch(setUser(decode));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const setUser = decode => {
    return {
        type: SET_USER,
        payload: decode
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setToken(false);
    dispatch(setUser({}));
}