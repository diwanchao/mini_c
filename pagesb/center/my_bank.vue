<template>
	<view>
		<view class="x12 border-bottom border-gray bg-white" style="padding: 25upx 25upx 20upx 25upx;width: 700upx; border-bottom:#eee solid 1px;" v-for="(item,index) in povertyList" :key="index"  v-if="povertyList.length>0">
			<view class="x12" style="width: 700upx;  height: 120upx; border-radius:10upx;">
				<view class="x6" style="font-size: 42upx;">姓名:{{item.bank_name}}</view>
				<view class="x6 text-big text-right text-gray" style="margin-top: 15upx;">卡类型:{{(item.bank_type==1)?('银行卡'):((item.bank_type==2)?('微信'):('支付宝'))}}</view>
				<view class="x12 text-big" style="">账号:{{item.bank_code}}</view>

			</view>
		</view>
		<view class="x12 text-center padding-top"  v-if="povertyList.length==0">未添加银行卡</view>
		<view class="x12 padding-big" style="width: 750upx; padding:25upx 0;">
			<button @click="goGoodsUpload" class="bg-red text-white" style="border:0;">添加银行卡</button>
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
			login:false,
			memberinfo:[],
			povertyList:[],
			business_id:0,
			}
		},
		onLoad:function(data){
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				if (value) {
					this.memberinfo = value;
					this.login = true;
					//console.log(value);
				}else{
					uni.navigateTo({
						url:"/pages/login/login"
					})
					return;
				}
			} catch (e) {
				// error
			}
			this.business_id = data.business_id;
			//获取信息
			var arr ={
					business_id: data.business_id,
				};
			var pdata = url.getSignStr(arr);
			uni.request({
				url:url.websiteUrl+'/api_v2/bank_manage/index',
				method:'POST',
				dataType:'json',
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				data:pdata,
				success: res => {
					//console.log(res.data);
					this.povertyList = res.data.data;
					//console.log(this.towMenu);
				}
			});
		},
		methods: {
			goGoodsUpload(){
				uni.navigateTo({
					url:"/pagesb/center/my_bank_tj?business_id="+this.business_id
				})
				return;
			}
		}
	}
</script>

<style>
	@import '../../common/common.css';
	page {
		background-color: #F6F6F6;
	}
	.detial img{
		min-width: 100%;
	}
</style>
