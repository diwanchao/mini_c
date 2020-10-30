<template>
	<view class="x12" style="padding:35upx 25upx 15upx 25upx; width: 700upx;">
		<view class="x12" style="margin-bottom:20upx;" v-for="(item,index) in cl_list" :key="index">
			<view class="float-left" style="width: 250upx;">
				<view class="x12"><image src="https://div.buy315.com.cn/xcx_imgs/wdxjj.png" style="width: 250upx; height: 180upx; float: left;"></image></view>
				<view class="x12 text-center text-white" style="width: 250upx; position:absolute; z-index: 100; padding-top: 20upx;">
					<view class="x12" style="font-weight: bold;width: 250upx; ">{{deployinfo.monetary_symbol}}<span style="font-size:24pt;">{{item.reduce}}</span></view>
					<view class="x12" style="font-size: 9pt; color: #FEEEED;width: 250upx; " v-if="item.cill==1">无使用门槛</view>
					<view class="x12" style="font-size: 9pt; color: #FEEEED;width: 250upx; " v-else>满{{item.full}}{{deployinfo.monetary_unit}}可用</view>
				</view>
			</view>
			<view class="float-left" style="width: 410upx; height: 180upx; padding-left: 20upx; padding-right: 20upx; background-color: #fff; border-radius: 0 5upx 5upx 0;">
				<view class="x12" style="font-size: 11pt; font-weight: bold; margin-top: 20upx; color: #666;">{{item.title}}</view>
				<view class="float-left" style="color: #666; font-size: 7pt; margin-top: 10upx;">{{item.start_date}}至{{item.end_date}}</view>
				
				<view class="float-right border"  v-if="(item.member_surplus>0 || item.is_limit ==2) && item.surplus > 0" @click="goLq(item)" style="border-color: #ccc; color: #999; border-radius: 20px; padding: 3px 8px; font-size: 9pt; position: absolute; margin-top: 100upx; right: 50upx;" @touchstart="touchStart" @touchend="touchEnd"  @tap="doubleTap">立即领取</view>

<!-- 			<view class="float-right border" @click="goLq(item)"  v-if="item.range==1" style="border-color: #ccc; color: #999; border-radius: 20px; padding: 3px 8px; font-size: 9pt; position: absolute; margin-top: 100upx; right: 50upx;">立即使用</view> -->
<!-- 
				<button class="float-right border bg_buttom"  v-if="(item.member_surplus>0 || item.is_limit ==2) && item.surplus > 0 "  @touchstart="touchStart" @touchend="touchEnd"  @tap="doubleTap" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" >立即领取</button> -->
				
				<view class="float-right border" v-else style="border-color: #ccc; color: #999; border-radius: 20px; padding: 3px 8px; font-size: 9pt; position: absolute; margin-top: 100upx; right: 50upx;">已领完</view>
			</view>
			<view class="" v-if="(item.member_surplus>0 || item.is_limit ==2) && item.surplus > 0"></view>
			<view class="x12 text-center" v-else style="margin-top: -170upx;"><image :src="item.ylq" style="width: 223upx; height: 160upx;"></image></view>
		</view>
		<view class="x12 text-center padding-big" v-if="datanum==0">
			<image src="https://div.buy315.com.cn/xcx_imgs/wts.png"  mode="aspectFill" style="width: 132upx; height: 140upx;"></image>
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
				isDisabled:0,
				disabled:0
			}
		},
		onShow() {
			//#ifdef MP-WEIXIN
			wx.login({
			  success: res =>{
				  //console.log(res.code);
				  this.xcode = res.code;
				}
			})
			
			//#endif
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
				if (value.length!=0) {
					this.memberinfo = value;
					this.login = true;
					console.log(value)
				}else{
					this.login = false;
					console.log(this.login)
				}				
			} catch (e) {
				// error
			}
			this.getCk();
		},
		onPullDownRefresh(){
			this.cl_list = [];
			this.limit = 10;
			this.page = 0;
			this.getCk();
			uni.stopPullDownRefresh();
			return;
		},
		onReachBottom() {
		    this.getCk();
		},
		methods: {
			touchStart(e) {
			  this.touchStartTime = e.timeStamp;
			},
			touchEnd(e) {
			  this.touchEndTime = e.timeStamp;
			},
			
			doubleTap(item, e) {
			  var vm = this;
			  // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
			  if (vm.touchEndTime - vm.touchStartTime < 350) {
			    // 当前点击的时间
			    var currentTime = e.timeStamp;
			    var lastTapTime = vm.lastTapTime;
			    // 更新最后一次点击时间
			    vm.lastTapTime = currentTime;
			    // 如果两次点击时间在300毫秒内，则认为是双击事件
			    if (currentTime - lastTapTime > 300) {
			      // do something 点击事件具体执行那个业务
			    }
			  }
			 },
			//跳转到详情
			goDetails(data){
				uni.navigateTo({
					url:"/pagesb/center/ck_fkm?number="+data.number+"&title="+data.title
				});
			},
			getCk(action = 'add'){
				//获取信息
				var arr ={
						member_openid:this.memberinfo.openid,
						stores_id:this.xshopInfo.store.stores_id,
						//usedup:1,
						limit:this.limit,
						offset:this.page*this.limit,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/app_coupon_offset/aapi_coupon_offset/get_coupon_info',
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
							uni.showToast({
							    icon: 'none',
							    title: '已到底'
							});
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
			goLq (data){
				console.log(this.login)
				uni.showLoading({
				    title: '加载中'
				});
				
				setTimeout(function () {
				    uni.hideLoading();
				}, 4000);
				console.log(this.login)
				if(!this.login){
					uni.showToast({
						title: '请登录后再领取',
						icon:'none',
						duration: 2000,
					});
					return;
				}if(this.login){
					
				var arr ={
						member_openid:this.memberinfo.openid,
						acom_id:data.acom_id,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/app_coupon_offset/aapi_coupon_offset/receives',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					
					success: res => {
						
						//console.log(res.data);
						var xnum = data.member_surplus;
						if(data.is_limit==1){
							xnum--
							if(xnum <= 0){
								for(var i=0; i<this.cl_list.length; i++){
									if(this.cl_list[i].acom_id == data.acom_id){
										this.cl_list[i].member_surplus = 0;
									}
								}
							}
						}
						uni.showToast({
						    icon: 'none',
						    title: res.data.info
						});
					},
					fail: () => {},
					complete: () => {}
				});
				}
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
	.bg_buttom{
		border-color: #ccc; 
		color: #999; 
		border-radius: 20px; 
		padding: 3px 8px; 
		font-size: 9pt; 
		position: absolute; 
		margin-top: 100upx; 
		right: 50upx; 
		background-color: none;
		border: none;
		width: 150upx;
		height: 50upx;
		line-height: 50upx;
	}
</style>
