<template>
	<view class="center">
		<view class="x12 bg_set">
			<image src="https://div.buy315.com.cn/xcx_imgs/my_top.png" style="width: 750upx; height: 410upx;"></image>
			<view class="three_group">
					<view class="group" @click="gowowallet">
						<view class="t1">￥{{memberList.money_sum}}</view>
						<view class="t2">账户余额</view>
					</view>
					<view class="group"  @click="gotocoupon">
						<!-- <view class="t1" v-if="datanum==0">0</view> -->
						<view class="t1">{{datanum}}</view>
						<view class="t2">优惠券</view>
					</view>
					<view class="group" @click="jif">
						<view class="t1">{{points_sum}}</view>
						<view class="t2">积分</view>
					</view>
				</view>
			<view class="x12 text-center" style="z-index: 1000; position: absolute; top: 100upx; display: block;">
				<navigator hover-class="none" v-if="login==true" style="position: relative; " url="/pagesb/center/member_info">
					<!-- <image src="https://div.buy315.com.cn/xcx_imgs/c-set.png"  style="width: 39upx; height: 41upx;z-index: 1000; z-index: 999; position: absolute; top: 50%;transform: translateY(-50%); right: 30upx; display: block;"></image> -->
					<image class="logo-img" style="width: 96upx; height: 96upx; margin: auto; float: none; background-color: #fff; border-color: #fff;"
					 :src="(login && memberList.heard_imgs!=''  && memberList.heard_imgs!=undefined) ? memberList.heard_imgs :avatarUrl"></image>
					<view class="x12  text-center">
						<text class="uer-name" style="font-size: 28upx;">{{login ? memberinfo.mobile : '请登录'}}</text>
					</view>
				</navigator>
				<button hover-class="none" plain='true' v-if="login==false" open-type="getPhoneNumber" style="border: none; height: 300upx;"
				 @getphonenumber="getPhoneNumber">
					<image class="logo-img" style="margin: auto; float: none; background-color: #fff; border-color: #fff;" :src="(login && memberList.heard_imgs!=''  && memberList.heard_imgs!=undefined) ? memberList.heard_imgs :avatarUrl"></image>

						<text class="uer-name">{{login ? memberinfo.mobile : '请登录'}}</text>
					
				</button>
			</view>
		</view>
		<view class="">
			
		</view>
<!-- 		<view class="x12 bg-white text-center" style="width:750upx;" v-if="login==true && xShow==true">
			<view class="x12 padding-little-top" style="color: #9B9B9B; font-size: 24upx;">
				在门店扫描会员码识别身份或消费
			</view>
			<view class="x12 padding-little-top">
				<image :src="yemxList.barcode_img" mode="heightFix" style="height:60upx;"></image>
			</view>
			<view class="x12" style="color: #393D4A; font-size: 24upx; padding-bottom:10px;">
				{{yemxList.card_code}}
			</view>
		</view> -->
		<view class="x12 bg-white margin-tops text-333">
			<view class="x-auto text-bold padding-big" style="padding-bottom: 0;">
				<view class="tctj-title">
					<view class="title_t" >我的订单</view>
					<view class="x-auto float-right" style="font-size: 10pt; color: #393D4A; font-weight: 400;" @click="goDetails(0)">
						<image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" style="width: 16upx; height: 28upx; float: right; padding-top: 7upx; margin-left: 10upx;"></image>
					</view>
				</view>
			</view>
			<view class="x12 padding-small-bottom text-center text-default" style="padding-top: 20upx; font-size: 24upx;">
				<!-- <view class="x4 orderlisttext"  @click="goDetails(1)">
					<view style="width: 100upx; margin: auto;">
						<view class="addcart" style="float: right; width: 12rpx; height: 12rpx; min-width: 0rpx; margin-right: 25rpx; background-color: red;"
						 v-if="memberList.dfk>0 && login==true"></view>
						<view class="addcart" style="float: right; width: 12rpx; height: 12rpx; min-width: 0rpx; margin-right: 25rpx;"
						 v-if="memberList.dfk==0"></view>
						<view class="x12" style="margin-top: -20upx;">
							<view style="display: table-cell; vertical-align: middle; text-align: center; width: 100upx; height: 50rpx;">
								<image src="https://div.buy315.com.cn/xcx_imgs/dqh.png" style="width: 48upx; height: 48upx;"></image>
							</view>
						</view>
						<view class="x12 text22">
							待自取
						</view>
					</view>
				</view> -->
				<view class="x4 orderlisttext"  @click="goDetails(1)">
					<view style="width: 100upx; margin: auto;">
						<view class="addcart" style="float: right; width: 12rpx; height: 12rpx; min-width: 0rpx; margin-right: 25rpx; background-color: red;"
						 v-if="memberList.dfk>0 && login==true"></view>
						<view class="addcart" style="float: right; width: 12rpx; height: 12rpx; min-width: 0rpx; margin-right: 25rpx;"
						 v-if="memberList.dfk==0"></view>
						<view class="x12" style="margin-top: -20upx;">
							<view style="display: table-cell; vertical-align: middle; text-align: center; width: 100upx; height: 50rpx;">
								<image src="https://div.buy315.com.cn/xcx_imgs/dfk.png" style="width: 48upx; height: 48upx;"></image>
							</view>
						</view>
						<view class="x12 text22">
							待付款
						</view>
					</view>
				</view>
				<view class="x4 orderlisttext"  @click="goDetails(6)">
					<view style="width: 100upx; margin: auto;">
						<view class="addcart" style="float: right; width: 13rpx; height: 13rpx; min-width: 0rpx; margin-right: 30rpx; background-color: red;"
						 v-if="memberList.dfh>0 && login==true"></view>
						<view class="addcart" style="float: right; width: 13rpx; height: 13rpx; min-width: 0rpx; margin-right: 30rpx;"
						 v-if="memberList.dfh==0"></view>
						<view class="x12" style="margin-top: -20upx;">
							<view style="display: table-cell; vertical-align: middle; text-align: center; width: 100upx; height: 50rpx;">
								<image src="https://div.buy315.com.cn/xcx_imgs/dfh.png" style="width: 48upx; height: 48upx;"></image>
							</view>
						</view>
						<view class="x12 text22">
							待发货
						</view>
					</view>
				</view>
				<view class="x4 orderlisttext"  @click="goDetails(2)">
					<view style="width: 100upx; margin: auto;">
						<view class="addcart" style="float: right; width: 13rpx; height: 13rpx; min-width: 0rpx; margin-right: 30rpx;"
						 v-if="login==true"></view>
						<view class="x12" style="margin-top: -20upx;">
							<view style="display: table-cell; vertical-align: middle; text-align: center; width: 100upx; height: 50rpx;">
								<image src="https://div.buy315.com.cn/xcx_imgs/yfh.png" style="width: 48upx; height: 48upx;"></image>
							</view>
						</view>
						<view class="x12 text22">
							待收货
						</view>
					</view>
				</view>
				<view class="x4 orderlisttext" @click="goDetails(4)">
					<view style=" margin: auto;">
						<view class="addcart" style="float: right; width: 13rpx; height: 13rpx; min-width: 0rpx; margin-right: 25rpx; background-color: red;"
						 v-if="memberList.tkz>0 && login==true"></view>
						<view class="addcart" style="float: right; width: 13rpx; height: 13rpx; min-width: 0rpx; margin-right: 25rpx;"
						 v-if="memberList.tkz==0"></view>
						<view class="x12" style="margin-top: -20upx;">
							<view style="display: table-cell; vertical-align: middle; text-align: center; width: 170upx; height: 50rpx;">
								<image src="https://div.buy315.com.cn/xcx_imgs/ysh.png" style="width: 48upx; height: 48upx;"></image>
							</view>
						</view>
						<view class="x12 text22">
							退款
						</view>
					</view>
				</view>
			</view>
		</view>
<!-- 		<view class="order_num bg-white x12">
		  <view class="two">
		    <view class="t1">分拣完成待自取</view>
		    <view class="t2">订单编号:2020090813425601</view>
		  </view>
		  <image src="https://div.buy315.com.cn/xcx_imgs/kele.jpg" class="img"></image>
		 <text class="text">再来一单</text>
		</view> -->
		<!-- 我的服务 -->
		<view class="servicelist">
			<view class="servicelisttext">我的服务</view>
			<view class="servicelall">
				<!-- <view class="serviceone" @click="gotovips">
					<view><image class="serviceimg" src="https://div.buy315.com.cn/xcx_imgs/fwbz11.png" mode=""></image></view>
					<view class="servicetext">会员卡</view>
				</view> -->
				<view class="serviceone" @click="goKanJia" v-if="login==true">
					<view><image class="serviceimg" src="https://div.buy315.com.cn/xcx_imgs/kanjia.png" mode=""></image></view>
					<view class="servicetext">我的砍价</view>
				</view>
				<view class="serviceone" @click="goDz"  v-if="login==true">
					<view><image class="serviceimg" src="https://div.buy315.com.cn/xcx_imgs/fwbz13.png" mode=""></image></view>
					<view class="servicetext">地址管理</view>
				</view>
<!-- 				<button>
				<view class="serviceone" v-if="login==true">
					<view><image class="serviceimg" src="https://div.buy315.com.cn/xcx_imgs/fwbz4.png" mode=""></image></view>
					<view class="servicetext">在线客服</view>
				</view>
				</button> -->
				<view class="serviceone"  @click="gotoRowse">
					<view><image class="serviceimg" src="https://div.buy315.com.cn/xcx_imgs/fwbz14.png" mode=""></image></view>
					<view class="servicetext">浏览记录</view>
				</view>
				<view class="serviceone">
					<button open-type="contact" bindcontact="handleContact" class="kefu_button">
					</button>
					<view><image class="serviceimg" src="https://div.buy315.com.cn/xcx_imgs/kefu.png" mode=""></image></view>
					<view class="servicetext">在线客服</view>
				</view>
				<view class="serviceone" @click="gotoSet">
					<view><image class="serviceimg" src="https://div.buy315.com.cn/xcx_imgs/fwbz15.png" mode=""></image></view>
					<view class="servicetext">设置</view>
				</view>
			</view>
			
		</view>
	<!-- 	
		
	<view class="x12 bg-white margin-topss text-333">
			<view class="x-auto text-bold padding-big" style="padding-bottom: 0;">
				<view class="tctj-title">
					<view class="title_t" style="font-size: 28upx; color: #393D4A; font-weight: 500;">我的钱包</view>
				</view>
			</view>

			<view class="x12 float-left text-center bg-white" style="color:#333; font-size: 24upx;">
				<view class="x6 float-left height-big" @click="zhye" v-if="memberList.app_oncecard==1" style="position: relative; height: 90upx;">
					<image src="https://div.buy315.com.cn/xcx_imgs/ck.png" style="width: 42upx; height: 42upx;position: absolute;top: 50%;transform: translateY(-50%);left: 80upx;"></image>
					<view class="x-auto float-left new_text_center">
						账户余额
					</view>
				</view>


				<view class="x6 float-left height-big" style=" width: 370upx;position: relative; height: 90upx;" @click="goYhjList"
				 v-if="memberList.app_coupon_offset==1">
					<view class="x-auto float-left" style="padding: 10upx 15upx 0upx 60upx;">
						<image src="https://div.buy315.com.cn/xcx_imgs/c-k.png" mode="" style="width: 42upx; height: 42upx;"></image>
					</view>
					<view class="x-auto float-left">
						现金抵用券
					</view>
				 	<image src="https://div.buy315.com.cn/xcx_imgs/c-k.png" style="width: 42upx; height: 42upx;position: absolute;top: 50%;transform: translateY(-50%);left: 80upx;"></image>
					<view class="x-auto float-left new_text_center" style="border-right: none;">
						现金抵用券
					</view> 
				</view>
			</view>
			<view class="x12 float-left text-center bg-white" style="color:#333; font-size: 24upx;">
				<view class="x6 float-left height-big" @click="kjcz" v-if="memberList.can_cz==1" style="position: relative; height: 90upx;">
					<view class="x-auto float-left" style="position: relative; height: 90upx;">
						<image src="https://div.buy315.com.cn/xcx_imgs/cz.png" mode="" style="width: 42upx; height: 42upx;"></image>
					</view>
					<view class="x-auto float-left">
						帐户充值
					</view>
					<image src="https://div.buy315.com.cn/xcx_imgs/cz.png" style="width: 42upx; height: 42upx;position: absolute;top: 50%;transform: translateY(-50%);left: 80upx;"></image>
					<view class="x-auto float-left new_text_center">
						帐户充值
					</view> 
				</view>
				<view class="x6 float-left height-big" style=" width: 370upx;position: relative; height: 90upx;" @click="memberfkm"  v-if="login==true">
					 <view class="x-auto float-left" style="position: relative; height: 90upx;">
						<image src="https://div.buy315.com.cn/xcx_imgs/hyk.png" mode="" style="width: 42upx; height: 42upx;"></image>
					</view>
					<view class="x-auto float-left">
						会员卡/付款码
					</view> 
					<image src="https://div.buy315.com.cn/xcx_imgs/hyk.png" style="width: 42upx; height: 42upx;position: absolute;top: 50%;transform: translateY(-50%);left: 80upx;"></image>
					<view class="x-auto float-left new_text_center" style="border-right: none;">
						会员卡/付款码
					</view>
				</view>
			</view>
		</view> -->
 	<!-- <view class="x12 bg-white margin-topss text-333">
			<view class="x-auto text-bold padding-big" style="padding-bottom: 0;">
				<view class="tctj-title">
					<view class="title_t" style="font-size: 28upx; color: #393D4A; font-weight: bold;">服务帮助</view>
				</view>
			</view>
			
			<view class="x12 " style="font-size: 24upx;">
				<view class="servicebang" >
					<view class="x12">
						<view class="x12" >
							<view >
								<image src="https://div.buy315.com.cn/xcx_imgs/fwbz3.png" style="width: 42upx; height: 42upx;"></image>
							</view>
						</view>
						<view class="x12">
							会员卡
						</view>
					</view>
				</view>
				<view class="servicebang" >
					<view class="x12">
						<view class="x12" >
							<view >
								<image src="https://div.buy315.com.cn/xcx_imgs/fwbz3.png" style="width: 42upx; height: 42upx;"></image>
							</view>
						</view>
						<view class="x12">
							我的拼团
						</view>
					</view>
				</view>
				<view class="servicebang"  @click="goDz"  v-if="login==true">
					<view class="x12">
						<view class="x12" >
							<view >
								<image src="https://div.buy315.com.cn/xcx_imgs/fwbz3.png" style="width: 42upx; height: 42upx;"></image>
							</view>
						</view>
						<view class="x12">
							地址管理
						</view>
					</view>
				</view>
				<view class="servicebang"  >
					<button open-type="contact" bindcontact="handleContact" style="width: 100%; height: auto; background: none; border:0px; padding: 0; margin: 0; overflow:visible; line-height:34rpx;font-size:18rpx; display:inline;">
						<view class="x12">
							<view class="x12" >
								<view >
									<image src="https://div.buy315.com.cn/xcx_imgs/fwbz2.png" style="width: 48upx; height: 42upx;"></image>
								</view>
							</view>
							<view class="x12" style="font-size: 10pt; color: #333;">
								在线客服
							</view>
						</view>
					</button>
				</view>
				<view class="servicebang"  @click="gotoRowse">
					<view class="x12">
						<view class="x12" >
							<view >
								<image src="https://div.buy315.com.cn/xcx_imgs/icon_rowse.png" style="width: 42upx; height: 42upx;"></image>
							</view>
						</view>
						<view class="x12">
							浏览记录
						</view>
					</view>
				</view>
			
				<view class=" servicebang"  @click="goSecurity" hover-class="none" v-if="login==true">
					<view class="x12">
						<view class="x12" >
							<view >
								<image src="https://div.buy315.com.cn/xcx_imgs/set.png" style="width: 42upx; height: 42upx;"></image>
							</view>
						</view>
						<view class="x12">
							设置
						</view>
					</view>
				</view>
			</view>
		</view>
 -->
	</view>
</template>

<script>
	import url from '../../main.js';
	export default {
		//#ifdef MP-WEIXIN
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
				xShow: false,
				deployinfo: {}, //配置信息货币单位，符号，以及其他的一些配置参数
				app_xxb: -1, //检查是否安装了希希贝插件
				app_xxb_width: 375,
				//refreshing: false,
				login: false,
				memberinfo: [],
				avatarUrl: "https://div.buy315.com.cn/xcx_imgs/no_login.png",
				memberList: [],
				yemxList: [],
				zxkf: false,
				member_xxb: {},
				listScroll:'',
				datanum:0,
				points_sum:0,
			}
		},
		onShow: function(e) {
		this.getlogin();
			//#ifdef MP-WEIXIN
			wx.login({
			  success: res =>{
				  //console.log(res.code);
				  this.xcode = res.code;
				}
			})
			//#endif
			this.login = false;
			try { //从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				this.deployinfo = uni.getStorageSync('deployinfo');
				var appsinfo = uni.getStorageSync('appsinfo');
				this.app_xxb = appsinfo.indexOf('app_xxb');
				//console.log(this.app_xxb_width);
				if (value && value.length != 0) {
					//console.log(value);
					this.memberinfo = value;
					this.login = true;
					//console.log(value);
				}
				if (this.app_xxb >= 0) {
					this.app_xxb_width = 250;
					this.get_xxb(); //获取希希贝
				}
			} catch (e) {
				// error
			}
			if (this.memberinfo.length == 0) {    
				url: "/pages/login/login"
			}
			uni.showLoading({
				title: '加载中'
			});
			if (this.memberinfo.length != 0) {
				this.getMer();
			}
			
			//获取信息
			var arr = {
				openid: this.memberinfo.openid,
				dynamic: 1,
			};
			var pdata = url.getSignStr(arr);
			uni.request({
				url: url.websiteUrl + '/api_v2/member_card/index',
				method: 'POST',
				dataType: 'json',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: pdata,
				success: res => {
					//console.log(res.data);
					this.yemxList = res.data.data;
					this.getData();
					this.getyouhuiquan();
					this.getmypoint()
				},
				fail: () => {},
				complete: () => {}
			});
		},
		
		onLoad: function() {
		this.getlogin();
			this.getyouhuiquan();
			this.getmypoint();
			//#ifdef MP-WEIXIN
			this.zxkf = true;
			//#endif
			//console.log(123456);
			this.yemx();

		},
		onPullDownRefresh() {
			//console.log("下拉刷新");
			//this.refreshing = true;
			this.yemx();
			this.getData();
			this.getyouhuiquan();
			this.getmypoint()
		},
		methods: {
			getlogin(){
				console.log('进入方法',uni.getStorage('memberinfo'))
				if (!uni.getStorageSync('memberinfo')) {
					console.log('进入判断',uni.getStorage('memberinfo'))
					uni.redirectTo({
						url: "/pages/login/login"
					})
					return;
				}
			},
			gotovips(){
				uni.navigateTo({
					url:'/pages/center/vipsdetail'
				})
			},
			getmypoint(){
					
				//获取信息
				var arr ={
					openid:this.memberinfo.openid,
					status: 0
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/membercenter/member_integral',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						console.log(res.data.data,'	我的积分')
						console.log(this.points_sum,'积分的数量');
						this.points_sum = res.data.points_sum;
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 优惠券
			getyouhuiquan(){
					
				//获取信息
				var arr ={
						member_openid:this.memberinfo.openid,
					};
				var pdata = url.getSignStr(arr);
				//原优惠券
				// uni.request({
				// 	url:url.websiteUrl+'/api_v2/stores/getcouponnum',
				// 	method:'POST',
				// 	dataType:'json',
				// 	header:{
				// 		'content-type':'application/x-www-form-urlencoded'
				// 	},
				// 	data:pdata,
				// 	success: res => {
				// 		console.log(res.data.data,'优惠券成功')
				// 		console.log(this.datanum,'优惠券的数量');
				// 		this.datanum = res.data.data;
						
				// 	},
				// 	fail: () => {},
				// 	complete: () => {}
				// });
				uni.request({
					url:url.websiteUrl+'/api_v2/coupon/getmembercouponnumber',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						console.log(res.data.data,'优惠券成功')
						console.log(this.datanum,'优惠券的数量');
						this.datanum = res.data.data;
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 钱包
			gowowallet(){
				uni.navigateTo({
					url:'./wallet'
				})
			},
			gotocoupon(){
				uni.navigateTo({
					url:'/pagesb/center/yushou_yhj'
				})
			},
			gotomyjoin(){
				uni.navigateTo({
					url:'/pages/center/myjoin'
				})
			},
			getPhoneNumber: function (e){

				//console.log(e.detail.iv);
				//console.log(e.detail.encryptedData);
				if(e.detail.errMsg == 'getPhoneNumber:fail user deny'){
					//console.log('拒绝');
				}else{
					wx.checkSession({
					  success: res =>{
					    //session_key 未过期，并且在本生命周期一直有效
						wx.login({
						  success: res =>{
							 
							  this.wxlogin(e.detail.iv,e.detail.encryptedData);
							  this.xcode = res.code;
							}
						})
						
					  },
					  fail () {
					    // session_key 已经失效，需要重新执行登录流程
						wx.login({
						  success: res =>{
							  this.xcode = res.code;
							  this.wxlogin(e.detail.iv,e.detail.encryptedData);
							}
						})
					  }
					})
				}
			  },
			  wxlogin(iv,encryptedData){
			  	if (this.xcode) {
			  	  //获取信息
			  	  var arr ={
			  	  		code: this.xcode,
			  			iv:iv,
			  			encryptedData:encryptedData,
			  			re_openid:this.tjr_id,
			  	  	};
			  	  var pdata = url.getSignStr(arr);
			  	  
			  	  //组织数据登录
			  	  uni.request({
			  	  	url:url.websiteUrl+'/api_v2/member_login/xcx_login',
			  	  	method:'POST',
			  	  	dataType:'json',
			  	  	header:{
			  	  		'content-type':'application/x-www-form-urlencoded'
			  	  	},
			  	  	data:pdata,
			  	  	success: res => {		
			  			if(res.data.status=='y'){
			  				uni.showToast({
			  					title: '登录中...',
			  					duration: 2000,
			  					icon:'loading',
			  				});
			  				setTimeout(function(){
			  					uni.setStorage({
			  						key: 'memberinfo',
			  						data:{
			  							mobile: res.data.mobile,
			  							name: res.data.name,
			  							openid: res.data.openid,
			  						},
			  						success: function () {										
			  							uni.switchTab({
			  								url: '../home/index',
			  							});
			  						}
			  					});
			  				},2000)
			  			}else{
			  				uni.showToast({
			  					title: res.data.info,
			  					duration: 2000,
			  					icon:'none',
			  				});
			  			}
			  	  	},
			  	  	fail: () => {},
			  	  	complete: () => {}
			  	  });
			  	} else {
			  		uni.showToast({
			  			title: '登录失败！',
			  			duration: 2000,
			  			icon:'none',
			  		});
			  	  //console.log('登录失败！' + res.errMsg)
			  	}
			  },

			get_xxb() { //获取希希贝
				//获取信息
				var arr = {
					member_mark: this.memberinfo.openid,
				};
				var pdata = url.getSignStr(arr);
				uni.request({
					url: url.websiteUrl + '/app_xxb/aapi_xxb/get_member_xxb',
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: pdata,
					success: res => {
						//console.log(res.data);
						if (res.data.status == 'y') {
							this.member_xxb = res.data.data[0];
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			yemx() { //获取条码
				var xxxthis = this;
				//var xxx = [];
				setInterval(function() {
					//获取信息
					var arr = {
						openid: xxxthis.memberinfo.openid,
						dynamic: 1,
					};
					var pdata = url.getSignStr(arr);
					uni.request({
						url: url.websiteUrl + '/api_v2/member_card/index',
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: pdata,
						success: res => {
							//console.log(res.data);
							xxxthis.yemxList = res.data.data;
						},
						fail: () => {},
						complete: () => {}
					});
				}, 90000);
			},
			//检查会员是否存在
			getMer() {
				var arr = {
					member_openid: this.memberinfo.openid,
				};
				var pdata = url.getSignStr(arr);
				uni.request({
					url: url.websiteUrl + '/api_v2/member/member_info',
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: pdata,
					success: res => {
						//console.log(res.data.data.status);
						if (res.data.status == 'n' || res.data.data.status != 1) {
							try {
								const value = uni.getStorageSync('memberinfo');
								//写入缓存
								uni.setStorage({
									key: 'memberinfo',
									data: [],
									success: function() {}
								});
								const xvalue = uni.getStorageSync('memberinfo');
							} catch (e) {
								// error
							}
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getData() {
				//获取信息
				var arr = {
					openid: this.memberinfo.openid,
				};
				var pdata = url.getSignStr(arr);
				uni.request({
					url: url.websiteUrl + '/api_v2/membercenter/index',
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: pdata,
					success: res => {
						//console.log(res.data);
						this.memberList = res.data.data;
						this.xShow = true;
						uni.hideLoading();
						uni.stopPullDownRefresh();
					},
					fail: () => {},
					complete: () => {}
				});
			},
			goLogin() {
				if (this.memberinfo.length == 0) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
					return;
				}
			},
			goDz() {
				if (this.memberinfo.length == 0) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
				} else {
					uni.navigateTo({
						url: "../goods_details/address_list"
					})
				}
			},
			goZjDy() {
				uni.navigateTo({
					url: "/pagesb/center/zjdy"
				})
			},
			goFarmhouse() {
				uni.navigateTo({
					url: "/pagesb/center/farmhouse_list"
				})
			},
			goQgInfoList() {
				uni.navigateTo({
					url: "/pagesb/center/qg_info_list"
				})
			},
			goBuyGuide() {
				uni.navigateTo({
					url: "/pagesb/center/buy_guide"
				})
			},
			goAbout() {
				uni.navigateTo({
					url: "/pagesb/center/about"
				})
			},
			goSecurity() {
				if (this.memberinfo.length == 0) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
					return;
				}
				uni.navigateTo({
					url: "/pagesb/center/security"
				})
			},
			goMyPoverty() {
				if (this.memberinfo.length == 0) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
					return;
				}
				uni.navigateTo({
					url: "/pagesb/center/my_poverty"
				})
			},
			goKbList() {
				if (this.memberinfo.length == 0) {
					uni.navigateTo({
						// url:"/pages/login/login"
						url: "/pagesb/center/member_money_sum"
					})
					return;
				}
				uni.navigateTo({
					//url:"/pagesb/center/kb_list"
					url: "/pagesb/center/ck_list"
				})
			},
			goYhjList() {
				if (this.memberinfo.length == 0) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
					return;
				}
				uni.navigateTo({
					//url:"/pagesb/center/kb_list"
					url: "/pagesb/center/xjj_list"
				})
			},
			goDetails(data) {
				if (this.memberinfo.length == 0) {
					this.goLogin();
				}
				uni.navigateTo({
					url: "/pagesb/center/order_list?status=" + data
				})
			},
			zhye() {
				if (this.memberinfo.length == 0) {
					this.goLogin();
				}
				uni.navigateTo({
					url: "/pagesb/center/member_money_sum"
				})
			},
			jif() {
				if (this.memberinfo.length == 0) {
					this.goLogin();
				}
				uni.navigateTo({
					url: "/pagesb/center/member_points_num"
				})
			},
			jif_xxb() {
				if (this.memberinfo.length == 0) {
					this.goLogin();
				}
				uni.navigateTo({
					url: "/pagesb/center/member_xxb"
				})
			},
			kjcz() {
				if (this.memberinfo.length == 0) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
					return;
				}
				uni.navigateTo({
					url: "/pagesb/center/member_cz"
				})
			},
			memberfkm() {
				if (this.memberinfo.length == 0) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
					return;
				}
				uni.navigateTo({
					url: "/pagesb/center/member_fkm"
				})
			},
			//推荐记录
			tjjl() {
				if (this.memberinfo.length == 0) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
					return;
				}
				uni.navigateTo({
					url: "/pagesb/center/member_tjjl"
				})
			},
			// 浏览记录
			gotoRowse() {
				uni.navigateTo({
					url: "/pages/center/rowse"
				})
			},
			gotoSet(){
				uni.navigateTo({
					url: "/pages/center/set"
				})
			},
			goKanJia(){
				uni.navigateTo({
					url: "/pagesb/new/zeroqiang"
				})
			}
			

			
			// getyouhuiquan(){

			// 	//获取信息
			// 	var arr ={
			// 			pt_user_id: this.memberinfo.openid,
			// 			stores_id: this.xshopInfo.store.stores_id,
			// 		};
			// 	var pdata = url.getSignStr(arr);
			// 	uni.request({
			// 		url:url.websiteUrl+'/app_coupon_offset/aapi_coupon_offset/xlist',
			// 		method:'POST',
			// 		dataType:'json',
			// 		header:{
			// 			'content-type':'application/x-www-form-urlencoded'
			// 		},
			// 		data:pdata,
			// 		success: res => {
			// 			this.couputlist = res.data.data
			// 			console.log(res.data,'获取的优惠券成功案例')
			// 		},
			// 		fail: () => {},
			// 		complete: () => {}
			// 	});
			// }
		}
	}
</script>

<style>
	@import '../../common/common.css';

	page {
		background-color: #F6F6F6;
	}

	.new_text_center {
		width: 60%;
		text-align: left;
		height: 60upx;
		line-height: 60upx;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 0;
		border-right: 2upx solid #999;
	}

	.tctj-title {
		width: 100%;
		height: auto;
		float: left;
		padding-bottom: 15upx;
		font-size: 32upx;
	}

	.title_s {
		width: 20upx;
		height: 28upx;
		float: left;
		margin-top: 10upx;
		border-left: #FFCC00 solid 3px;
	}

	.title_t {
		width: auto;
		height: auto;
		float: left;
		font-size: 28upx;
		color: #343434;
		font-weight: bold;
	}

	.addcart {
		position: relative;
		z-index: 1000;
		color: white;
		width: auto;
		min-width: 32upx;
		height: 32upx;
		border-radius: 32upx;
		font-size: 26upx;
		right: 0;
	}

	.bg_set {
		position: relative;
	}
	.margin-tops{
		position: absolute;
		top: 430upx;
		width: 710upx;
		margin-left: 20upx;
		box-shadow: 1px 2px 18px 0px rgba(4, 0, 0, 0.12);
		border-radius: 10upx;
	}
	.three_group{
	  width: 710rpx;
	  padding:0 40rpx;
	  /* margin: 0 auto; */
	  box-sizing: border-box;
	  display:flex;
	  flex-wrap:wrap;
	  justify-content:space-between;
	  text-align: center;
	  /* color: #fff; */
	  position: absolute;
	  bottom: 55upx;
	}
	.three_group .t1{
	  font-size: 26rpx;
	  font-weight: bold;
	  line-height: 28rpx;
	  margin-bottom: 18rpx;
	}
	.three_group .t2{
	  font-size: 24rpx;
	  line-height: 26rpx;
	}
	.text22{
		font-size: 24upx;
		color: #343434;
	}
	.orderlisttext{
		width: 25%;
		/* margin-bottom: 20upx; */
	}
	.order_num{
	  width: 710upx;
	  height: 180upx;
	  box-shadow:0px 0px 6upx 0px rgba(6,0,1,0.2);
	  border-radius:10upx;
	  margin: 0 auto;
	  margin-bottom: 20upx;
	  background-color: #fff;
	 position: absolute;
	  margin-top: 670upx;
	  margin-left: 20upx;
	}
	.order_num::after{
		content: "";
		clear: both;
		display: block;
	}
	.order_num .img{
	  width: 120upx;
	  height: 120upx;
	  border-radius: 10upx;
	  background-size: 100%;
	  position: absolute;
	  top: 50%;
	  left: 20upx;
	  transform: translateY(-50%);
	}
	.order_num .two{
	  font-size: 24upx;
	  position: absolute;
	  top: 50%;
	  transform: translateY(-50%);
	  left: 170upx;
	  height: 120upx;
	}
	.order_num .two .t1{
	  line-height: 80upx;
	  font-size: 28upx;
	  color: #333;
	}
	.order_num .two .t2{
	  line-height: 26upx;
	  color: #999;
	}
	.order_num .text{
	  font-size: 24upx;
	  color: #FE0000;
	  position: absolute;
	  top: 50%;
	  transform: translateY(-50%);
	  right: 20upx;
	}
	.margin-topss{
		position: absolute;
		top: 850upx;
		width: 710upx;
		margin-left: 20upx;
		border-radius: 10upx;
		box-shadow: 1px 2px 18px 0px rgba(4, 0, 0, 0.12)
	}
	.servicebang{
		display: table-cell;
		text-align: center;
		justify-content: center;
	}
	.serviceimg{
		height: 40upx;
		width: 40upx;
	}
	.serviceone{
		display: table-cell;
		text-align: center;
		justify-content: center;
		font-size: 24upx;
		justify-content: space-between;
		margin-top: 25upx;
		width: 25%;
		position: relative;
	}
	/* .serviceone:nth-child(4){
		margin-right:0;
	} */
	/* .serviceone:nth-child(1){
		margin-left:30upx;
	} */
	/* .serviceone:nth-child(5){
		margin-left:20upx;
	} */
	/* .serviceone:last-child{
		margin-left:40upx;
	} */
	.servicelall{
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 20upx;
		padding: 0 20upx;
		box-sizing: border-box;
		padding-left: 0;
	}
	.servicelist{
		width: 710upx;
		background-color: #fff;
		margin-left: 20upx;
		position: absolute;
		top: 650upx;
		border-radius: 10upx;
		box-shadow: 1px 2px 18px 0px rgba(4, 0, 0, 0.12)
	}
	.servicelisttext{
		font-size: 28upx;
		color: #343434;
		margin-top: 20upx;
		margin-left: 20upx;
		font-weight: bold;
	}
	.servicetext{
		font-size: 24upx;
		color: #343434;
		margin-top: 10upx;
		position: relative;
	}
	button{
		border: none;
		background:none;
		padding: 0;
		margin: 0;
		font-size: 24upx;

	}
	button::after{
		border: none;
	}
	.kefu_button{
		width: 100%;
		height: 98upx; 
		padding-left: 0;
		padding-right: 0;
		background-color: transparent;
		line-height: 40upx;
		border: none!important;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 111;
	}
	
</style>
