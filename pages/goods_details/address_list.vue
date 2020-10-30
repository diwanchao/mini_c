<template>
	<view class="center" style=" ">
		<hx-navbar :config="config" />
		<view class="x12 float-left">
			<view class="center-list x12" style="margin-top: 0;">
				<view class="center-list-item border-top x12" style="min-height: 150upx; height: auto; border-color: #ddd;" v-for="(item,index) in address_list" :key="index">
					<view class="x-auto" style="padding-top: 50upx; padding-right: 20upx; width: 48upx;" @click="isAddress(item)">
						<image src="https://div.buy315.com.cn/xcx_imgs/xz.png" style="width: 48upx; height: 48upx;" v-if="item.is_default==1"></image>
						<image src="https://div.buy315.com.cn/xcx_imgs/wxz.png" mode="" style="width: 48upx; height: 48upx;" v-else></image>
					</view>
					<view class="x-auto text-big" style="padding-top: 35upx; width: 500upx; height: auto; padding-bottom: 20upx;font-size: 12pt;"  @click="isAddress(item)">
						<view class="" style="color: #393D4A;">{{item.xq_name}}{{item.mbh}}</view>
						<view class="" style="color: #393D4A;">
							<view class="x-auto">{{item.name}}</view>
							<view class="x-auto padding-left">{{item.tel}}</view>
						</view>						
					</view>
					<view class="x-auto float-right text-red" @click="upAddress(item)" style="padding-top: 45upx;font-size: 12pt;">
						<image src="https://div.buy315.com.cn/xcx_imgs/shdz3.png" mode="" style="width: 32upx; height: 36upx;"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="x12 padding-big margin-top">
			<button @click="goAddress" style="background:rgba(255,255,255,1); font-size: 14pt; border:1px solid rgba(246,90,42,1); border-radius:34px; color: #F65A2A;height: 90upx; width: 100%;">添加收货地址</button>
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
					title: '地址管理',
					color: '#ffffff',
					backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
					statusBarFontColor:'#fff'
				},
				login:false,
				memberinfo:[],
				address_list:[],
				xxxx:0,
				id:0,
				mydata:[],
			}
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
						this.address_list = res.data.data;
						//console.log(this.address_list);
					}
				});
		},
		onLoad:function(data){
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				if (value) {
					this.memberinfo = value;
					this.login = true;
					//console.log(value);
				}
			} catch (e) {
				// error
			}
			if(!this.login){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}
		},
		methods: {
			//根据收货地址获取门店信息
			getAddress(){
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
						var xxaddress = [];
						var addressNum = 0;
						//console.log(this.memberinfo.openid);
						for (let i in res.data.data) {
							if (res.data.data[i].is_default==1){
								addressNum = addressNum+1;
								xxaddress = {
									s_lat:res.data.data[i].s_lat,
									s_lng:res.data.data[i].s_lng,
								}
							}
						}
						//console.log(addressNum);
						//console.log(xxaddress);
						if(addressNum > 0){
							this.getShop(xxaddress.s_lat,xxaddress.s_lng,1);
						}else{
							this.getShop(false,false,1);
						}
					}
				});
			},
			isAddress(data) {
				//console.log(data);return;
				//获取信息
				var arr ={
						address_id:data.address_id,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/mall_order/change_address',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						if(res.data.status=='y'){
							var pages = getCurrentPages();
							var prevPage = pages[pages.length - 2]; //上一个页面
							//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
							//#ifdef MP-WEIXIN
							prevPage.setData({
								mydata: {
											openid: this.memberinfo.openid,
											name:data.name,
											tel:data.tel,
											address:data.address,
											xq_name:data.xq_name,
											mbh:data.mbh,
											is_default:1,
											address_id:data.address_id,
										}
							});
							//#endif
							// #ifdef APP-PLUS
							prevPage.$vm.openid = this.memberinfo.openid;   //修改上一页data里面的searchVal参数值为1211
							prevPage.$vm.name =  data.name;
							prevPage.$vm.tel =  data.tel;
							prevPage.$vm.address =  data.address;
							prevPage.$vm.xq_name =  data.xq_name;
							prevPage.$vm.mbh =  data.mbh;
							prevPage.$vm.is_default =  1;
							prevPage.$vm.address_id =  data.address_id;
							// #endif
							//console.log(data);
							uni.navigateBack({
								delta: 1
							});
							//根据收货地址经纬度获取门店信息
							//this.getShop(data.s_lat,data.s_lng);														
						}else{
							uni.showToast({
								title: res.data.info,
								duration: 2000,
								icon:'none',
							});
						}
					}
				});
			},
			goAddress() {
				uni.navigateTo({
					url:"../goods_details/add_address"
				})
			},
			upAddress(data){
				uni.navigateTo({
					url:"../goods_details/add_address?addressinfo="+JSON.stringify(data)
				})
			},
			//获取门店信息
			getShop(s_lat = false,s_lng = false,list = 0){
				var xxx = this;
				//获取用户当前经纬度
				uni.getLocation({
					type: 'wgs84',
					success: res => {
						//console.log('当前位置的经度：' + res.longitude);
						//console.log('当前位置的纬度：' + res.latitude);
						xxx.lng = (s_lng==false)?(res.longitude):(s_lng);
						xxx.lat = (s_lat==false)?(res.latitude):(s_lat);
						//获取信息
						var arr ={
								lng: xxx.lng,
								lat: xxx.lat,
								member_openid:xxx.memberinfo.openid,
							};
						var pdata = url.getSignStr(arr);
						uni.request({
							url:url.websiteUrl+'/api_v2/mall_base/get_store_address',
							method:'POST',
							dataType:'json',
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							data:pdata,
							success: res => {
								//console.log(res.data.data);
								//写入缓存
								uni.setStorage({
									key: 'xshopInfo',
									data:res.data.data,
									success: function () {
									}
								});
								if(list==0){
									uni.navigateBack({
										delta: 1
									});
								}
							}
						});
					},
					fail: res => {
						//console.log('当前位置的经度：' + res.longitude);
						//console.log('当前位置的纬度：' + res.latitude);
						xxx.lng = '';
						xxx.lat = '';
						//获取信息
						var arr ={
								lng: xxx.lng,
								lat: xxx.lat,
								member_openid:xxx.memberinfo.openid,
							};
						var pdata = url.getSignStr(arr);
						uni.request({
							url:url.websiteUrl+'/api_v2/mall_base/get_store_address',
							method:'POST',
							dataType:'json',
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							data:pdata,
							success: res => {
								//写入缓存
								uni.setStorage({
									key: 'xshopInfo',
									data:res.data.data,
									success: function () {
									}
								});
								uni.setStorage({
									key: 'shoppingCarts',
									data:[],
									success: function () {
									}
								});
								if(list==0){
									uni.navigateBack({
										delta: 1
									});
								}
							}
						});
					},
				});
			}
		}
	}
</script>

<style>
	@import '../../common/common.css';
	page {
		background-color: #F6F6F6;
	}
	.shop-menu{
		position: fixed; z-index: 1000; bottom: 0upx;
	}
</style>
