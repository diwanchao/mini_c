<template>
    <!-- <view v-if="xShow==true"> -->
	<view>
		<!-- <hx-navbar :config="config" /> -->
		<view class="x12 padding">
			<view class="x12 bg-white padding-big" style="border-radius: 6px;">
				<view class="x-auto">
					<image src="https://div.buy315.com.cn/xcx_imgs/czqr1.png"  mode="aspectFill" style="width: 84upx; height: 84upx;"></image>
				</view>
				<view class="x-auto" style="font-size: 14pt; width: 550upx; color: #F65A2A; padding-left: 20upx;">
					<view class="x12">{{deployinfo.monetary_symbol}}{{orderInfo.pay_money}}</view>
					<view class="x12" style="font-size: 10pt; color: #393D4A;">订单编号:{{orderInfo.order_code}}</view>
					<view class="x12" style="font-size: 10pt; color: #393D4A;">名称:{{orderInfo.all_goods_titles}}</view>
				</view>
			</view>
		</view>
		<view class="x12 padding-big">
			<view style="height: 20upx; width: 440upx; border-bottom: solid #CCCCCC 1px; margin: auto;"></view>
			<view class="x12 text-center" style="font-size: 13pt; color: #747C96; margin-top: -24upx;">
				<span class="" style="background-color:#F5F5F5; padding:0 10upx;">请选择支付方式</span>
			</view>
		</view>
			
			<view class="x12 center-list bg-white border-top border-gray" style="margin-top: 0; padding:0 20upx; width: 710upx;" v-for="(item,index) in pay_methods" :key="index" @click="goPay(item.pay_method)">
				<view class="center-list-item" style="height: 100upx;">
					<view class="x-auto text-gray text-big" style="padding-top: 30upx;">
						<view class="x-auto" style="padding-top: 4upx; padding-right: 20upx;">
							<view style="display: table-cell; vertical-align: middle; text-align: center; width: 36upx; height: 36upx;">
								<image :src="item.img" style="width: 36upx; height: 36upx;"></image>
							</view>
						</view>
						<view class="x-auto" style="font-size: 12pt; padding-top: 0upx;">{{item.name}}</view>
					</view>
					<view class="x-auto float-right"  style="padding-top: 28upx;">
						<image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" style="width: 16upx; height: 28upx;"></image>
					</view>
				</view>
			</view>
		
    </view>
</template>
<script>import url from '../../main.js';
	export default {
		//#ifdef MP-WEIXIN
		onShareAppMessage(res) {//分享
			try {//从本地缓存中同步获取指定 key 对应的内容。
				var mv = uni.getStorageSync('memberinfo');
				var xv = uni.getStorageSync('xshopInfo');
				if (res.from === 'button') {// 来自页面内分享按钮
				  console.log(res.target)
				}
				return {
				  title: xv.store.stores_name,
				  path: '/pages/home/index?member_openid='+mv.openid+"&stores_id="+xv.store.stores_id
				}
			} catch (e) {
				// error
			}
			
		  },
		//#endif
		data() {
			return {
				// config:{
				// 	title: '支付确认',
				// 	color: '#ffffff',
				// 	backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
				// 	statusBarFontColor:'#fff'
				// },
			xShow:false,
			deployinfo:{},//配置信息货币单位，符号，以及其他的一些配置参数
			memberinfo:[],
			login:false,
			payinfo:[],
			orderInfo:[],
			pay_methods:[],
			if_pwd:2,
			ck:0,
			}
		},
		onLoad:function(data){
			uni.showLoading({
				title: '加载中'
			});
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				this.deployinfo = uni.getStorageSync('deployinfo');
				if (value) {
					this.memberinfo = value;
					this.login = true;
					if(!this.login){
						uni.navigateTo({
							url:"/pages/login/login"
						})
						return;
					}
				}
			} catch (e) {
				// error
			}
			this.orderInfo = JSON.parse(data.orderInfo);
			this.pay_methods = JSON.parse(data.pay_methods);
			//console.log(this.pay_methods);
			this.if_pwd = JSON.parse(data.if_pwd);
			this.ck = data.ck;
			this.xShow = true;
			uni.hideLoading();
		},
		methods: {
			//获取支付方式
			goPay(data){
				//#ifdef APP-PLUS
				if(uni.getSystemInfoSync().platform==='ios'){
					var programtype = 2;
				}else if(uni.getSystemInfoSync().platform==='android'){
					var programtype = 1;
				}else{
					var programtype = 3;
				}
				//#endif
				//#ifdef MP-WEIXIN
					var programtype = 3;
				//#endif
				if(this.ck==1){
					if(data==5){
						if(this.if_pwd==2){
							//会员卡支付不要密码
							var arr ={
									order_code:this.orderInfo.order_code,
									pay_method:data,
								};
							var pdata = url.getSignStr(arr);
							uni.showModal({
								title: '提示',
								content: '确定使用会员卡余额支付',
								success: function (res) {
									if (res.confirm) {
										try {
											uni.request({
												url:url.websiteUrl+'/api_v2/once_cards/pay',
												method:'POST',
												dataType:'json',
												header:{
													'content-type':'application/x-www-form-urlencoded'
												},
												data:pdata,
												success: res => {
													//console.log(res.data);
													if(res.data.status=='y'){
														uni.redirectTo({
															url:"pay_ts"
														})													
													}else{
														uni.showToast({
															icon: 'none',
															title: res.data.info
														});
													}
												},
												fail: () => {},
												complete: () => {}
											});
										} catch (e) {
											// error
										}
										
									} else if (res.cancel) {
										//console.log('用户点击取消');
									}
								}
							});
							return;
						}else{
							//会员卡支付要密码
							uni.navigateTo({
								url:"member_money_pay?pay_code="+this.orderInfo.order_code+"&pay_method="+data+"&ck=1"
							});
							return;
						}
					}else if((data==2 || data==553 || data==1702 || data==1650  || data==1901 || data==2001) && programtype==3){
						uni.showToast({
							title: '正在加载...',
							icon:'none'
						});
						//微信小程序支付
						wx.login({
							success: res => {
									//下单
									var arr ={
											order_code:this.orderInfo.order_code,
											pay_method:data,
											code:res.code,
										};
									var pdata = url.getSignStr(arr);
									uni.request({
										url:url.websiteUrl+'/api_v2/once_cards/pay',
										method:'POST',
										dataType:'json',
										header:{
											'content-type':'application/x-www-form-urlencoded'
										},
										data:pdata,
										success: res => {
											//console.log(res.data);
											if(res.data.status=='y'){
												if(data==1702 || data==1650 || data==1901 || data==2001){
													var payInfox = res.data.data.pay_info;
												}else{
													var payInfox = JSON.parse(res.data.data.pay_info);
												}
												//console.log(payInfox);
												uni.requestPayment({
													provider: 'wxpay',
													timeStamp: payInfox.timeStamp,
													nonceStr: payInfox.nonceStr,
													package: payInfox.package,
													signType: payInfox.signType,
													paySign: payInfox.paySign,
													success: function (res) {
														console.log('success:' + JSON.stringify(res));
														//支付成功跳转到成功提示界面
														uni.navigateTo({
															url:"pay_ts"
														})
													},
													fail: function (err) {
														console.log('fail:' + JSON.stringify(err));
														//没有进行支付
													}
												});
											}else{
												uni.showToast({
													icon: 'none',
													title: res.data.info
												});
												return;
											}
											//console.log(res.data);
										}
									});
								
							},
						});
					}else if((data==2 || data==3 || data==554) && programtype<3){
						uni.showToast({
							title: '正在加载...',
							icon:'none'
						});
						//app支付
						var pay_m = (data==3)?('alipay'):('wxpay');
						var arr ={
								order_code:this.orderInfo.order_code,
								pay_method:data,
							};
						var pdata = url.getSignStr(arr);
						uni.request({
							url:url.websiteUrl+'/api_v2/once_cards/pay',
							method:'POST',
							dataType:'json',
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							data:pdata,
							success: res => {
								//console.log(JSON.stringify(res.data));
								if(res.data.status=='y'){									
									var payInfox = res.data.data.pay_info;
									//console.log(payInfox);
									uni.requestPayment({
										provider: pay_m,
										orderInfo: payInfox, 
										success: function (res) {
											console.log('success:' + JSON.stringify(res));
											//支付成功跳转到成功提示界面
											uni.navigateTo({
												url:"pay_ts"
											})
										},
										fail: function (err) {
											console.log('fail:' + JSON.stringify(err));
											//没有进行支付
										}
									});
								}else{
									uni.showToast({
										icon: 'none',
										title: res.data.info
									});
									return;
								}
								//console.log(res.data);
							}
						});
					}else{
						//其他没有实际功能的支付方式-记账支付
						var xthis = this;
						uni.showModal({
							title: '提示',
							content: '确认支付',
							success: function (res) {
								if (res.confirm) {
									//console.log('用户点击确定');
									var arr ={
											member_openid: xthis.memberinfo.openid,
											pay_code:xthis.orderInfo.pay_code,
											origin:programtype,
											pay_method:data,
										};
									var pdata = url.getSignStr(arr);
									uni.request({
										url:url.websiteUrl+'/api_v2/mall_pay/pay',
										method:'POST',
										dataType:'json',
										header:{
											'content-type':'application/x-www-form-urlencoded'
										},
										data:pdata,
										success: xres => {
											
											if(xres.data.status=='y'){
												xthis.orderInfo.pay_code = xres.data.pay_code;
												uni.redirectTo({
													url:"pay_ts"
												})													
											}else{
												uni.showToast({
													icon: 'none',
													title: xres.data.info
												});
											}
										},
										fail: () => {},
										complete: () => {}
									});
									
								} else if (res.cancel) {
									//console.log('用户点击取消');
								}
							}
						});
					}
				}else{
					if(data==11){
						//挂账支付
						var arr ={
								member_openid: this.memberinfo.openid,
								pay_code:this.orderInfo.pay_code,
								origin:programtype,
								pay_method:data,
							};
						var pdata = url.getSignStr(arr);
						var that = this;
						uni.showModal({
							title: '提示',
							content: '确定使用挂账支付',
							success: function (res) {
								if (res.confirm) {
									try {
										uni.request({
											url:url.websiteUrl+'/api_v2/mall_pay/pay',
											method:'POST',
											dataType:'json',
											header:{
												'content-type':'application/x-www-form-urlencoded'
											},
											data:pdata,
											success: res => {
												
												if(res.data.status=='y'){
													that.orderInfo.pay_code = res.data.pay_code;
													uni.redirectTo({
														url:"pay_ts"
													})													
												}else{
													uni.showToast({
														icon: 'none',
														title: res.data.info
													});
												}
											},
											fail: () => {},
											complete: () => {}
										});						
									} catch (e) {
										// error
									}
									
								} else if (res.cancel) {
									//console.log('用户点击取消');
								}
							}
						});
						return;
					}else if(data==5){
						if(this.if_pwd==2){
							//会员卡支付不要密码
							var arr ={
									member_openid: this.memberinfo.openid,
									pay_code:this.orderInfo.pay_code,
									origin:programtype,
									pay_method:data,
								};
							var pdata = url.getSignStr(arr);
							var that = this;
							uni.showModal({
								title: '提示',
								content: '确定使用会员卡余额支付',
								success: function (res) {
									if (res.confirm) {
										try {
											uni.request({
												url:url.websiteUrl+'/api_v2/mall_pay/pay',
												method:'POST',
												dataType:'json',
												header:{
													'content-type':'application/x-www-form-urlencoded'
												},
												data:pdata,
												success: res => {
													if(res.data.status=='y'){
														that.orderInfo.pay_code = res.data.pay_code;
														uni.redirectTo({
															url:"pay_ts"
														})													
													}else{
														uni.showToast({
															icon: 'none',
															title: res.data.info
														});
													}
												},
												fail: () => {},
												complete: () => {}
											});						
										} catch (e) {
											// error
										}
										
									} else if (res.cancel) {
										//console.log('用户点击取消');
									}
								}
							});
							return;
						}else{
							//会员卡支付要密码
							uni.navigateTo({
								url:"member_money_pay?pay_code="+this.orderInfo.pay_code
							});
							return;
						}
					}else if(data==2 || data==1702 || data==1650 || data==1901 || data==2001){
						//微信支付
						if(programtype==3){
							uni.showLoading({
							    title: '加载中'
							});
							//微信支付时获取code  小程序支付
							var that = this;
							wx.login({							
								success: res => {
									//获取order_code							
									//获取信息
									//console.log(res.code);return;
									var arr ={
											member_openid: that.memberinfo.openid,
											pay_code:that.orderInfo.pay_code,
											origin:programtype,
											pay_method:data,
											code:res.code,
											pwd:'',
										};
									var pdata = url.getSignStr(arr);
									uni.request({
										url:url.websiteUrl+'/api_v2/mall_pay/pay',
										method:'POST',
										dataType:'json',
										header:{
											'content-type':'application/x-www-form-urlencoded'
										},
										data:pdata,
										success: res => {
											//console.log(res.data);return;
											//console.log(JSON.parse(res.data.data));return;
											uni.hideLoading();
											if(res.data.status=='y'){
												that.orderInfo.pay_code = res.data.pay_code;
												if(data==1702 || data==1650 || data==1901 || data==2001){
													var payInfox = res.data.data;
												}else{
													var payInfox = JSON.parse(res.data.data);
												}
												//console.log(payInfox);
												uni.requestPayment({
													provider: 'wxpay',
													timeStamp: payInfox.timeStamp,
													nonceStr: payInfox.nonceStr,
													package: payInfox.package,
													signType: payInfox.signType,
													paySign: payInfox.paySign,
													success: function (res) {
														console.log('success:' + JSON.stringify(res));
														//支付成功跳转到成功提示界面
														uni.navigateTo({
															url:"pay_ts"
														})
													},
													fail: function (err) {
														console.log('fail:' + JSON.stringify(err));
														//没有进行支付
													}
												});
												return;
											}else{
												uni.showToast({
													icon: 'none',
													title: res.data.info
												});
												return;
											}
										},
										fail: () => {},
										complete: () => {}
									});
								},
							});
						}else{
							uni.showLoading({
							    title: '加载中'
							});
							//console.log('app支付');
							//微信app支付
							//获取信息
							var arr ={
									member_openid: this.memberinfo.openid,
									pay_code:this.orderInfo.pay_code,
									origin:programtype,
									pay_method:data,
									code:'',
									pwd:'',
								};
							var pdata = url.getSignStr(arr);
							uni.request({
								url:url.websiteUrl+'/api_v2/mall_pay/pay',
								method:'POST',
								dataType:'json',
								header:{
									'content-type':'application/x-www-form-urlencoded'
								},
								data:pdata,
								success: res => {
									uni.hideLoading();
									//console.log(res.data.data);
									if(res.data.status=='y'){
										this.orderInfo.pay_code = res.data.pay_code;
										var payInfox = res.data.data;
										//微信支付
										uni.requestPayment({
											provider: 'wxpay',
											orderInfo: payInfox, //订单数据
											success: function (res) {
												console.log('success:' + JSON.stringify(res));
												//支付成功跳转到成功提示界面
												uni.navigateTo({
													url:"pay_ts"
												})
											},
											fail: function (err) {
												console.log('fail:' + JSON.stringify(err));
											}
										});
									}else{
										uni.showToast({
											icon: 'none',
											title: res.data.info
										});
										return;
									}
								}
							});
						}
					}else if(data==553 || data==554){
						//通联支付--和微信支付一致
						if(programtype==3){
							uni.showLoading({
							    title: '加载中'
							});
							wx.login({							
								success: res => {
									//获取order_code							
									//获取信息
									//console.log(res.code);return;
									var arr ={
											member_openid: this.memberinfo.openid,
											pay_code:this.orderInfo.pay_code,
											origin:programtype,
											pay_method:data,
											code:res.code,
											pwd:'',
										};
									var pdata = url.getSignStr(arr);
									uni.request({
										url:url.websiteUrl+'/api_v2/mall_pay/pay',
										method:'POST',
										dataType:'json',
										header:{
											'content-type':'application/x-www-form-urlencoded'
										},
										data:pdata,
										success: res => {
											uni.hideLoading();
											//console.log(res.data);
											//console.log(res.data);return;
											//console.log(JSON.parse(res.data.data));return;	
											
											if(res.data.status=='y'){
												this.orderInfo.pay_code = res.data.pay_code;
												var payInfox = JSON.parse(res.data.data.payinfo);
												uni.requestPayment({
													provider: 'wxpay',
													timeStamp: payInfox.timeStamp,
													nonceStr: payInfox.nonceStr,
													package: payInfox.package,
													signType: payInfox.signType,
													paySign: payInfox.paySign,
													success: function (res) {
														console.log('success:' + JSON.stringify(res));
														//支付成功跳转到成功提示界面
														uni.navigateTo({
															url:"pay_ts"
														})
													},
													fail: function (err) {
														console.log('fail:' + JSON.stringify(err));
														//没有进行支付
													}
												});
												return;
											}else{
												uni.showToast({
													icon: 'none',
													title: res.data.info
												});
												return;
											}
										},
										fail: () => {},
										complete: () => {}
									});
								},
							});
						}else{
							uni.showLoading({
							    title: '加载中'
							});
							//console.log('app支付');
							//通联支付app支付
							//获取信息
							var arr ={
									member_openid: this.memberinfo.openid,
									pay_code:this.orderInfo.pay_code,
									origin:programtype,
									pay_method:data,
									code:'',
									pwd:'',
								};
							var pdata = url.getSignStr(arr);
							uni.request({
								url:url.websiteUrl+'/api_v2/mall_pay/pay',
								method:'POST',
								dataType:'json',
								header:{
									'content-type':'application/x-www-form-urlencoded'
								},
								data:pdata,
								success: res => {
									uni.hideLoading();
									//console.log('通联支付app支付');
									//console.log(res.data);
									if(res.data.status=='y'){
										this.orderInfo.pay_code = res.data.pay_code;
										var payInfox = res.data.data.payinfo;
										//微信支付
										uni.requestPayment({
											provider: 'wxpay',
											orderInfo: payInfox, //订单数据
											success: function (res) {
												console.log(res)
												console.log('success:' + JSON.stringify(res));
												//支付成功跳转到成功提示界面
												uni.navigateTo({
													url:"pay_ts"
												})
											},
											fail: function (err) {
												console.log('fail:' + JSON.stringify(err));
											}
										});
									}else{
										uni.showToast({
											icon: 'none',
											title: res.data.info
										});
										return;
									}
								}
							});
						}
					}else if(data==3){
						uni.showLoading({
						    title: '加载中'
						});
						//支付宝支付
						//获取信息
						var arr ={
								member_openid: this.memberinfo.openid,
								pay_code:this.orderInfo.pay_code,
								origin:programtype,
								pay_method:data,
							};
						var pdata = url.getSignStr(arr);
						uni.request({
							url:url.websiteUrl+'/api_v2/mall_pay/pay',
							method:'POST',
							dataType:'json',
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							data:pdata,
							success: res => {
								uni.hideLoading();
								if(res.data.status=='y'){
									this.orderInfo.pay_code = res.data.pay_code;
									var payInfox = res.data.data;
									//支付宝支付
									uni.requestPayment({
										provider: 'alipay',
										orderInfo: payInfox, //订单数据
										success: function (res) {
											console.log('success:' + JSON.stringify(res));
											//支付成功跳转到成功提示界面
											uni.navigateTo({
												url:"pay_ts"
											})
										},
										fail: function (err) {
											console.log('fail:' + JSON.stringify(err));
										}
									});
								}else{
									uni.showToast({
										icon: 'none',
										title: res.data.info
									});
									return;
								}					
							}
						});
					}else{
						//其他没有实际功能的支付方式-记账支付
						var xthis = this;
						uni.showModal({
							title: '提示',
							content: '确认支付',
							success: function (res) {
								if (res.confirm) {
									//console.log('用户点击确定');
									var arr ={
											member_openid: xthis.memberinfo.openid,
											pay_code:xthis.orderInfo.pay_code,
											origin:programtype,
											pay_method:data,
										};
									var pdata = url.getSignStr(arr);
									uni.request({
										url:url.websiteUrl+'/api_v2/mall_pay/pay',
										method:'POST',
										dataType:'json',
										header:{
											'content-type':'application/x-www-form-urlencoded'
										},
										data:pdata,
										success: xres => {
											if(xres.data.status=='y'){
												xthis.orderInfo.pay_code = xres.data.pay_code;
												uni.redirectTo({
													url:"pay_ts"
												})													
											}else{
												uni.showToast({
													icon: 'none',
													title: xres.data.info
												});
											}
										},
										fail: () => {},
										complete: () => {}
									});
									
								} else if (res.cancel) {
									//console.log('用户点击取消');
								}
							}
						});
					}
				}
			}
		}
	}

</script>
<style>
	page{
		background-color: #F5F5F5;
	}
	.borderOrange{
		border-bottom:#F3A346 solid 3px;
	}
	.glance-slidenav-tabbar{height: 100upx;display: inline-block;display: flex;z-index: 1;}
</style>
