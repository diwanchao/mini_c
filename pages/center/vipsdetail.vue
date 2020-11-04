<template>
	<view>
		<hx-navbar :config="config"/>
		<view style="position: relative;">
			<view><image class="vips_img" src="https://div.buy315.com.cn/xcx_imgs/vips.png" ></image></view>
			<!-- <view><image class="vips_img" src="../../static/vips.png" ></image></view> -->
			<view class="text1">账户余额：￥{{listScroll.money_sum}}</view>
			<view><image class="erewima" :src="yemxList.barcode_img"></image></view>
		</view>
		<view style="margin-top: 20rpx;">
		 <view class="active_imgs" >
		   <image class="active_img" src="../../static/ditu.png"></image>
			<view class="viptext">会员规则</view>
		 </view>
		 <view class="active_footer">
		   <view class="active_rules">
			   <view>1.	登录即成为普通会员，充值成为尊贵会员；</view>
			   <view>2.	会员可享受会员价格；</view>
			   <view>3.	会员卡仅限申请者本人使用，会员卡会籍及卡内积分不可转让或出借。</view>
		   </view>
		 </view>
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
				config:{
					title:'会员详情',
					color: '#ffffff',
					backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
					statusBarFontColor:'#fff',			
				},
				yemxList:[],
				listScroll:''
			}
		},
		onReady:function(e){
			//获取信息
			var arr ={
					openid: this.memberinfo.openid,
					dynamic:1,
				};
			var pdata = url.getSignStr(arr);
			uni.request({
				url:url.websiteUrl+'/api_v2/member_card/index',
				method:'POST',
				dataType:'json',
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				data:pdata,
				success: res => {
					console.log(res.data,'获取会员卡成功');
					this.yemxList = res.data.data;
					console.log(this.yemxList)
					uni.stopPullDownRefresh();
					return;
					
				},
				fail: () => {},
				complete: () => {}
			});
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
			this.yemx();
			this.clickTab();
		},
		onPullDownRefresh() {
			//console.log("下拉刷新");
			//this.refreshing = true;
			this.yemx();
			this.clickTab();
		},
		methods: {
			clickTab(){
				
				var arr ={
						openid: this.memberinfo.openid,
						status:0,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/membercenter/member_balance',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data);
						this.listScroll = res.data;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			yemx(){
				var xxxthis =this;
				//var xxx = [];
				setInterval(function () {
					//获取信息
					var arr ={
							openid: xxxthis.memberinfo.openid,
							dynamic:1,
						};
					var pdata = url.getSignStr(arr);
					uni.request({
						url:url.websiteUrl+'/api_v2/member_card/index',
						method:'POST',
						dataType:'json',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:pdata,
						success: res => {
							//console.log(res.data);
							xxxthis.yemxList = res.data.data;
							uni.stopPullDownRefresh();
							return;
						},
						fail: () => {},
						complete: () => {}
					});
				}, 90000);
			},
			goCzQr(data){
				uni.navigateTo({
					url:"member_cz_qr?paymoney="+data
				})
			}
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
</style>
