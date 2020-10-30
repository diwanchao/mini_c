<template>
	<view>
		<view class="head">
			<view class="text">
				<view class="text1">分拣完成待自取</view>
				<view >订单编号：2020 0914 0940 0001</view>
				<view>下单时间 : 2020 09 14</view>
			</view>
		</view>
		<view class="img"><image class="erweima" src="https://div.buy315.com.cn/xcx_imgs/kele.jpg"></image></view>
		<view class="text3">30秒后自动刷新</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
		background-color: #F7F7F7;
	}
	.head{
		height: 150upx;
		width: 710upx;
		background-color: #fff;
		margin-left: 20upx;
		border-radius: 10upx;
		margin-top: 20upx;
		box-shadow: 0px 0px 10px 0px rgba(20, 7, 0, 0.06);
	}
	.text{
		margin-left: 20upx;
		height: 150upx;
		font-size: 24upx;
		color: #999;
		line-height: 43upx;
	}
	.text1{
		padding-top: 20upx;
		font-size: 28upx;
		color: #333;
	}
	.img{
		display: flex;
		justify-content: center;
		margin-top: 87upx;
	}	
	.erweima{
		width:250upx;
		height: 250upx;
	}
	.text3{
		font-size: 24upx;
		color: #333;
		text-align: center;
		margin-top: 48upx;
	}
</style>
