<template>
	<view>
		<!-- <hx-navbar :config="config"/> -->
		<view class="rech_top">
		  <image src="https://div.buy315.com.cn/xcx_imgs/my_small.png" class="image"></image>
		  <view class="content">
		    <view class="t1">666,666.66</view>
		    <view class="t2">余额（元）</view>
		  </view>
		</view>
		<view class="rech_price">
		  <view class="bt">充值金额</view>
		  <view class="list after">
		    <view class="list_li " v-for="(item,index) in list" :key="index"  @tap="rechPrice(index)" :class="[item.id == index1 ? 'red' : '']">
		      {{item.title}}
		    </view>
		  </view>
		</view>
		<view class="text">
			<view class="text1">充值说明</view>
			<view class="text2">充值1000元送20元立即使用</view>
		</view>
		<view class="red_bt_btn">支付</view>
		<view class="tips">
			<view>点击支付即代表同意</view>
			<viwe class='text22'>充值协议</viwe>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index1:0,
				    list:[{
				      id:'0',
				      title:'充1000元',
				    },{
				      id:'1',
				      title:'充500元',
				    },{
				      id:'2',
				      title:'充100元',
				    },{
				      id:'3',
				      title:'充50元',
				    }],
					
			}
		},
		methods: {
			rechPrice(index){
				this.index1 = index
				console.log(index)
			}
		}
	}
</script>

<style>
	page{
		background-color: #F7F7F7;
	}
/* pages/my/recharge.wxss */
.rech_top{
  width:715rpx;
  height: 200rpx;
  margin: 0 auto;
  margin-top: 20rpx;
  position: relative;
}
.rech_top .image{
  width:715rpx;
  height: 200rpx;
  background-size: 100%;
}
.rech_top .content{
  width:715rpx;
  height: 200rpx;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding-top: 15rpx;
  text-align: center;
  text-indent: -12rpx;
  color: #fff;
}
.rech_top .content .t1{
  font-size: 48rpx;
  line-height: 88rpx;
}
.rech_top .content .t2{
  font-size: 28rpx;
}
.vi_inp{
  width: 710rpx;
  height: 100rpx;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 20rpx;
  position: relative;
}
.vi_inp .t1{
  font-size: 30rpx;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 25rpx;
}
.vi_inp .input{
  font-size: 24rpx;
  line-height: 100rpx;
  height: 100rpx;
  margin-left: 60rpx;
}
.rech_price{
  width: 100%;
  padding: 0 30rpx;
  box-sizing: border-box;
}
.rech_price .bt{
  font-size: 28rpx;
  line-height: 110rpx;
  text-indent: 10rpx;
}
.rech_price .list{
  width: 100%;
}
.rech_price .list .list_li{
  width: 330rpx;
  height: 140rpx;
  line-height: 140rpx;
  font-size: 30rpx;
  color: #333;
  box-sizing: border-box;
  border-radius: 20rpx;
  border: 2rpx solid #FE0000;
  text-align: center;
  font-weight: bold;
  margin-right: 25rpx;
  margin-bottom: 30rpx;
}
.rech_price .list .list_li:nth-child(2n){
  margin-right: 0;
}
.rech_price .list .list_li.red{
  background-color: #FE0000;
  color: #fff;
}
.red_bt_btn{
  width: 600rpx;
  height: 88rpx;
  line-height: 100rpx;
  font-size: 36rpx;
  color: #fff;
  background-color: #FE0000;
  text-align: center;
  border-radius: 60upx;
  margin-left: 75upx;
  margin-top: 180upx;
}
.after{
	display: flex;
	flex-wrap: wrap;
}
.text{
	margin-left: 20upx;
	margin-top: 63upx;
	line-height: 35upx;
}
.text1{
	font-size: 28upx;
}
.text2{
	font-size: 24upx;
}
.tips{
	font-size: 22upx;
	margin-top: 77upx;
	text-align: center;
	color: #999;
	font-weight: 400;
	display: flex;
	justify-content: center;
}
.tips .text22{
	color: #0026E8;
	padding-left: 5upx;
}
</style>
