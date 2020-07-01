import Vue from 'vue';
import axios from 'axios'
import Router from 'vue-router'

Vue.use(Router);

// * http request 拦截器
axios.interceptors.request.use(
    config => {
        // * 判断是否存在token，如果存在的话，则每个http header都加上token
        // * token会在登录之后存储在本地
        if (localStorage.token) {
            config.headers["Authorization"] = `Bearer ${localStorage.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// * http response 拦截器
axios.interceptors.response.use(
    response => {
        let data = response.data;
        // * 正常返回数据
        window.console.log("response.data:"+response.data);

        if (data.code === 0) {
            // * 返回data
            return data
        }
        // * 如果code是20103 表示token未认证(后端定义的错误码)
        // * 跳转到login
        if (data.code === 20103 || data.code === 1004) {
            window.router.replace('/login')
        }

        return Promise.reject(data);
    },
    error => {
        return Promise.reject(error);
    });
