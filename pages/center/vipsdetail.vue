<template>
	<view>
		<view class="thisTop">
			<image class="img" src="https://div.buy315.com.cn/xcx_imgs/icon_bg1.png" mode=""></image>
		</view>
		<view class="thisJianB">
			<image class="img" src="https://div.buy315.com.cn/xcx_imgs/icon_bg2.png" mode=""></image>
		</view>
		<view class="tishi" v-if="tiShi_">暂无提货码</view>
		<view class="kuang" v-for="(item,index) in yemxList" :key="index" v-if="!tiShi_">
			<view class="title">
				下单编号：{{item.order_code}}
			</view>
			<view class="title" style="margin-bottom: 80upx;">
				下单时间：{{item.order_time}}
			</view>
			<image class="title_img" :src="item.barcode_img" mode=""></image>
			<view class="tihuo_num">提货码：{{item.delivery_code}}</view>
			<view class="zhushi">核销时请展示该条形码或初始提货码</view>
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
				// config:{
				// 	title:'取货码',
				// 	color: '#ffffff',
				// 	// backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
				// 	statusBarFontColor:'#fff',			
				// },
				yemxList:[],
				listScroll:'',
				tiShi_:false
			}
		},
		onReady:function(e){
			this.getDd()
		},
		onLoad:function(){
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				if (value) {
					this.memberinfo = value;
					this.login = true;
					if(!this.login){
						uni.navigateTo({
							url:"/pages/login/login"
						})
						return;
					}
				}
			} catch (e) {
				// error
			}
			// this.yemx();
			// this.clickTab();
		},
		onPullDownRefresh() {
			//console.log("下拉刷新");
			//this.refreshing = true;
			// this.yemx();
			// this.clickTab();
			this.getDd()
		},
		methods: {
			getDd(){
				uni.showLoading({
					title:'加载中'
				})
				//获取信息
				//写死数据
				var arr ={
						// openid: this.memberinfo.openid
						member_openid: this.memberinfo.openid
						// member_openid: 'mmayumgj5igbf8yvtzekc6vt7pidhjws'
						
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/stores/ztm',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						console.log(res.data,'获取会员卡成功');
						this.yemxList = res.data.data;
						if(res.data.data.length == 0){
							this.tiShi_ = true
						}
					},
					fail: () => {},
					complete: () => {}
				});
				uni.hideLoading()
				uni.stopPullDownRefresh();
			}
			// clickTab(){
				
			// 	var arr ={
			// 			openid: this.memberinfo.openid,
			// 			status:0,
			// 		};
			// 	var pdata = url.getSignStr(arr);
			// 	uni.request({
			// 		url:url.websiteUrl+'/api_v2/membercenter/member_balance',
			// 		method:'POST',
			// 		dataType:'json',
			// 		header:{
			// 			'content-type':'application/x-www-form-urlencoded'
			// 		},
			// 		data:pdata,
			// 		success: res => {
			// 			//console.log(res.data);
			// 			this.listScroll = res.data;
			// 		},
			// 		fail: () => {},
			// 		complete: () => {}
			// 	});
			// },
			// yemx(){
			// 	var xxxthis =this;
			// 	//var xxx = [];
			// 	setInterval(function () {
			// 		//获取信息
			// 		var arr ={
			// 				openid: xxxthis.memberinfo.openid,
			// 				dynamic:1,
			// 			};
			// 		var pdata = url.getSignStr(arr);
			// 		uni.request({
			// 			url:url.websiteUrl+'/api_v2/member_card/index',
			// 			method:'POST',
			// 			dataType:'json',
			// 			header:{
			// 				'content-type':'application/x-www-form-urlencoded'
			// 			},
			// 			data:pdata,
			// 			success: res => {
			// 				//console.log(res.data);
			// 				xxxthis.yemxList = res.data.data;
			// 				uni.stopPullDownRefresh();
			// 				return;
			// 			},
			// 			fail: () => {},
			// 			complete: () => {}
			// 		});
			// 	}, 90000);
			// },
			// goCzQr(data){
			// 	uni.navigateTo({
			// 		url:"member_cz_qr?paymoney="+data
			// 	})
			// }
		}
	}
</script>

<style>
	page{
		background-color: #F7F7F7;
	}
	.vips_img{
		height: 400upx;
		width: 710upx;
		margin-left: 20upx;
		margin-top: 40upx;
	}
	.text1{
		font-size: 32upx;
		color: #FE0000;
		position: absolute;
		left: 265upx;
		top: 138upx;
		font-weight: bold;
	}
	/* 规则 */
	.active_footer{
	  /* height: 306rpx; */
	  width: 710rpx;
	  border: 3rpx solid;
	  border-image: linear-gradient(#1848BB,#4AB8F1)3;
	  margin-top: -30rpx;
	  /* opacity: 0.2; */
	  border-radius: 5rpx;
	  margin-left: 20rpx;
	  margin-bottom: 20rpx;
	  padding-bottom: 20rpx;
	  
	}
	.active_imgs{
	  position: relative;
	}
	.active_img{
	  height: 46rpx;
	  width: 184rpx;
	  position: relative;
	  z-index: 10;
	  left: 40%;
	  /* bottom: -35rpx; */
	}
	.active_rules{
	  font-size: 24rpx;
	  color: #333333;
	  width: 660rpx;
	  text-align: left;
	  padding-left: 20rpx;
	  padding-top: 54rpx;
	  padding-right: 20rpx;
	  line-height: 40rpx;
	  z-index: 10;
	}
	.text10{
		font-size: 24upx;
		color: #999;
	}
	.shop_img01{
		height: 50upx;
		width: 50upx;
		margin-top: 80rpx;
	}
	.erewima{
		position: absolute;
		top: 200rpx;
		width: 440rpx;
		height: 150rpx;
		left: 170rpx;
	}
	.viptext{
		font-size: 30rpx;
		color: #FFFFFF;
		position: absolute;
		left: 44%;
		bottom: 12rpx;
		letter-spacing: 7rpx;
		z-index: 999999;
	}
	.kuang{
		width: 710upx;
		height: 600upx;
		border-radius: 10upx;
		background-color: #FFB2B2;
		position: absolute;
		top: 128upx;
		left: 50%;
		transform: translateX(-50%);
		box-sizing: border-box;
		padding: 30upx 20upx;
	}
	.kuang .title{
		font-size: 24upx;
		line-height: 36upx;
		color: #fff;
	}
	.kuang .title_img{
		width: 637upx;
		height: 112upx;
		margin: 0 auto;
		background-size: 100%;
		display: block;
		margin-bottom: 70upx;
	}
	.kuang .tihuo_num{
		width: 100%;
		line-height: 40upx;
		font-size: 28upx;
		text-align: center;
		color: #FE0000;
	}
	.kuang .zhushi{
		font-size: 24upx;
		color: #666;
		width: 100%;
		line-height: 36upx;
		text-align: center;
	}
	.tishi{
		font-size: 24upx;
		color: #999;
		width: 100%;
		text-align: center;
		line-height: 50upx;
	}
	.thisTop{
		width: 750upx;
		height: 128upx;
	}
	.thisJianB{
		width: 750upx;
		height: 582upx;
	}
	.thisTop .img,
	.thisJianB .img{
		width: 100%;
		height: 100%;
		background-size: 100%;
	}

</style>
