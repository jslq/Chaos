interface imgobj {
	name: string
	url?: string
	img?: HTMLImageElement
}

interface originObj {
	[propName: string]: string
}

function createloadImgResourseFn(flatten, getObjectKeyValueToArray, createImgPromise) {
    return (obj) => {
        let arr = getObjectKeyValueToArray(obj)
		arr = flatten(arr)
        return Promise.all(arr.map(e => createImgPromise(e)))
    }
}

export const loadImgResourse = createloadImgResourseFn(flatten, getObjectKeyValueToArray, createImgPromise)


export function flatten(arr) {
    return arr.reduce((a, b) => {
        return Array.isArray(b) ? a.concat(b) : a.concat([b])
    }, [])
}

export function convertArrToObj(arr) {
    return arr.reduce((a, b) => {
        if (a[b.name]) {
			if (Array.isArray(a[b.name])) {
				a[b.name].push(b.img)
			} else {
				let arr = []
				arr.push(a[b.name])
				arr.push(b.img)
				a[b.name] = arr
			}
        } else {
            a[b.name] = b.img
        }
        return a
    }, {})
}

export function getObjectKeyValueToArray(obj: originObj) {
    return Object.entries(obj).reduce((a, b) => {
        a.push(Array.isArray(b[1]) ? b[1].map(c => {
            return {
                name: b[0],
                url: c
            }
        }): {
            name: b[0],
            url: b[1]
        })
        return a
    }, [])
}

export function createImgPromise(imgobj: imgobj) {
	return new Promise((resolve, reject) => {
		let img = new Image()
		img.src = imgobj.url
		img.onload = function() {
			return resolve({
				name: imgobj.name,
				img,
			})
		}
		img.onerror = function() {
			return reject(`${imgobj.url} error network，请检查`)
		}
		setTimeout(() => {
            return reject(`${imgobj.url} error network`)
        }, 8000)
	})
}
