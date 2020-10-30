<template>
    <view>
		<hx-navbar :config="config" />
		<view class="x12 padding">
			<view class="x12 bg-white padding-big" style="border-radius: 6px;">
				<view class="x-auto">
					<image src="https://div.buy315.com.cn/xcx_imgs/czqr1.png"  mode="aspectFill" style="width: 84upx; height: 84upx;"></image>
				</view>
				<view class="x-auto" style="font-size: 14pt; width: 470upx; color: #F65A2A; padding-top: 20upx; padding-left: 20upx;">
					{{deployinfo.monetary_symbol}}{{payinfo.paymoney}}
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
				deployinfo:{},//配置信息货币单位，符号，以及其他的一些配置参数
			memberinfo:[],
			login:false,
			payinfo:[],
			pay_methods:[],
			config:{
				title: '充值确认',
				color: '#ffffff',
				backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
				statusBarFontColor:'#fff'
			},
			}
		},
		onLoad:function(data){
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
			//console.log(data);
			this.payinfo = data;
			this.pay_methods = JSON.parse(data.pay_methods);
			//console.log(this.pay_methods);
		},		
		methods: {
			goPay(pay_method){
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
				uni.showToast({
					title: '正在加载...',
					icon:'none'
				});
				if(programtype==3){
					//微信支付时获取code
					wx.login({
						success: res => {
							//获取order_code
							//获取信息
							var arr ={
									openid: this.memberinfo.openid,
									pay_method:pay_method,
									origin:programtype,
									pay_money:this.payinfo.paymoney,
									xcx_code:res.code,
								};
							var pdata = url.getSignStr(arr);
							uni.request({
								url:url.websiteUrl+'/api_v2/member_recharge/sub_member_recharge',
								method:'POST',
								dataType:'json',
								header:{
									'content-type':'application/x-www-form-urlencoded'
								},
								data:pdata,
								success: res => {
									//console.log(res.data);									
									//console.log(JSON.parse(res.data.data));return;								
									if(res.data.status=='y'){										
										var payInfox = JSON.parse(res.data.data);
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
													url:"member_czcg_ts"
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
					//app支付
					var pay_m = (pay_method==2 || pay_method==554)?('wxpay'):('alipay');
					//console.log(pay_m);
					//获取信息
					var arr ={
							openid: this.memberinfo.openid,
							pay_method:pay_method,
							origin:programtype,
							pay_money:this.payinfo.paymoney,
						};
					var pdata = url.getSignStr(arr);
					uni.request({
						url:url.websiteUrl+'/api_v2/member_recharge/sub_member_recharge',
						method:'POST',
						dataType:'json',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:pdata,
						success: res => {
							//console.log(JSON.stringify(res.data));return;								
							if(res.data.status=='y'){//parameter
								var payInfox = res.data.data;
								uni.requestPayment({
									provider: pay_m,
									orderInfo: payInfox, 
									success: function (res) {
										console.log('success:' + JSON.stringify(res));
										//支付成功跳转到成功提示界面
										uni.navigateTo({
											url:"member_czcg_ts"
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
