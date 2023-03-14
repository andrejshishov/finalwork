import axios from 'axios'

import { setErrors, setUser } from '../store/slices/user-slice'
import { goHome, setSubmit } from '../store/slices/status-slice'

const baseUrl = 'https://blog.kata.academy/api'

const getHeaders = (token) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
})

const fetchUser = axios.create({
  baseURL: `${baseUrl}`,
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const getUser = (token) => async (dispatch) => {
  axios({
    url: `${baseUrl}/user`,
    headers: getHeaders(token),
  })
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data.user))
      dispatch(setUser({ user: res.data.user }))
      dispatch(setErrors(null))
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data.errors))
    })
}

export const registerUser = (data, login) => async (dispatch) => {
  const user = JSON.stringify({
    user: data,
  })

  fetchUser({
    url: login ? '/users/login' : '/users',
    data: user,
  })
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data.user))
      dispatch(setUser({ user: res.data.user }))
      dispatch(setErrors(null))
      dispatch(goHome(true))
      dispatch(setSubmit(true))
    })
    .catch((err) => {
      if (err?.response?.status === 422) {
        dispatch(setSubmit(true))
        dispatch(setUser(JSON.parse(user)))
        dispatch(setErrors(err.response.data.errors))
      }
    })
}

export const loginUser = (data) => async (dispatch) => {
  const user = JSON.stringify({
    user: data,
  })
  fetchUser({
    url: '/users/login',
    data: user,
  })
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data.user))
      dispatch(setUser({ user: res.data.user }))
      dispatch(setErrors(null))
      dispatch(goHome(true))
      dispatch(setSubmit(true))
    })
    .catch((err) => {
      dispatch(setSubmit(true))
      if (err.response.status === 422) {
        dispatch(setUser(JSON.parse(user)))
        dispatch(setErrors(err.response.data.errors))
      }
    })
}

export const updateUser = (data) => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem('user'))

  const user = JSON.stringify({
    user: data,
  })

  axios({
    url: `${baseUrl}/user`,
    method: 'put',
    headers: getHeaders(token),
    data: user,
  })
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data.user))
      dispatch(setUser({ user: res.data.user }))
      dispatch(setErrors(null))
      dispatch(setSubmit(true))
    })
    .catch((err) => {
      dispatch(setSubmit(true))
      dispatch(setErrors(err.response.data.errors))
    })
}