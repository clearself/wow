import Vue from 'vue'
import Vuex from 'vuex'

import referee from "./referee/index";
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {},
	modules: {
		referee
	},
	actions: {

	},
	getters: {

	},
	mutations: {

	}
})
export default store