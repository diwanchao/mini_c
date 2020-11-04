<template>
	<view>
		<hx-navbar :config="config"/>
		<view class="top_or">
			<view style="position: relative;">
				<!-- <view><image class="vips_img" src="https://div.buy315.com.cn/xcx_imgs/vips.png" mode=""></image></view> -->
				<view><image class="vips_img" src="https://div.buy315.com.cn/xcx_imgs/my_small.png" mode=""></image></view>
				<view class="text1">账户余额：￥{{zhanghuyue.money_sum}}</view>
				<view><image class="erewima" :src="yemxList.barcode_img"></image></view>
			</view>
			<view  @click="gotorecharge" v-if="cz==1">
				<text class="text2">充值</text>
			</view>
			<view @click="gotorecharge" v-else></view>
		</view>
		<!-- 菜单 -->
		<view class="cou_top">
		  <view class="top" :class="{'active' : index1==index}" v-for="(item,index) in couTop" :key="item.id" @tap="clickTab(index)" v-if="xid == itme.id">
		    <text class="t1">{{item.name}}</text>
		  </view>
		</view>
		<!-- 列表 -->
		 <!-- <view class="none">{{none}}</view> -->
		<view class="ul">
		  <view class="li" v-for="item in listScroll" :key="item.id">
		    <view class="time">{{item.addtime}}</view>
		    <view class="price">{{item.str}}</view>
		    <view class="status">{{item.xnote}}</view>
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
					title:'余额明细',
					color: '#ffffff',
					backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
					statusBarFontColor:'#fff',
				},
				index1:0,
				yemxList:[],
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
					title:'充值成功',
				},
				{
					id:0,
					addtime:'2020/08/11 10：04：56',
					price:'￥66,666.00',
					title:'充值成功',
				},
				{
					id:0,
					addtime:'2020/08/11 10：04：56',
					price:'￥66,666.00',
					title:'充值失败',
				}],
				zhanghuyue:'',
				cz:'',
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
		onLoad() {
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				this.deployinfo = uni.getStorageSync('deployinfo');
				if (value) {
					this.memberinfo = value;
					this.login = true;
					// if(!this.login){
					// 	uni.navigateTo({
					// 		url:"/pages/login/login"
					// 	})
					// 	return;
					// }
				}
			} catch (e) {
				// error
			}
			this.clickTab();
			this.getvipsimg();
			this.getswitch();
		},
		onPullDownRefresh() {
			//console.log("下拉刷新");
			//this.refreshing = true;
			this.clickTab();
		},
		methods: {
			// clickTab(index){
			// 	this.index1= index;
			// 	console.log(index)
			// 	this.yemx();
			// },
			gotorecharge(){
				uni.navigateTo({
					url:'/pagesb/center/member_cz'
				})
			},
			getvipsimg(){
				try { //从本地缓存中同步获取指定 key 对应的内容。
					const value = uni.getStorageSync('memberinfo');
					const valuex = uni.getStorageSync('shoppingCarts');
					const values = uni.getStorageSync('xshopInfo');
					//console.log(value);
					if (values) {
						this.xshopInfo = values;
						this.stores_name = values.store.stores_name;
					}
					if (value) {
						this.memberinfo = value;
						this.login = true;
					}
					if (valuex) {
						this.shoppingCarts = valuex;
					}
				} catch (e) {
					// error
				}
				//获取信息
				var arr ={
					member_openid:this.memberinfo.openid,
				};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/stores/checkmemberisvalidrechargeorder',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						console.log(res.data)
						this.zc  = res.data.data
					},
					fail: () => {},
					complete: () => {}
				});
			},
			clickTab(index){
				this.index1= index;
				console.log(index)
				console.log('data',index)
				// index = data;
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
					url:url.websiteUrl+'/api_v2/membercenter/member_balance',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data);
						this.datanum = res.data.data.length;
						this.listScroll = res.data.data;
						this.zhanghuyue = res.data
						uni.stopPullDownRefresh();
						return;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getswitch(){
				//获取信息
				var arr ={};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/stores/getswitch',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						this.cz = res.data.data.cz
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
	.vips_img{
		height: 400upx;
		width: 710upx;

	}
	.text1{
		font-size: 32upx;
		color: #FE0000;
		position: absolute;
		left: 200upx;
		top: 95upx;
		font-weight: bold;
	}
/* pages/my/wallet.wxss */
.top_or{
  width: 715rpx;
  margin: 0 auto;
  margin-top: 20rpx;
  position: relative;
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
.erewima{
	position: absolute;
	top: 150rpx;
	width: 440rpx;
	height: 150rpx;
	left: 130rpx;
}
</style>
