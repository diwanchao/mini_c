<template>
	<view class="x12">
		<view class="x12" style="padding-bottom: 200upx;">
			<rich-text :nodes="cl_list.details"></rich-text>
		</view>
		<view class="x12 text-center" @click="goPay" style="background-color: #DD0000; position: fixed; z-index: 1000; bottom: 0; height:100upx; color: #fff; line-height:100upx;">立即购买</view>
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
			login:false,
			memberinfo:[],
			xshopInfo:[],
			cl_list:[],
			}
		},
		onLoad:function(data){
			this.login = false;
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const values = uni.getStorageSync('xshopInfo');
				//console.log(values);
				if(values){
					this.xshopInfo = values;
					this.stores_name = values.store.stores_name;
				}
				if (value && value.length!=0) {
					this.memberinfo = value;
					this.login = true;
				}				
			} catch (e) {
				// error
			}
			uni.setNavigationBarTitle({
				title: data.title
			});
			//获取信息
			var arr ={
					channel:2,
					once_card_id:data.once_card_id,
				};
			var pdata = url.getSignStr(arr);
			uni.request({
				url:url.websiteUrl+'/api_v2/once_cards/index',
				method:'POST',
				dataType:'json',
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				data:pdata,
				success: res => {
					this.cl_list = res.data.data.card[0];
				}
			});
		},
		methods: {
			goPay(){
				//首先检查有没有登录
				if(!this.login){
					uni.navigateTo({
						url:"/pages/login/login"
					})
					return;
				}
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
				//组织次卡数据
				var cards = [{
					once_card_id:this.cl_list.once_card_id,
					num:1,
				}]
				//下单
				var arr ={
						member_openid:this.memberinfo.openid,
						cards:JSON.stringify(cards),
						origin:programtype,
						stores_id:this.xshopInfo.store.stores_id,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/once_cards/place_order',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						if(res.data.status=='n'){
							uni.showToast({
								icon:'none',
								title: res.data.info,
							});
							return;
						}						
						//console.log(res.data);return;
						//下单成功，去支付跳转到支付界面
						uni.navigateTo({
							url:"../goods_details/pay_sure?orderInfo="+JSON.stringify(res.data.data.pay_info)+"&pay_methods="+JSON.stringify(res.data.data.pay_methods)+"&if_pwd="+JSON.stringify(res.data.data.if_pwd)+"&ck=1"
						});
					}
				});
			}
		}
	}
</script>

<style>
	@import '../../common/common.css';
	page {
		background-color: #FFFFFF;
	}
	.detial img{
		min-width: 100%;
	}
</style>
