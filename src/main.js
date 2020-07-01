import Vue from 'vue';
import {router} from './config/router';
import './config/rem';
import App from './App.vue';
import VueLazyload from 'vue-lazyload'
import components from './config/components.js';
import axios from 'axios' //引入axios
import {Toast} from 'vant';
import store from './config/store'
import JsEncrypt from 'jsencrypt'

axios.defaults.withCredentials = true

Vue.prototype.$jsencrypt = JsEncrypt

Vue.prototype.$axios = axios;

Vue.use(components);

Vue.use(VueLazyload);

Vue.use(Toast);

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    response => {

        // window.console.log(response);
        if (localStorage.getItem('Authorization')) {
            response.headers.Authorization = localStorage.getItem('Authorization');
        }

        // // * 跳转到login
        // if (data.code === 20103 || data.code === 1004) {
        //     window.router.replace('/login')
        // }
        // window.console.log('config:' + response.headers.Authorization)
        return response;
    },

    error => {
        window.console.log(error);
        return Promise.reject(error);
    });
axios.interceptors.response.use(
    response => {
        // 定时刷新access-token
        if (response.data.code == 1004) {
            window.console.log("response:"+response.data.code);
            router.replace('/login/phone');
        }
        // if (!response.data.value && response.data.data.message === 'token invalid') {
        //     // 刷新token
        //     store.dispatch('refresh').then(response => {
        //         sessionStorage.setItem('access_token', response.data)
        //     }).catch(error => {
        //         throw new Error('token刷新' + error)
        //     })
        // }
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

new Vue({

    router,
    el: '#app',
    store: store,
    render: h => h(App)
});
