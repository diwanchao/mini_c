# 感谢
---
本组件提取的 `ColorUI`中的头部导航栏。 

在此感谢 `@文晓港` 提供的非常优秀的UI框架，推荐大家使用：https://github.com/weilanwl/ColorUI ； https://ext.dcloud.net.cn/plugin?id=239。

# 组件引用
---
```
/* main.js中引用 */
import sundehengCustom from './components/sundeheng-custom/sundeheng-custom.vue'
Vue.component('sundeheng-custom',sundehengCustom)
```
# 页面使用
---
```
<template>
	<view>
		<sundeheng-custom bgColor="" bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" :isBack="true" @rightcli='rightcli'><block slot="backText">左边</block><block slot="content">中间</block><block slot="right">右边</block></sundeheng-custom>
	</view>
</template>
```
# 注意
---
 导入的插件中没有带App.vue里面的代码，请复制以下代码到App.vue里面，或者直接下载项目示例参考
```		
<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
```
