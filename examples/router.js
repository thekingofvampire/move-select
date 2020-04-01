import Vue from 'vue'
import Router from 'vue-router'
import moveSelect from './views/Home.vue'
import Home from './components/HelloWorld.vue'
import bottonNav from './components/bottonNav.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path:'/',
			name:'home',
			component:Home
		},
		{
			path: '/moveSelect',
			name: 'moveSelect',
			component: moveSelect
		},
		{
			path: '/bottonNav',
			name: 'bottonNav',
			component: bottonNav
		}
	]
})
