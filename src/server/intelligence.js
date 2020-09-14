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



//威胁情报--获取所有攻击方式
export const get_attackWay =  (data) => {
  return axios.request({
    url: 'api/manage/intelligence/getAllAttackMode',
    method: 'post',
    data: data,
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}
//威胁情报--列表
export const get_attackList=  (data, page, pageSize) => {
  return axios.request({
    url: `api/manage/intelligence/page?page=${page}&pageSize=${pageSize}`,
    method: 'post',
    data: data,
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}
//威胁情报--添加、修改
export const save_attack =  (data) => {
  return axios.request({
    url: 'api/manage/intelligence/save',
    method: 'post',
    data: data,
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}
//威胁情报--删除
export const del_attack =  (data) => {
  return axios.request({
    url: 'api/manage/intelligence/delete',
    method: 'post',
    data: data,
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}
//常用端口--列表
export const get_commonPort=  (data, page, pageSize) => {
  return axios.request({
    url: `api/manage/port/page?page=${page}&pageSize=${pageSize}`,
    method: 'post',
    data: data,
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}
