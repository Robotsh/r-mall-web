import Vue from 'vue';
import {router} from './config/router';
import './config/rem';
import App from './App.vue';
import VueLazyload from 'vue-lazyload'
import components from './config/components.js';
import axios from 'axios' //引入axios
// Vue.prototype.$ajax=axios //修改Vue的原型属性
Vue.prototype.$axios = axios

Vue.use(components);

Vue.use(VueLazyload)

new Vue({

    router,
    el: '#app',
    render: h => h(App)
});