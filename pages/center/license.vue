<template>
	<view>
		<hx-navbar :config="config" />
		<view>
			<view class="text">经营证照</view>
			<view ><image class="img" :src="licenseList"></image></view>
			<view class="text">食品经营许可证</view>
			<view ><image class="img" :src="hygieneList"></image></view>
		</view>
	</view>
</template>

<script>
	import url from '../../main.js';
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
				licenseList:'',
				hygieneList:'',
				config:{
					title: '经营证照',
					color: '#ffffff',
					backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
					statusBarFontColor:'#fff'
				},
			}
		},
		onLoad() {
			this.getEvening();
		},
		methods: {
			getEvening(){
				try {//从本地缓存中同步获取指定 key 对应的内容。
					const value = uni.getStorageSync('memberinfo');
					const valuex = uni.getStorageSync('shoppingCarts');
					const values = uni.getStorageSync('xshopInfo');
					//console.log(value);
					if(values){
						this.xshopInfo = values;
						this.stores_name = values.store.stores_name;
					}
					if (value) {
						this.memberinfo = value;
						this.login = true;
					}
					if(valuex){
						this.shoppingCarts = valuex;
					}
				}catch (e) {
								// error
				}
				var arr ={
					stores_id:this.xshopInfo.store.stores_id,
					member_openid: this.memberinfo.openid,
				};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/stores/getstoreidphoto',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						console.log(res.data.data,'营业执照')
						this.licenseList = res.data.data.license_img;
						this.hygieneList= res.data.data.hygiene_img;
				
					}
				})
			},
		}
	}
</script>

<style>
	.text{
		color: #333;
		height: 76upx;
		line-height: 76upx;
		text-align: center;
		font-size: 32upx;
	}
	.img{
		height: 400upx;
		width: 710upx;
		margin-left: 20upx;
		border-radius: 10upx;
	}
</style>
