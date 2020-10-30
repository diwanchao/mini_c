<template>
	<view>
		<view class="x12 border-bottom border-gray padding-big text-333"  v-for="item in news" :key="item">
			<view class="x12 text-big" v-if="item.zj_s==''">问：</view>
			<view class="x12 text-big text-red" v-else>答：</view>
			<view class="x12 text-default" v-if="item.zj_s==''">{{item.member_s}}</view>
			<view class="x12 text-default" v-else>{{item.zj_s}}</view>
		</view>
		<view class="x12 padding-big">
			<button class="bg-red text-white" style="border:0;"  @click="goConsult">继续追问</button>
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
			news:[],
			login:false,
			memberinfo:[],
			wd_id:0,
			}
		},
		onLoad:function(data){
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
			this.wd_id = data._id;
			//console.log(data);return;
			//获取信息
			var arr ={
					wd_id: data._id,
				};
			var pdata = url.getSignStr(arr);
			uni.request({
				url:url.websiteUrl+'/api_v2/store_manage/wd_xq',
				method:'POST',
				dataType:'json',
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				data:pdata,
				success: res => {
					this.news = res.data.data;
					//console.log(res.data);
				}
			});
			//console.log(data);return;
		},
		methods: {
			goConsult(data){
				uni.navigateTo({
					url:"/pagesb/center/zxzj_tw?wd_id="+this.wd_id
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}
</style>
