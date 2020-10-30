<template>
	<view class="content">
        <uni-password ref="secrity" @input="onInput" @confirm="onConfirm">
        	请输入6位支付密码
        </uni-password>
	</view>
</template>

<script>
	import url from '../../main.js';
	import uniPassword from '@/components/ku3gitxdx-payment-password/ku3gitxdx-payment-password.vue'
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
		components: {
			uniPassword
		},
		data() {
			return {
				login:false,
				memberinfo:[],
				shoppingCarts:[],
				xshopInfo:[],
				pay_code:'',
				ck:0,
				pay_method:'',
			}
		},
		onLoad(data) {
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const valuex = uni.getStorageSync('shoppingCarts');
				const values = uni.getStorageSync('xshopInfo');
				if (value) {
					//console.log(value);
					this.memberinfo = value;
					this.login = true;
					//console.log(value);
				}
				if(valuex){
					this.goodslist = valuex;
				}
				if(values){
					this.xshopInfo = values;
				}
			} catch (e) {
				// error
			}
			this.pay_code = data.pay_code;
			this.ck = data.ck;
			this.pay_method = data.pay_method;
		},
		methods: {
			onInput(e) {
				//e.cancel = true;
				//console.log(JSON.parse(e));
			},
			onConfirm(e) {
				let password = e;
				var is = false;
				if(password.length==6){
					is = true;
				}
				if(is==true){
					if(this.ck==1){
						
						var arr ={
								order_code:this.pay_code,
								pay_method:this.pay_method,
								pwd:password,
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
					}else{
						//获取信息
						var arr ={
								member_openid: this.memberinfo.openid,
								pay_code:this.pay_code,
								origin:3,
								pay_method:5,
								pwd:password,
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
					}
				}else{
					uni.showToast({
						icon: 'none',
						title: '支付密码不正确'
					});
					return;
				}				
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
    .logo{
        height: 200upx;
        width: 200upx;
        margin-top: 200upx;
    }
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
