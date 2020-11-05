<template>

	<view>
		<hx-navbar :config="config" style="width: 750rpx; display: flex; justify-content: center;"/>
		<view  v-if="xShow==true">
			<view class="x12 height-big bg-white text-center text-default text-gray text-333" style="white-space:nowrap;  z-index: 10000; top: 0;">
				<scroll-view scroll-x="true" scroll-left="0" scroll-with-animation="true">
					<view class="glance-slidenav-tabbar">
						<view class="x3" v-for="(itme,index) in oneMenu" :key="index" style="float: left; width: 180upx; padding-left:20upx; padding-right:20upx;">
							<view class="x12 borderOrange" style="color: #F65A2A;" @click="yemx(index)" v-if="xid == itme._id">{{itme.name}}</view>
							<view class="x12" style="overflow:hidden;  text-overflow:ellipsis; white-space:nowrap;" @click="yemx(itme._id)"
							 v-else>{{itme.name}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="x12 padding-bottom">
				<view class="x12 neworderlist" v-for="(xitme,xindex) in yemxList" :key="xindex">
					<view class="box" >
						<view class="boxTop" @click="goOrderDetails(xitme)" >
							<view v-if="xid==4" class="text1">{{xitme.refund_time}}</view>
							<view class="boxTop1">
								<view><image class="timeimg" src="https://div.buy315.com.cn/xcx_imgs/c-set.png"></image></view>
								<view class="text1">{{xitme.order_time}}</view>
								
							</view>
								<view class="text1" v-if='xitme.temp_logistics_status == 3 && xitme.order_status < 4 && xitme.temp_pay_status == 2'>已完成</view>
								<view class="text1" v-if='xitme.order_status == 1 && xitme.to_pay == 1'>待支付</view>
								
								<view class="text1" v-if='xitme.order_status == 1 && xitme.temp_logistics_status == 2 && (xitme.temp_pay_status == 2 || xitme.temp_type == 2)'>待收货</view>
								<view class="text1" v-if='xitme.order_status == 1 && xitme.temp_logistics_status == 1 && (xitme.temp_pay_status == 2 || xitme.temp_type == 2)'>待发货</view>
								<view class="text1" v-if='xitme.order_status == 2'>已取消</view>
								<view class="text1" v-if="xid==4 && xitme.status == 1">退款中</view>
								<view class="text1" v-if="xid==4 && xitme.status == 3">{{xitme.status_name}}</view>
						</view>
					
					
						<view class="boximg" @click="goOrderDetails(xitme)">
							
							<view v-for="(item,index) in xitme.goods" :key="key">
								
							<image class="boximg1" v-if="xid==4" :src="item.img_big"></image>
							
							<image class="boximg1" v-else  :src="item.imgs_original"></image>
							</view>
							<view v-if="xid ==4" class="text2">共{{xitme.nums}}件商品</view>
							<view  class="text2">共{{xitme.nums}}件商品</view>
							
						</view>
						<view class="boxBtom">
							<view class="text3" v-if="xid==4">实付：<text class="text4">{{xitme.refund_money}}元</text></view>
							<view class="text3" v-else>实付：<text class="text4">{{xitme.price}}元</text></view>
							<view class="boxstatus" >
							 <!-- <view class="right" v-if="">确认收货</view>
							 <view class="right" bindtap="getClickToast">催货</view> -->
							 <view class="right" v-if="xitme.status_name !== '正常'">{{xitme.status_name}} </view>
							 <view class="right" v-if="xitme.refund_status == '未审核'">{{xitme.refund_status}}</view>
							
<view class="right" @click="tuiHuo(xitme)" v-if='xitme.order_status==1 && xitme.status_name == "正常" && xitme.temp_type==1 && xitme.temp_pay_status ==2 && xitme.temp_logistics_status==3 && xitme.refund_status == "未审核" '>我要退货</view>
							 <!-- <view class="right" @click="gopl(xitme.order_code)" v-if="xitme.to_pj==1" >去评价</view> -->
							 <!-- <view class="right" v-if="xid==3 && xitme.to_pj==2" >已评价</view> -->
							 <view class="right rights" @click="goPay(xitme.order_code)" v-if="xitme.to_pay==1" >去支付</view>
							 <view class="right" @click="zcShopping(xitme)" v-if="xitme.re_pay==1">再次购买</view>
							 <view class="right" @click="qxOrder(xitme.order_code)" v-if="xitme.cancel==1" >取消订单</view>
							</view>
						</view>
					</view>
					
					</view>
				<!-- </view> -->
				<view class="x12 text-center padding-big" style="padding-top: 20%;" v-if="datanum==0">
					<image src="https://div.buy315.com.cn/xcx_imgs/wts.png" mode="aspectFill" style="width: 132upx; height: 140upx;"></image>
					<view class="x12 text-center padding-small-top" style="font-size: 12pt; color: #747C96;">
						暂无相关订单
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import url from '../../main.js';
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
	export default {
		//#ifdef MP-WEIXIN
		components: {
			uniCountdown
		},
		onShareAppMessage(res) { //分享
			try { //从本地缓存中同步获取指定 key 对应的内容。
				var mv = uni.getStorageSync('memberinfo');
				var xv = uni.getStorageSync('xshopInfo');
				if (res.from === 'button') { // 来自页面内分享按钮
					console.log(res.target)
				}
				return {
					title: xv.store.stores_name,
					path: '/pages/home/index?member_openid=' + mv.openid + "&stores_id=" + xv.store.stores_id
				}
			} catch (e) {
				// error
			}

		},
		//#endif
		data() {
			return {
				config: {
					title: '订单列表',
					color: '#ffffff',
					backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
					statusBarFontColor: '#fff'
				},
				xShow: false,
				deployinfo: {}, //配置信息货币单位，符号，以及其他的一些配置参数
				xid: 0,
				oneMenu: [{
						'_id': 0,
						'name': '全部',
					},
					{
						'_id': 1,
						'name': '待付款',
					},
					{
						'_id': 6,
						'name': '待发货',
					},
					{
						'_id': 2,
						'name': '待收货',
					},
					{
						'_id': 4,
						'name': '退款/售后',
					},
				],
				yemxList: [],
				datanum: 0,
				login: false,
				memberinfo: [],
				xshopInfo: [],
				status: 0,
				limit: 30,
				page: 0,
				listpaid:[],
				yemxListtui:[],
				// tuiyemxList:[],
			}
		},
		onShow: function() { //返回时接收子页面的传参
			try {
				const intervalID = uni.getStorageSync('intervalID');
				//console.log(intervalID);
				clearInterval(intervalID);
			} catch (e) {
				// error
			}
			//this.yemxList = [];
			//this.page = 0;
			//this.limit = 10;
			//this.getData(this.status);
		},
		onLoad: function(data) {

			uni.showLoading({
				title: '加载中'
			});
			try { //从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const values = uni.getStorageSync('xshopInfo');
				this.deployinfo = uni.getStorageSync('deployinfo');
				if (values) {
					this.xshopInfo = values;
				}
				if (value) {
					this.memberinfo = value;
				}
			} catch (e) {
				// error
			}
			this.yemxList = [];
			this.page = 0;
			this.limit = 30;
			this.status = data;
			this.getData(data);
			this.yemx();
			console.log(this.getData)
			uni.switchTab({
				url: '/pages/center/center'
			})
			console.log('111111111')
		},
		onPullDownRefresh() {
			//console.log(this.status.status);return;
			this.yemxList = [];
			this.page = 0;
			this.limit = 30;
			this.getData(this.status);
		},
		onReachBottom() {
			this.getData(this.status, 'add');

		},
		methods: {
			yemx(data) {
				this.yemxList = [];
				this.page = 0;
				this.limit = 30;
				this.getData(data);
			},
			goOrderDetails(item) {
				// console.log(data)
				// uni.navigateTo({
				// 		url: "order_details?order_id=" + data.order_id + "&order_code=" + data.order_code
				// 	})
				if (this.xid == 4) {
					uni.navigateTo({
						url: "order_details?order_id=" + item.order_id + "&order_code=" + item.order_code
						// url: "order_th_details?refund_id=" + item.refund_id
					})
					return;
				} else {
					console.log('$$$$$$$$$$$$$$$$')
					uni.navigateTo({
						// url:'/pagesb/center/order_details'
						url: "order_details?order_id=" + item.order_id + "&order_code=" + item.order_code
					})
					return;
				}

			},
			getData(data, action = 'add') {
				//console.log(data);
				if (data.status != undefined) {
					var im = data.status;
				} else {
					var im = data;
				}
				//console.log(im);
				this.xid = im;
				this.status = data;
				if (im == 4) {
					//获取信息
					var arr = {
						stores_id: '',
						member_openid: this.memberinfo.openid,
						limit: this.limit,
						offset: this.page * this.limit,
						refund_id: '',
					};
					var pdata = url.getSignStr(arr);
					uni.request({
						url: url.websiteUrl + '/api_v2/mall_order/refund_order',
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: pdata,
						success: res => {
							this.xShow = true;
							uni.hideLoading();
							//console.log(res.data);
							this.datanum = res.data.total;
							//this.yemxList = res.data.data.order_info;
							//console.log(res.data);
							var max_page = res.data.total / this.limit;
							if (max_page <= this.page) {
								// uni.showToast({
								// 	icon: 'none',
								// 	title: '已到底'
								// });
								return;
							}
							if (res.data.status == 'y') {
								var datax = res.data.data.refund_info;
							} else {
								var datax = [];
								// uni.showToast({
								// 	icon: 'none',
								// 	title: '已到底'
								// });
							}
							if (action === 'refresh') {
								this.yemxList = [];
							}
							datax.forEach(item => {
								this.yemxList.push(item);
							});
							this.page = this.page + 1;
							//console.log(this.yemxList);
							//console.log(res.data);return;
							uni.stopPullDownRefresh();

						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					//获取信息
					var arr = {
						stores_id: this.xshopInfo.store.stores_id,
						member_openid: this.memberinfo.openid,
						status: im,
						limit: this.limit,
						offset: this.page * this.limit,
					};
					var pdata = url.getSignStr(arr);
					uni.request({
						url: url.websiteUrl + '/api_v2/mall_order/index',
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: pdata,
						success: res => {

							
							this.xShow = true;
							uni.hideLoading();
							this.datanum = res.data.data.order_info.length;
							this.listpaid = res.data.data.order_info
							console.log(this.listpaid)
							console.log(this.datanum)
							for (let i in this.listpaid) {
								this.xdtime = this.listpaid[i].expiration_time;
							}
							console.log(this.xdtime)
							// console.log(this.xdtime)
							// let jstime = new Date(that.xdtime)
							// let new_date = new Date();
							// let old_date = jstime; //设置过去的一个时间点，"yyyy-MM-dd HH:mm:ss"格式化日期
							// // let old_date = '2020-09-30 15:44:50'; //设置过去的一个时间点，"yyyy-MM-dd HH:mm:ss"格式化日期
							// var difftime = (old_date - new_date) / 1000; //计算时间差,并把毫秒转换成秒
							// var days = parseInt(difftime / 86400); // 天  24*60*60*1000 
							// var hours = parseInt(difftime / 3600) - 24 * days;    // 小时 60*60 总小时数-过去的小时数=现在的小时数 
							// var minutes = parseInt(difftime % 3600 / 60); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
							// var seconds = parseInt(difftime % 60);  // 以60秒为一整份 取余 剩下秒数
							// console.log('difftime' + difftime)
							// console.log('现在时间：' + new_date)
							// console.log('自定义时间：' + old_date)
							// console.log("时间差是: " + days + "天, " + hours + "小时, " + minutes + "分钟, " + seconds + "秒")
							// //console.log(res.data);
							// that.d = days
							// that.h = hours
							// that.m = minutes
							// that.s = seconds
							// console.log(that.s)
							// if(that.s == '0'){
							// 	console.log('sgdjysgr')
							// 	uni.showToast({
							// 		title:'订单超时已取消'
							// 	})
							// }
							// console.log(that.xdtime)
							// console.log(that.yemxList.order_code,)
							//this.yemxList = res.data.data.order_info;
							//console.log(res.data);
							var max_page = res.data.total / this.limit;
							if (max_page <= this.page) {
								// uni.showToast({
								// 	icon: 'none',
								// 	title: '已到底'
								// });
								return;
							}
							if (res.data.status == 'y') {
								var datax = res.data.data.order_info;
							} else {
								var datax = [];
								// uni.showToast({
								// 	icon: 'none',
								// 	title: '已到底'
								// });
							}
							if (action === 'refresh') {
								this.yemxList = [];
							}
							datax.forEach(item => {
								this.yemxList.push(item);
							});
							this.page = this.page + 1;
							//console.log(this.yemxList);
							//console.log(res.data);return;
							uni.stopPullDownRefresh();
							return;

						},
						fail: () => {},
						complete: () => {}
					});
				}
			},
			//取消订单
			qxOrder(order_code) {
				//获取信息
				var arr = {
					order_code: order_code,
				};
				var pdata = url.getSignStr(arr);
				uni.showModal({
					title: '提示',
					content: '确认取消订单',
					success: function(res) {
						if (res.confirm) {
							uni.request({
								url: url.websiteUrl + '/api_v2/mall_order/cancel_order',
								method: 'POST',
								dataType: 'json',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								data: pdata,
								success: res => {
									if (res.data.status == 'y') {
										uni.removeStorageSync('newshopcart');
										uni.redirectTo({
											url: "order_list?status=0"
										})
										return;
									} else {
										uni.showToast({
											icon: 'none',
											title: res.data.info
										});
										return;
									}
								},
								fail: () => {},
								complete: () => {}
							});
						} else if (res.cancel) {
							//console.log('用户点击取消');
						}
					}
				});
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
							uni.removeStorageSync('newshopcart');
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
			//再次购买
			zcShopping(data) {
				//console.log(data);return;
				this.goOrderSure(data);
			},
			//结算下单
			goOrderSure(data) { //去结算
				//console.log(data);return;
				var goods_l = []
				var xx = 0;
				for (let i in data.goods) {
					goods_l[xx] = {
						barcode_id: data.goods[i].barcode_id,
						num: data.goods[i].num,
					}
					xx++;
				}
				//console.log(JSON.stringify(goods_l));
				//获取信息
				var arr = {
					member_openid: this.memberinfo.openid,
					stores_id: this.xshopInfo.store.stores_id,
					goods: JSON.stringify(goods_l),

				};
				var pdata = url.getSignStr(arr);
				uni.request({
					url: url.websiteUrl + '/api_v2/mall_order/pre_order',
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: pdata,
					success: res => {
						//console.log(res.data);return;
						if (res.data.status == 'y') {
							uni.navigateTo({
								url: "/pages/goods_details/order_sure?order_code=" + res.data.data.order_code
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '商品已下架',
							});
							return;
						}
					}
				});
			},
			//去评论
			gopl(data) {
				uni.navigateTo({
					url: "goods_pl?order_code=" + data
				})
			},
			//退货
			tuiHuo(data) {
				uni.navigateTo({
					url: "order_th?goods=" + JSON.stringify(data.goods) + "&order_code=" + data.order_code
				})
			}
		}
	}
</script>
<style>
	page {
		background-color: #F5F5F5;
	}

	.borderOrange {
		border-bottom: #F65A2A solid 3px;
	}

	.glance-slidenav-tabbar {
		height: 100upx;
		display: inline-block;
		display: flex;
		z-index: 1;
	}

	.sytime_all {
		position: absolute;
		left: 15upx;
		height: 26px;
		padding: 5upx 20upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 18px;
		border: 1px solid #F65A2A;
		font-size: 26upx;
		color: #F65A2A;
		display: flex;
		align-items: center;
	}
	/* 订单列表 */
	.box{
		height: 330rpx;
		width: 710rpx;
		background-color: #fff;
		margin-left: 20rpx;
		border-radius: 10rpx;
		margin-top: 20rpx;
	}
	.boxTop{
		width: 96%;
		color: #999;
		font-size: 24rpx;
		display: flex;
		justify-content: space-between;
		border-bottom: #F7F7F7 1rpx solid;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		
	}
	.boxTop1{
		display: flex;
	}
	.timeimg{
		height: 26rpx;
		width: 26rpx;
	}
	.boximg{
		display: flex;
		margin-left: 20rpx;
		margin-top: 15rpx;
		padding-bottom: 10rpx;
		border-bottom: 1rpx solid #F7F7F7;
		font-size: 22rpx;
		color: #999;
		align-items: center;
		overflow: hidden;
		width: 460rpx;
	}
	.boximg1{
		height: 133rpx;
		width: 145rpx;
		margin-right: 10rpx;
	}
	.text2{
		position: absolute;
		right: 60rpx;
		font-size: 24rpx;
	}
	.boxBtom{
		display: flex;
		justify-content: space-between;
		margin-left: 20rpx;
		height: 100rpx;
		line-height: 100rpx;
	}
	.boxstatus{
		display: flex;
		margin-right: 20rpx;
	}
	.right{
		border: 1rpx solid #333;
		font-size: 24rpx;
		color: #333;
		height: 50rpx;
		width: 150rpx;
		border-radius: 25rpx;
		margin-left: 20rpx;
		line-height: 50rpx;
		text-align: center;
		margin-top: 20rpx;
	}
	.rights{
		color: #FE0000;
		border: 1rpx solid #FE0000;
	}
	.text3{
		font-size: 24rpx;
		color: #333;
	}
	.text4{
		font-size: 30rpx;
		color: #FE0000;
	}
</style>
