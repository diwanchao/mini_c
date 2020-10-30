<template>
	<view>
		<navigationBar text='钱包'></navigationBar>
		<view class="top_or">
			<image class="image" src="https://div.buy315.com.cn/xcx_imgs/my_small.png">
			</image>
			<view class="content">
				<view class="t1">666,666.66</view>
				<view class="t2">
					<view>可用积分</view>
					<!-- <view class="t3" bindtap="gotowithdrawal">充值</view> -->
				</view>
				<!-- <view class="one"> -->
				<!-- </view> -->
				<!-- <view class="one two" bindtap="gotoaddwallet">
					<view class="left">
						<text class="t1">银行</text>
						<text class="t2" wx:if="{{wallet_status == 2}}">添加银行卡(仅限一张）</text>
						<text class="t2" wx:if="{{wallet_status == 1}}" style="color:#fff">{{list.open_bank}} 储蓄卡</text>
					</view>
					<view class="middle">
						<text class="t1">卡号</text>
						<text class="t2" wx:if="{{wallet_status == 2}}">******************</text>
						<text class="t2" wx:if="{{wallet_status == 1}}" style="color:#fff">{{list.number}}</text>
					</view>
					<image class="right" src="/images/pen.png"></image>
				</view> -->
			</view>
		</view>
		<!-- 菜单 -->
<!-- 		<view  class="selected">
			<view class="cou_top after">
				<view v-for="(item,index) in listScrollShop" class="catlistone" :key='item.id' @tap="clickTabScroll(index)" 
				 :class="{'active' : tabIndex==index}">
					 <view class="selected_text1">{{item.name}}</view>
				 </view>
			</view>
		</view> -->
		<view class="cou_top after">
		  <view class="top" :class="{'active' : index1==index}" v-for="(item,index) in couTop"  :key="item.id" @tap="clickTab(index)">
		    <text class="t1">{{item.name}}</text>
		  </view>
		</view>
		<!-- 列表 -->
		 <!-- <view class="none">{{none}}</view> -->
		<view class="ul">
		  <view class="li" v-for="item in listScroll" :key="item.id">
		    <view class="time">{{item.addtime}}</view>
		    <view class="price">￥{{item.price}}</view>
		    <view class="status">{{item.title}}</view>
		  </view>
		</view>
		<view class="text1">
			<view class="text2">积分规则</view>
			<view>每次消费满1元积一分 四舍五入 </view>
			<view>满200元可用积分兑换礼品 积分可在线抵现10积分可抵现1元</view>
			<view>最终解释权归每日菜场所有</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				index1:0,
				couTop:[{
					id:0,
					name:'全部'
				},
				{
					id:1,
					name:'收入'
				},
				{
					id:2,
					name:'支出'
				}],
				listScroll:[{
					id:0,
					addtime:'2020/08/11 10：04：56',
					price:'￥66,666.00',
					title:'-55积分',
				},
				{
					id:0,
					addtime:'2020/08/11 10：04：56',
					price:'￥66,666.00',
					title:'-55积分',
				},
				{
					id:0,
					addtime:'2020/08/11 10：04：56',
					price:'￥66,666.00',
					title:'+55积分',
				}],
			}
		},
		methods: {
			clickTab(index){
				this.index1= index;
				console.log(index)
			},
		}
	}
</script>

<style>
	page{
		background-color: #F7F7F7;
	}
/* pages/my/wallet.wxss */
.top_or{
  width: 715rpx;
  height: 200rpx;
  margin: 0 auto;
  margin-top: 20rpx;
  position: relative;
}
.top_or .image{
  width: 715rpx;
  height: 200rpx;
  background-size: 100%;
}
.top_or .content{
  width: 715rpx;
  height: 200rpx;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 30rpx 40rpx 0 50rpx;
}
.content .t1{
  font-size: 48rpx;
  color: #fff;
  text-align: center;
}
.content .t2{
  display: flex;
  font-size: 28rpx;
  color: #fff;
  justify-content: center;
}
.content .t3{
  width: 60rpx;
  height: 36rpx;
  font-size: 24rpx;
  color: #fff;
  background-color: #FE0000;
  border-radius:14rpx;
  line-height: 36rpx;
  text-align: center;
  margin-left: 40rpx;
  position: absolute;
  right: 214rpx;
}
.top_or .content .one{
  line-height: 60rpx;
  font-size: 48rpx;
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
  margin-bottom: 50rpx;
  color: #fff;
}

.top_or .content .one .left{
  font-size: 28rpx;
  width: 280rpx;
}
.top_or .content .one .right{
  width: 50rpx;
  height: 40rpx;
  font-size: 22rpx;
  color: #fff;
  background-color: #FE0000;
  border-radius:14rpx;
  line-height: 40rpx;
  text-align: center;
  margin-top: 10rpx;
}
.top_or .content .two{
  font-size: 24rpx;
  line-height: 40rpx;
  position: relative;
  padding-right: 100rpx;
}
.top_or .content .two .t1{
  display: block;
}
.top_or .content .two .t2{
  display: block;
  color: #999;
  font-size: 24rpx;
}
.top_or .content .two .right{
  width: 26rpx;
  height: 26rpx;
  background-size: 100%;
  background-color: transparent;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
}
.cou_top{
  font-size: 28rpx;
  color: #333;
  width: 750rpx;
  height: 90rpx;
  background-color: #fff;
  margin-bottom: 17rpx;
}
.cou_top .top{
  width: 33%;
  text-align: center;
  position: relative;
  float: left;
  height: 90rpx;
}
.cou_top .top .t1{
  height: 40rpx;
  line-height: 40rpx;
  display: inline-block;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.cou_top .top.active .t1{
  background-color: #FE0000;
  padding: 0 20rpx;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius:14rpx;
  color: #fff;
  width: 100rpx;
}
.ul{
  width: 100%;
  box-sizing: border-box;
  margin-top: 19rpx;
  padding: 0 30rpx;
}
.ul .li{
  width: 100%;
  min-height: 112rpx;
  position: relative;
  padding: 0 20rpx;
  box-sizing: border-box;
  margin-bottom: 20rpx;
  background-color: #fff;
  border-radius: 15rpx;
  box-shadow:0px 0px 10rpx 0px rgba(20,7,0,0.06);
  padding-bottom: 14rpx;
}
.ul .li .time{
  font-size: 24rpx;
  line-height: 64rpx;
}
.ul .li .price{
  line-height: 46rpx;
  font-size: 30rpx;
}
.ul .li .status{
  position: absolute;
  top: 50%;
  right: 24rpx;
  transform: translateY(-50%);
  font-size: 24rpx;
  color: #999;
}
.none{
  font-size: 24rpx;
  text-align: center;
  color: #999;
  margin-top: 100rpx;
}
.text1{
	font-size: 24upx;
	margin-left: 30upx;
	margin-top: 100upx;
	line-height: 40upx;
}
.text2{
	font-size: 28upx;
}
</style>
