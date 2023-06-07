import axios from 'axios'
// Automatically add CSRF token to every outgoing request
// const baseURL = window.App.base_url
const headers = {
    // 'X-CSRF-TOKEN': window.Laravel.csrfToken,
    'X-CSRF-TOKEN': 'aaa',
    'X-Requested-With': 'XMLHttpRequest'
}

const Parent = axios.create({
    // baseURL,
    headers
})

// Response interceptor
Parent.interceptors.response.use(response => response, error => httpFail(error))

function httpFail(error) {
    // Reject on Laravel-driven validation errors
    if (error.response && error.response.status === 422) {
        return Promise.reject(error)
    }

    // Refresh tokens and reject to be further handled be the request initiator
    if (error.response && error.response.status == 419) {
        return refreshAppTokens().then(() => Promise.reject(error))
    }

    // If internal error
    if (error.message && !error.response) {
        // Due to a possible bug in Laravel Echo, whitelist Echo server error
        // See explanation above
        if (error.message === "Cannot read property 'socketId' of undefined") {
            // showError(error.message);
            // return Promise.resolve(error)
            return Promise.reject(error)
        }

        // Display any other errors to the user and reject
        // showError(error.message)
        return Promise.reject(error)
    }

    // Redirect to log in page if unauthenticated
    /* if (error.response && error.response.status === 401) {
        const router = window.router
        const segments = router.currentRoute.path.split('/')
        const isAuth = segments.length > 1 && segments[1] === 'auth'

        // If not on main page and not on /auth page (change this block or remove accordingly to your app logic)
        if (router.currentRoute.path !== '/' && !isAuth) {
            store.dispatch('resetAuthorizedUser')
            window.router.push(`/auth/login?back=${router.currentRoute.path}`)
        }
        return Promise.reject(error)
    }

    // Redirect if the backend asks it
    if (error.response && error.response.status === 402 && error.response.data.redirect) {
        window.router.push(error.response.data.redirect)
        return Promise.reject(error)
    } */

    // Show all other errors
    // showHttpError(error)
    return Promise.reject(error)
}

function refreshAppTokens() {
    // Retrieve a new page with a fresh token
    return axios
        .get('/')
        .then(({ data }) => {
            const wrapper = document.createElement('div')
            wrapper.innerHTML = data
            return wrapper.querySelector('meta[name=_token]').getAttribute('content')
        })
        .then(token => {
            axios.defaults.headers['X-CSRF-TOKEN'] = token
            window.Laravel.csrfToken = token
            document.querySelector('meta[name=_token]').setAttribute('content', token)
        })
}

// Let’s omit this so far, see the explanation below
class Http extends Parent {
    static post(url, data, config) {
        Parent.defaults.headers['X-CSRF-TOKEN'] = window.Laravel.csrfToken
        return new Promise((resolve, reject) => {
            Parent.post(url, data, config)
                .then(response1 => resolve(response1))
                .catch(error1 => {
                    // There is one more try for token mismatch error
                    if (error1.response && error1.response.status == 419) {
                        console.warn('419!!!')
                        Parent.defaults.headers['X-CSRF-TOKEN'] = window.Laravel.csrfToken
                        Parent.post(url, data, config)
                            .then(response2 => {
                                /* const u = new window.URL(decodeURIComponent(location.href))
                                    location.href = `${location.origin}${u.searchParams.get(
                                        'back'
                                    )}` */

                                resolve(response2)
                            })
                            .catch(error2 => reject(error2))
                    } else {
                        reject(error1)
                    }
                })
        })
    }
}
export default Http
