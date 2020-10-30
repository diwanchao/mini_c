<template>
	<view>
		<view class="x12 padding">
			<view class="x12 bg-white padding-big"  @click="zfss(1)" style="border-radius: 6px;">
				<view class="x-auto" style="font-size: 12pt;  color: #393D4A; padding-top: 0upx; padding-left: 20upx;">
					<view class="x-auto">在线支付</view>
				</view>
				<view class="x-auto float-right" style="padding-top: 6upx;">
					<image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" class="float-left" style="width: 18upx; height: 32upx;"></image>
				</view>
			</view>
			<view class="x12 bg-white padding-big margin-top"  @click="zfss(2)" style="border-radius: 6px;">
				<view class="x-auto" style="font-size: 12pt; color: #393D4A; padding-top: 0upx; padding-left: 20upx;">
					<view class="x-auto">货到付款</view>
				</view>
				<view class="x-auto float-right" style="padding-top: 6upx;">
					<image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" class="float-left" style="width: 18upx; height: 32upx;"></image>
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
			login:false,
			memberinfo:[],
			xshopInfo:[],
			}
		},
		onLoad:function(data){
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const values = uni.getStorageSync('xshopInfo');
				//console.log(values);
				if(values){
					this.xshopInfo = values;
					this.stores_name = values.store.stores_name;
				}
				if (value) {
					this.memberinfo = value;
					this.login = true;
				}				
			} catch (e) {
				// error
			}
		},
		methods: {
			zfss(data){
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
				//#ifdef MP-WEIXIN
				prevPage.setData({
					zfss: {
						zffs_id:data,
					}
				});
				//#endif
				// #ifdef APP-PLUS
						prevPage.$vm.zffs_id = data;
				// #endif
				//console.log(data);
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>
	@import '../../common/common.css';
	page {
		background-color: #f5f5f5;
	}
	.detial img{
		min-width: 100%;
	}
</style>
