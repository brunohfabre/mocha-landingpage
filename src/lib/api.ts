import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_REST_URL,
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    window.alert(
      `${error.response.data.status} | ${JSON.stringify(
        error.response.data.message,
      )}`,
    )

    return Promise.reject(error.response)
  },
)
