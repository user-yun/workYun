import Vue from 'vue'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import router from './router';
import store from './store';
import { getLocal, clearLocal } from "@/function";
// import log from "@/function";

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

function setRouterHistory(toHandler, to) {
    // if (!to.meta.noQuickTabs && !to.meta.noKeepAlive && to.meta.icon) {
    if ((!!to.meta.icon && !to.meta.noKeepAlive) || (!!to.meta.icon && !to.meta.noQuickTabs)) {
        let routerHistory = store.state.otherInfo.routerHistory
        if (isFalse(routerHistory)) {
            let rhObj = {};
            Vue.set(rhObj, to.name, toHandler);
            store.dispatch("upVuex", {
                mutations: "setOtherInfo",
                value: { routerHistory: rhObj }
            });
        } else {
            Vue.set(routerHistory, to.name, toHandler);
            store.dispatch("upVuex", {
                mutations: "setOtherInfo",
                value: { routerHistory: routerHistory }
            });
        }
    }
}

function notAllowMessage(next) {
    Vue.prototype.$message({
        message: store.state.language.notAllow,
        type: "error",
        duration: 8000,
        customClass: "messageBox"
    });
    next(false);
    router.back();
}

function nextTo(name, to, next) {
    next({
        name,
        params: {
            redirect: to.name
        }
    });
}

router.beforeEach((to, from, next) => {
    NProgress.start();
    let toHandler = {
        name: to.name,
        path: to.path,
        meta: to.meta,
    }

    let meta = to.meta;
    // if (isFalse(meta.intercept)) {//是否需要拦截 否
    if (meta.intercept == false) {//是否需要拦截 否
        setRouterHistory(toHandler, to);
        next();
    } else if (meta.intercept == true) {
        let userRole = store.state.userInfo.userRole;
        if (isFalse(userRole)) {//是否拥有角色 否
            let userMemory = getLocal("userMemory");
            if (!isFalse(userMemory) && Object.keys(userMemory).length > 0) {//是否本地有记忆 有
                let second = userMemory.userInfo.lastTime.second;
                let nowSecond = new Date().getTime();
                let obsoleteTime = 0.5 * 60 * 60 * 1000 * 48;//用户登录时间判断拦截
                if (nowSecond - second < obsoleteTime) {
                    store.dispatch("upVuex", {
                        mutations: "setUserInfo",
                        value: userMemory.userInfo
                    });
                    store.dispatch("upVuex", {
                        mutations: "setOtherInfo",
                        value: userMemory.otherInfo
                    });
                    store.dispatch("upVuex", {
                        mutations: "setLanguage",
                        value: userMemory.language
                    });
                    let userMRole = store.state.userInfo.userRole;
                    if (meta.role.includes(userMRole)) {//是否角色可以跳转路由 是
                        setRouterHistory(toHandler, to);
                        next();
                    } else {
                        notAllowMessage(next);
                    }
                } else {
                    // clearLocal();
                    nextTo("login", to, next);
                }
            } else {// 否
                nextTo("login", to, next);
            }
        } else {//有角色就可以跳转 等待加时间限制
            if (meta.role.includes(userRole)) {//是否角色可以跳转路由 是
                setRouterHistory(toHandler, to);
                next();
            } else {
                notAllowMessage(next);
            }
        }
    } else if (from.name == "login") {
        nextTo("ready", to, next);
    } else {
        notAllowMessage(next);
    }
    NProgress.done();
});

router.afterEach(transition => {
    NProgress.done();
});