import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect: '/home',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/home',
        component: () => import('../page/index'),
        meta: {
            requiresAuth: true,
            title: '首页',
        }
    },
    {
        path: '/login',
        component: () => import('../page/account/login'),
        meta: {
            title: '用户登录'
        }
    },
    {
        path: '/login/password',
        component: () => import('../page/account/password'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login/phone',
        component: () => import('../page/account/phonelogin'),
        meta: {
            title: '用户登录'
        }
    },
    {
        path: '/login/register',
        component: () => import('../page/account/register'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/index',
        component: () => import('../page/user/index'),
        name: 'user',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/info',
        component: () => import('../page/user/info/detail'),
        name: 'user',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/address',
        component: () => import('../page/user/address/list'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/address/edit',
        component: () => import('../page/user/address/edit'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/favorite',
        component: () => import('../page/user/favorite/list'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/coupon',
        component: () => import('../page/user/coupon/list'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/order',
        component: () => import('../page/user/order/list'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/order/:id',
        component: () => import('../page/user/order/list'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/order/info/:id',
        component: () => import('../page/user/order/info'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/order/logistics/:id',
        component: () => import('../page/user/order/logistics'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/aftersale',
        component: () => import('../page/user/aftersale/list'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/aftersale/apply',
        component: () => import('../page/user/aftersale/apply'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/aftersale/detail',
        component: () => import('../page/user/aftersale/detail'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/aftersale/track/:id',
        component: () => import('../page/user/aftersale/track'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/product/:id',
        component: () => import('../page/product/detail'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/search',
        component: () => import('../page/product/list'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/cart',
        component: () => import('../page/cart/index'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/order',
        component: () => import('../page/shipping/order'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/category',
        component: () => import('../page/category/index'),
        meta: {
            requiresAuth: true
        }
    },
];

// add route path
routes.forEach(route => {
    route.path = route.path || '/' + (route.name || '');
});

const router = new Router(
    {
        mode: 'history',
        routes
    });


router.beforeEach((to, from, next) => {
    let token = window.localStorage.getItem('token')
    let title = to.meta && to.meta.title;

    window.localStorage.setItem('token','123456');
    if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    } else {
        if (title) {
            document.title = title;
        }
        next()
    }
});

// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('Authorization');
    let title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    window.console.log("to.name:"+to,from,next);
    window.console.log(token);
    if (to.matched.some(record => record.meta.requiresAuth)) { // 判断该路由是否需要登录权限
        window.console.log('需要登录权限');
        if (token) {// 判断当前的token是否存在 ； 登录存入的token
            window.console.log("有token");
            next();
        } else {
            next({
                path: '/login',
                query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }
});

export {
    router
};
