import Touchselect from './touch-select/index'

// 以数组的形式堡村组件，便于遍历   可以存放多个组件
const components = [Touchselect]



// 定义install方法
const install = function (Vue) {
	if (install.installed) return
	install.installed = true

	// 添加全局方法或者属性
	Vue.GlobalData = function(){
		alert(1)
	}

	// 添加实例方法
	// Vue.prototype.$sendMsg = function () {
	// 	console.log(Touchselect);
		
	// }
	// 遍历并注册全局组件
	components.map(component => {
		Vue.component(component.name, component)
	})
}

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}

export default {
	// 导出的对象必须具备一个 install 方法
	install,
	// 组件列表
	...components
}