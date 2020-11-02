<template>
    <view  v-if="xShow==true">
		<!--pages/order/detail.wxml-->
	
	<hx-navbar :config="config"/>
		<!-- 支付信息 -->
		<!-- 等待支付 -->
		<view class="pageall" >
		<view class="zf" >
		  <view v-if='yemxList.order_status == 1 && yemxList.to_pay == 1'> 
		    <view class="za_sj"><text style="float: left; color: #333;">等待支付，剩余</text><view class="daojishist">
				<!-- <view>{{minutes}}分钟 </view> -->
				<view class="newstyle">
				<uni-countdown color="#fe0000"   :show-day="false" :hour="false" :minute="m" :second="s"></uni-countdown>
				</view>
			</view>
			</view>
		    <view class="zf_tisy">订单超时未支付将自动关闭</view>
		    <view class="zf_an">
		      <view class="zf_anlj" @click="qxOrder(yemxList.order_code)">取消订单</view>
		      <view class="zf_anlj zasi" @click="goPay(yemxList.order_code)">立即支付</view>
		    </view>
		  </view>
		  <!-- 取消 -->
		  <view v-if='yemxList.order_status == 2'>  
		    <view class="za_sj">已取消</view>
		    <view class="zf_tisy">订单已取消</view> 
		    <!-- <view class="zf_an">
		      <view class="zf_anlj zasi zf_dele">删除订单</view>
		    </view> -->
		  </view>
		<!-- 完成 -->
		  <view v-if='yemxList.logistics_status == 3 && yemxList.order_status < 4 && yemxList.to_pay == 2 '> 
		    <view class="za_sj">已完成</view>
		    <view class="zf_tisy">感谢您的信任，期待你再次光临</view>
		    <view class="zf_an">
		      <!-- <view class="zf_anlj" @click="clickAfter(yemxList)">申请售后</view> -->
		      <!-- <view class="zf_anlj zasi zf_dele">删除订单</view> -->
		    </view>
		  </view>
		<!-- 待收货 -->
		  <view v-if='yemxList.order_status == 1 && (yemxList.to_pay == 2 || yemxList.order_type == 2) &&  yemxList.logistics_status < 3'> 
		    <view class="za_sj">待收货</view>
		    <!-- <view class="zf_tisy">您的订单正在配送</view> -->
		    <view class="zf_an">
		      <!-- <view class="zf_anlj zasi zf_dele">删除订单</view> -->
		    </view>
		  </view> 
		  <!-- 退款 -->
		</view>
		<view class="x12 bg-white padding-big margin-top text-center" v-if="yemxList.mode==2 && yemxList.logistics_status<3 && yemxList.barcode_img!=''">
			<view class="x12" style="font-size: 14pt;">- 提货码 -</view>
			<view class="x12" style="font-size: 10pt; color: #9B9B9B;">凭提货码到门店提货</view>
			<view class="x12" style="margin-top: 20upx;"><image :src="yemxList.barcode_img"  mode="aspectFill" style="width: 444upx; height:99upx;"></image></view>
			<view class="x12" style="font-size: 14pt;">{{yemxList.delivery_code}}</view>
		</view>
		<view class="x12 bg-white padding-big margin-top text-center" v-else-if="yemxList.qrcode_img!=''">
			<view class="x12"><image :src="yemxList.qrcode_img"  mode="aspectFill" style="width: 200upx; height: 200upx;"></image></view>
			<view class="x12" style="font-size: 10pt; color: #9B9B9B;">- 店员扫码可退货 -</view>
		</view>
		<!-- 弹出层 -->
<!-- 		  <view class="group" hidden="{{hiddenName}}">
		    <view class="group_bg" bindtap="showMask"></view>
		    <view class="group_botton">
		      <view class="group_lx">
		        <view>联系商家</view>
		        <image class="group_phone" src="/images/icon_phones.png"></image>
		      </view>
		      <view class="group_tk" bindtap="gotoRefund">
		        <view>申请退款</view>
		        <view class="group_ts">
		          <view>退回收到的商品</view>
		          <image class="group_back" src="{{image_icon}}right.png"></image>
		        </view>
		      </view>
		    </view>
		  </view> -->
		<!-- 地址 -->
<!-- 		<view class="ps" >
		  <view class="ps_dz">配送点：<text>{{yemxList.stores_name}}</text></view>
		  
		   <view class="ps_dz">联系人:</text></view>
		  <view class="ps_dz">联系人：<text>{{yemxList.name}}</text></view>
		  <view class="ps_tb">
		    <view class="ps_dz">联系电话：<text>{{yemxList.stores_tel}}</text></view>
		    <image class="ps_icon" src="/images/icon_phone.png"></image>
		    <view>拨打电话</view>
		  </view>
		</view> -->
		<!-- 商品信息 -->
		 <view class="shop" v-for="xitem in goodsList" > 
		  <view class="shop_al">
		    <view class='shop_mc'>商品信息</view>
		  </view>
		  <view>
		    <view class="shop_xx" >
		      <view>
		        <image class="img_01" :src="xitem.imgs_original"></image>
		      </view>
		      <view>
		      <view class="shop_text01">{{xitem.goods_title}}</view>
		        <view class="shop_je">
		          <view class="shop_xj">￥{{xitem.price}}</view>
		          <view class="shop_yj">￥{{xitem.retail_price}}</view>
		          <view class="shop_sl">x{{parseInt(xitem.num)}}</view>
		        </view>
		        <!-- <view class="biaoqian">
		          <view class="biaoq_text">一刻达</view>
		          <view class="biaoq_text">满30减5</view>
		        </view> -->
		      </view>
		    </view>
		  </view>
		 </view>
		 <!-- 订单编号 -->
		  <!-- 订单编号 -->
		 <view class="ddbh">
		  <view>订单编号：<text>{{yemxList.order_code}}</text></view>
		  <view>下单时间：<text>{{yemxList.order_time}}</text></view>
		  <view v-if="yemxList.order_type == 1">支付方式：<text>在线支付</text></view>
		  <view v-else>支付方式：<text>货到付款</text></view>
		 </view>
		<view class="ddbhss">
		  <view class="xinxi">
		    <view>商品总额</view>
		    <view class="xinxi_je">￥{{yemxList.price}}</view>
		  </view>
		  <view class="xinxi">
		    <view>优惠金额</view>
		    <view class="xinxi_je">￥{{yemxList.discount_money}}</view>
		  </view>
	<!-- 	  <view class="xinxi">
		    <view>运费</view>
		    <view class="xinxi_je">￥0.00</view>
		  </view> -->
		  <view class="sfk">实付款:<text>￥{{yemxList.price}}</text></view>
		 </view>
</view>
<!-- 		<view class="page-body" v-if="send_info.type<=1 && send_info.status==2 && rider_status<3 && deployinfo.map_address==1">
		    <view class="page-section page-section-gap">
		        <map style="width: 100%; height:70vh;" :latitude="latitude" :longitude="longitude" :markers="covers">
		        </map>
				<view class="x-auto" @click="pesLbs('sx')" style="position: absolute;z-index: 10000000; right: 30upx; margin-top: -100upx;"><image src="https://div.buy315.com.cn/xcx_imgs/dtsx.png"  mode="aspectFill" style="width: 60upx; height: 60upx;"></image></view>
		    </view>
		</view>
		<view class="x12 padding"  v-if="send_info.type<=1 && send_info.status==2">
			<view class="x12 bg-white padding-big" style="border-radius: 6px;">
				<view class="x12" style="font-size: 12pt;  color: #393D4A; padding-top: 0upx;">
					<view class="x12" style="font-weight: bold;">{{yemxList.stores_name}}</view>
					<view class="x12">{{rider.name}}</view>
				</view>
			</view>
		</view> -->
		<!-- <view class="x12">
			<view class="x12 bg-white padding-big">
					<view class="x6" style="width: 100upx;">
						<image :src="yemxList.stores_img"  mode="aspectFill" style="width: 84upx; height: 84upx;"></image>
					</view>
				
				<view class="x6 float-right" style="width: 579upx;">
					<view class="x12">
						<view class="x6" style="width: 465upx; color: #393D4A;">
							<view style="font-size: 12pt;"  v-if="send_info.type>1 || send_info.status!=2">{{yemxList.stores_name}}</view>
							<view style="font-size: 10pt;"><span style="color: #F65A2A;" v-if="yemxList.mode_name!=''">[{{yemxList.mode_name}}]</span>{{yemxList.order_time}}下单</view>
						</view>
						<view class="x12"  v-for="(sitme,sindex) in goodsList" :key="sindex">
							<view class="x6" style="font-size: 10pt; width: 465upx; color: #393D4A;">{{sitme.goods_title}}</view>
							<view class="x6 text-right" style="font-size: 10pt; width: 100upx; color: #393D4A; padding-top:5upx;">x{{sitme.num}}</view>
						</view>
						<view class="x12 text-right" style="font-size: 10pt;">
							共{{yemxList.nums}}件,实付<span style="color: #F65A2A; font-size: 12pt;">{{deployinfo.monetary_symbol}}{{yemxList.price}}</span>
						</view>
					</view>
					<view class="x12 text-center border-top border-gray" style=" position: relative; line-height: 48upx; margin-top: 10upx;">
						<view class="margin-top"  @click="gopl(yemxList.order_code)" v-if="yemxList.to_pj==1" style="width:90px;height:26px; float: right; display: none; margin-left: 20upx; padding: 5upx 20upx; color: #F65A2A; background:rgba(255,255,255,1);border-radius:18px;border:1px solid rgba(246,90,42,1); font-size: 10pt;">
							去评价
						</view>
						
						<view class="margin-top" style="width:60px;height:26px; float: right; margin-left: 20upx; padding: 5upx 20upx; color: #ccc; background:rgba(255,255,255,1);border-radius:18px;border:1px solid #eee; font-size: 10pt;">
							{{yemxList.status_name}}
						</view>
						
						<view class="margin-top" @click="goPay(yemxList.order_code)" v-if="yemxList.to_pay==1" style="width:70px;height:26px; float: right; margin-left: 20upx; padding: 5upx 20upx; color: #F65A2A; background:rgba(255,255,255,1);border-radius:18px;border:1px solid rgba(246,90,42,1); font-size: 10pt;">
							去支付
						</view>
						<view class="margin-top" @click="zcShopping(goodsList)" v-if="yemxList.re_pay==1" style="width:70px;height:26px; float: right; margin-left: 20upx; padding: 5upx 20upx; color: #747C96; background:rgba(255,255,255,1);border-radius:18px;border:1px solid rgba(204,204,204,1); font-size: 10pt;">
							再次购买
						</view>
						<view class="margin-top" @click="qxOrder(yemxList.order_code)" v-if="yemxList.cancel==1" style="width:70px;height:26px; float: right; margin-left: 20upx; padding: 5upx 20upx; color: #747C96; background:rgba(255,255,255,1);border-radius:18px;border:1px solid rgba(204,204,204,1); font-size: 10pt;">
							取消订单
						</view>
					<text class="text1">
								距离订单取消还有
							</text>
						<view class=" margin-top sytime_all" v-if="yemxList.to_pay == 1 "  >
							剩余
							<uni-countdown color="#F65A2A"  v-if="m!=0" :show-day="false" :show-hour="false" :minute="m" :second="s"></uni-countdown>								取消
						</view>
					</view>
				</view>
			</view>	
		</view> -->
	<!-- 	<view class="btn-row x12" style="margin-top:20upx;" v-if="deployinfo.share_order_goods==2">
			<button style="background:#51A938; color: #fff; border-radius:24px; width: 525upx; margin-top: 10px;" @click="onImg(yemxList.order_code)">分享给好友</button>
		</view> -->
	<!-- 	<view class="x12 bg-white padding-big margin-top" style="font-size: 12pt; color: #393D4A;">
			<view class="x12">订单编号：{{yemxList.order_code}}</view>
			<view class="x12" v-if="yemxList.pay_time!=''">购买时间：{{yemxList.pay_time}}</view>
			<view class="x12" v-if="send_info.type==2">物流公司：{{send_info.name}}</view>
			<view class="x12" v-if="send_info.type==2">物流单号：{{send_info.logistics_number}}</view>
		</view>
		<view class="x12 bg-white padding-big margin-top text-center" v-if="yemxList.mode==2 && yemxList.logistics_status<3 && yemxList.barcode_img!=''">
			<view class="x12" style="font-size: 14pt;">- 提货码 -</view>
			<view class="x12" style="font-size: 10pt; color: #9B9B9B;">凭提货码到门店提货</view>
			<view class="x12" style="margin-top: 20upx;"><image :src="yemxList.barcode_img"  mode="aspectFill" style="width: 444upx; height:99upx;"></image></view>
			<view class="x12" style="font-size: 14pt;">{{yemxList.delivery_code}}</view>
		</view>
		<view class="x12 bg-white padding-big margin-top text-center" v-else-if="yemxList.qrcode_img!=''">
			<view class="x12"><image :src="yemxList.qrcode_img"  mode="aspectFill" style="width: 344upx; height: 344upx;"></image></view>
			<view class="x12" style="font-size: 10pt; color: #9B9B9B;">- 店员扫码可退货 -</view>
		</view> -->
    </view>
</template>
<script>import url from '../../main.js';
// import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
import uniCountdown from "@/components/linnian-CountDown/uni-countdown.vue";
	export default {
		components: {uniCountdown},
		//#ifdef MP-WEIXIN
		onShareAppMessage(res) {//分享
			try {//从本地缓存中同步获取指定 key 对应的内容。
				var mv = uni.getStorageSync('memberinfo');
				var xv = uni.getStorageSync('xshopInfo');
				if (res.from === 'button') {// 来自页面内分享按钮
				  console.log(res.target)
				}
				//console.log(this.imgUrl)
				return {
				  title: xv.store.stores_name,
				  path: '/pages/home/index?member_openid='+mv.openid+"&stores_id="+xv.store.stores_id,
				}
			} catch (e) {
				// error
			}
			
		  },
		//#endif
		data() {
			return {
				config:{
					title: '订单详情',
					color: '#ffffff',
					backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
					statusBarFontColor:'#fff'
				},
			xShow:false,
			isselect:2,
			deployinfo:{},//配置信息货币单位，符号，以及其他的一些配置参数
			yemxList:[],
			goodsList:[],
			datanum:0,
			jstime:'',	
			order_id:0,
			send_info:[],
			dsq_status:1,
			hour:0,
			minute: 0,
			second:0,
			xreset: false,
			//id:0, // 使用 marker点击事件 需要填写id
			//title: 'map',
			latitude: '',
			shengyutime:'',
			longitude: '',
			covers: [],
			rider:{},
			rider_status:0,
			minutes:'',
			imgUrl:'',
			m:'',
			s:'',
			d:'',
			h:'',
			xdtime:'',
			order_code:'',
			}
		},
		onLoad:function(data){
		
			uni.showLoading({
			    title: '加载中'
			});
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const values = uni.getStorageSync('xshopInfo');
				this.deployinfo = uni.getStorageSync('deployinfo');
				//console.log(JSON.stringify(this.deployinfo));
				if(values){
					this.xshopInfo = values;					
				}
				if (value) {
					this.memberinfo = value;
				}
			} catch (e) {
				// error
			}
			//console.log(data);
			this.order_id = data.order_id;
			this.yemx();
			// this.getTimedjs();
		},
		onPullDownRefresh() {
			//console.log("下拉刷新");
			//this.refreshing = true;
			this.yemx(this.order_id);
		},
		methods: {
			reset(time) {
				this.time = time
				this.$refs.countdown.restart()
			},
			fillWithZero(num, n) {
				var len = num.toString().length;
				while (len < n) {
					num = "0" + num;
					len++;
				}
				return num;
			},
			yemx(){
				var that = this
				//获取信息
				var arr ={
						order_id:that.order_id,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/mall_order/detials',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						that.xdtime = res.data.data.expiration_time.replace(/-/g,'/');
						that.goodsList = res.data.data.goods;
						that.send_info = res.data.data.send_info;
						that.order_code = that.yemxList.order_code,
						that.yemxList = res.data.data.order_info;
						let jstime = new Date(that.xdtime)
						let new_date = new Date();
						let old_date = jstime; //设置过去的一个时间点，"yyyy-MM-dd HH:mm:ss"格式化日期
						// let old_date = '2020-09-30 15:44:50'; //设置过去的一个时间点，"yyyy-MM-dd HH:mm:ss"格式化日期
						var difftime = (old_date - new_date) / 1000; //计算时间差,并把毫秒转换成秒
						var days = parseInt(difftime / 86400); // 天  24*60*60*1000 
						var hours = parseInt(difftime / 3600) - 24 * days;    // 小时 60*60 总小时数-过去的小时数=现在的小时数 
						var minutes = parseInt(difftime % 3600 / 60); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
						var seconds = parseInt(difftime % 60);  // 以60秒为一整份 取余 剩下秒数
						console.log('difftime' + difftime)
						console.log('现在时间：' + new_date)
						console.log('自定义时间：' + old_date)
						console.log("时间差是: " + days + "天, " + hours + "小时, " + minutes + "分钟, " + seconds + "秒")
						//console.log(res.data);
						that.d = days
						that.h = hours
						that.m = minutes
						that.s = seconds
						console.log(that.m)
					
						
						
						
						
						// this.shengyutime = res.data.data.expiration_time
						// console.log(this.jstime,'————————————————当前时间')
						// console.log(this.m,'————————————————剩余时间')
						// if(that.s == '0'){
						// 	this.yemx();
						// 	// console.log('sgdjysgr')
						// 	// uni.showToast({
						// 	// 	title:'订单超时已取消'
						// 	// })
						// }
						this.pesLbs();
						this.downData();
						uni.stopPullDownRefresh();
						
				
					},
				
				
					fail: () => {},
					complete: () => {}
				});
			},
			onImg(order_code){
				//获取信息
				var arr ={
						order_code:order_code,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/imgs/order_goods_img',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data);
						if(res.data.status=='n'){
							uni.showToast({
								icon:'none',
								title: res.data.info,
							});
							return;
						}
						wx.previewImage({
						  current: res.data.data, // 当前显示图片的http链接
						  urls: [res.data.data] // 需要预览的图片http链接列表
						})
					},
					fail: () => {},
					complete: () => {}
				});
				
			},
			//定时获取配送员实时位置
			downData() {
				var kthis = this;
				//console.log(kthis.yemxList);return;
					var intervalID = setInterval(function () {
									//获取信息
									var arr ={
											order_code: this.order_code,
										};
									var pdata = url.getSignStr(arr);
									//console.log(pdata);
									uni.request({
										url:url.websiteUrl+'/api_v2/mall_order/get_position',
										method:'POST',
										dataType:'json',
										header:{
											'content-type':'application/x-www-form-urlencoded'
										},
										data:pdata,
										success: res => {
											if(res.data.status=='y'){
												var rider = {};
												if(res.data.data.rider_status==0){
													rider = {
														name:'商家正在备货！',
													}
												}else if(res.data.data.rider_status==1){
													rider = {
														name:'骑手已接单，正在赶往商家！距离商家'+res.data.data.distance+'。',
													}
												}else if(res.data.data.rider_status==2){
													rider = {
														name:'骑手已取货，距离您'+res.data.data.distance+'！',
													}
												}else if(res.data.data.rider_status==3){
													rider = {
														name:'配送订单已完成！',
													}
												}  
												kthis.rider = rider;
												kthis.rider_status = res.data.data.rider_status;
												if(res.data.data.distributor.length==0 || res.data.data.rider_status==0){
													kthis.latitude = res.data.data.stores.lat;
													kthis.longitude = res.data.data.stores.lng;
													kthis.covers = [{
																	latitude: res.data.data.stores.lat,
																	longitude: res.data.data.stores.lng,
																	iconPath: 'https://div.buy315.com.cn/xcx_imgs/shop.png',
																	width:60,
																	height:60,
																	title:res.data.data.stores.name,
																	callout:{
																		content:res.data.data.stores.name+'\n商家正在备货',
																		display:'ALWAYS',
																		fontSize:14,
																		borderRadius:5,
																		color:'#333333',
																		padding:8,
																		//bgColor:'#FFCC00',
																	}
																},{
																		latitude: res.data.data.member.lat,
																		longitude: res.data.data.member.lng,
																		iconPath: 'https://div.buy315.com.cn/xcx_imgs/member.png',
																		width:60,
																		height:60,
																		title:res.data.data.member.name,
																		callout:{
																			display:'ALWAYS',
																		}
															}];
												}else if(res.data.data.rider_status==1){
															kthis.latitude = res.data.data.distributor.lat;
															kthis.longitude = res.data.data.distributor.lng;
															kthis.covers = [{
																		latitude: res.data.data.distributor.lat,
																		longitude: res.data.data.distributor.lng,
																		iconPath: 'https://div.buy315.com.cn/xcx_imgs/psc.png',
																		width:50,
																		height:50,
																		title:res.data.data.distributor.name,
																		callout:{
																			content:'骑手已接单，正在赶往商家！\n距离商家'+res.data.data.distance,
																			display:'ALWAYS',
																			fontSize:14,
																			borderRadius:5,
																			color:'#333333',
																			padding:8,
																			//bgColor:'#FFCC00',
																		}												
																	},{
																	latitude: res.data.data.stores.lat,
																	longitude: res.data.data.stores.lng,
																	iconPath: 'https://div.buy315.com.cn/xcx_imgs/shop.png',
																	width:60,
																	height:60,
																	title:res.data.data.stores.name,
																	callout:{
																		content:res.data.data.stores.name,
																		display:'ALWAYS',
																		fontSize:14,
																		borderRadius:5,
																		color:'#333333',
																		padding:8,
																		//bgColor:'#FFCC00',
																	}												
																}];
												}else if(res.data.data.rider_status==2){
															kthis.latitude = res.data.data.distributor.lat;
															kthis.longitude = res.data.data.distributor.lng;
															kthis.covers = [{
																		latitude: res.data.data.distributor.lat,
																		longitude: res.data.data.distributor.lng,
																		iconPath: 'https://div.buy315.com.cn/xcx_imgs/psc.png',
																		width:50,
																		height:50,
																		title:res.data.data.distributor.name,
																		callout:{
																			content:'骑手已取货，距离您'+res.data.data.distance+'！',
																			display:'ALWAYS',
																			fontSize:14,
																			borderRadius:5,
																			color:'#333333',
																			padding:8,
																			//bgColor:'#FFCC00',
																		}												
																	},{
																			latitude: res.data.data.member.lat,
																			longitude: res.data.data.member.lng,
																			iconPath: 'https://div.buy315.com.cn/xcx_imgs/member.png',
																			width:60,
																			height:60,
																			title:res.data.data.member.name,
																			callout:{
																				display:'ALWAYS',
																			}
																}];
												}										
											}
										},
										fail: () => {},
										complete: () => {}
									});
								
							
					
							
					}, 2000);
					//console.log(intervalID);
					try {
						//写入缓存
						uni.setStorage({
							key: 'intervalID',
							data:intervalID,
							success: function () {
							}
						});
					} catch (e) {
						// error
					}
			},
			//获取配送员实时位置
			pesLbs(kthis){
				if(kthis=='sx'){
					uni.showToast({
						title: '正在刷新位置...',
						duration: 2000,
						icon:'loading',
					});
				}
				//获取信息
				var arr ={
						order_code: this.yemxList.order_code,
					};
				var pdata = url.getSignStr(arr);
				//console.log(pdata);
				uni.request({
					url:url.websiteUrl+'/api_v2/mall_order/get_position',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						this.xShow = true;
						uni.hideLoading();
						//console.log(res.data);
						if(res.data.status=='y'){
							var rider = {};
							if(res.data.data.rider_status==0){
								rider = {
									name:'商家正在备货！',
								}
							}else if(res.data.data.rider_status==1){
								rider = {
									name:'骑手已接单，正在赶往商家！距离商家'+res.data.data.distance+'。',
								}
							}else if(res.data.data.rider_status==2){
								rider = {
									name:'骑手已取货，距离您'+res.data.data.distance+'！',
								}
							}else if(res.data.data.rider_status==3){
								rider = {
									name:'配送订单已完成！',
								}
							}
							this.rider = rider;
							this.rider_status = res.data.data.rider_status;
							if(res.data.data.distributor.length==0 || res.data.data.rider_status==0){
								this.latitude = res.data.data.stores.lat;
								this.longitude = res.data.data.stores.lng;
								this.covers = [{
												latitude: res.data.data.stores.lat,
												longitude: res.data.data.stores.lng,
												iconPath: 'https://div.buy315.com.cn/xcx_imgs/shop.png',
												width:60,
												height:60,
												title:res.data.data.stores.name,
												callout:{
													content:res.data.data.stores.name+'\n商家正在备货',
													display:'ALWAYS',
													fontSize:14,
													borderRadius:5,
													color:'#333333',
													padding:8,
													//bgColor:'#FFCC00',
												}												
											},{
													latitude: res.data.data.member.lat,
													longitude: res.data.data.member.lng,
													iconPath: 'https://div.buy315.com.cn/xcx_imgs/member.png',
													width:60,
													height:60,
													title:res.data.data.member.name,
													callout:{
													}
										}];
							}else if(res.data.data.rider_status==1){
										this.latitude = res.data.data.distributor.lat;
										this.longitude = res.data.data.distributor.lng;
										this.covers = [{
													latitude: res.data.data.distributor.lat,
													longitude: res.data.data.distributor.lng,
													iconPath: 'https://div.buy315.com.cn/xcx_imgs/psc.png',
													width:50,
													height:50,
													title:res.data.data.distributor.name,
													callout:{
														content:'骑手已接单，正在赶往商家！\n距离商家'+res.data.data.distance,
														display:'ALWAYS',
														fontSize:14,
														borderRadius:5,
														color:'#333333',
														padding:8,
														//bgColor:'#FFCC00',
													}												
												},{
												latitude: res.data.data.stores.lat,
												longitude: res.data.data.stores.lng,
												iconPath: 'https://div.buy315.com.cn/xcx_imgs/shop.png',
												width:60,
												height:60,
												title:res.data.data.stores.name,
												callout:{
													content:res.data.data.stores.name,
													display:'ALWAYS',
													fontSize:14,
													borderRadius:5,
													color:'#333333',
													padding:8,
													//bgColor:'#FFCC00',
												}												
											}];
							}else if(res.data.data.rider_status==2){
										this.latitude = res.data.data.distributor.lat;
										this.longitude = res.data.data.distributor.lng;
										this.covers = [{
													latitude: res.data.data.distributor.lat,
													longitude: res.data.data.distributor.lng,
													iconPath: 'https://div.buy315.com.cn/xcx_imgs/psc.png',
													width:50,
													height:50,
													title:res.data.data.distributor.name,
													callout:{
														content:'骑手已取货，距离您'+res.data.data.distance+'！',
														display:'ALWAYS',
														fontSize:14,
														borderRadius:5,
														color:'#333333',
														padding:8,
														//bgColor:'#FFCC00',
													}												
												},{
														latitude: res.data.data.member.lat,
														longitude: res.data.data.member.lng,
														iconPath: 'https://div.buy315.com.cn/xcx_imgs/member.png',
														width:60,
														height:60,
														title:res.data.data.member.name,
														callout:{
														}
											}];
							}
							
						}						
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
								title: '商品已下架',
							});
							return;
						}						
					}
				});				
			},
			//售后 （退款）
			clickAfter(data) {
				uni.navigateTo({
					url: "order_th?goods=" + JSON.stringify(data.goods) + "&order_code=" + data.order_code
				})
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
		padding-bottom: 20rpx;
	}
	.borderOrange{
		border-bottom:#F3A346 solid 3px;
	}
	.glance-slidenav-tabbar{height: 100upx;display: inline-block;display: flex;z-index: 1;}
	.sytime_all{
		position: absolute;
		left: -110upx;
		height:26px; 
		padding: 5upx 20upx; 
		background:rgba(255,255,255,1);
		border-radius:18px;
		border:1px solid #F65A2A; 
		font-size: 26upx;
		color: #F65A2A;
		display: flex;
		align-items: center;
	}
/* 	.text1{
		font-size: 26upx;
		color: #999;
		position: absolute;
		left: 110upx;
		
	} */
	/* 新增 */
	/* pages/order/detail.wxss */
	.pageall{
	  height: 100%;
	 
	  margin: 0 20rpx;
	}
	.zf{
	  height: 200rpx;
	  width: 710rpx;
	  background-color: #fff;
	  margin-top: 20rpx;
	  padding-top: 20rpx;
	  padding-left: 20rpx;
	  border-radius: 10rpx;
	  box-sizing: border-box;
	}
	.za_sj{
	  font-size: 28rpx;
	  font-weight: bold;
	  line-height: 56rpx;
	}
	.zf_tisy{
	  font-size: 24rpx;
	  color: #999;
	  padding-top: 20rpx;
	}
	.za_sj text{
	  color: #fe0000;
	  /* padding-left: 20rpx; */
	}
	.zf_an{
	  display: flex;
	  position: relative;
	  margin-left: 20upx;
	
	}
	.zf_anlj{
	  width: 140rpx;
	  height: 50rpx;
	  border-radius: 25rpx;
	  border: solid 1rpx #333;
	  font-size: 24rpx;
	  text-align: center;
	  position: absolute;
	  right: 180rpx;
	  line-height: 50rpx;
	}
	.zasi{
	  border: solid 1rpx #fe0000;
	  color: #fe0000;
	  position: absolute;
	  right: 20rpx;
	}
	.zf_dele{
	  border: solid 1rpx #333;
	  color: #333;
	  position: absolute;
	  right: 20rpx;
	}
	/* 配送 */
	.ps{
	  height: 180rpx;
	  width: 710rpx;
	  background-color: #fff;
	  border-radius: 10rpx;
	  margin-top: 20rpx;
	  padding-top: 20rpx;
	  padding-left: 20rpx;
	  line-height: 55rpx;
	  box-sizing: border-box;
	}
	.ps_dz{
	  font-size: 28rpx;
	  color: #333;
	}
	.ps_tb{
	  display: flex;
	  font-size: 22rpx;
	  color: #fe0000;
	  align-items: center;
	}
	.ps_icon{
	  height: 25rpx;
	  width: 25rpx;
	  margin-left: 55rpx;
	  margin-right: 10rpx;
	}
	/* 商品信息 */
	.shop{
	 /* height: 490rpx; */
	  width: 710rpx;
	  background-color: #fff;
	  border-radius: 10rpx;
	  /* margin-left: 20rpx; */
	  margin-top: 20rpx;
	  box-sizing: border-box;
	  padding: 20rpx;
	}
	.shop_al{
	  padding-top: 20rpx;
	  /* margin-left: 20rpx; */
	  border-bottom: 1rpx solid f7f7f7;
	  padding-bottom: 20rpx;
	}
	.shop_mc{
	  font-size: 28rpx;
	}
	.shop_xx{
	  display: flex;
	  margin-bottom: 20rpx;
	
	}
	.img_01{
	  height: 150rpx;
	  width: 150rpx;
	  margin-right: 20rpx;
	}
	.shop_text01{
	  margin-top: 25rpx;
	  font-size: 28rpx;
	}
	.shop_je{
	  display: flex;
	  margin-top: 20rpx;
	  align-items: center;
	}
	.shop_sl{
	  margin-left: 242rpx;
	  font-size: 28rpx;
	  color: #999;
	}
	.shop_xj{
	  font-size: 30rpx;
	  color: #fe0000;
	}
	.shop_yj{
	  font-size: 24rpx;
	  color: #999;
	  margin-left: 20rpx;
	  text-decoration:line-through;
	}
	.biaoqian{
	  display: flex;
	  margin-top: 20rpx;
	  padding-bottom: 20rpx;
	}
	.biaoq_text{
	  color: #FF874B;
	  border: #FF874B 1rpx solid;
	  font-size: 22rpx;
	  padding: 7rpx 12rpx;
	  margin-right: 20rpx;
	}
	/* 编号 */
	.ddbh{
	  /* height: 170rpx; */
	  width: 710rpx;
	  background-color: #fff;
	  border-radius: 10rpx;
	  margin-top: 20rpx;
	  font-size: 24rpx;
	  color: #999;
	  line-height: 50rpx;
	  padding-top: 20rpx;
	  padding-left: 20rpx;
	  box-sizing: border-box;
	}
	.ddbhss{
	    /* height: 170rpx; */
	    width: 710rpx;
	    background-color: #fff;
	    border-radius: 10rpx;
	    margin-top: 20rpx;
	    font-size: 24rpx;
	    color: #999;
	    line-height: 50rpx;
	    padding-top: 20rpx;
	    padding-left: 20rpx;
	    box-sizing: border-box;
	  }
	.xinxi{
	  display: flex;
	  justify-content: space-between;
	}
	.xinxi_je{
	  margin-right: 20rpx;
	  font-size: 24rpx;
	  color: #333;
	}
	.sfk{
	  text-align: right;
	}
	.sfk text{
	  font-size: 30rpx;
	  color: #fe0000;
	  margin-right: 20rpx;
	}
	.mask_address{
	  height: 100%;
	  width: 750rpx;
	  background-color: #333;
	  opacity: 0.5;
	  z-index: 10;
	  position: fixed;
	  top: 0;
	  left: 0;
	}
	.mask_dcc{
	  height: 500rpx;
	  width: 750rpx;
	  z-index: 999;
	  background-color: #fff;
	  position: fixed;
	  bottom: 0;
	  left: 0;
	  overflow-y: scroll;
	}
	.mask_ssdz{
	  font-size: 28rpx;
	  color: #333;
	  text-align: center;
	  padding-top: 40rpx;
	}
	/* 弹出层 */
	.group{
	  line-height: 100rpx;
	  font-size: 28rpx;
	  color: #333;
	}
	.group_bg{
	  height: 100%;
	  width: 100%;
	  background-color: #333;
	  opacity: 0.5;
	  position: absolute;
	  top: 0;
	  left: 0;
	}
	.group_botton{
	  height: 200rpx;
	  width: 750rpx;
	  background-color: #fff;
	  position: absolute;
	  bottom: 0;
	  left: 0;
	  border-top-left-radius: 10rpx;
	  border-top-right-radius: 10rpx;
	}
	.group_lx{
	  margin: 0 20rpx;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	}
	.group_phone{
	  height: 34rpx;
	  width: 34rpx;
	  padding-right: 40rpx;
	}
	.group_tk{
	  margin: 0 20rpx;
	  display: flex;
	  justify-content: space-between;
	}
	.group_ts{
	  display: flex;
	  align-items: center;
	  font-size: 28rpx;
	  color: #999;
	}
	.group_back{
	  height: 28rpx;
	  width: 28rpx;
	  padding-left: 20rpx;
	}
	.daojishist{
		width: 200rpx;
		height: 56rpx;
		line-height: 56rpx;
		float: left;
	}
	.za_sj::after{
		content: "";
		display: block;
		clear: both;
	}
	.x12.bg-white.padding-big.margin-top.text-center{
		float: none;
		width: 710rpx;
		box-sizing: border-box;
	}
	.x12.bg-white.padding-big.margin-top.text-center::after{
		content: "";
		clear: both;
		display: block;
	}
	.uni-countdown__number{
		border: none !important;
		
	}
</style>
