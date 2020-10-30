<template>
		<view>
			<hx-navbar :config="config"/>
			<view style="position: relative;">
				<view><image class="pointsimg" src="https://div.buy315.com.cn/xcx_imgs/my_small.png" mode=""></image></view>
				<view class="text22">
					<view class="text22s">{{points_sum}}</view>
					<view class="text22r">可用积分</view>
				</view>
				<view><image class="gantah" src="https://div.buy315.com.cn/xcx_imgs/gantan.png" ></image></view>
			</view>
			<!-- 菜单 -->
			<view class="cou_top">
			  <view class="top" :class="{'active' : index1==index}" v-for="(item,index) in couTop"  :key="item.id" @tap="clickTab(index)">
			    <text class="t1">{{item.name}}</text>
			  </view>
			</view>
			<!-- 列表 -->
			 <!-- <view class="none">{{none}}</view> -->
			 <view v-if="datanum==0">
				<image src="../../static/zanwusj.png" mode="" style="width: 100%; height: 1089upx;"></image>
			 </view>
			<view class="ul">
			  <view class="li" v-for="item in listScroll" :key="item.id">
			    <view class="time">{{item.addtime}}</view>
			    <view class="price">{{item.str}}</view>
			    <view class="status">{{item.xnote}}</view>
			  </view>
			</view>
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
				config:{
					title:'会员详情',
					color: '#ffffff',
					backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
					statusBarFontColor:'#fff',
				},
			memberinfo:[],
			login:false,
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
			datanum:0,
			listScroll:[],
			points_sum:'',
			}
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
			this.clickTab();
		},
		onPullDownRefresh() {
			//console.log("下拉刷新");
			//this.refreshing = true;
			this.clickTab();
		},
		methods: {
			clickTab(index){
				this.index1= index;
				console.log(index)
				console.log('data',index)
				if(index==1){
					var im = 'sr';					
				}else if(index==2){
					var im = 'zc';
				}else{
					var im = '';
					this.index = 0;
				}
				//获取信息
				var arr ={
						openid: this.memberinfo.openid,
						status:im,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/membercenter/member_integral',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						this.datanum = res.data.data.length;
						this.listScroll = res.data.data;
						this.points_sum = res.data.points_sum;
						uni.stopPullDownRefresh();
						return;
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}

</script>
<style>
	page{
		background-color: #F7F7F7;
	}
.cou_top{
  font-size: 28rpx;
  color: #333;
  width: 750rpx;
  height: 90rpx;
  background-color: #fff;
  margin-bottom: 17rpx;
  margin-top: 20rpx;
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



.none{
  font-size: 24rpx;
  text-align: center;
  color: #999;
  margin-top: 100rpx;
}
.text2{
	position: absolute;
	right: 20rpx;
	top: 20rpx;
	height: 40rpx;
	width: 80rpx;
	background-color: #FE0000;
	color: #fff;
	font-size: 24rpx;
	border-radius: 10rpx;
	line-height: 40rpx;
	text-align: center;
}
.pointsimg{
	width: 690rpx;
	height: 200rpx;
	margin-top: 20rpx;
	margin-left: 30rpx;
	margin-bottom: 20rpx;
}
.text22{
	position: absolute;
	height: 150rpx;
	line-height: 57rpx;
	color: #fff;
	top: 45rpx;
	left: 42%;
}
.text22s{
	font-size: 48rpx;
	
}
.text22r{
	font-size: 28rpx;
}
.gantah{
	height: 38rpx;
	width: 38rpx;
	position: absolute;
	top: 45rpx;
	right: 60rpx;
}
</style>
