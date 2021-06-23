import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/Login.vue'
import home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Login',
        component: login
    },
    {
        path: '/login',
        name: 'Login',
        component: login
    },
    {
        path: '/home',
        name: 'Home',
        component: home
    },
    {
        path: '/compras',
        name: 'compras',
        component: () =>
            import ('../components/compras.vue'),
    },
    {
        path: '/ingresos',
        name: 'ingresos',
        component: () =>
            import ('../components/Ingresos.vue'),
    },
    {
        path: '/proveedores',
        name: 'proveedores',
        component: () =>
            import ('../components/Provedores.vue'),
    },
    {
        path: '/ventas',
        name: 'ventas',
        component: () =>
            import ('../components/ventas.vue'),
    },
    {
        path: '/clientes',
        name: 'cliente',
        component: () =>
            import ('../components/Clientes.vue'),
    },
    {
        path: '/usuarios',
        name: 'usuarios',
        component: () =>
            import ('../components/Usuarios.vue'),
    },
    {
        path: '/consultacompras',
        name: 'consultacompras',
        component: () =>
            import ('../components/Bcompras.vue'),
    },
    {
        path: '/consultaventas',
        name: 'consultaventas',
        component: () =>
            import ('../components/Bventas.vue'),
    },
    {
        path: '/articulos',
        name: 'articulos',
        component: () =>
            import ('../components/Articulos.vue'),
    },
    {
        path: '/categorias',
        name: 'categorias',
        component: () =>
            import ('../components/Categorias.vue'),
    },



]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router