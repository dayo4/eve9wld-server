const axios = require('axios')

const config = {
    baseURL: 'https://orb.heroestoggery.com/wp-json/',
    // baseURL: (devMode ? 'http://localhost/wplocal/wp-json/' : process.env.BASE_URL),
    // baseURL: (devMode ? 'http://127.0.0.1:3000/' : process.env.BASE_URL) + 'scv-v1/',
    timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
    // adapter: cache.adapter,
}

const _axios = axios.create(config)
// _axios.defaults.headers.common['Authorization'] = 'Bearer ' + LSAgent.getToken()

_axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        // const token = LSAgent.getToken()
        // if (!config.url.match(/auth\/v1\/token$/))
        //     config.headers.common[ 'Authorization' ] = 'Bearer ' + token

        return config
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    }
)

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        // if (devMode)
        console.log(response)

        return response
    },

    /* if error */
    function ({ response }) {
        // Do something with response error
        const error = response ? response.data.message : 'Unable to connect!'
        // if (devMode)
        console.log(response)

        // if (response)
        // {
        //     if (response.status === 401)
        //     {
        //         const redirectUrl = router.currentRoute.path
        //         if (error === 'Re-login!')
        //         {
        //             $Auth.$form.logout()
        //             $Auth.$form.show({ showQuery: true, message: 'Please, Re-login to continue!', redirect: redirectUrl })
        //         } else
        //         {
        //             router.replace({ path: '/401' })
        //         }
        //     }
        //     if (response.status === 404)
        //     {
        //         router.push({ name: '404', /* query: { data: error } */ })
        //     }
        // }
        return Promise.reject(error)
    }
)

module.exports = _axios
