<template>
	<view>
		<hx-navbar :config="config"/>
		<!-- <view class="texttitle">《充值协议》</view> -->
		<view class="xialwenz">
			<view>尊敬的用户，为保障您的合法权益，请在参加充值活动前仔细阅读本规则，以免造成误解，当您点击“充值”按钮后，视为您已阅读、理解本协议，并同意按本协议的规定参与充值。</view>
			<viwe>1.充值面值：100元、200元、300元、500元；</viwe>
			<viwe>2.充值有效期：自充值日起至用完为止；</viwe>
			<viwe>3.使用方法：此充值在每日菜场商城消费视同于现金结算，在结算时选择“账户余额”即可使用；</viwe>
			<viwe>4.在线充值成功后，不支持提现，除非法律另有规定；</viwe>
			<viwe>5.如遇其他问题请您拨打客户热线000-000-0000咨询；</viwe>
		</view>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				config:{
					title: '充值协议',
					color: '#ffffff',
					backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
					statusBarFontColor:'#fff',
					back:false,
				},
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.texttitle{
	font-size: 28upx;
	height: 50upx;
	text-align: center;
	width: 100%;
	margin-bottom: 50upx;
}
.xialwenz{
	text-align: center;
	width: 90%;
	font-size: 24upx;
	line-height: 50upx;
	margin: 0 auto;
}
</style>
