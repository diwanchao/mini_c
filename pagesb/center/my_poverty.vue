<template>
	<view>
		<view class="x12" style="padding: 25upx 25upx 0 25upx;width: 700upx;" v-for="(item,index) in povertyList" :key="index">
			<view class="x12 text-white" style="padding: 40upx 80upx;width: 540upx; background-color:#ff8276; height: 180upx; background-image: url(https://div.buy315.com.cn/xcx_imgs/poverty_bj.png); background-position: center; background-size: 100%; border-radius:10upx;">
				<view class="x12" style="font-size: 42upx;">{{item.title}}</view>
				<view class="x6 text-big" style="color: #e7e7e7;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">用于购买{{item.yy_describe}}</view>
				<view class="x12 text-big" style="margin-top: 15upx;color: #e7e7e7;">{{deployinfo.monetary_symbol}}{{item.money}}</view>
				<view class="x12 text-small text-right text-gray" style="color: #ffbab3;">
					{{item.start_time}}至{{item.end_time}}
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
			login:false,
			memberinfo:[],
			povertyList:[],
			}
		},
		onLoad:function(e){
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				this.deployinfo = uni.getStorageSync('deployinfo');
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
			//获取信息
			var arr ={
					member_id: this.memberinfo.member_id,
				};
			var pdata = url.getSignStr(arr);
			uni.request({
				url:url.websiteUrl+'/api_v2/membercenter/mypoverty',
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
