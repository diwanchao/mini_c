<template>
	<view>
		
	<!-- <hx-navbar :config="config" /> -->
	<view class="x12" style="padding:35upx 25upx 15upx 25upx; width: 700upx;">
		<view class="x12" style="margin-bottom:20upx;" v-for="(item,index) in cl_list" :key="index">
			<view class="float-left" style="width: 250upx;">
				<image src="https://div.buy315.com.cn/xcx_imgs/wdxjj.png" style="width: 250upx; height: 180upx; float: left;"></image>
				<view class="x12 text-center text-white" style="margin-top: -155upx;">
					<view class="x12" style="font-weight: bold;">{{deployinfo.monetary_symbol}}<span style="font-size:24pt;">{{item.reduce}}</span></view>
					<view class="x12" style="font-size: 9pt; color: #FEEEED;" v-if="item.cill==1">无使用门槛</view>
					<view class="x12" style="font-size: 9pt; color: #FEEEED;" v-else>满{{item.full}}{{deployinfo.monetary_unit}}可用</view>
				</view>
			</view>
			<view class="float-left" style="width: 410upx; height: 180upx; padding-left: 20upx; padding-right: 20upx; background-color: #fff; border-radius: 0 5upx 5upx 0;">
				<view class="x12" style="font-size: 11pt; font-weight: bold; margin-top: 20upx; color: #666;">{{item.title}}</view>
				<view class="float-left" style="color: #666; font-size: 7pt; margin-top: 10upx;">{{item.start_date}}至{{item.end_date}}</view>
				<view class="float-right border" @click="goLq(item)" style="border-color: #ccc; color: #999; border-radius: 20px; padding: 3px 8px; font-size: 9pt; position: absolute; margin-top: 100upx; right: 50upx;">立即使用</view>
			</view>
		</view>
		<view class="x12 text-center padding-big" v-if="datanum==0">
			<image src="https://div.buy315.com.cn/xcx_imgs/wts.png"  mode="aspectFill" style="width: 132upx; height: 140upx;"></image>
			<view class="x12 text-gray">没有可用劵</view>
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
				deployinfo:{},//配置信息货币单位，符号，以及其他的一些配置参数
			login:false,
			memberinfo:[],
			xshopInfo:[],
			cl_list:[],
			datanum:0,
			limit:30,
			page:0,
			// config:{
			// 	title: '可用券',
			// 	color: '#ffffff',
			// 	backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
			// 	statusBarFontColor:'#fff'
			// },
			}
		},
		onLoad:function(data){
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const values = uni.getStorageSync('xshopInfo');
				this.deployinfo = uni.getStorageSync('deployinfo');
				//console.log(values);
				if(values){
					this.xshopInfo = values;
					this.stores_name = values.store.stores_name;
				}
				if (value) {
					this.memberinfo = value;
					this.login = true;
				}				
			} catch (e) {
				// error
			}
			this.getCk('add',data);
		},
		// onPullDownRefresh(){
		// 	this.cl_list = [];
		// 	this.limit = 30;
		// 	this.page = 0;
		// 	this.getCk();
		// 	uni.stopPullDownRefresh();
		// 	return;
		// },
		onReachBottom() {
		    this.getCk();
		},
		methods: {
			//跳转到详情
			goDetails(data){
				uni.navigateTo({
					url:"/pagesb/center/ck_fkm?number="+data.number+"&title="+data.title
				});
			},
			getCk(action = 'add',data){
				//获取信息
				var arr ={
						member_openid:this.memberinfo.openid,
						order_code:data.order_code,
						limit:this.limit,
						offset:this.page*this.limit,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/app_coupon_offset/aapi_coupon_offset/available',				
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data);
						this.datanum = res.data.total;
						var max_page = res.data.total/this.limit;
						if(max_page<=this.page){
							// uni.showToast({
							//     icon: 'none',
							//     title: '已到底'
							// });
							return;
						}
						if(res.data.status=='y'){
							var datax = res.data.data;
						}else{
							var datax = [];
							uni.showToast({
							    icon: 'none',
							    title: '已到底'
							});
						}
						if (action === 'refresh') {
							this.cl_list = [];
						}						
						datax.forEach(item => {							
							this.cl_list.push(item);
						});
						this.page = this.page+1;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			goLq(data){
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
				//#ifdef MP-WEIXIN
				prevPage.setData({
					yhjdata: {
								acom_id: data.acom_id,
								coupon_money: data.reduce,
							}
				});
				//#endif
				// #ifdef APP-PLUS
						prevPage.$vm.acom_id = data.acom_id;
						prevPage.$vm.coupon_money = data.reduce;
				// #endif
				//console.log(data);
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>
	@import '../../common/common.css';
	page {
		background-color: #f5f5f5;
	}
	.detial img{
		min-width: 100%;
	}
</style>
