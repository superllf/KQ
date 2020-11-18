import Vue from "vue";
import axios from 'axios';
import qs from 'qs';
import { Toast ,Dialog} from 'vant';
import {API_SERVER } from '../config'
Vue.use(Dialog)
// 创建axios实例

const service = axios.create({
    baseURL:API_SERVER, // api的base_url
    timeout: 15000, // 请求超时时间
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
})
// request拦截器
service.interceptors.request.use(config => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config
}, error => {
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非0是抛错 可结合自己业务进行修改
         */
        const data = response.data
        if (data.code != 0) {
            Toast({
                title:data.desc,
                message: data.desc
              })
            return Promise.reject('error')
        } else {
            return data
        }
    },
    error => {
        console.log('err' + error) // for debug
        Dialog.alert({
            title: '提示',
            message: error.message
          })
        return Promise.reject(error)
    }
)
export default service