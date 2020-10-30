<template>
    <view>
		<view class="x12">
			<view class="x12 bg-white padding-big margin-top">
				
					<view class="x6" style="width: 100upx;">
						<image :src="yemxList.stores_img"  mode="aspectFill" style="width: 84upx; height: 84upx;"></image>
					</view>
				
				<view class="x6 float-right" style="width: 579upx;">
					<view class="x12">
						<view class="x6" style="width: 465upx; color: #393D4A;">
							<view style="font-size: 12pt;">{{yemxList.stores_name}}</view>
							<view style="font-size: 12pt;">{{yemxList.order_code}}</view>
							<view style="font-size: 10pt;">{{yemxList.refund_time}}申请退货</view>
						</view>
						<view class="x12"  v-for="(sitme,sindex) in goodsList" :key="sindex">
							<view class="x6" style="font-size: 10pt; width: 465upx; color: #393D4A;">{{sitme.goods_title}}</view>
							<view class="x6 text-right" style="font-size: 10pt; width: 100upx; color: #393D4A; padding-top:5upx;">x{{sitme.num}}</view>
						</view>
						<view class="x12 text-right" style="font-size: 10pt;">
							共{{yemxList.nums}}件,实退<span style="color: #F65A2A; font-size: 12pt;">{{deployinfo.monetary_symbol}}{{yemxList.refund_money}}</span>
						</view>
					</view>
					<view class="margin-top" style="width:60px;height:26px; text-align: center; line-height: 26px; float: right; margin-left: 20upx; padding: 5upx 20upx; color: #ccc; background:rgba(255,255,255,1);border-radius:18px;border:1px solid #eee; font-size: 10pt;">
						{{yemxList.status_name}}
					</view>
				</view>
			</view>
			
		</view>
		<view class="x12 bg-white padding-big margin-top" style="font-size: 12pt; color: #393D4A;">
			<view class="x12">退货单号：{{yemxList.refund_code}}</view>
			<view class="x12">退货原因：{{yemxList.reason}}</view>
			<view class="x12">退货描述：{{yemxList.content}}</view>
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
			yemxList:[],
			goodsList:[],
			datanum:0,
			refund_id:0,
			send_info:[],
			}
		},
		onLoad:function(data){
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const values = uni.getStorageSync('xshopInfo');
				this.deployinfo = uni.getStorageSync('deployinfo');
				if(values){
					this.xshopInfo = values;
				}
				if (value) {
					this.memberinfo = value;
				}
			} catch (e) {
				// error
			}
			this.refund_id = data.refund_id;
			this.yemx(data);
		},
		onPullDownRefresh() {
			//console.log("下拉刷新");
			//this.refreshing = true;
			this.yemx(this.refund_id);
		},
		methods: {
			yemx(data){
				//获取信息
				var arr ={
						stores_id:'',
						member_openid: this.memberinfo.openid,
						limit:'',
						offset:'',
						refund_id:data.refund_id,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/mall_order/refund_order',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data);
						this.yemxList = res.data.data.refund_info[0];
						this.goodsList = res.data.data.refund_info[0].goods;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//去支付
			goPay(order_code){
				uni.navigateTo({
					url:"/pages/goods_details/order_sure?order_code="+order_code
				})
			},
			//再次购买
			zcShopping(data){
				//console.log(data);return;
				this.goOrderSure(data);
			},
			//结算下单
			goOrderSure(data) {//去结算
				//console.log(data);return;
				var goods_l = []
				var xx = 0;
				for (let i in data) {
						goods_l[xx] = {
								barcode_id:data[i].barcode_id,
								num:data[i].num,
							}
						xx++;
				}
				//console.log(JSON.stringify(goods_l));return;
				//获取信息
				var arr ={
						member_openid: this.memberinfo.openid,
						stores_id:this.xshopInfo.store.stores_id,
						goods:JSON.stringify(goods_l),
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/mall_order/pre_order',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data);return;
						if(res.data.status=='y'){
							uni.navigateTo({
								url:"/pages/goods_details/order_sure?order_code="+res.data.data.order_code
							})
						}else{
							uni.showToast({
								icon:'none',
								title: '下单失败',
							});
							return;
						}						
					}
				});				
			},
			//取消订单
			qxOrder(order_code){
				//获取信息
				var arr ={
						order_code:order_code,
					};
				var pdata = url.getSignStr(arr);
				uni.showModal({
					title: '提示',
					content: '确认取消订单',
					success: function (res) {
						if (res.confirm) {
							uni.request({
								url:url.websiteUrl+'/api_v2/mall_order/cancel_order',
								method:'POST',
								dataType:'json',
								header:{
									'content-type':'application/x-www-form-urlencoded'
								},
								data:pdata,
								success: res => {
									if(res.data.status=='y'){
										uni.redirectTo({
											url:"order_list?status=0"
										})
										return;
									}else{
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
			//去评论
			gopl(data){
				uni.navigateTo({
					url:"goods_pl?order_code="+data
				})
			}
		}
	}

</script>
<style>
	page{
		background-color: #F5F5F5;
	}
	.borderOrange{
		border-bottom:#F3A346 solid 3px;
	}
	.glance-slidenav-tabbar{height: 100upx;display: inline-block;display: flex;z-index: 1;}
</style>
