<template>
	<view style="font-size: 12pt;">
		<!-- <hx-navbar :config="config" /> -->
		<view class="add">
		  <view class="addtext">
		    <view class="text1">收货人</view>
			<input type="text" v-model="name" class="inputclass" placeholder="请填写姓名" placeholder-class="placeclass"/>
		  </view>
		  <view class="addtext">
		    <view class="text1"></view>
		    <view class="rigaogroup">
				<view class="">
					<text @click="radioChange(1)" :style="gender==1?'border:1px solid #FE0000':''">
						<text v-if="gender==1" class="red" style="width: 18rpx;height: 18rpx;border:none;margin: 6rpx auto;"></text>
					</text>先生
				</view>
				<view class="">
					<text @click="radioChange(2)" :style="gender==2?'border:1px solid #FE0000':''">
						<text v-if="gender==2" class="red" style="width: 18rpx;height: 18rpx;border: none;margin: 6rpx auto;"></text>
					</text>女士
				</view>
		     <!-- <radio-group @change="radioChange" class="radio_group" >
				<radio value='2' >女士</radio>
				<radio value='1' checked>先生</radio>
		      </radio-group> -->
		    </view>
		  </view>
		  <view class="addtext">
		    <view class="text1">手机号</view>
		    <input class="inputclass" placeholder="请填写收货人手机号" type="text" placeholder-class="placeclass" v-model="telphone"/>
		  </view>
		  <view class="addtext" style="justify-content: space-between;" @click="xzaddress">
		    <view class="" style="display: flex;align-items: center;">
		    	<view class="text1">收货地址</view>
		    	<input type="text" value="" class="inputclass" placeholder="点击选择收货地址" placeholder-class="placeclass" v-model="xq_name"/>
		    </view>
		    <view>
		      <image class="images" style="margin-right: 20rpx;" src="https://div.buy315.com.cn/xcx_imgs/yjt.png"></image>
		    </view>
		  </view>
		  <view class="addtext">
		    <view class="text1">门牌号</view>
		    <input class="inputclass" placeholder="详细地址，例如：3号楼2单元105" type="text"  placeholder-class="placeclass" v-model="mbh"/>
		  </view>
		  <view class="addtext" style="justify-content: space-between;">
		    <view class="" style="display: flex;align-items: center;">
		    	<view class="text1" style="width: 100rpx;">标签</view>
		    </view>
		    <view class="biaoArr">
				<view @click="chooseBiaoArr(item)" :style="item.name == label?'color:#FE0000;border:1px solid #FE0000':''" v-for="(item,index) in biaoArr">{{item.name}}</view>
		    </view>
		  </view>
		  <view class="addtext" style="justify-content: space-between;align-items: center;">
		    <view class="" style="display: flex;align-items: center;">
		    	<view class="text1">设为默认地址</view>
		    </view>
		    <view style="margin-right: 21rpx;height: 48upx;display: flex;" @click="is_default_c">
		      <image src="https://div.buy315.com.cn/xcx_imgs/dz_moren.png" style="width: 48upx; height: 48upx;" v-show="is_default == 2"></image>
		      <image src="https://div.buy315.com.cn/xcx_imgs/dz_choose.png" mode="" style="width: 48upx; height: 48upx;"v-show="is_default == 1"></image>
		    </view>
		  </view>
		</view>
		
<!-- 		<view class="x12 text-333">
			<view class="x12 bg-white">
				<view class="x3 " >收货人</view>
				<view class="x6 padding-left" >
					<input placeholder="收货人姓名" v-model="name"/>
				</view>
			</view>
			<view class="x12 bg-white  border-top border-gray">
				<view class="x3 " >手机号码</view>
				<view class="x6 " >
					<input placeholder="手机号码" v-model="telphone"/>
				</view>
			</view>
			<view class="x12" v-if="map_address==1">
				<view class="x12" v-if="psd_list==0">
					<view class="x12 bg-white " v-if="programtype==3 && deployinfo.applet_map==2"  @click="xzGdAddress(deployinfo.applet_map_key)">
						<view class="x3 ">选择地区</view>
						<view class="x6 padding-left" >
							{{xq_name}}请选择
						</view>
						<view class="x-auto float-right"  >
							<image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" style="width: 16upx; height: 28upx;"></image>
						</view>
					</view>
					<view class="x12 bg-white  " v-else @click="xzaddress">
						<view class="x3 " >选择地区</view>
						<view class="x6 padding-left" >
							{{xq_name}}请选择
						</view>
						<view class="x-auto float-right"  >
							<image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" style="width: 16upx; height: 28upx;"></image>
						</view>
					</view>
				</view>
				<view class="x12 bg-white  " v-else @click="goAddressList">
					<view class="x3 text-right" >配送小区</view>
					<view class="x6 padding-left" >
						{{xq_name}}请选择
					</view>
					<view class="x-auto float-right" >
						<image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" style="width: 16upx; height: 28upx;"></image>
					</view>
				</view>
				
			</view>
			<view class="x12 bg-white  border-top border-gray " v-if="psd_list==0 || map_address==2">
				<view class="x3 " >详细地址</view>
				<view class="x6 padding-left" >
					<textarea class="bg_address" placeholder="例:XXX5号楼303室" v-model="mbh" />
				</view>
			</view>
			<view class="x12 bg-white padding border-top border-gray"  v-else>
				<view class="x3 text-right" style="padding: 20upx 0 15upx 0;">楼栋信息</view>
				<view class="x6 padding-left" style="padding: 20upx 0 15upx 20upx;">
					<input placeholder="例:XXX5号楼303室" v-model="mbh" />
				</view>
			</view>
			<view class="address_moren x12 bg-white padding border-top border-gray" >
				<view class="_notice">
					<view >是否设为默认地址？</view>
					<view >每次购物会优先定位该地址，方便您购物</view>
				</view>
				<view class="switch_size">
					 <evan-switch v-model="boolean" size="20" active-color="#53a334"></evan-switch>
				</view>
				
			</view>

		</view> -->

		<view class="x12 padding-big margin-top" style="margin-top: 51rpx;padding: 0 4%;">
			<button @click="setLoading" class="text-white"  v-if="address_id==0">保存收货地址</button>
			<button @click="upAddress" class="text-white" style="border-radius: 100upx;margin-top: 0;"  v-if="address_id!=0">保存并使用</button>
		</view>
		<view class="x12 padding-big margin-top" v-if="address_id!=0">
			<div @click="delAddress" class="text-white"  style="background:#C0C0C0; border-radius:34px; color: #fff;margin:0 auto;">删除地址</div>
		</view>
		
	</view>
</template>
<script>import url from '../../main.js';
// import evan-switch from '/components/evan-switch/evan-switch.vue';
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
				biaoArr: [{name: '家',falg: false},{name:'父母家',falg: false},{name:'公司',falg: false},{name:'学校',falg: false},{name:'其他',falg: false}],
				deployinfo:{},//配置信息货币单位，符号，以及其他的一些配置参数
				login:false,
				memberinfo:[],
				name:'',
				telphone:'',
				address:'',
				mbh:'',
				xq_name:'',
				address_id:0,
				is_default:2,
				address_list:[],
				lat:'',
				lng:'',
				psd_list:0,
				gender:1,
				map_address:1,//配送商城是否关闭收货地址地图选择 1否 2是 默认1
				//psd_info:[],
				programtype:3,
				// config:{
				// 	title: '编辑地址',
				// 	color: '#ffffff',
				// 	backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
				// 	statusBarFontColor:'#fff'
				// },
				label:[]
			}
		},
		onShow:function(){
			//#ifdef MP-WEIXIN
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var xxx = currPage.data;
				//console.log(xxx);
				if(xxx.hasOwnProperty('mydata')==true){
					//this.psd_info = currPage.data.mydata;
					this.xq_name =  currPage.data.mydata.name;
					this.address = currPage.data.mydata.address;
					this.lat =  currPage.data.mydata.lat;
					this.lng = currPage.data.mydata.lng;
				}
			// #endif
		},
		onLoad:function(data){
			//#ifdef APP-PLUS
			if(uni.getSystemInfoSync().platform==='ios'){
				var programtype = 2;
			}else if(uni.getSystemInfoSync().platform==='android'){
				var programtype = 1;
			}else{
				var programtype = 3;
			}
			//#endif
			//#ifdef MP-WEIXIN
				var programtype = 3;
			//#endif
			this.programtype = programtype;
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				this.deployinfo = uni.getStorageSync('deployinfo');
				//console.log(this.deployinfo);
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
			this.setZt();
			//console.log(data);
			if(data.addressinfo){
				var addressinfo = JSON.parse(data.addressinfo);
				this.name = addressinfo.name;
				this.telphone = addressinfo.tel;
				this.address = addressinfo.address;
				this.mbh = addressinfo.mbh;
				this.xq_name = addressinfo.xq_name;
				this.address_id = addressinfo.address_id
				this.lat = addressinfo.lat;
				this.lng = addressinfo.lng
				this.is_default= addressinfo.is_default,
				this.label = addressinfo.label,
				this.gender = addressinfo.gender
				// if(addressinfo.label.indexOf(',')!=-1){
				// 	this.label = addressinfo.label.split(",")
				// }else{
				// 	this.label.push(addressinfo.label)
				// }
			}
			this.getPsdList();
			//console.log(JSON.parse(data.addressinfo));
		},
		methods: {
			chooseBiaoArr(item){
				this.label = item.name
			},
			   is_default_c(){
				   console.log(this.is_default)
				   if(this.is_default == 1){
					   this.is_default = 2
				   }else{
					   if(this.is_default == 2){
					   	   this.is_default = 1
					   }
				   }
				   
			   },
			  radioChange(e) {
				  this.gender = e
				 // console.log(e.detail.value,'123459')
			    // console.log('radio发生change事件，携带value值为：', e.detail.value)
			  },
			switch1Change: function (e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			//查询配置信息
			setZt(){
				var arr ={
						};
				var pdata = url.getSignStr(arr);
				uni.request({
				url:url.websiteUrl+'/api_v2/mall_base/base_set',
				method:'POST',
				dataType:'json',
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				data:pdata,
				success: res => {
					//console.log(res.data.data.map_address);
					if(res.data.status=='y'){
						this.map_address = res.data.data.map_address;
					}									
				}
			});
			},
			//获取配送小区列表
			getPsdList(){
				var arr ={
					};
				var pdata = url.getSignStr(arr);
				uni.request({
						url:url.websiteUrl+'/api_v2/mall_base/ps_place',
						method:'POST',
						dataType:'json',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:pdata,
						success: res => {
							//console.log(res.data.total);
							this.psd_list = res.data.total;
						}
				});
			},
			xzaddress(){//默认地图
				var xxx = this;
				uni.chooseLocation({
					success: res => {
						xxx.sss = 1;
						this.lat = res.latitude;//纬度
						this.lng = res.longitude;//经度
						this.xq_name = res.name;//位置名称
						this.address = res.address;//详细地址
					},
					fail: res => {						
						xxx.sss = 0;
					},
				});
			},
			xzGdAddress(data){//小程序高德地图
				///pagesb/lbs/map
				if(data==""){
					uni.showToast({
						icon: 'none',
						title: "请先设置高德地图小程序key"
					});
					return;
				}
				uni.navigateTo({
					url:"/pagesb/lbs/map?key="+data
				})
			},
			goAddressList(){
				//获取用户当前经纬度
				uni.getLocation({
					type: 'wgs84',
					success: res => {
						//console.log('当前位置的经度：' + res.longitude);
						//console.log('当前位置的纬度：' + res.latitude);
						this.lat = res.latitude;
						this.lng = res.longitude;
						uni.navigateTo({
							url:"/pagesb/center/psd_list?lng="+res.longitude+"&lat="+res.latitude
						})
					},
					fail: res => {
					}
				});
			},
			delAddress(){
				//获取信息
				var that = this
				uni.showModal({
				    title: '提示',
				    content: '确定要删除此地址么',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							console.log(that)
							var arr ={
									openid: that.memberinfo.openid,
									address_id: that.address_id,
								};
							var pdata = url.getSignStr(arr);
							uni.request({
									url:url.websiteUrl+'/api_v2/member_addres_act/del',
									method:'POST',
									dataType:'json',
									header:{
										'content-type':'application/x-www-form-urlencoded'
									},
									data:pdata,
									success: res => {
										//console.log(res.data);
										if(res.data.status=='y'){
											that.getAddress();
										}
									}
							});
				        } else if (res.cancel) {
				            console.log('用户点击取消');
							// uni.navigateTo({
							// 	url:'/pages/goods_details/address_list'
							// })
				        }
				    }
				});

			},
			upAddress(){
				if(this.gender.length == ''){
					uni.showToast({
						icon: 'none',
						title: '请填写性别'
					});
					return;
				}
				if (this.name.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请填写收货人姓名'
					});
					return;
				}
				if (this.xq_name.length < 1  && this.lat.length < 1  && this.lng.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请选择收货地址'
					});
					return;
				}
				if (this.mbh.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请填写门牌号'
					});
					return;
				}
				if (this.telphone.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请填写收货人手机号'
					});
					return;
				}
				if (!(/^1[3-9]\d{9}$/).test(this.telphone)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的电话号码'
					});
					return;
				}
				// let string = ''
				// if(this.label.length>1){
				// 	string = this.label.join(",")
				// }else{
				// 	string = this.label[0]
				// }
				//获取信息
				var arr ={
						openid: this.memberinfo.openid,
						address_id: this.address_id,
						name: this.name,
						tel: this.telphone,
						address: this.address,
						mbh: this.mbh,
						xq_name:(this.map_address==2)?(''):(this.xq_name),
						is_default: 1,
						lat:this.lat,
						lng:this.lng,
						gender:this.gender,
						label: this.label
					};
	
				var pdata = url.getSignStr(arr);
				uni.request({
						url:url.websiteUrl+'/api_v2/member_addres_act/upd',
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
									icon: 'none',
									title: res.data.info
								});
								return;
							}

							if(res.data.status=='y'){
								this.getAddress();								
							}
						}
				});
			},
			setLoading(){
				//   console.log(this.)
				if(this.gender.length == ''){
					uni.showToast({
						icon: 'none',
						title: '请填写性别'
					});
					return;
				}
				if (this.name.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请填写收货人姓名'
					});
					return;
				}
				if (this.xq_name.length < 1  && this.lat.length < 1  && this.lng.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请选择收货地址'
					});
					return;
				}
				if (this.mbh.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请填写门牌号'
					});
					return;
				}
				if (this.telphone.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请填写手机号码'
					});
					return;
				}
				if (!(/^1[3-9]\d{9}$/).test(this.telphone)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的电话号码'
					});
					return;
				}
				// let string = ''
				// if(this.label.length>1){
				// 	string = this.label.join(",")
				// }else{
				// 	string = this.label[0]
				// }
				//获取信息
				var arr ={
						openid: this.memberinfo.openid,
						name:this.name,
						tel:this.telphone,
						address:this.address,
						xq_name:(this.map_address==2)?(''):(this.xq_name),
						mbh:this.mbh,
						is_default:this.is_default,
						lat:this.lat,
						lng:this.lng,
						gender:this.gender,
						label:this.label
					};
					console.log(arr)
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/member_addres_act/add',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						console.log(res.data);
						if(res.data.status=='n'){
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
							return;
						}
						if(res.data.status=='y'){
							this.getAddress();
						}
						//this.address_list = res.data.data.list;
						//console.log(res.data.data.list);
					}
				});
			},
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
						if(res.data.status=='y'){
							//下面的程序执行了返回时向上级页面传参，并跳转到指定的页面
							var pages = getCurrentPages();
							var prevPage = pages[pages.length - 2]; //上一个页面
							//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
							//prevPage.setData({
								//mydata: res.data.data
							//});
							uni.navigateBack({
								delta: 1
							});
							//console.log(this.lat,this.lng);
						}
					}
				});
			}
		}
	}
</script>

<style>
	.biaoArr{
		display: flex;
		/* justify-content: space-between; */
	}
	.biaoArr view{
		width: 90rpx;
		height: 40rpx;
		border: 1px solid #999999;
		border-radius: 40rpx;
		font-size:22rpx ;
		line-height: 40rpx;
		text-align: center;
		margin-right: 21rpx;
	}
	page {
		background-color: #F6F6F6;
	}
	
	
	.bg_address{
		height: 120upx;
		width: 500upx;
	}
	.address_moren{
		background-color: #fff;
		margin-top: 20upx;
		/* height: 120upx; */
		width: 96%;
		font-size: 22upx;
		display: flex;
		/* padding-left: 60upx; */
		position: relative;
	}
	.switch_size{
		position: absolute;
		right: 40upx;
		top: 20upx;
	}
	.text-white{
		margin-top: 51rpx;
		border-radius:98rpx;
		background-color: #FE0000;
		font-size: 36upx;
		color: #fff;
		width: 600rpx;
		border-radius: 0;
		text-align: center;
		height: 98upx;
		line-height: 98upx;
	}
	/* 新增 */
	.add{
	  width: 710rpx;
	  background-color: #fff;
	  border-radius: 10rpx;
	  margin-top: 20rpx;
	  margin-left: 20rpx;
	}
	.addtext{
	  height: 100rpx;
	  line-height: 100rpx;
	  border-bottom: 1rpx solid #f7f7f7;
	  display: flex;
	  margin-left: 20rpx;
	  align-items: center;
	}
	.addtext .text1{
	  font-size: 28rpx;
	  color: #333;
	  width: 250rpx;
	}
	.placeclass{
	  font-size: 24rpx;
	  color: #999;
	}
	.inputclass{
	  width: 360rpx;
	}
	.images{
	  height: 22rpx;
	  width: 12rpx;
	  /* position: absolute;
	  right: 40rpx; */
	}
	.rigaogroup{
	  width: 380rpx;
	  display: flex;
	  font-size: 24rpx;
	  color: #333333;
	}
	.radio_group{
	  font-size: 24rpx;
	  display: flex;
	  justify-content: space-between;
	}
	.radio_group radio .wx-radio-input.wx-radio-input-checked{
	  background-color: #fe0000;
	  border: 4rpx solid #fe0000
	}
	.radio_group radio .wx-radio-input{ 
	  height: 30rpx; 
	  width: 30rpx;
	  border-radius: 50%;
	  background: transparent;
	  box-sizing: border-box;
	  border: 2rpx solid #999;
	}
	
	.rigaogroup view{
		display: flex;
		align-items: center;
		margin-right: 50rpx;
	}
	.rigaogroup text{
		width: 30rpx;
		height: 30rpx;
		border-radius: 30rpx;
		border: 1px solid #C0C0C0;
		margin-right: 30rpx;
		
	}
	.inputclass{
	  font-size: 28rpx;
	}
	.anniu{
	  position: absolute;
	  bottom: 0;
	  left: 0;
	  width: 750rpx;
	  background-color: #fe0000;
	  box-sizing: border-box;
	}
	.anniu_button{
	  color: #fff;
	  font-size: 36rpx;
	  justify-content: center;
	  background-color: #fe0000;
	  height: 100rpx;
	  line-height: 100rpx;
	  box-sizing: border-box;
	  padding: 0;
	}
	.red{
		display: block;
		width: 18px;
		height: 18rpx;
		border-radius: 18rpx;
		background-color: #FE0000;
		margin: auto auto;
	}
	
</style>
