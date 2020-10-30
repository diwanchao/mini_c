<template>
	<view>
		<view class="x12 padding-big text-333">
			<view class="x12 text-big padding-top detial">
				<rich-text :nodes="details"></rich-text>
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
			details:'',
			}
		},
		onLoad:function(e){
			//获取信息
			var arr ={
					type: 1,
				};
			var pdata = url.getSignStr(arr);
			uni.request({
				url:url.websiteUrl+'/api_v2/membercenter/contents',
				method:'POST',
				dataType:'json',
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				data:pdata,
				success: res => {
					//console.log(res.data.data);
					this.details = res.data.data;
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
