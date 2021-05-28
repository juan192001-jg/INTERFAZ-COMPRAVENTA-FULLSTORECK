import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: "",
        nombre: "",
        email: "",
        rol: ""

    },
    mutations: {
        setToken(state, value) {
            state.token = value;
        },
        Nombre(state, value) {
            state.nombre = value;
        },
        usuario(state, value) {
            state.email = value;
        },
        rol(state, value) {
            state.rol = value;
        }


    },
    actions: {
        setToken(context, value) {
            context.commit("setToken", value)
        },
        Nombre(context, value) {
            context.commit("Nombre", value)
        },
        usuario(context, value) {
            context.commit("usuario", value)
        },
        rol(context, value) {
            context.commit("rol", value)
        }

    },
    modules: {}
})