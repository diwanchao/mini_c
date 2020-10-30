<template>
	<view>
		<scroll-view scroll-x= "true" scroll-y= "true" scroll-left="0" scroll-with-animation="true">
			<view class="x12">				
				<rich-text :nodes="details"></rich-text>
			</view>
		</scroll-view>
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
			xtitle:'',
			details:'',
			}
		},
		onShow:function(){
			uni.setNavigationBarTitle({
				title: this.xtitle
			});
		},
		onLoad:function(data){
			this.xtitle = data.xtitle;
			//获取信息
			var arr ={
					acticle_key: data.xdata,
				};
			var pdata = url.getSignStr(arr);
			uni.request({
				url:url.websiteUrl+'/api_v2/member_article/index',
				method:'POST',
				dataType:'json',
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				data:pdata,
				success: res => {
					//console.log(res.data);
					this.details = res.data.data.xword;
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
