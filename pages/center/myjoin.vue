<template>
	<view>
	<hx-navbar :config="config"/>
		<view class="cou_top" >
		  <view class="top" :class="{'active' : index1==index}" v-for="(item,index) in couTop" :key="index" @tap="clickTab(index)" >
		    <text class="t1">{{item.name}}</text>
		  </view>
		</view>
		<view>
			<view class="box" v-for="(itme,index) in pintuanList" :key='index'>
				<view class="boxtop">
					<view class="boxtop_c">
						<view><image class="top_img" src="../../static/center-0.png" ></image></view>
						<view>{{itme.order_time}}</view>
					</view>
					<!-- <view>待付款</view> -->
					<!-- 全部 -->
					<viwe  v-if='itme.order_status == 1 && itme.temp_pay_status == 1 && index1==0'>待支付</viwe>
					
					
					
					<viwe  v-if='itme.order_status == 1 && itme.temp_pay_status == 2 && index1==0'>支付成功</viwe>
					<!-- <view  v-if='itme.order_status == 1 && itme.temp_logistics_status == 1 && (itme.temp_pay_status == 2 || itme.temp_type == 2) && index1==0'>待发货</view> -->
					
					<view  v-if='itme.order_status == 1 && itme.temp_logistics_status == 2 && (itme.temp_pay_status == 2 || itme.temp_type == 2) && index1==0'>待收货</view>
					
					<view  v-if='itme.order_status == 1 && itme.temp_logistics_status == 3 && (itme.temp_pay_status == 2 || itme.temp_type == 2) && index1==0'>已完成</view>
					<!-- 拼团中 -->
					<viwe  v-if='itme.order_status == 1 && itme.temp_pay_status == 1 && index1==1'>待支付</viwe>
					<viwe  v-if='itme.order_status == 1 && itme.temp_pay_status == 2 && index1==1'>支付成功</viwe>
					<!-- 成功 -->
					<view  v-if='itme.order_status == 1 && itme.temp_logistics_status == 1 && (itme.temp_pay_status == 2 || itme.temp_type == 2) && index1==2'>待发货</view>
					<view  v-if='itme.order_status == 1 && itme.temp_logistics_status == 2 && (itme.temp_pay_status == 2 || itme.temp_type == 2) && index1==2'>待收货</view>
					<view  v-if='itme.order_status == 1 && itme.temp_logistics_status == 3 && (itme.temp_pay_status == 2 || itme.temp_type == 2) && index1==2'>已完成</view>
					<!-- 失败 -->
					<view  v-if='itme.order_status == 1 && index1==3'>拼团失败</view>
				</view>
				<view class="conter">
					<view class="conter_img">
						<view><image class="conter_box1" :src="itme.goods[0].imgs_original"></image></view>
					</view>
					<view class="conter_txet">共{{parseInt(itme.goods[0].num)}}件商品</view>
				</view>
				<view class="footer">
					<view class="foot_x">实付: <text>￥{{itme.price}}元</text></view>
					<view class="foot_a" >
						<!-- <view>分享</view> -->
						<view @click="goOrderDetails(itme)">查看详情</view>
						<!-- <view style="color: #FE0000; border: #FE0000 1upx solid;" v-if="itme.to_pay==1">去支付</view> -->
						<view style="color: #FE0000; border: #FE0000 1upx solid;" v-if='itme.order_status == 1 && itme.temp_pay_status == 1' @click="goPay(itme.order_code)">去支付</view>
						<!-- <view>已退款</view> -->
					</view>
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
					title: '我的拼团',
					color: '#ffffff',
					backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
					statusBarFontColor:'#fff'
				},
				couTop:[{
					id:0,
					name:'全部',
				},
				{
					id:1,
					name:'拼团中',
				},
				{
					id:2,
					name:'拼团成功',
				},
				{
					id:3,
					name:'拼团失败',
				}],
				index1:0,
				pintuanList:[],
			}
		},
		onLoad() {
			this.getmyjonin();
		},
		methods: {
			gotodetail(){
				
			},
			clickTab(index){
				console.log(this.index1,'____________')
				if(this.index1= index){
					this.getmyjonin()
				}else if(this.index1==0){
					this.getmyjonin()
				}
			},
			//去支付
			goPay(order_code) {
				var arr = {
					order_code: order_code,
					// stores_id:this.xshopInfo.store.stores_id,
				};
				var pdata = url.getSignStr(arr);
				uni.request({
					url: url.websiteUrl + '/api_v2/stores/getstoreorderstatus',
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: pdata,
					success: res => {
						if (res.data.data.order_status = 1) {
							uni.navigateTo({
								url: "/pages/goods_details/order_sure?order_code=" + order_code
							})
						} else {
							console.log('2222222222')
							uni.showToast({
								title: '订单超时已经取消啦',
								duration: 1000,
								icon: 'none'
							})
						}
			
					},
					fail: () => {},
					complete: () => {}
				});
			
			},
			goOrderDetails(item) {
				console.log(item.order_code)
				uni.navigateTo({
					url:"/pagesb/center/order_details?order_id="+ item.order_id
				})
				return;
			},
			getmyjonin(){
				try {//从本地缓存中同步获取指定 key 对应的内容。
					const value = uni.getStorageSync('memberinfo');
					const valuex = uni.getStorageSync('shoppingCarts');
					const values = uni.getStorageSync('xshopInfo');
					//console.log(value);
					if(values){
						this.xshopInfo = values;
						this.stores_name = values.store.stores_name;
					}
					if (value) {
						this.memberinfo = value;
						this.login = true;
					}
					if(valuex){
						this.shoppingCarts = valuex;
					}
				}catch (e) {
								// error
				}
				var arr ={
					status:this.index1,
					limit:30,
					offset:0,
					stores_id:this.xshopInfo.store.stores_id,
					member_openid: this.memberinfo.openid,
				};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/mall_order/group_buying_index',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						console.log(res.data.data,'获取拼团信息成功')
						this.pintuanList = res.data.data.order_info
						
				
					}
				})
			},
		},
	

	}
</script>

<style>
	page{
		background-color: #F7F7F7;
	}
	.cou_top{
		width: 750rpx;
		height: 90rpx;
		background-color: #fff;
		font-size: 28rpx;
		color: #333;
		display: flex;
		position: sticky;
	}
	.top{
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		height: 90upx;
		line-height: 90upx;
	}
	.cou_top .top .t1{
		line-height: 40upx;
		padding: 7rpx 10rpx 7rpx 10rpx;
		box-sizing: border-box;
	}
	.cou_top .top.active .t1{
	  background-color: #FE0000;
	  padding: 7rpx 10rpx 7rpx 10rpx;
	  box-sizing: border-box;
	  border-radius:14rpx;
	  color: #fff;
	}
	/* 商品信息 */
	.box{
		height: 330upx;
		width: 710upx;
		background-color: #fff;
		border-radius: 10upx;
		margin-left: 20upx;
		margin-top: 20upx;
	}
	.boxtop{
		width: 96%;
		text-align: center;
		display: flex;
		border-bottom: 1upx solid #F7F7F9;
		font-size: 24upx;
		color: #333;
		justify-content: space-between;
		height: 73upx;
		line-height: 73upx;
	}
	.boxtop_c{
		display: flex;
		margin-left: 20upx;
	}
	.top_img{
		height: 26upx;
		width: 26upx;
		padding-right: 20upx;
	}
	.conter{
		height: 158upx;
		line-height: 158upx;
		border-bottom: 1upx solid #f7f7f9;
		width: 96%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.conter_img{
		margin-left: 20upx;
		display: flex;
	}
	.conter_box1{
		height: 133upx;
		width: 145upx;
		margin-right: 10upx;
	}
	.conter_txet{
		font-size: 22upx;
		color: #999999;
	}
	.footer{
		height: 95upx;
		line-height: 95upx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.foot_x{
		margin-left: 20upx;
		font-size: 24upx;
		color: #333;
	}
	.foot_x text{
		font-size: 30upx;
		color: #FE0000;
	}
	.foot_a{
		display: flex;
		font-size: 24upx;
		color: #333;
		justify-content: center;
	}
	.foot_a view{
		border: 1upx solid #333;
		border-radius: 25upx;
		height: 50upx;
		width: 120upx;
		margin-right: 20upx;
		line-height: 50upx;
		text-align: center;
	}
</style>
