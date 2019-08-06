// 导入组件，组件必须声明 name
import Touchselect from './src/touch-select.vue'

// 为组件添加 install 方法，用于按需引入
Touchselect.install = function (Vue) {

	// 注册组件    name是组件的名称
	Vue.component(Touchselect.name, Touchselect)
}

export default Touchselect