import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
 const VueRouterReplace = Router.prototype.replace;
	Router.prototype.replace = function replace (to) {
	  return VueRouterReplace.call(this, to).catch(err => err)
	}
const errorPage = () =>
	import('@/pages/error.vue');
const home = () =>
	import('@/pages/home.vue');

export default new Router({
	routes: [{
			path: '/',
			redirect: '/home'
		},
		{
			path: '/error',
			name: 'error',
			component: errorPage,
			meta: {
				title: '系统出错了'
			}
		},
		{
			path: '/home',
			name: 'home',
			component: home,
			meta: {
				title: '首页'
			}
		},

	]
})
