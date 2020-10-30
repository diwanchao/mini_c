<template>
	<view class="center">
		<view class="x12">
			<view class="center-list" style="margin-top: 0;">
				<view class="center-list-item border-bottom" v-for="item in news" :key="item" @click="goLandFarmhouseDetails(item)" style="height: 130upx;">
					<view class="x-auto text-gray text-big" style="padding-top: 20upx;">
						<view class="">{{item.addtime}}</view>
						<view class="">{{item.title}}</view>
					</view>
					<view class="x-auto float-right"  style="padding-top: 20upx;">
						<image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" style="width: 16upx; height: 28upx;"></image>
					</view>
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
				  title: xv.store.stores_name+mv.openid,
				  path: '/pages/home/index?member_openid='+mv.openid+"&stores_id="+xv.store.stores_id
				}
			} catch (e) {
				// error
			}
			
		  },
		//#endif
		data() {
			return {
			news:[],
			login:false,
			memberinfo:[],
			}
		},
		onLoad:function(){
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				if (value) {
					this.memberinfo = value;
					this.login = true;
					//console.log(value);
				}
			} catch (e) {
				// error
			}
			if(!this.login){
				uni.navigateTo({
					url:"/pages/login/login"
				})
				return;
			}
			//console.log(this.memberinfo.member_id);return;
			//获取信息
			var arr ={
					member_id: this.memberinfo.member_id,
				};
			var pdata = url.getSignStr(arr);
			uni.request({
				url:url.websiteUrl+'/api_v2/store_manage/wd_list',
				method:'POST',
				dataType:'json',
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				data:pdata,
				success: res => {
					//console.log(res.data);
					this.news = res.data.data;
					//console.log(this.towMenu);
				}
			});
		},
		methods: {
			goLandFarmhouseDetails(data) {
				uni.navigateTo({
					url:"/pagesb/center/zxzj_list?_id="+data.wd_id
				})
			}
		}
	}
</script>

<style>
	@import '../../common/common.css';
	page {
		background-color: #F6F6F6;
	}
</style>
