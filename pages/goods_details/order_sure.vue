<template>
	<view>
		<hx-navbar :config="config" />

		<view class="x12 padding" style="padding-bottom: 0;">
			<view class="x-auto" style="margin-left: -15upx;">
				<view class="x-auto" style="padding-left: 15upx;" v-if="self_mention==1 && deliverys==1" v-for="(item,index) in menu" :key="index"  @click="qhMenu(item.id)">
					
					<image :src="item.img" class="float-left" style="width: 350upx; height: 80upx;" v-if="item.site==1"></image>
					<image :src="item.img2" class="float-left" style="width: 350upx; height: 80upx; margin-right: 4upx;"  v-else></image>
				</view>

				
			</view>
			<view class="x12 bg-white padding" >
				<view class="x12 padding" style="font-size: 12pt; color: #393D4A;" v-for="(sitem,sindex) in pay_info.address" :key="sindex">
					<view class="x-auto" style="width: 670upx;" v-if="addressNum>0">
						<view class="x12" v-if="xid==1">
							<!--  " -->
							<view class="x-auto" @click="goAddressXlist">
								<view style="font-size: 28upx;">{{sitem.xq_name}}{{sitem.mbh}}</view>
								<view>
									<view class="x-auto" style="font-size: 24upx;">{{sitem.name}}</view>
									<view class="x-auto padding-left" style="font-size: 24upx;">{{sitem.tel}}</view>
								</view>
							</view>
							<view class="x-auto float-right" style="padding-top: 7upx;">
								<!-- <image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" class="float-left" style="width: 16upx; height: 30upx;"></image> -->
							</view>
						</view>
						<view class="x12" v-else>
							<view>{{xshopInfo.store.stores_name}}</view>
							<view>
								{{sitem.address}}
							</view>
						</view>
					</view>
				</view>
					<view class="x12 padding" style="border-top:#F5F5F5 solid 6upx; font-size: 12pt; align-items: center;" >
						<!-- <view class="x-auto" style="padding-top: 8upx;">
							<image src="https://div.buy315.com.cn/xcx_imgs/sj.png" class="float-left" style="width: 28upx; height: 28upx;"></image>
						</view> -->
						<view class="x-auto" style="padding-left:10upx; font-size: 24upx; color: #999; margin-top: 10upx;"  v-if="xid==1">今日达</view>
						<view class="x-auto" style="padding-left:10upx;"  v-else>提货时间</view>
						<view class="x-auto float-right" style="padding-top: 6upx;">
							<view class="x-auto" style="color: #F65A2A; margin-top: -8upx; padding-right: 10upx;" v-if="xid==1">
								<view v-if="start_time!='' && end_time!=''">
									<!-- <view class="x-auto">{{date_name}}</view> -->
									<view class="x-auto">{{dates}}</view>
									<view class="x-auto padding-left">{{start_time}}-{{end_time}}</view>
								</view>
								<!-- <view v-else style="font-size: 24upx; margin-top: 10rpx;">大约11:14送达</view> -->
							</view>
							<view class="x-auto" style="color: #F65A2A; margin-top: -8upx; padding-right: 10upx;" v-else>
								<view v-if="start_time!='' && end_time!=''">
									<!-- <view class="x-auto">{{date_name}}</view> -->
									<view class="x-auto">{{dates}}</view>
									<view class="x-auto padding-left">{{start_time}}-{{end_time}}</view>
								</view>
								<view v-else>立即提货</view>
							</view>
						<!-- 	<view class="x-auto">
								<image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" class="float-left" style="width: 16upx; height: 30upx; margin-top: 8upx;"></image>
							</view> -->
						</view>
					</view>
			</view>
	<!-- 		<view class="x12 shouhuoxinxi bg-white" style="margin-top: 20upx;" v-if="xid!==1">
				<view>收货人：<text>成成</text></view>
				<view>联系方式：<text>18686445649</text></view>
			</view><strong></strong> -->
			<view class="x12 bg-white padding" style="border-radius:10upx; margin-top: 20upx;">
				<view class="shop_biaoti">
					<view class="shopxinxi">商品信息</view>
					<view class="yikeda" v-if="xid==1">一刻达</view>
				</view>
				<view class="x12 padding" style="font-size: 12pt; color: #393D4A;">
					<view class="x-auto" >
						<view style="display: flex; position: relative; margin-top: 10upx;" v-for="(gitem,gindex) in pay_info.goods" :key="gindex" >
							<view>
								<view><image :src="gitem.img" class="shop_imgtit" ></image></view>
							</view>
							<view class="shop_information" style="padding-left: 20upx;">
								<view>{{gitem.goods_title}}</view>
								<view class="shop_picter">￥{{gitem.price}}</view>
								
							</view> 
							<view style="position: absolute; left: 630upx; top: 84upx;" >x{{parseInt(gitem.num)}}</view>
						</view>
					</view>
								
					<view class="x12 bg-white" style="border-radius:10upx; margin-top: 50upx;" v-if="apps >= 0 && pay_info_order.s_id*1 <= 0" @click="goKyjList">
						<view class="x12" v-if="acom_id==0" style="font-size: 12pt; color: #393D4A;">
							<view class="x-auto" style="font-size: 24upx;">
								优惠劵
							</view>
							<view class="x-auto float-right" style="padding-top: 4upx;">
								<image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" class="float-left" style="width: 16upx; height: 30upx;"></image>
							</view>
						</view>
						<view class="x12 padding" v-else style="font-size: 12pt; color: #393D4A;">
							<view class="x-auto">
								优惠劵抵用金额{{coupon_money}}{{deployinfo.monetary_unit}}
							</view>
							<view class="x-auto float-right" style="padding-top: 4upx;">
								<image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" class="float-left" style="width: 16upx; height: 30upx;"></image>
							</view>
						</view>
					</view>
				<!-- 	<view class="x12" style="padding-top: 60upx;" v-if="xid==1">
						<view class="x-auto" style="font-size: 24upx;">
							运费
						</view>
						<view class="x-auto float-right" style="font-size: 24upx;">
							+{{deployinfo.monetary_symbol}}{{pay_info_order.freight}}
						</view>
					</view> -->
					<view class="x12 tips">
						<!-- 
						<view style="float: right;">共{{pay_info_order.nums}}件</view> -->
						<view class="xiaoji">小计：<text style="margin-right: 20upx;">￥{{pay_info_order.price}}</text><text style="text-indent: 10upx; color: #aaa;font-size: 24upx;"> 共 {{pay_info_order.nums}} 件</text></view>
					</view>
				</view>
			</view>
			<view class="x12 bg-white" style="margin-top: 20upx;">
				<view style="font-size: 24upx; margin-top: 20upx; margin-left: 20upx;">温馨提示</view>
								<view v-if="xid!==1" style="font-size: 24upx; color: #999; margin-left: 20upx; margin-top: 20upx; padding-right: 20upx; box-sizing: border-box;margin-bottom: 20upx;">请在扫码验证前检查好购买的商品是否有问题，若出现损坏、腐烂、缺少商品等相关问题及时与工作人员取得联系，若扫码验证完成后发现问题工作人员有权拒绝相关赔偿。</view>
				<view v-else style="font-size: 24upx; color: #999; margin-left: 20upx; margin-top: 20upx; padding-right: 20upx; box-sizing: border-box;margin-bottom: 20upx;">如遇缺货，我们将正常配送其他商品，缺货商品48小时内完成补货并配送，补货失败将为您直接办理退款。</view>
				
		</view>
			<view class="x12 bg-white padding" v-if="deployinfo.goods_to_pay==2 && acom_id==0" style="border-radius:10upx; margin-top: 20upx;" @click="goXzZfFs">
				<view class="x12 padding" style="font-size: 12pt; color: #393D4A;">
					<view class="x-auto">
						支付方式
					</view>
					<view class="x-auto float-right" style="padding-top: 6upx;">
						<image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" class="float-left" style="width: 18upx; height: 32upx;"></image>
					</view>
					<view class="x-auto float-right text-gray" style="padding-right: 10upx;" v-if="zffs_id==1">在线支付</view>
					<view class="x-auto float-right text-gray" style="padding-right: 10upx;" v-else>货到付款</view>
				</view>
			</view>
<!-- 			<view class="x12 bg-white padding" style="border-radius:10upx; margin-top: 20upx;" v-for="(pitem,pindex) in pay_info.points" :key="pindex">
				<view class="x12 padding" style="font-size: 12pt; color: #393D4A;">
					<view class="x-auto">
						使用{{pitem.point}}积分
					</view>
					<view class="x-auto padding-left" style="font-weight: 600;">
						抵{{deployinfo.monetary_symbol}}{{pitem.points_money}}
					</view>
					<view class="x-auto float-right" style="padding-top: 4upx;" @click="isNoXz">
						<image src="https://div.buy315.com.cn/xcx_imgs/xz.png" style="width: 36upx; height: 36upx;" v-if="isNo==true"></image>
						<image src="https://div.buy315.com.cn/xcx_imgs/wxz.png" style="width: 36upx; height: 36upx;" v-else></image>
					</view>
				</view>
			</view> -->

<!-- 			<view class="x12 bg-white padding" style="border-radius:10upx; margin-top: 20upx;" v-if="yyxx.length!=0">
				<view class="x12 padding" style="font-size: 10pt; color: red;">
					<view class="x12" v-for="(yhitem,yhindex) in yyxx" :key="yhindex">
						<view class="float-left">{{yhitem.discount_type}}优惠</view>
						<view class="float-right">{{deployinfo.monetary_symbol}}{{yhitem.discount_money}}</view>
					</view>
				</view>
			</view> -->
		</view>
		<view class="x12" style="height: 200upx;"></view>
		<view class="x12 shop-menu">
			<view class="x12 bg-white text-default text-333 border-top border-gray">
				<view class="x-auto float-left" style="padding: 30upx 30upx 0 20upx; font-size: 24upx;">
					<view class="text-bold">待支付:
						<text style="font-size: 30upx; color: #333;" v-for="(iitem,iindex) in pay_info.points" :key="iindex" v-if="isNo==true">{{deployinfo.monetary_symbol}}{{iitem.pay_money}}</text>
						<text style="font-size: 30upx; color: #333;"  v-if="isNo==false">{{deployinfo.monetary_symbol}}{{pay_info_order.pay_money}}</text>
					</view>
					<!-- <view class="text-gray">已优惠{{deployinfo.monetary_symbol}}{{pay_info_order.discount_money}}</view> -->
				</view>
				<view class="x-auto text-center text-white float-right" v-if="zf==1"  style="width: 250upx; font-size: 26upx; line-height: 115upx; background-color:#666;">
					去支付
				</view>
				<view class="x-auto float-right" v-else>
					<view class="x-auto text-center text-white float-right" v-if="psytype==1" @click="goPay"  style="width: 250upx; font-size: 26upx; line-height: 115upx; background-color:#FE0000;">
						去支付
					</view>
					<view class="x-auto text-center text-white float-right" v-else @click="dyxcx" style="width: 250upx; font-size: 26upx; line-height: 115upx; background-color:#FE0000;">
						去支付
					</view>
				</view>
			</view>
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
				config:{
					title: '确认订单',
					color: '#ffffff',
					backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
					statusBarFontColor:'#fff'
				},
			xShow:false,
			deployinfo:{},//配置信息货币单位，符号，以及其他的一些配置参数
			login:false,
			memberinfo:[],
			menu:[{
						id:1,
						site:2,
						img:'https://div.buy315.com.cn/xcx_imgs/jinrida.png',
						img2:'https://div.buy315.com.cn/xcx_imgs/jinrida_active.png',
					},
					{
						id:2,
						site:1,
						img:'https://div.buy315.com.cn/xcx_imgs/daodian.png',
						img2:'https://div.buy315.com.cn/xcx_imgs/daodian_active.png',
					}
				],
			order_code:'',
			address_list:[],
			addressNum:0,
			pay_info:[],
			pay_info_order:{},
			xid:1,
			xshopInfo:[],
			isNo:false,
			note:'',
			dates:'今天',
			date_name:'',
			date_today:'',
			end_time:'',
			start_time:'',
			now:'',
			date_id:0,
			date_ids:0,
			goods_l:[],
			goodslist:[],
			yyxx:[],
			psytype:1,
			wx_tpl:[],
			zf:2,
			acom_id:0,
			coupon_money:0,
			apps:-1,
			deliverys:1,//配送商城是否支持自提
			self_mention:1,//配送商城是否支持自提
			zffs_id:1,//支付方式ID 1在线支付，2货到付款
			}
		},
		onShow:function(){//返回时接收子页面的传参
				uni.showLoading({
					title: '加载中'
				});
				//#ifdef MP-WEIXIN
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				if(currPage.data.mydata!=undefined){
					this.address_list = currPage.data.mydata;
				}
				if(currPage.data.zfss!=undefined){//支付类型
					this.zffs_id = currPage.data.zfss.zffs_id;
				}
				if(currPage.data.psDate!=undefined){
					//console.log(currPage.data.psDate);
					this.dates = currPage.data.psDate.dates;
					this.date_today = currPage.data.psDate.date_name;					
					this.end_time = currPage.data.psDate.end_time;
					this.start_time = currPage.data.psDate.start_time;
					this.date_id = currPage.data.psDate.date_id;
					this.date_ids = currPage.data.psDate.date_ids;
					this.now = currPage.data.psDate.now;					
				}
				if(currPage.data.yhjdata!=undefined){
					this.acom_id = currPage.data.yhjdata.acom_id;
					this.coupon_money = currPage.data.yhjdata.coupon_money;
					//if(currPage.data.yhjdata.acom_id > 0){
						//this.getXdsj(1);
					//}
				}
				// #endif
				this.zf = 2;
				this.getAddress();
				//console.log(currPage.data.psDate);
		},
		onLoad:function(data){
			//console.log(data);
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const valuex = uni.getStorageSync('shoppingCarts');
				const values = uni.getStorageSync('xshopInfo');
				this.deployinfo = uni.getStorageSync('deployinfo');
				//console.log(this.deployinfo);
				if (value) {
					//console.log(this.deployinfo);
					this.memberinfo = value;
					this.login = true;
					//console.log(value);
				}
				if(valuex){
					this.goodslist = valuex;
				}
				if(values){
					this.xshopInfo = values;
				}
			} catch (e) {
				// error
			}
			this.setZt();
			this.setCj();
			for (let a in this.menu) {
				if (this.menu[a].id==1){
					this.menu[a].site = 2;
				}else{
					this.menu[a].site = 1;
				}
			}
			if(!this.login){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}
			//#ifdef MP-WEIXIN
				this.psytype = 2;
			//#endif
			this.isNo = false;
			//console.log(JSON.parse(data.goods_l));
			if(data.goods_l!=undefined){
				this.goods_l = JSON.parse(data.goods_l);
			}
			if(data.wx_tpl!=undefined){
				this.wx_tpl = JSON.parse(data.wx_tpl);
			}
			this.order_code = data.order_code;
			//this.getAddress();
		},
		methods: {
			//跳转到收货地址列表
			goAddressXlist(){
				//console.log(this.login);
				if(!this.login){
					uni.navigateTo({
						url:"/pages/login/login"
					})
					return;
				}
				uni.navigateTo({
					url:"../goods_details/address_list"
				})
			},
			//查询是否显示自提
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
									if(res.data.status=='y'){
										this.self_mention = res.data.data.self_mention;
										this.deliverys = res.data.data.deliverys;
										if(res.data.data.self_mention==1 && res.data.data.deliverys==2){
											this.qhMenu(2);
										}
									}									
								}
				});
			},
			//查询安装了的插件
			setCj(){
				var arr ={
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/apps/index',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data.data.apps);
						var apps = res.data.data.apps;
						var index = apps.indexOf('app_coupon_offset');
						this.apps = index;
					}
				});
			},
			goKyjList(){
				uni.navigateTo({
					url:"/pagesb/center/kyxjj_list?order_code="+this.order_code
				})
			},
			goXzZfFs(){//选择支付方式
				uni.navigateTo({
					url:"/pagesb/center/zffs_list"
				})
			},
			ps(){
				uni.navigateTo({
					url:"../goods_details/ps_date?dates="+this.dates+"&date_id="+this.date_id+"&date_ids="+this.date_ids
				})
				return;
			},
			//是否使用积分
			isNoXz(data){
				this.isNo = !this.isNo;
			},
			qhMenu(id){
				for (let a in this.menu) {
					if (this.menu[a].id==id){
						this.menu[a].site = 2;
					}else{
						this.menu[a].site = 1;
					}
				}
				this.getXdsj(id);
				this.xid=id;
				//console.log(123);return;
			},
			//获取下单数据
			getXdsj(data){
				//console.log(data);
				//console.log(this.address_list.address_id);
				//获取信息
				var arr ={
						order_code: this.order_code,
						member_openid: this.memberinfo.openid,
						address_id: this.address_list.address_id,
						modes: data,
						coupon_id: '',
						acom_id:this.acom_id,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/mall_order/settlements',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						console.log('已经进入了')
						console.log(res.data.status)
						if(res.data.status = 'n'){
							// uni.showToast({
							// 	title:'订单已取消',
							// 	icon:'none'
							// })
						}
						this.pay_info = res.data.data;
						this.pay_info_order = res.data.data.order[0];
						this.getYhxx(this.order_code);

					}
				});
			},
			//获取优惠信息
			getYhxx(order_code){
				//获取信息
				var arr ={
						order_code: order_code,
						type:2,
						stores_id:this.xshopInfo.store.stores_id,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/promotion/discount_info',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res);
						//res.data.data.length==0没有优惠信息
						this.yyxx = res.data.data;
						//console.log(res.data.data);return;
						this.xShow = true;
						uni.hideLoading();
					}
				});
			},
			//获取收货地址
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
						//console.log(res.data);
						var address = [];
						var addressNum = 0
						for (let i in res.data.data) {
							if (res.data.data[i].is_default==1){
								addressNum = addressNum+1;
								address = {
									is_default:res.data.data[i].is_default,
									tel:res.data.data[i].tel,
									name:res.data.data[i].name,
									address:res.data.data[i].address,
									xq_name:res.data.data[i].xq_name,
									address_id:res.data.data[i].address_id,
									mbh:res.data.data[i].mbh,
								}
							}
						}
						this.addressNum = addressNum;
						this.address_list = address;
						//console.log(this.address_list);
						this.getXdsj(1);
					}
				});
			},
			//#ifdef MP-WEIXIN
			//跳转到另外的小程序
				dyxcx(){//订阅小程序
					wx.requestSubscribeMessage({
						tmplIds: this.wx_tpl,
							success: res => {
								//console.log("success:"+JSON.stringify(res));
								//this.mpxinfo = JSON.stringify(res);
								//if(res.errMsg=='requestSubscribeMessage:ok'){
									//this.goPay();
								//}
							},
							fail: (res) => {
								//console.log("success:"+JSON.stringify(res));
							},
							complete: (res) => {
								//console.log("success:"+JSON.stringify(res));
								//this.mpxinfo = JSON.stringify(res);
								this.goPay();
							}
					})
				},
			//#endif
			goPay(){
				//console.log(this.pay_info);
				
				//获取信息
				var arr ={
						order_code: this.pay_info.order[0].order_code,
						start_time: this.start_time,
						end_time: this.end_time,
						date: this.dates,
						point: (this.isNo==true)?(this.pay_info.points[0].point):(''),
						points_money: (this.isNo==true)?(this.pay_info.points[0].points_money):(''),
						coupon_id: (this.pay_info.coupon.length>0)?(this.pay_info.coupon[0].coupon_id):(''),
						modes: this.xid,
						address_id: (this.pay_info.address.length>0)?(this.pay_info.address[0].address_id):(''),
						note:this.note,
						acom_id:this.acom_id,
						order_type:this.zffs_id,
					};
				var pdata = url.getSignStr(arr);
				//console.log(pdata);
				if(this.zffs_id==1){
					//在线支付
					uni.request({
						url:url.websiteUrl+'/api_v2/mall_order/place_order',
						method:'POST',
						dataType:'json',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:pdata,
						success: res => {
							//console.log(res.data);return;
							if(res.data.status=='y'){
								uni.showToast({
									title: '正在加载...',
									icon:'none',
									duration: 2000
								});
								this.zf = 1;
								setTimeout(function () {
									this.zf = 2;
								}, 3000);
								this.qkGwc(this.goods_l);//删除购物车对应的商品
								//console.log(res.data);
								this.getPay(res.data.data.pay_code);							
							}else{
								uni.showToast({
									icon: 'none',
									title: res.data.info
								});
								return;
							}								
						}
					});
				}else{
					//货到付款直接跳转到支付成功界面
					var xthis = this;
					uni.showModal({
						title: '提示',
						content: '确认购买',
						success: function (res) {
							if (res.confirm) {
								uni.request({
									url:url.websiteUrl+'/api_v2/mall_order/place_order',
									method:'POST',
									dataType:'json',
									header:{
										'content-type':'application/x-www-form-urlencoded'
									},
									data:pdata,
									success: res => {
										//console.log(res.data);return;
										if(res.data.status=='y'){
											xthis.qkGwc(xthis.goods_l);//删除购物车对应的商品
										}else{
											uni.showToast({
												icon: 'none',
												title: res.data.info
											});
											return;
										}								
									}
								});								
							} else if (res.cancel) {
								//console.log('用户点击取消');
							}
						}
					});
					
				}
				
			},
			//清空购物车
			qkGwc(data){
				//console.log(this.goodslist);
				//console.log(this.xshopInfo.store.stores_id);
				//清除当前店铺下架商品和库存为0的商品和购买了的商品
				var goodsl=[];
				var im = 0;
				for(let m in this.goodslist){//清除当前店铺下架商品和库存为0的商品
					if(this.goodslist[m].stores_id==this.xshopInfo.store.stores_id && this.goodslist[m].status==1 && (this.goodslist[m].sale_num>0 || this.goodslist[m].sale_num === '')){
						goodsl[im] = {
							barcode_id:this.goodslist[m].barcode_id,
							category_id:this.goodslist[m].category_id,
							goods_id:this.goodslist[m].goods_id,
							goods_title:this.goodslist[m].goods_title,
							img:this.goodslist[m].img,
							num:this.goodslist[m].num,
							original_price:this.goodslist[m].original_price,
							price:this.goodslist[m].price,
							promotion:this.goodslist[m].promotion,
							sale_num:this.goodslist[m].sale_num,
							site:this.goodslist[m].site,
							spec:this.goodslist[m].spec,
							status:this.goodslist[m].status,
							stores_id:this.goodslist[m].stores_id,
							unit:this.goodslist[m].unit,
						}
						im++;
					}
				}
				//console.log(goodsl);return;
				this.goodslist = goodsl;
				//console.log(goodsl);
				//return;
				//清除当前店铺选中商品
				//console.log(this.goodslist);
				//console.log(data);
				if(this.goodslist.length > 0){
					for(var x in this.goodslist){
						for(var i in data){
							if(this.goodslist[x].stores_id==data[i].stores_id && this.goodslist[x].barcode_id==data[i].barcode_id){
								this.goodslist.splice(x,1);
							}
						}
					}
				}
				this.xhc();
			},
			//写入缓存
			xhc(){
				//写入缓存
				uni.setStorage({
					key: 'shoppingCarts',
					data:this.goodslist,
					success: function () {
						
					}
				});
				if(this.zffs_id==2){//货到付款时执行
					uni.redirectTo({
						url:"pay_ts"
					})
				}
			},			
			getPay(pay_code){
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
				//this.programtype = programtype;
				//console.log(programtype);
				//获取信息
				var arr ={
						member_openid: this.memberinfo.openid,
						pay_code:pay_code,
						origin:programtype,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/mall_pay/index',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data);
						if(res.data.status=='y'){
							uni.navigateTo({
								url:"../goods_details/pay_sure?orderInfo="+JSON.stringify(res.data.data.pay_info)+"&pay_methods="+JSON.stringify(res.data.data.pay_methods)+"&if_pwd="+JSON.stringify(res.data.data.if_pwd)
							});
						}else{
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
							return;
						}
						
						//console.log(res.data);
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>
<style>
	page{
		background-color: #F6F6F6;
	}
	.xianshi{background-color: #fff; height: 300upx; position: absolute;left: 0px;top: 375px;transition: all .5s ease-in;}
	#volet {position: absolute; z-index: 100000; left: 0;bottom:-300upx;transition: all .5s ease-in; display: none;}
	#volet:target {left: 0;bottom:300upx; display: block;}
	.body-a{
		width: 96%; height: auto; padding:2%;
	}
	.imgwidth{width: 750upx; height:415upx;}
	.classification{
		background-color: #fff;
		width: 680upx;
		padding:30upx 20upx;
		height: auto;
		border-radius:10upx;
		float:left;
		margin-bottom:18upx;
	}
	.classification view{
		width: 170upx;
		height: auto;
		float:left;
		margin:10upx 0upx;
		text-align:center;
		font-size:28upx;
		color:#333;
	}
	.classification view image{
		width: 100upx;
		height: 100upx;
	}
	.tctj{
		background-color: #fff;
		width: 680upx;
		padding:30upx 20upx 0upx 20upx;
		height: auto;
		border-radius:10upx;
		float:left;
		margin-bottom:18upx;
	}
	.tctj-title{
		width: 100%;
		height: auto;
		float:left;
		padding-bottom:15upx;
		font-size:32upx;
		font-weight: 700;
	}
	.title_s{
		width: 20upx;
		height: 28upx;
		float:left;
		margin-top:10upx;
		border-left:#FFCC00 solid 3px;
	}
	.title_t{
		width: auto;
		height: auto;
		float:left;
	}
	.tctj-body{
		width: 100%;
		height: auto;
		float:left;
	}
	.tctj-body-5{
		width: 50%;
		height: auto;
		float:left;
		margin:20upx 0upx;
	}
	.tctj-body-left{
		width: 120upx;
		height: auto;
		float:left;
	}
	.tctj-body-left image{
		width: 120upx;
		height: 120upx;
		float:left;
	}
	.tctj-body-right{
		width: 530upx;
		height: auto;
		float:left;
		padding-left:20upx;
		line-height:1.2em;
	}
	.tctj-body-right-title{
		font-size:28upx;
		color:#333;
		height: 80upx;
	}
	.tctj-body-right-describe{
		font-size:28upx;
		color:#666;
	}
	.tctj-body-right-price{
		font-size:28upx;
		color:#E84C3E;
		font-weight: 700;
	}
	.bunner{
		width: 100%;
		height: auto;
		float:left;
	}
	.bunner image{
		width: 720upx;
		height: 180upx;
	}
	.shop-menu{
		position: fixed; z-index: 1000; bottom: 0upx;
	}
	.text001{
		height: 80rpx;
		width: 346rpx;
		line-height: 80rpx;
		text-align: center;
		background-color: #FFFFFF;
		font-size: 28rpx;
		/* color: #FE0000; */
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
	}
	.shop_biaoti{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28upx;
		color: #333333;
		padding-bottom: 20upx;
		border-bottom: 1upx solid #F7F7F7;
		box-sizing: border-box;
	}
	.shopxinxi{
		margin-left: 20upx;
	}
	.yikeda{
		font-size: 24upx;
		color: #666666;
		padding-right: 20upx;
	}
	.shop_imgtit{
		height: 150upx;
		width: 150upx;
		border-radius: 10upx;
	}
	.shop_information{
		height: 150upx;
		line-height: 70upx;
		font-size: 28upx;
		color: #333333;
	}
	.shop_picter{
		font-size: 30upx;
		color: #FE0000;
		font-weight: bold;
	}
	.shop_picter text{
		font-size: 24upx;
		color: #999;
		text-decoration: line-through;
	}
	.tips{
		font-size: 24upx;
		color: #999;
		/* margin-left: 406upx; */
		margin-top: 30upx;
		text-align: right;
	}
	.xiaoji{
		color: #333;
		float: right;
	}
	.xiaoji text{
		color: #FE0000;
		font-size: 30upx;
		
	}
	.shouhuoxinxi{
		width: 710upx;
		height: 110rpx;
		font-size: 24upx;
		color: #333;
		line-height: 50upx;
		padding-left: 20upx;
		box-sizing: border-box;
	}
	.shouhuoxinxi text{
		color: #999;
		margin-left: 10upx;
	}
</style>
