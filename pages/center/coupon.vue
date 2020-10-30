<template>
	<view>
		<view  class="selected">
			<view class="categories">
				<view v-for="(item,index) in listScrollShop" class="catlistone" :key='item.id' @tap="clickTabScroll(index)" 
				 :class="{'active' : tabIndex==index}">
					 <view class="selected_text1">{{item.name}}</view>
				 </view>
			</view>
		</view>
		<view class="list" v-for="item in list" :key="item.id">
			<!-- <view class="or" :class="{{item.status == 1 ? '' : 'hui'}}" > -->
				<view class="or" :class="[item.status == 1 ? '':(item.status == 4?'red':'hui') ]" >
			  <view class="first">{{item.title}}<text class="t1"><text class="yang">￥</text>{{item.pirce}}</text></view>
			  <view class="second">有效期至{{item.time}}<text class="t1">满{{item.man_price}}可用</text></view>
			  <image class="bottom" src="https://div.buy315.com.cn/xcx_imgs/coupon1.png" v-if="item.status == 1"></image>
			  <image class="bottom" src="https://div.buy315.com.cn/xcx_imgs/coupon2.png" v-if="item.status == 2 || item.status == 3"></image>
			  <image class="bottom" src="https://div.buy315.com.cn/xcx_imgs/coupon3.png" v-if="item.status == 4"></image>
			</view>
			<view class="white">
			  <view class="t1">需支付{{item.xu_price}}元购买</view>
			  <view class="t2" v-if="item.status == 1">立即使用</view>
			  <view class="t3" v-else-if="item.status == 2">已使用</view>
			  <view class="t3" v-else-if="item.status == 3">已过期</view>
			  <view class="t4" v-else-if="item.status == 4">新人专享</view>
			</view>
		</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex:0,
				listScrollShop:[{
					id:0,
					name:'全部',
				},
				{
					id:1,
					name:'未使用',
				},
				{
					id:2,
					name:'已使用',
				}],
				list:[{
				      id:0,
				      status:1, // 1可使用 2不可使用 3已过期 4新人专享
				      title:'五得力大米专享',
				      pirce:'50.00',
				      man_price:'200',
				      time:'2020-06-18 12:00',
				      xu_price:'3'
				    },{
				      id:1,
				      status:2, // 1可使用 2不可使用 3已过期 4新人专享
				      title:'五得力大米专享',
				      pirce:'50.00',
				      man_price:'200',
				      time:'2020-06-18 12:00',
				      xu_price:'3'
				    },{
				      id:2,
				      status:3, // 1可使用 2不可使用 3已过期 4新人专享
				      title:'五得力大米专享',
				      pirce:'50.00',
				      man_price:'200',
				      time:'2020-06-18 12:00',
				      xu_price:'3'
				    },{
				      id:3,
				      status:4, // 1可使用 2不可使用 3已过期 4新人专享
				      title:'五得力大米专享',
				      pirce:'50.00',
				      man_price:'200',
				      time:'2020-06-18 12:00',
				      xu_price:'3'
				    },]
			}
		},
		methods: {
			clickTabScroll(index){
				this.tabIndex= index;
				console.log(index)
			},
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
	/* 选项卡 */
	.selected{
		height: 90upx;
		width: 750upx;
		background-color: #fff;
		position: relative;
		margin-bottom: 20rpx;
	}
	.catlistone{
		font-weight: bold;
	}
	.categories{
		display: flex;
		vertical-align: middle;
		text-align: center;
		justify-content: space-around;
	}
	.selected_text1{
		font-size: 28upx;
		height: 40upx;
		width: 108upx;
		margin-top: 20upx;
	}
	.active .selected_text1{
		color: #fff;
		background-color: #FF0000;
		border-radius: 10upx;
		font-size: 28upx;
		margin-top: 20upx;
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
	  width: 33.33333%;
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
	  padding: 0 12rpx;
	  box-sizing: border-box;
	  position: absolute;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%,-50%);
	  border-radius:14rpx;
	  color: #fff;
	}
	.list{
	  width: 710rpx;
	  height: 230rpx;
	  margin: 0 auto;
	  margin-bottom: 20rpx;
	}
	.list .or{
	  width: 710rpx;
	  height: 157rpx;
	  padding: 0 20rpx;
	  border-radius: 14rpx 14rpx 0 0;
	  background:linear-gradient(-90deg,rgba(255,117,85,1),rgba(255,161,79,1));
	  position: relative;
	  box-sizing: border-box;
	  padding-top: 22rpx;
	}
	.list .hui{
	  background: linear-gradient(-90deg,#C0C0C0,#C0C0C0)
	}
	.list .red{
	  background: linear-gradient(-90deg,#fe0303,#ff8181)
	}
	.list .or .bottom{
	  width: 710rpx;
	  height: 10rpx;
	  background-size: 100%;
	  position: absolute;
	  bottom: 0;
	  left: 0;
	  z-index: 1;
	}
	.list .or .first{
	  line-height: 66rpx;
	  font-size: 40rpx;
	  color: #fff;
	}
	.list .or .first .t1 .yang{
	  font-size: 28rpx;
	  line-height: 28rpx;
	}
	.list .or .first .t1,
	.list .or .second .t1{
	  float: right;
	}
	.list .or .second{
	  font-size: 24rpx;
	  line-height: 26rpx;
	  color: #fff;
	}
	.list .white{
	  height: 80rpx;
	  line-height: 80rpx;
	  background-color: #fff;
	  width: 710rpx;
	  font-size: 24rpx;
	  color: #C0C0C0;
	}
	.list .white .t1{
	  float: left;
	  margin-left: 26rpx;
	}
	.list .white .t2{
	  float: right;
	  font-size: 28rpx;
	  color: #FF874B;
	  margin-right: 30rpx;
	  position: relative;
	}
	.list .white .t3{
	  float: right;
	  color: #C0C0C0;
	  margin-right: 30rpx;
	}
	.list .white .t4{
	  float: right;
	  color: #C0C0C0;
	  margin-right: 30rpx;
	}
	.list .white .t2::after{
	  content: "";
	  width: 30rpx;
	  height: 30rpx;
	  background:url(http://192.168.1.22:80/static/pc/icon/or_right.png);
	  background-size: 100%;
	  position: absolute;
	  right: -30rpx;
	  top: 50%;
	  transform: translateY(-50%);
	}
</style>
