<script>
	import url from './main.js';
	 import Vue from 'vue'
	export default {
		onLaunch: function () {
			uni.login({
			  provider: 'weixin',
			  success: function (loginRes) {
				console.log(loginRes.authResult);
			  }
			});
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
			//  uni.getSystemInfo({
			// 	success: function(e) {
			// 		// #ifndef MP
			// 		Vue.prototype.StatusBar = e.statusBarHeight;
			// 		if (e.platform == 'android') {
			// 			Vue.prototype.CustomBar = e.statusBarHeight + 50;
			// 		} else {
			// 			Vue.prototype.CustomBar = e.statusBarHeight + 45;
			// 		};
			// 		// #endif

			// 		// #ifdef MP-WEIXIN
			// 		Vue.prototype.StatusBar = e.statusBarHeight;
			// 		let custom = wx.getMenuButtonBoundingClientRect();
			// 		Vue.prototype.Custom = custom;
			// 		Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
			// 		Vue.prototype.CustomTop = e.statusBarHeight + CustomBar
			// 		// #endif       

			// 		// #ifdef MP-ALIPAY
			// 		Vue.prototype.StatusBar = e.statusBarHeight;
			// 		Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
			// 		// #endif
			// 	}
			// })
			//console.log('App Launch')
			// #ifdef APP-PLUS
			// 锁定屏幕方向
			plus.screen.lockOrientation('portrait-primary'); //锁定
			if(uni.getSystemInfoSync().platform==='ios'){
				uni.setStorage({
					key: 'startup',
					data:{key:1},
					success: function () {
					}
				});
			}
			//#endif
			// #ifdef MP-WEIXIN
			//查询配置信息货币的单位，符号，以及其他配置信息//并且写入缓存
			var apparr ={
					};
			var apppdata = url.getSignStr(apparr);
			uni.request({
				url:url.websiteUrl+'/api_v2/mall_base/base_set',
				method:'POST',
				dataType:'json',
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				data:apppdata,
				success: appres => {
					if(appres.data.status=='y'){
						//console.log(appres);
						//写入缓存
						uni.setStorage({
							key: 'deployinfo',
							data:appres.data.data,
							success: function () {
							}
						});
					}									
				}
			});
			//读取安装的插件
			uni.request({
				url:url.websiteUrl+'/api_v2/apps/index',
				method:'POST',
				dataType:'json',
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				data:apppdata,
				success: appsres => {
					//console.log(appsres);return;
					if(appsres.data.status=='y'){
						//写入缓存
						uni.setStorage({
							key: 'appsinfo',
							data:appsres.data.data.apps,
							success: function () {
							}
						});
					}									
				}
			});
			//#endif
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide');
		}		
	}
</script>

<style>
	/*每个页面公共css */	
	@import "./common/uni.css";	
	/* @import "./font/iconfont.css"; */
	page,
	view {
		/* uni-app默认使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。若不需要flex布局可删除本行*/
	}

	page {
		min-height: 100%;
	}
	.x12{
		width: 100%; height: auto;float:left;
		}
	.x6{
		width: 50%; height: auto;float:left;
	}
	.x4{
		width: 33.3333%; height: auto;float:left;
	}
	.x3{
		width: 25%; height: auto;float:left;
	}
	.x-auto{
		width: auto; height: auto;float:left;
	}
	.float-left{
		float:left;
	}
	.float-right{
		float:right;
	}
	.text-center{
		text-align: center;
	}
	.text-right{
		text-align: right;
	}
	.text-red{
		color: red;
	}
	.text-gray{
		color: #666;
	}
	.text-orange{
		color: #F3A346;
	}
	.text-333{
		color: #333;
	}
	.text-white{
		color: #fff;
	}
	.text-large{
		font-size: 36upx;
	}
	.text-big{
		font-size: 32upx;
	}
	.text-default{
		font-size: 28upx;
	}
	.text-small{
		font-size: 24upx;
	}
	.text-bold{
		font-weight: bold;
	}
	.bg-white{
		background-color: #ffffff;
		}
	.bg-red{
		background-color: #E93B3D;
		}
	.bg-orange{
		background-color: #F3A346;
	}	
	.height{
		line-height: 3em;
	}
	.height-big{
		line-height: 3.4em;
	}
	.border{
		border:red solid 1px;
	}
	.border-right{
		border-right:#ddd solid 1px;
	}
	.border-bottom{
		border-bottom: solid 1px;
	}
	.border-big-bottom{
		border-bottom: solid 3px;
	}
	.border-top{
		border-top: solid 1px;
	}
	.border-orange{
		border-color: #F3A346;
	}
	.border-gray{
		border-color: #F6F6F6;
	}
	.border-fe{
		border-color: #fefefe;
	}
	.border-ddd{
		border-color: #DDDDDD;
	}
	.bg-gray{
		background-color: #F6F6F6;
	}
	.input{
		width: 96%; height: 50upx; padding:2%; border-radius: 5px;
	}
	.padding{
		width: 96%; padding: 2%;
	}
	.margin-little-bottom{
		margin-bottom: 2upx;
	}
	.margin-smll-bottom{
		margin-bottom: 5upx;
	}
	.margin-bottom{
		margin-bottom: 10upx;
	}
	.margin-big-bottom{
		margin-bottom: 20upx;
	}
	.radius{
		border-radius: 10upx;
	}
	.padding-top{
		padding-top: 30upx;
	}
	.padding-small-top{
		padding-top: 20upx;
	}
	.padding-bottom{
		padding-bottom: 30upx;
	}
	.padding-left{
		padding-left: 30upx;
	}
	.padding-small-left{
		padding-left: 20upx;
	}
	.padding-small-right{
		padding-right: 20upx;
	}
	.padding-small-bottom{
		padding-bottom: 20upx;
	}
	.padding-little-top{
		padding-top: 10upx;
	}
	.padding-little-bottom{
		padding-bottom: 10upx;
	}
	.padding-big{
		width: 92%; padding: 4%;
	}
	.margin-top{
		margin-top: 30upx;
	}
	.text-through{
		text-decoration:line-through;
	}
	
	/**选择规格型号的css**/
	.mbg{
		font-size: 26upx;
		border: 1px solid #606060;
		border-radius: 8upx;
		color: #606060;
		text-align: center;
		padding: 4upx 16upx;
		margin-right: 16upx;
		min-width: 96upx;
	}
	.xzbg{
		font-size: 26upx;
		background-color: #1A1A29;
		color: #fff;
		border: 1px solid #1A1A29;
		border-radius: 8upx;
		text-align: center;
		padding: 4upx 16upx;
		margin-right: 16upx;
		min-width: 96upx;
	}
	.pbbg{
		font-size: 26upx;
		border-radius: 8upx;
		text-align: center;
		padding: 4upx 16upx;
		margin-right: 16upx;
		min-width: 96upx;
		background-color: #ccc;
		opacity: 0.4;
		color: #000;
		pointer-events: none;
		}
		
	.productBox {
		width: 690upx;
		background-color: #fff;
		padding: 10upx 30upx 20upx 30upx;
		box-sizing: border-box;
	}
	
	.product-delcom {
		color: #323232;
		font-size: 26upx;
		/**
		border-bottom: 1px solid #EEEEEE;
		**/
	}
	
	.product-delcom .product-name {
		width: 100%;
		height: 80upx;
		line-height: 80upx;
	}
	
	.product-footerlist {
		margin-top: 1upx;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	
	.product-footerlist view {
		border: 1px solid #606060;
		border-radius: 8upx;
		color: #606060;
		text-align: center;
		padding: 4upx 16upx;
		margin-right: 16upx;
		min-width: 96upx;
		margin-bottom: 16upx;
	}
	
	.product-footerlist .productActive {
		background-color: #1A1A29;
		color: #fff;
		border: 1px solid #1A1A29;
	}
	
	.product-footerlist .noneActive {
		background-color: #ccc;
		opacity: 0.4;
		color: #000;
		pointer-events: none;
	}
	/**弹窗样式**/
	.popup-content {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		background-color: #fff;
		padding: 15px;
		font-size: 14px;
		width: 100vw;
		height: 66vh;
	}

</style>