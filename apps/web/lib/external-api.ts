import axios from 'axios'

async function apiServerCall(token: string) {
    let apiQueryIntance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    })

    apiQueryIntance.interceptors.request.use(
        async function (reqConfig) {
            reqConfig.headers.set('Authorization', `Bearer ${token}`)
            return reqConfig
        },
        function (error) {
            return Promise.reject(error)
        }
    )

    apiQueryIntance.interceptors.response.use(
        function (resConfig) {
            return resConfig
        },
        function (error) {
            return Promise.reject(error)
        }
    )

    return apiQueryIntance
}

export default apiServerCall
