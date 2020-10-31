<template>
	<view>
		<hx-navbar :config="config" />
	<view class="x12" >
		<view  class="selected">
			<view class="categories">
				<view v-for="(item,index) in listScrollShop" class="catlistone" :key='item.id' @tap="clickTabScroll(index)" 
				 :class="{'active' : tabIndex==index}">
					 <view class="selected_text1">{{item.name}}</view>
				 </view>
			</view>
		</view>
		<view class="list" v-for="(item,index) in cl_list" :key="index">
			<!-- <view class="or" :class="{{item.status == 1 ? '' : 'hui'}}" > -->
				<view class="or" :class="[item.use_status == 1 ? '':(item.status == 4?'red':'hui') ]" >
			  <view class="first">{{item.title}}<text class="t1"><text class="yang">￥</text>{{item.reduce}}</text></view>
			  <view class="second">有效期至{{item.end_dates}}<text class="t1">满{{item.full}}可用</text></view>
			  <image class="bottom" src="https://div.buy315.com.cn/xcx_imgs/coupon1.png" v-if="item.use_status == 1"></image>
			  <image class="bottom" src="https://div.buy315.com.cn/xcx_imgs/coupon2.png" v-if="item.use_status == 2 || item.use_status == 3"></image>
			  <image class="bottom" src="https://div.buy315.com.cn/xcx_imgs/coupon3.png" v-if="item.status == 4"></image>
			</view>
			<view class="white">
				
			  <view class="t2"  @click="goLq(item)" v-if="item.use_status != 2">立即使用></view>
			  <!-- <view class="t2"  @click="goLq(item)" v-else>线下核销></view> -->
			 <view class="t1" v-if="item.use_status==1 || item.use_status==2">{{item.atype_name}}</view>
			 <view class="t1" v-else-if="item.use_status == 4">新人专享</view>
<!-- 			  <view class="t1" v-if="item.use_status == 2">已使用</view>
			  <view class="t1" v-else>未使用</view>
			  <view class="t1" v-else-if="item.overdue == 2 && item.use_status == 1">已过期</view> -->
			 <!-- <view class="t1" v-else-if="item.overdue == 1">未过期</view> -->
			  
			  
			 
			</view>
		</view>
<!-- 		<view class="x12" style="margin-bottom:20upx;" v-for="(item,index) in cl_list" :key="index">
			<view class="float-left" style="width: 250upx;">
				<image src="https://div.buy315.com.cn/xcx_imgs/wdxjj.png" </image>
				<view class="x12 text-center text-white" style="margin-top: -155upx;">
					<view class="x12" style="font-weight: bold;">{{deployinfo.monetary_symbol}}<span style="font-size:24pt;">{{item.reduce}}</span></view>
					<view class="x12" style="font-size: 9pt; color: #FEEEED;" v-if="item.cill==1">无使用门槛</view>
					<view class="x12" style="font-size: 9pt; color: #FEEEED;" v-else>满{{item.full}}{{deployinfo.monetary_unit}}可用</view>
				</view>
			</view>
			<view class="float-left" style="width: 410upx; height: 180upx; padding-left: 20upx; padding-right: 20upx; background-color: #fff; border-radius: 0 5upx 5upx 0;">
				<view class="x12" style="font-size: 11pt; font-weight: bold; margin-top: 20upx; color: #666;">{{item.title}}</view>
				<view class="float-left" style="color: #666; font-size: 7pt; margin-top: 10upx;">{{item.start_date}}至{{item.end_date}}</view>
			</view>
			
			<view class="float-right border" @click="goLq(item)"  v-if="item.range==1" >立即使用</view>
			
			<view class="float-right border" @click="goDetails(item)"  v-else >线下核销</view>
		</view> -->
		<view class="x12 text-center padding-big" v-if="datanum==0">
			<image src="https://div.buy315.com.cn/xcx_imgs/wts.png"  mode="aspectFill" style="width: 132upx; height: 140upx;"></image>
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
			acom_id:'',
			config:{
				title: '优惠券',
				color: '#ffffff',
				backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
				statusBarFontColor:'#fff'
			},
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
				coupuList:[{
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
				    },],
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
			this.getCk();
		},
		onPullDownRefresh(){
			this.cl_list = [];
			this.limit = 30;
			this.page = 0;
			this.getCk();
			this.coupuList =[],
			uni.stopPullDownRefresh();
			return;
		},
		onReachBottom() {
		    this.getCk();
		},
		methods: {
			clickTabScroll(index){
				this.tabIndex= index;
				let num = index
				console.log(this.num)
				console.log(index,'我来看看是不是你')
				if(this.tabIndex= index){
					this.getCk();
				}else if(this.tabIndex==0){
					this.getCk();
				}
			},
			//跳转到详情
			
			goDetails(data){				
				uni.navigateTo({
					url:"/pagesb/center/xjj_details?mcode="+data.mcode
				});
			},
			getCk(action = 'add'){
				console.log(this.memberinfo.openid)
				// if(this.tabIndex==0){
					var arr ={
							member_mark:this.memberinfo.openid,
							use_status:this.tabIndex,
							//usedup:1,
							limit:this.limit,
							offset:this.page*this.limit,
						};
						var pdata = url.getSignStr(arr);
						uni.request({
							url:url.websiteUrl+'/app_coupon_offset/aapi_coupon_offset_member/member_coupon',
							method:'POST',
							dataType:'json',
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							data:pdata,
							success: res => {
								console.log(res.data.data,'优惠券成功')
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
									this.cl_list = res.data.data;
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
						
				// }else{
				// 	var arr ={
				// 			pt_user_id:this.memberinfo.openid,
				// 			use_status:this.tabIndex,
				// 			//usedup:1,
							
				// 			limit:this.limit,
				// 			offset:this.page*this.limit,
				// 		};
				// 		var pdata = url.getSignStr(arr);
				// 		uni.request({
				// 			url:url.websiteUrl+'/app_coupon_offset/aapi_coupon_offset_member/xlist',
				// 			method:'POST',
				// 			dataType:'json',
				// 			header:{
				// 				'content-type':'application/x-www-form-urlencoded'
				// 			},
				// 			data:pdata,
				// 			success: res => {
				// 				console.log(res.data.data,'优惠券成功未使用、已使用')
				// 				//console.log(res.data);
				// 				this.datanum = res.data.total;
				// 				var max_page = res.data.total/this.limit;
				// 				if(max_page<=this.page){
				// 					uni.showToast({
				// 					    icon: 'none',
				// 					    title: '已到底'
				// 					});
				// 					return;
				// 				}
				// 				if(res.data.status=='y'){
				// 					this.cl_list = res.data.data;
				// 				}else{
				// 					var datax = [];
				// 					uni.showToast({
				// 					    icon: 'none',
				// 					    title: '已到底'
				// 					});
				// 				}
				// 				if (action === 'refresh') {
				// 					this.cl_list = [];
				// 				}						
				// 				datax.forEach(item => {							
				// 					this.cl_list.push(item);
				// 				});
				// 				this.page = this.page+1;
				// 			},
				// 			fail: () => {},
				// 			complete: () => {}
				// 		});
				// }
				//获取信息
				
		
			},
			goLq(data){
				uni.navigateTo({
					url:"/pages/serch/goods_list?acom_id="+data.acom_id
				});
			}
		}
	}
</script>

<style>
	@import '../../common/common.css';
	.detial img{
		min-width: 100%;
	}
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
	  background-size: 100%;
	  position: absolute;
	  right: -30rpx;
	  top: 50%;
	  transform: translateY(-50%);
	}
</style>
