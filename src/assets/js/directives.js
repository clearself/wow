import Vuex from '../../store/index.js'

const value = {
	// 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
  	let innerHTML = el.innerHTML;
    if(el.dataset.placeholder!=innerHTML){
    	el.style.color='#333333';
    }else{
    	el.style.color='#999999';
    }
  },
  componentUpdated:function (el) {
    // 聚焦元素
  	let innerHTML = el.innerHTML;
    if(el.dataset.placeholder!=innerHTML){
    	el.style.color='#333333';
    }else{
    	el.style.color='#999999';
    }
  },
}

export default {
    value,
}