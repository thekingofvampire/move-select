import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import TouchSelect from '../packages/index'

import axios from 'axios'
Vue.prototype.$axios = axios;

import async from 'async'
Vue.prototype.$async = async;

import qs from 'qs'
Vue.prototype.$qs = qs;

Vue.use(TouchSelect)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
