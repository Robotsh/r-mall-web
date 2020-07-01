Vue.http.interceptors.push((request, next) => {
    if (window.localStorage.getItem('token')) {
        Vue.http.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token')
    }
    next((response) => {
        if (response.status === 401) {
            del('token')
            window.location.pathname = '/login'
        }
    })
})