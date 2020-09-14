import {
	getTime,
	get_deviceInfo,
	isClick,
	setsessionStorage,
	removesessionStorage,
	getQueryString,
	getsessionStorage,
	removelocalStorage,
	setlocalStorage,
	getlocalStorage,
	typeOf,
	getObjectValue,
	Format,
	nativeBack,
	hasClass,
	addClass,
	removeClass,
	uni,
	accMul,
	accDiv,
	accAdd,
	getCookie,
} from './public_fun.js'
//import {
//	page_nextTick,
//	page_created,
//	phone_send,
//	phone_call,
//	time_formatting,
//} from '../../components/plungs/pagematch.js'
//import {
//	info_popup
//} from '../../components/plungs/info_popup.js'
//import {
//	loading
//} from '../../components/plungs/loading.js'
//import {
//	toast,
//	hidetoast,
//	msg,
//	hidemsg,
//	uploading,
//	hideuploading
//} from '../../components/index.js'
export default {
	version: '0.0.1',
	install: function(Vue) {
		Vue.prototype.$getTime = getTime;
		Vue.prototype.$isClick = isClick;
		Vue.prototype.$setsessionStorage = setsessionStorage;
		Vue.prototype.$removesessionStorage = removesessionStorage;
		Vue.prototype.$getQueryString = getQueryString;
		Vue.prototype.$getsessionStorage = getsessionStorage;
		Vue.prototype.$removelocalStorage = removelocalStorage;
		Vue.prototype.$setlocalStorage = setlocalStorage;
		Vue.prototype.$getlocalStorage = getlocalStorage;
		Vue.prototype.$typeOf = typeOf;
		Vue.prototype.$uni = uni;
		
		Vue.prototype.$hasClass = hasClass;
		Vue.prototype.$addClass = addClass;
		Vue.prototype.$removeClass = removeClass;

		Vue.prototype.$deepCopy = (obj) => {
			let strObj = JSON.stringify(obj);
			return JSON.parse(strObj);
		};
		//js精度问题处理
		Vue.prototype.$accDiv = accDiv;
		Vue.prototype.$accMul = accMul;
		Vue.prototype.$accAdd = accAdd;
		Vue.prototype.$NullStr = (str) => {
			if((str + '' === '') || (str == null)) {
				return '--';
			} else {
				return str;
			}
		};
		Vue.prototype.$getCookie = getCookie;
		
		Vue.prototype.$toThousands = (num) => {
			     var num = (num || 0).toString(), result = '';
			     while (num.length > 3) {
			         result = ',' + num.slice(-3) + result;
			         num = num.slice(0, num.length - 3);
			     }
			     if (num) { result = num + result; }
			     return result;
			};
		Vue.prototype.$NullToStr = (obj) => {
			if(obj == null) {
				return '';
			} else {
				return obj;
			}
		};
	},
}