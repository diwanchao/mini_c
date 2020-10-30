import Vue from 'vue'
import App from './App'


//下面是必须的组件
import hxNavbar from "@/components/hx-navbar/hx-navbar.nvue"
Vue.component('hx-navbar',hxNavbar)
//end

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
