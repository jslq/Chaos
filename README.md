# Chaos

> chaos是一个canvas的应用框架，主要实现canvas的图片组件的渲染和移动端的布局兼容性。可实现对组件的点击事件的逻辑处理。可用于一些小游戏的开发。

## 特性
* 全局数据管理
* 浏览器布局自适应
* 图片资源加载起
* 组件话
* 状态保存和恢复

## 待完善
* 全局状态管理的重构（状态机）
* 应用的快照和恢复
* 更多组件的封装

## 立即体验

### 下载
```console
npm install @jslq/chaos --save
```

## 构造函数
```js
let chaos = new Chaos({
	debug: process.env.NODE_ENV === 'development',
	ratio: 3,
	globalData: {},
	success: () => {},
	error: () => {}
})
```

### 参数

#### debug

开启chaos提示

#### ratio

在移动端，canvas绘制图形和图片的时候会有锯齿，所有需要放大倍数

#### globalData

应用的全局数据管理，可在组件内部读取和设置

#### success

挂载成功了调用

#### error

加载失败后调用


## 方法

### 加载图片资源
```js
chaos.loadImages({
	image1: 'http://abc.image.com/images1',
	imageList: ['http://abc.image.com/images1', 'http://abc.image.com/images2']
})
```
方法返回chaos自身，加载图片资源，会缓存在chaos的_loader对象中

### 挂载canvas
```js
chaos.mount('#container')
```
方法返回chaos自身，将canvas的dom对象append到#container里

### 使用组件
```js
chaos.use('componentName', ImageComponent({}))
```


## 组件

### 图片组件

#### 使用
```js
import { ImageComponent } from '@jslq/chaos'

game.use('adsense3', ImageComponent({
	scope: '',
	x(w, h, $data) {

	},
	y(w, h, $data) {

	},
	w(w, h, $data) {

	},
	h(w, h, $data) {

	},
	operate(w, h) {
		console.log(this)
	},
	draw(ctx, w, h, ratio, $data) {

	}
})
```
#### 可传入参数

**scope**: 对应图片资源加载器的key值

**x**: <number | function >图片组件的x坐标， 可传入具体值，或者函数，函数包含w, h, $data三个参数

w: canvas的逻辑像素宽度(不受ratio影响，实际宽度为w * ratio,在框架内部做转化处理)

h: canvas的逻辑像素高度

$data: 即globalData

**y**: 图片组件的y坐标，其余同x

**w**: 图片组件的逻辑像素宽度，其余同x

**h**: 图片组件的逻辑像素高度，其余同x

**operate**: <function>组件每一帧渲染时会处理里面的逻辑，可以在函数内部对组件的x, y进行运算，函数内部this指向该图片组件，同时拥有w, h参数

**draw**: <function>每个图片组件都有内部的绘制函数，默认使用x, y, w, h的返回值在canvas图层上绘制，函数内部this指向该图片组件，如果需要添加自己的绘制逻辑，有以下形参

ctx: canvas的上下文对象

w: canvas的逻辑像素宽度(不受ratio影响，实际宽度为w * ratio,在框架内部做转化处理)

h: canvas的逻辑像素高度

ratio: 由于draw交给用户处理，实际canvas的物理像素是逻辑像素 * ratio，所以，自己实现的draw方法需要在原来的x, y, w, h尺寸上做ratio的乘法处理
```js
//for example
draw(ctx, w, h, ratio) {
	ctx.drawImage(this.currentImage, this.x * ratio, this.y * ratio, Math.floor((37 / scale) * ratio), h * ratio)
}
```

**onClick**: <function>组件被点击时候使用，函数内部this指向当前组件，可以在这个修改组件的参数和应用的状态


#### 图片组件属性
经过ImageComponent封装后的组件具有以下属性

**_x**: 图片的x坐标的实际物理像素(x * ratio)

**_w**: 图片的y坐标的实际物理像素(y) * ratio)

**_width**: 图片的宽度的实际物理像素(width * ratio)

**_height**: 图片的高度的实际物理像素(height * ratio)

**x**: 图片的x坐标的逻辑像素(height * ratio)

**y**: 图片的y坐标的逻辑像素(height * ratio)

**width**: 图片的宽度的逻辑像素(height * ratio)

**height**: 图片的高度的逻辑像素(height * ratio)

**_ratio**: canvas的缩放比

**$canvas**: canvas对象

**_canvasWidth**: canvas的实际物理像素宽度(canvas.width * ratio)

**_canvasHeight**: canvas的实际物理像素高度

**$images**: 根据scope返回对应图片封装好的离线canvas对象，用来绘制在当前canvas

**operate**: 组件operate属性

**beforwDraw**: 组件draw函数执行前检查属性的正确性

**draw**: 组件绘制函数

**$components**: 所有通过chaos.use生成的组件列表

**$data**: globalData对象

**其他属性**: 任意定义在组件上的属性都会复制到返回的组件的属性上
