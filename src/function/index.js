export function jsonToParams(data) {
    //json 转 url拼接参数
    try {
        let tempArr = [];
        for (let i in data) {
            let key = encodeURIComponent(i);
            let value = encodeURIComponent(data[i]);
            tempArr.push(key + '=' + value);
        }
        let urlParamsStr = tempArr.join('&');
        return urlParamsStr;
    } catch (err) {
        return '';
    }
}

export function getQueryObject(url) {
    //url 拼接参数转json
    url = url == null ? window.location.href : url;
    let search = url.substring(url.lastIndexOf("?") + 1);
    let obj = {};
    let reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, function (rs, $1, $2) {
        let name = decodeURIComponent($1);
        let val = decodeURIComponent($2);
        val = String(val);
        obj[name] = val;
        return rs;
    });
    return obj;
}

export function getParams(url) {
    //url 拼接参数转json
    url = url == null ? window.location.href : url;
    try {
        let index = url.indexOf('?');
        url = url.match(/\?([^#]+)/)[1];
        let obj = {}, arr = url.split('&');
        for (let i = 0; i < arr.length; i++) {
            let subArr = arr[i].split('=');
            let key = decodeURIComponent(subArr[0]);
            let value = decodeURIComponent(subArr[1]);
            obj[key] = value;
        }
        return obj;

    } catch (err) {
        return null;
    }
}

export function formData(item) {
    //转换成表单
    let form = new FormData();
    // let logF = object.entries();
    // for (; ;) {
    //   let i = logF.next();
    //   if (i.done) break;
    // }
    for (let key in item) {
        form.append(key, item[key]);
    }
    return form;
}

/*-----------------cookie---------------------*/
/*设置cookie*/
export function setCookie(name, value, day) {
    let setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
        for (let i in setting) {
            let oDate = new Date();
            oDate.setDate(oDate.getDate() + day);
            document.cookie = i + '=' + setting[i] + ';expires=' + oDate;
        }
    } else {
        let oDate = new Date();
        oDate.setDate(oDate.getDate() + day);
        document.cookie = name + '=' + value + ';expires=' + oDate;
    }
}
/*获取cookie*/
export function getCookie(name) {
    let arr = document.cookie.split('; ');
    for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split('=');
        if (arr2[0] == name) {
            return arr2[1];
        }
    }
    return '';
}
/*删除cookie*/
export function removeCookie(name) {
    setCookie(name, 1, -1);
}
/*-----------------localStorage---------------------*/
/*设置localStorage*/
export function setLocal(key, val) {
    let ls = window.localStorage;
    // let setting = arguments[0];
    // if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
    //     for (let i in setting) {
    //         ls.setItem(i, JSON.stringify(setting[i]))
    //     }
    // } else {
    let allLoacl = getLocal("allLoacl");
    if (allLoacl == null) {
        let nullObj = {};
        nullObj[key] = val;
        ls.setItem("allLoacl", JSON.stringify(nullObj))
    }
    else {
        allLoacl[key] = val;
        ls.setItem("allLoacl", JSON.stringify(allLoacl));
    }
    // }
}
/*获取localStorage*/
export function getLocal(key, value) {
    if (value == undefined) {
        value = {}
    }
    let ls = window.localStorage;
    try {
        let data = JSON.parse(ls.getItem("allLoacl"));
        if (data == null) {
            return value;
        } else if (key === "allLoacl") {
            return data;
        } else if (!!data[key] && data[key] != undefined) {
            return data[key];
        } else {
            value
        }
    } catch (error) {
        return value;
    }


}
/*移除localStorage*/
export function removeLocal(key) {
    let ls = window.localStorage;
    ls.removeItem(key)
}
/*移除所有localStorage*/
export function clearLocal() {
    let ls = window.localStorage;
    ls.clear()
}
/*-----------------sessionStorage---------------------*/
/*设置sessionStorage*/
export function setSession(key, val) {
    let ss = window.sessionStorage;
    let setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
        for (let i in setting) {
            ss.setItem(i, JSON.stringify(setting[i]))
        }

    } else {
        ss.setItem(key, JSON.stringify(val))
    }
}
/*获取sessionStorage*/
export function getSession(key) {
    let ss = window.sessionStorage;
    if (key) return JSON.parse(ss.getItem(key))
    return null;
}
/*移除sessionStorage*/
export function removeSession(key) {
    let ss = window.sessionStorage;
    ss.removeItem(key)
}
/*移除所有sessionStorage*/
export function clearSession() {
    let ss = window.sessionStorage;
    ss.clear()
}
