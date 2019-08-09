# moveselect

### 项目简介

自从用了mint-ui的picker插件之后，感觉效果很好，就想自己写一个联级滑动选择的插件，耗时写了两个星期写出了这个差强人意的插件，还有很多地方需要改进，暂时先上传第一版。等彻底完善之后再上传npm

#### 参数介绍

```javascript
/**
	data  传到组件里面的参数   Arrary
	name  字段的键  不传参默认为'name'  String
	dataOption  必传defaultIndex  默认显示第几个   Array
	title  联级选择的标题   Object
			name   标题
			tips   标题注释
	children1  子集的键    如果不传默认children
	children2  孙集的键	   如果不传默认children
	isBtn   是否显示取消 确认案件  true    返回值在点击确认的时候返回
							    false   返回值在每次滑动结束的时候返回
*/
```

```
npm install
```

#### 依然存在的问题

1. 一个页面暂时只能使用一次，需要更改js代码（待解决）
2. 滑动效果没有滚筒的效果，css需要重新写
3. 在以上两个完成之后，会把当前插件使用js重新编写，不使用.vue后缀的文件，使用时只需要引入js，并且在main.js里面定义全局变量。
