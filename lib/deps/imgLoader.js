function createloadImgResourseFn(flatten, getObjectKeyValueToArray, createImgPromise) {
    return function (obj) {
        var arr = getObjectKeyValueToArray(obj);
        arr = flatten(arr);
        return Promise.all(arr.map(function (e) { return createImgPromise(e); }));
    };
}
export var loadImgResourse = createloadImgResourseFn(flatten, getObjectKeyValueToArray, createImgPromise);
export function flatten(arr) {
    return arr.reduce(function (a, b) {
        return Array.isArray(b) ? a.concat(b) : a.concat([b]);
    }, []);
}
export function convertArrToObj(arr) {
    return arr.reduce(function (a, b) {
        if (a[b.name]) {
            if (Array.isArray(a[b.name])) {
                a[b.name].push(b.img);
            }
            else {
                var arr_1 = [];
                arr_1.push(a[b.name]);
                arr_1.push(b.img);
                a[b.name] = arr_1;
            }
        }
        else {
            a[b.name] = b.img;
        }
        return a;
    }, {});
}
export function getObjectKeyValueToArray(obj) {
    return Object.entries(obj).reduce(function (a, b) {
        a.push(Array.isArray(b[1]) ? b[1].map(function (c) {
            return {
                name: b[0],
                url: c
            };
        }) : {
            name: b[0],
            url: b[1]
        });
        return a;
    }, []);
}
export function createImgPromise(imgobj) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.src = imgobj.url;
        img.onload = function () {
            return resolve({
                name: imgobj.name,
                img: img,
            });
        };
        img.onerror = function () {
            return reject(imgobj.url + " error network\uFF0C\u8BF7\u68C0\u67E5");
        };
        setTimeout(function () {
            return reject(imgobj.url + " error network");
        }, 8000);
    });
}
