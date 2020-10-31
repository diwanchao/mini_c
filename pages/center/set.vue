<template>
	<view>
		<hx-navbar :config="config" />
		<view class="set">
		  <view class="jingying" @click="gotojingying">
		    <view>经营证照</view>
		    <view><image class="set_icon" src="https://div.buy315.com.cn/xcx_imgs/yjt.png"></image></view>
		  </view>
	<!-- 	 <view class="jingying">
		    <view>用户协议</view>
		    <view><image class="set_icon" src="https://div.buy315.com.cn/xcx_imgs/yjt.png"></image></view>
		  </view> -->
<!-- 		  <view class="jingying">
		    <view>隐私政策</view>
		    <view><image class="set_icon" src="https://div.buy315.com.cn/xcx_imgs/yjt.png"></image></view>
		  </view>
		  <view class="jingying">
		    <view>资质规则</view>
		    <view><image class="set_icon" src="https://div.buy315.com.cn/xcx_imgs/yjt.png"></image></view>
		  </view> -->
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				config:{
					title: '设置',
					color: '#ffffff',
					backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
					statusBarFontColor:'#fff'
				},
			}
		},
		methods: {
			gotojingying(){
				uni.navigateTo({
					url:'/pages/center/license'
				})
			},
		}
	}
</script>

<style>
/* pages/my/set.wxss */
.set{
  width: 710rpx;
  background-color: #fff;
  margin-top: 20rpx;
  margin-left: 20rpx;
  border-radius: 10rpx;
}
.jingying{
  display: flex;
  justify-content: space-between;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 24rpx;
  color: #333;
  width: 660rpx;
  margin-left: 20rpx;
  align-items: center;
  border-bottom:1rpx solid #f7f7f7;
}
.set_icon{
  height: 20rpx;
  width: 20rpx;
}
</style>
