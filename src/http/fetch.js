import axios from 'axios'
import { Toast } from 'vant';
import qs from 'qs';
import CryptoJS from 'crypto-js';
import Base from 'Base/js/base64'
import Cookies from 'js-cookie'

const base = new Base();


let token ='';
let tel= '';

let url= '';




const serve = axios.create({
	// baseURL:API_SERVER, // api的base_url
	// baseURL:process.env.VUE_APP_API_URL, // api的base_url
	timeout: 15000, // 请求超时时间
	headers: { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' }
})

serve.interceptors.request.use(config => {
	// console.log(config)
	url= config.url;

	let getToken= JSON.parse(window.localStorage.getItem('loginData'))
	// let getToken= '123'
	if(getToken){
		//
		token = getToken.token
	}else {
		tel = window.localStorage.getItem('tel')
		let str= `${tel}#${new Date().getTime()}`;

		const key= CryptoJS.enc.Utf8.parse('mobile0123456789');
		const iv= CryptoJS.enc.Utf8.parse('mobile0123456789');
		const encrypted = CryptoJS.AES.encrypt(str, key, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		token= encrypted.toString() + '$';
	}


	if (config.method === 'post') {
		config.data = qs.stringify(config.data);
		config.headers.common['token'] = `${token}` 
	}
	return config
}, error => {
	Promise.reject(error)
})

// respone拦截器
serve.interceptors.response.use(
	response => {
		/**
		 * code为非0是抛错 可结合自己业务进行修改
		 */
		const res = response.data
        if (!res) {
            return 'error'
		}


		if(res.hasOwnProperty('@')){
			let data = null;
			if(url.indexOf('service/qrcode64')  > -1){
				data= decodeURIComponent(base.decode(res["@"]));
				return data;
			}else {
				data=  JSON.parse(decodeURIComponent(base.decode(res["@"])));
			}

			console.log(data)
			switch (data.result) {
				case 'success':
					return data
					break;
				case 'fail':
					data.data = []
					return data
					break;
				case 'error':
				case 'timeout':
					Toast('登录超时,请重新登录');
					Cookies.remove('login');
					window.location.href= localStorage.getItem('url');
					return data;
					break;
				case 'qpslimit':
				case 'resubmit':
					Toast(data.message)
					return Promise.reject('error')
					break;
				default:
					return res
			}
		}else {
			switch (res.result) {
				case 'success':
					return res
					break;
				case 'fail':
					res.data = []
					return res
					break;
				case 'error':
				case 'timeout':
					Toast('登录超时,请重新登录');
					Cookies.remove('login');
					window.location.href= localStorage.getItem('url');
					return res;
					break;
				case 'qpslimit':
				case 'resubmit':
					Toast(data.message)
					return Promise.reject('error')
					break;
				default:
					return res
					// console.log(JSON.parse(decodeURIComponent(base.decode(res["@"]))))
					// console.log((decodeURIComponent(base.decode(res["@"]))))
					// if(url.indexOf('service/qrcode64')  > -1){
					// 	return decodeURIComponent(base.decode(res["@"]))
					// }else {
					// 	// return JSON.parse(decodeURIComponent(base.decode(res["@"])))
					// }
			}
		}



	},
	error => {
		console.log('err' + error) // for debug
		Toast(data.message)
		return Promise.reject(error)
	}
)
export default serve