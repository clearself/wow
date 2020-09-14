import Vue from 'vue'
import axios from 'axios';
import Qs from 'qs'
import router from '../router/index'
import {
	Message
} from 'element-ui';
//import Vuex from '../store/index.js'
import {
	setsessionStorage
} from '../assets/js/public_fun.js';
// 全局的配置的默认值/defaults
export let axios_config = () => {
	axios.defaults.baseURL = '';
	axios.defaults.headers.post['Content-Type'] = 'application/json'; //'application/x-www-form-urlencoded';
	axios.defaults.timeout = 60000;
}
function getCookie(name) {
    var prefix = name + "="
    var start = document.cookie.indexOf(prefix)
 
    if (start == -1) {
        return null;
    }
 
    var end = document.cookie.indexOf(";", start + prefix.length)
    if (end == -1) {
        end = document.cookie.length;
    }
 
    var value = document.cookie.substring(start + prefix.length, end)
    return unescape(value);
}
axios_config();
var getAjax = result => {
	return new Promise((resolve, reject) => {
		if ((typeof result.data.code !== 'undefined' && result.data.code == 1)) {
			resolve(result.data.data);
		} else {
			if (result.data.code == 2) { //请求成功但流程不对
			console.log(result.data.message);
				Message({
					message: result.data.message,
					type: 'warning'
				});
			} else if (result.data.code == 9999) {
				setsessionStorage('errorInfo', result.data.message)
				router.push('/error')
			} else if (result.data.code == 9005) {
				if (document.getElementsByClassName('el-message').length === 0) {
				      Message({
								message: '登录已失效，请重新登录！',
								type: 'warning'
							});
			     }
				setTimeout(()=>{
					window.location.href = getCookie('basetokenbaseInfo');
				},1500)
			} else {
				Message({
					message: result.data.message,
					type: 'warning'
				});
			}
			reject(result.data);
		}
	})
}
var getAjaxSome = result => {
	return new Promise((resolve, reject) => {
		if ((typeof result.data.code !== 'undefined' && result.data.code == 1)) {
			resolve(result.data);
		} else {
			if (result.data.code == 2) { //请求成功但流程不对
				Message({
					message: result.data.message,
					type: 'warning'
				});
			} else if (result.data.code == 9999) {
				setsessionStorage('errorInfo', result.data.message)
				router.push('/error')
			} else if (result.data.code == 9005) {
				if (document.getElementsByClassName('el-message').length === 0) {
				      Message({
								message: '登录已失效，请重新登录！',
								type: 'warning'
							});
			     }
				setTimeout(()=>{
					window.location.href = getCookie('basetokenbaseInfo');
				},1500)
			} else {
				Message({
					message: result.data.message,
					type: 'warning'
				});
			}
			reject(result.data);
		}
	})
}
//form表单五返回code
var getAjaxVal = result => {
	return new Promise((resolve, reject) => {
		if (result.status == 200) {
			resolve("success");
		} else {
			Message({
				message: result.data.message,
				type: 'warning'
			});
			reject(result.data);
		}
	})
}




//系统列表
export const get_menu = (data) => {
	return axios.request({
		url: 'api/manage/permission/getMenu',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjaxSome(result);
	})
}

//基本漏洞
export const add_loophole = (data) => {
	return axios.request({
		url: 'api/manage/leak/save',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const get_loophole = (data) => {
	return axios.request({
		url: 'api/manage/leak/page',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const delete_loophole = (data) => {
	return axios.request({
		url: 'api/manage/leak/delete',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
//行业漏洞

export const add_loophole_industry = (data) => {
	return axios.request({
		url: 'api/manage/industryLeak/save',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const get_loophole_industry = (data) => {
	return axios.request({
		url: 'api/manage/industryLeak/page',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const delete_loophole_industry = (data) => {
	return axios.request({
		url: 'api/manage/industryLeak/delete',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}

//资产漏洞 领导

export const add_loophole_assets_leader = (data) => {
	return axios.request({
		url: 'api/manage/assetsLeakLeader/save',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const get_loophole_assets_leader = (data) => {
	return axios.request({
		url: 'api/manage/assetsLeakLeader/page',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const delete_loophole_assets_leader = (data) => {
	return axios.request({
		url: 'api/manage/assetsLeakLeader/delete',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const get_handeler = (data) => {
	return axios.request({
		url: 'api/manage/assetsLeakLeader/getAllUsers',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const handelTask_assets_leader = (data) => {
	return axios.request({
		url: 'api/manage/assetsLeakLeader/sendTask',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const handelIngTask_assets_leader = (data) => {
	return axios.request({
		url: 'api/manage/assetsLeakLeader/disposition',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}

//资产漏洞普通人员
export const get_loophole_assets = (data) => {
	return axios.request({
		url: 'api/manage/assetsLeak/page',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const handelIngTask_assets = (data) => {
	return axios.request({
		url: 'api/manage/assetsLeak/disposition',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}


//应用系统漏洞 领导

export const add_loophole_system_leader = (data) => {
	return axios.request({
		url: 'api/manage/systemLeakLeader/save',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const get_loophole_system_leader = (data) => {
	return axios.request({
		url: 'api/manage/systemLeakLeader/page',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const delete_loophole_system_leader = (data) => {
	return axios.request({
		url: 'api/manage/systemLeakLeader/delete',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const get_handeler_system = (data) => {
	return axios.request({
		url: 'api/manage/systemLeakLeader/getAllUsers',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const handelTask_system_leader = (data) => {
	return axios.request({
		url: 'api/manage/systemLeakLeader/sendTask',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const handelIngTask_system_leader = (data) => {
	return axios.request({
		url: 'api/manage/systemLeakLeader/disposition',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const get_system = (data) => {
	return axios.request({
		url: 'api/manage/systemLeakLeader/getAllSystem',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}

//应用系统漏洞普通人员
export const get_loophole_system = (data) => {
	return axios.request({
		url: 'api/manage/systemLeak/page',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const handelIngTask_system = (data) => {
	return axios.request({
		url: 'api/manage/systemLeak/disposition',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}

//概览
export const getLevelBrokenLine = (data) => {
	return axios.request({
		url: 'api/manage/show/getList',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}

export const getLevelList = (data) => {
	return axios.request({
		url: 'api/manage/show/getPage',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}

// 恶意iP库
export const get_ip_detail = (data) => {
	return axios.request({
		url: 'api/manage/spiteIp/getSpiteIp',
		method: 'post',
		data: data,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const get_leak_loop_types = (data) => {
	return axios.request({
		url: 'api/manage/leak/getAllLeakType',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}

export const get_asstes_loop_types = (data) => {
	return axios.request({
		url: 'api/manage/assetsLeakLeader/getAllLeakType',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const get_systemLeakLeader_loop_types = (data) => {
	return axios.request({
		url: 'api/manage/systemLeakLeader/getAllLeakType',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const get_industryLeak_loop_types = (data) => {
	return axios.request({
		url: 'api/manage/industryLeak/getAllLeakType',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}


