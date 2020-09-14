// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import $ from 'jquery'
import './assets/css/element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css';

//import loadsh from 'lodash'
//Vue.prototype.$loadsh = loadsh;
//import $ from 'jquery'
require('./icon/iconfont.css');
Vue.use(Element)
import store from './store'
//自定义组件库
import FLYmodules from './components/modules/index.js'
Vue.use(FLYmodules)
//自定义全局方法库
import PublicFun from './assets/js/exit_fun.js'
Vue.use(PublicFun)
//自定义过滤器
import filters from './assets/js/filters.js'
//过滤器统一处理加载
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key]);
})
//指令统一处理加载
import directives from './assets/js/directives.js'
Object.keys(directives).forEach(key => {
	Vue.directive(key, {
		bind: directives[key].bind,
		inserted: directives[key].inserted,
		update: directives[key].update,
		componentUpdated: directives[key].componentUpdated,
		unbind: directives[key].unbind,
	});
})
//路由切换加载进度条
import LoadingBar from './components/loading-bar';
LoadingBar.config({
   color: '#5cb85c'
})
router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	if(to.meta.title) {
		document.title = to.meta.title;
	}
	LoadingBar.start();
	next();
})
router.afterEach(transition => {
	LoadingBar.finish();
});
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
