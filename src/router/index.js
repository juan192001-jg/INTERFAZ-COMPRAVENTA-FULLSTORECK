import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'Login',
        component: login
    },
    {
        path: '/',
        name: 'Home',

    },


    {
        path: '/compras',
        name: 'compras',

        component: () =>
            import ('../components/compras.vue'),


    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router