<template>
    <view>
		<!-- <hx-navbar :config="config"/> -->
		<view class="searchall">
			<view class="search" @click="xzaddress">
				<view><image class="search_01" src="https://div.buy315.com.cn/xcx_imgs/search.png"></image></view>
				<view class="text1">每日菜场为您优选</view>
			</view>
			<view class="text2" @click="gotoAddRess">新增地址</view>
		</view>
		<view class="x12 padding" >
			  <view class="my_address">
			    <view class="address">
			      <view class="dq_address">
			        <view><image class="address_icon" src="https://div.buy315.com.cn/xcx_imgs/address.png"></image></view>
			        <view>当前位置</view>
			      </view>
			      <view class="cx_address" @click="getaddress">
			      <image class="address_icon" src="https://div.buy315.com.cn/xcx_imgs/shuxin.png"></image>
			        <view>重新定位</view>
			      </view>
			    </view>
			    <!-- <view class="text">{{address}}</view> -->
				
				<view class="text" v-if="areaList[0].stores_name==0">正在获取您的位置<text class="address_left">0km</text></view>
				<view class="text" v-else>{{areaList[0].stores_name}}  <text class="address_left">{{areaList[0].distance}}km</text></view>
			  </view>
			    <view class="wodedd" v-if="login==true">
			      <view class="wo_address">我的地址</view>
			      <view class="dizhi" v-for='(item,index) in listaddress' @click="getnewaddress(item)">
			        <view class="dizhi_top">  
			          <view>{{item.address}}</view>
			          <view> <image class="dele_icon" src="/images/icon_17.png"></image> </view>
			        </view>
			        <view class="dizhi_bottom">
			          <view>{{item.name}}</view>
			          <view v-if='item.gender==1'>男</view>
					  <view v-if='item.gender==2'>女</view>
			          <view>{{item.tel}}</view>
			        </view>
			        </view>
			    </view>
				  <view class="wodedd">
					 <text class="address_left">仅支持自取</text>
				    <view class="wo_address">附近地址 </view>
				    <view>
				      <view class="fjdizhi" v-for="(item,index) in areaList" :key="index" @click="qiehuan(item,index)" >{{item.stores_name}}
						<text class="address_left">{{item.distance}}km</text>
					  </view>
				    </view>
				    
				  </view>
	<!-- 		<view class="x12 bg-white padding-big" style="border-radius: 6px;" v-for="(item,index) in areaList.data" :key="index" @click="qiehuan(item)">
				<view class="x-auto">
					<image src="https://div.buy315.com.cn/xcx_imgs/czqr1.png"  mode="aspectFill" style="width: 84upx; height: 84upx;"></image>
				</view>
				<view class="x-auto" style="font-size: 12pt; width: 550upx; color: #393D4A; padding-top: 0upx; padding-left: 20upx;">
					<view class="x12" v-if="xshopInfo.store.stores_id==item.stores_id">
						<view class="x-auto">{{item.stores_name}}</view>
						<view class="x-auto" style="color: red; border: red solid 1px; font-size: 6pt; padding: 1px 3px; border-radius: 2px; margin-left: 3px;">当前店铺</view>
					</view>
					<view class="x12" v-else>{{item.stores_name}}</view>
					<view class="x12" style="font-size: 11pt;">{{item.telphone}}</view>
					<view class="x12" style="font-size: 11pt;">{{item.region}}</view>
				</view>
				<view class="address_right">
					{{item.distance}}km
				</view>
			</view> -->
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
				// config:{
				// 	title: '地址管理',
				// 	color: '#ffffff',
				// 	backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
				// 	statusBarFontColor:'#fff'
				// },
			memberinfo:[],
			login:false,
			areaList:[],
			datanum:0,
			xshopInfo:[],
			listaddress:[{
				id:0,
				address:'吉林省长春市南关区解放大路与珲春街交汇',
				name:'张三',
				province:'男',
				phone:'185686448978'
			},
			{
				id:0,
				address:'吉林省长春市南关区解放大路与珲春街交汇',
				name:'张三',
				province:'男',
				phone:'185686448978'
			},
			{
				id:0,
				address:'吉林省长春市南关区解放大路与珲春街交汇',
				name:'张三',
				province:'男',
				phone:'185686448978'
			}
			],
			nearbyList:[{
				id:0,
				address:'吉林省长春市南关区解放大路与珲春街交汇'
			},
			{
				id:0,
				address:'吉林省长春市南关区解放大路与珲春街交汇'
			}],
			lng:'',
			lat:'',
			areaList:[{
				distance:0,
				stores_name:'获取中'
				}
			]

			}
		},
		onLoad:function(data){
			uni.showLoading({
				title:'正在获取数据中'
			})
			this.goShop();
			setTimeout(function () {
			    uni.hideLoading();
			}, 1000);
			
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const values = uni.getStorageSync('xshopInfo');
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
				if(values){
					this.xshopInfo = values;
				}
			} catch (e) {
				// error
			}
			//console.log(this.xshopInfo);
			
		},
		onShow:function(){//返回时接收子页面的传参
				//获取信息
				var arr ={
						openid: this.memberinfo.openid,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/member_addres_act/index',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data);
						this.listaddress = res.data.data;
						console.log(this.listaddress,'获取地址成功了');
					}
				});
		},
		methods: {
			xzaddress(){//默认地图
				var xxx = this;
				uni.chooseLocation({
					success: res => {
						xxx.sss = 1;
						this.lat = res.latitude;//纬度
						this.lng = res.longitude;//经度
						this.xq_name = res.name;//位置名称
						this.address = res.address;//详细地址
						var arr = {
							lng :this.lng,
							lat :this.lat,
						};
						var pdata = url.getSignStr(arr);
						uni.request({
							url:url.websiteUrl+'/api_v2/shop/index',
							method:'POST',
							dataType:'json',
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							data:pdata,
							success: res => {								
								//console.log(res.data);
								this.datanum = res.data.data.length;
								this.areaList = res.data.data;
								console.log(this)
							},
							fail: () => {},
							complete: () => {}
						});
					},
					fail: res => {						
						xxx.sss = 0;
					},
				});
			},
			getnewaddress(item){
				console.log(item,'点击我的地址的item')
				this.lng = item.lng
				this.lat = item.lat
				var arr = {
					lng :this.lng,
					lat :this.lat,
				};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/shop/index',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {								
						//console.log(res.data);
						this.datanum = res.data.data.length;
						this.areaList = res.data.data;
						console.log(this)
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getaddress(){
				this.goShop();
			},
			goShop(){
				
				var that = this
		
				uni.getLocation({
				    type: 'wgs84',
				    success: function (res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						// var arr ={
						// 	  lng: res.longitude,
						// 	  lat: res.latitude,
						// 	};
						var arr = {
							lng :res.longitude,
							lat : res.latitude,
						};
						var pdata = url.getSignStr(arr);
						uni.request({
							url:url.websiteUrl+'/api_v2/shop/index',
							method:'POST',
							dataType:'json',
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							data:pdata,
							success: res => {	
								
								try {
									//console.log(uni.getStorageSync('xshopInfo'));
									uni.setStorage({
										key: 'addressList',
										data:res.data.data,
										success: function () {
										}
									});
									uni.removeStorageSync('daodianziti')
								} catch (e) {
									// error
								}	
								//console.log(res.data);
								that.datanum = res.data.data.length;
								that.areaList = res.data.data;
							
								console.log('获取地址成功啦')
							},
							fail: () => {},
							complete: () => {}
						});
					},
				});

			},

			qiehuan(data,index){
				console.log(index,'%%%%%%%%%%%%')
				if(index){
					uni.setStorageSync('daodianziti', true);
				}
				//写入缓存
				var xxx = {
					address:this.xshopInfo.address,
					current:this.xshopInfo.current,
					store:data,
				}
				
				try {
					uni.setStorageSync('xshopInfo', xxx);
					uni.setStorageSync('sfQhStores', 2);//用来判断换了店铺是否重新加载数据，默认1或空时，不加载，2时重新加载。对应会用到分类页判断是否重新加载数据
					//console.log(uni.getStorageSync('xshopInfo'));
					uni.setStorage({
						key: 'shoppingCarts',
						data:[],
						success: function () {
						}
					});
					uni.navigateBack({
						delta: 1
					});
				} catch (e) {
					// error
				}	
			},
			gotoAddRess(){
				uni.navigateTo({
					url:"/pages/goods_details/add_address"
				})
			},
			
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
	.address_right{
		float: right;
		position: relative;
		top: -50upx;
		font-size: 20upx;
		color: #666;
	}
	/* 搜索 */
	.searchall{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-right: 20rpx;
	}
	.search{
		width: 580rpx;
		height: 60rpx;
		margin-top: 20rpx;
		background-color: #FFFFFF;
		border-radius: 30rpx;
		margin-left: 20rpx;
		display: flex;
		align-items: center;
	}
	.search_01{
		height: 30upx;
		width: 30upx;
		padding-right: 30rpx;
		padding-left: 20rpx;
	}
	.text1{
		font-size: 24rpx;
		color: #999;
	}
	.text2{
		font-size: 24rpx;
		color: #333;
		height: 100rpx;
		line-height: 115rpx;
	}
	/* 新加 */
	.address_icon{
	  height: 30rpx;
	  width: 30rpx;
	  padding-right: 20rpx;
	  align-items: center;
	}
	.my_address{
	  height: 140rpx;
	  width: 710rpx;
	  background-color: #fff;
	  /* margin-left: 20rpx; */
	  margin-top: 20rpx;
	  font-size: 24rpx;
	  color: #333;
	}
	.address{
	  display: flex;
	  justify-content: space-between;
	  padding-top: 20rpx;
	  align-items: center;
	}
	.dq_address{
	  display: flex;
	  margin-left: 20rpx;
	  font-size: 28rpx;
	  align-items: center;
	  height: 38rpx;
	  line-height: 35rpx;
	}
	.cx_address{
	  align-items: center;
	  display: flex;
	  font-size: 24rpx;
	  color: #fe0000;
	  margin-right: 20rpx;
	  font-weight: bold;
	  height: 35rpx;
	  line-height: 35rpx;
	}
	.text{
	  margin-left: 20rpx;
	  margin-top: 20rpx;
	}
	.wodedd{
	  width: 710rpx;
	  background-color: #fff;
	  /* margin-left: 20rpx; */
	  margin-top: 20rpx;
	  border-radius: 10rpx;
	}
	.wo_address{
	  font-size: 28rpx;
	  color: #333;
	  height: 60rpx;
	  line-height: 60rpx;
	  margin-left: 20rpx;
	}
	.dizhi{
	  width: 680rpx;
	  height: 120rpx;
	  margin-left: 20rpx;
	}
	.dizhi_top{
	  display: flex;
	  font-size: 24rpx;
	  color: #333;
	  align-items: center;
	  justify-content: space-between;
	  width: 660rpx;
	}
	.dele_icon{
	  height: 35rpx;
	  width: 35rpx;
	}
	.dizhi_bottom{
	  display: flex;
	  width: 335rpx;
	  font-size: 24rpx;
	  color: #999;
	  justify-content: space-between;
	  /* margin-top: 20rpx; */
	}
	.fjdizhi{
	    font-size: 24rpx;
	    color: #333;
	    height: 80rpx;
	    line-height: 80rpx;
	    margin-left: 20rpx;
	}
	.fjdizhi:last-child{
	  padding-bottom: 40rpx;
	}
	.address_left{
		position: absolute;
		right: 40rpx;
	}
</style>
