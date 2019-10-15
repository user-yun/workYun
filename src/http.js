import axios from 'axios'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import store from './store';

function isFalse(o) {
    if (
        !o ||
        o === "null" ||
        o === "undefined" ||
        o === "false" ||
        o === "NaN"
    )
        return true;
    return false;
}

axios.defaults.timeout = 10000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头
// axios.defaults.baseURL = 'https://cs01.zg118.com/api/sp';   //配置接口地址
// axios.defaults.baseURL = 'http://121.196.211.83:7779';

axios.defaults.onUploadProgress = function (p) {
    NProgress.set((p.loaded / p.total));
}
axios.defaults.onDownloadProgress = function (p) {
    NProgress.set((p.loaded / p.total));
}

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    //在发送请求之前做某件事
    NProgress.start();
    let token = store.state.userInfo.userToken
    let reqTime = new Date().getTime();
    config.headers.Authorization = `${isFalse(token) ? '' : token}`
    if (config.method === 'post') {
        config.data = {
            ...config.data,
            reqTime: reqTime
        }
    } else if (config.method === 'get') {
        config.params = {
            ...config.params,
            reqTime: reqTime
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
    //对响应数据做些事
    NProgress.done();
    return Promise.resolve(res.data);
}, (error) => {
    NProgress.done();
    return Promise.reject(error);
});

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}
////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: param })
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export default {
    fetchPost,
    fetchGet,
}
