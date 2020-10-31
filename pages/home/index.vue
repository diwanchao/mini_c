<template>
	<view>
		<!-- 顶部 -->
		<hx-navbar ref="hxnb" :config="config" @clickBtn="address_list" />
		<view class="head_top2">
			<view><image class="head_img1" src="https://div.buy315.com.cn/xcx_imgs/icon_bg2.png" ></image></view>
			<!-- 定位和搜索 -->
			<view class="add_sea">
				<view class="search" @click="gotoseachshop">
					<view><image class="search_01" src="https://div.buy315.com.cn/xcx_imgs/search.png"></image></view>
					<view class="text1">每日菜场为您优选</view>
				</view>
				<view class="address" @click="gotovipdetails" v-if="login==true">
					<view><image class="add_img2" src="https://div.buy315.com.cn/xcx_imgs/erweima.png" ></image></view>
					<view>会员</view>
				</view>
			</view>
			<!-- 新人专享 -->
			<view>
			<view v-if="newcomer==true" >	
				<view class="new" @click="gotonewlist" >
					<view class="bgnew"><image class="new01" src="https://div.buy315.com.cn/xcx_imgs/newbg.png"></image></view>
					<view class="newlist">
						<view class="newone" v-for="(item,index) in newList" :key='item.index' >
							<view>
								<image class="img02" src="https://div.buy315.com.cn/xcx_imgs/zwtpo.jpg" v-if="item.imgs_original==''"></image>
								<image class="img02" :src="item.imgs_original" v-else ></image>
							</view>
							<view class="newprice">
								<view><text class="price1" style="background-color: #FF874B;">新人价</text></view>
								<view class="price2">￥{{item.new_people_price}}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 优惠券 -->
				<view class="coupon" >
					<view class="_notice" v-for="items in newCouponList">
						<view><image class="couponimg1" src="https://div.buy315.com.cn/xcx_imgs/bg4.png" mode=""></image></view>
						<view class="text3" >{{items.reduce}}</view>
						<view class="text4">满{{items.full}}可用</view>
						<view class="text5">全场通用</view>
					</view>
				</view>
				<view class="text2">更多优惠 > </view>
			</view>
		</view> 
		</view>
		<!-- 新人图标 -->
		<view v-if="newcomer==true">
			<view class="icons" v-if="iconsLen>0 ">
			  <view class="icon1" v-for="(ico_item,ico_index) in homeGoods.icons" :key="ico_index" @click="goZt(ico_item.type,ico_item.jump_id,ico_item.name)">
				<view class="iconbg"><image class="icon_img" :src="ico_item.img"></image></view>
				<view class="icon_name">{{ico_item.name}}</view>
			  </view>
			</view>
		</view>
		<!-- 轮播图 -->
		
		<view v-if="newcomer!=true">
		
		<view v-if="bannerLen>0" class="lunbotu new" >
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item  v-for="(item,index) in homeGoods.banner" :key="index">
					<image class="img3":src="item.img"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 二维码 -->
		<!-- <view><image class="erweima" src="https://div.buy315.com.cn/xcx_imgs/tiaoxingma.png"></image></view> -->
		<!-- <view class="text6">43534543657625</view> -->
		<!-- 新人图标 -->
		<view v-if="newcomer!=true">
		   <view class="icon" v-if="iconsLen>0">
			  <view class="icon1" v-for="(ico_item,ico_index) in homeGoods.icons" :key="ico_index" @click="goZt(ico_item.type,ico_item.jump_id,ico_item.name)">
				<view class="iconbg"><image class="icon_img" :src="ico_item.img"></image></view>
				<view class="icon_name">{{ico_item.name}}</view>
			  </view>
			</view>
		</view>
	</view>
		<!-- 爆品好物 -->
		<view>
			<view class="things" v-if="thingsList.length != 0">
				<view class="things_top" @click="gotoexplosive">
					<view class="things_top1">
						<view class="things_text1">爆品好货 总有您需要的</view>
						<view class="things_text2">></view>
					</view>
					<view class="things_top2" >
						<view class="things_img1" v-for="(item,index) in thingsList.slice(0,4)" >
							<image class="img5" src="../../static/zanwu.png" v-if="item.img == ''"></image>
							<image class="img5" v-if="item.imgs_original==''" src="../../static/zanwu.png"></image>
							<image class="img5" v-else :src="item.imgs_original"></image>
							<view class="things_text3">优惠价{{item.sdp_price}}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 提示消息 -->
			<!-- <view class="prompt">
				<view><image class="img4" src="https://div.buy315.com.cn/xcx_imgs/tongzhi.png" ></image></view>
				<text class="text7">您有一笔待付款订单未支付 请尽快支付</text>
			</view> -->
			<view class="thingstwo">
				<view class="things_foot">
					<view class="things_foot1" @click="gotolimited" :style="{display:miaosha}" >
						<view class="things_foot2">
							<view class="things_text4">购划算</view>
							<view class="things_imgs">
								<image class="things_img2"  src="https://div.buy315.com.cn/xcx_imgs/xianshi.png" ></image>
								<text class="things_text5">{{spikeList[0].end_time}}> </text>
							</view>
						</view>
						<view class="things_foot3" >
							<view class="things_foot4" v-for="(hitem,hindex) in spikeList" :key="hindex">
								<!-- <image class="img5" v-if="hitem.imgs_original==''" src="../../static/zanwu.png"></image> -->
								<image class="img5" :src="hitem.img1_original"></image>
								<view class="things_text6" >{{hitem.goods_title}}</view>
								<view class="things_foot5">
									<view class="things_text7">￥{{hitem.price}}</view>
									<view class="things_text8">￥{{hitem.retail_price}}</view>
								</view>
							</view>
						</view>	
					</view>
					<view class="things_foot1"  @click="gotomarket" :style="{display:wanjian}">
						<view class="things_foot2">
							<view class="things_text4">晚间菜场</view>
							<view class="things_imgs">
								<image class="things_img2" src="https://div.buy315.com.cn/xcx_imgs/wanjian.png" ></image>
								<text class="things_text5"> {{evenimglist.temp_start_time}}-{{evenimglist.temp_end_time}}> </text>
							</view>
						</view>
						<view class="things_foot3" >
							<view class="things_foot4" v-for="(item,index) in eveningList" :key='index'>
								<!-- <image class="img5" v-if="hitem.imgs_original==''" src="../../static/zanwu.png"></image> -->
								<image class="img5" :src="item.imgs_original"></image>
								<view class="things_text6" >{{item.goods_title}}</view>
								<view class="things_foot5">
									<view class="things_text7">￥{{item.activity_price}}</view>
									<!-- <view class="things_text8">￥25.00</view> -->
								</view>
							</view>
						</view>	
					</view>
				</view>
			</view>
		</view>
		<!-- 图 -->
		<view @click="gotocoupon" class="this_coupon"  v-if="buyList.current_number != undefined">
			<image class="conten_imgs" src="https://div.buy315.com.cn/xcx_imgs/bgimgs.png"></image>
			<view style="display: flex;" >
				<view><image class="conter_img2" src="https://div.buy315.com.cn/xcx_imgs/kele.jpg"></image></view>
				<view class="this_title">{{buyList.goods_title}}</view>
				<view class="this_fenshu">已累计拼成:{{buyList.current_number}}份</view>
			</view>
			<viwe>
				<view class="this_qiuqiu">
					<view class="schedule_quan" v-for="(items,index) in buyList.data" :key='index' >			
						<view class="schedule_down">{{items.unit_price}}元/份</view>
					</view>
				</view>
				<view class="hengsss">
					<view class="jindu" :style="{width:Math.floor(buyList.current_number/buyList.data[3].number*10000)/100.00 + '%'}"></view>
				</view>
				
				
			</viwe>
		</view>
		<!-- 导航 -->
		<view  class="selected">
			<scroll-view scroll-x="true" class="topScroll">
				<view class="categories"> 
					<view v-for="(item,index) in shopclass" class="catlistone" :key='index' @click="clickTab(item.category_id)" 
					 :class="{'active' : tabIndex==item.category_id}">
						 <view class="selected_text1">{{item.name}}</view>
					 </view>
				</view>
			</scroll-view>
		</view>
		<!-- 商品列表 -->
		<view class="tab_bar">
		<!-- v-for="(shop,id) in shopList" :key='shop.id' -->
			<scroll-view scroll-y="true" class="shopList">
				<view class="shop_list">
					<view class="shop" v-for="(item,id) in shopList" :key='item' >
						<view><image class="shop_listimg" :src="item.img"  @click="gotodetails(item)"></image></view>
						<view class="shoptext">
							<view class="shop_text1">{{item.goods_title}}<text>{{item.jinshu}}</text></view>
							<view class="shop_text2">会员价：￥{{item.price}}</view>
							<view class="shop_text3">￥{{item.price}}<text>￥{{item.original_price}}</text></view>
						</view>
						<view>
							<image class="shop_moreimg" src="https://div.buy315.com.cn/xcx_imgs/jia.png" @click="jrShoppingCart(1,item,item.group_id,'dh'+item.group_id+'-'+item.barcode_id)"></image>
							</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// Vue.component('sundeheng-custom',sundehengCustom)
		import url from '../../main.js';
		import sundehengCustom from '@/components/sundeheng-custom/sundeheng-custom.vue'
		import uniPopup from '@/components/uni-popup/uni-popup.vue';
		import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
	
	
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
			components: {
				uniPopup,
				uniNoticeBar,
				sundehengCustom
			},
			data() {
				return {
					xShow: false,
					textData: {
						name: '',
						desc: '',
					},
					markers: '',
					index:1,
					login: false,
					memberinfo:{
						mobile:'',
					},
					shopclass:[],
					deployinfo: {
						monetary_symbol: '￥',
					}, //配置信息货币单位，符号，以及其他的一些配置参数
					indicatorDots: true,
					autoplay: true,
					interval: 8000,
					duration: 1000,
					//refreshing: false,
					login: false,
					memberinfo: [],
					shoppingCarts: [],
					xshopInfo: [],
					indexInfo: [],
					shoppingCartNumP: 0,
					oneMenu:[],
					stores_name: '',
					homeGoods: [],
					address: true,
					animationData: {},
					amintiond_list: [],
					wheight: 500,
					jdxx: [],
					maddress: '',
					bannerLen: 0,
					iconsLen: 0,
					lng: '',
					lat: '',
					tjr_member_openid: '',
					tjr_xshopInfo: [],
					tjr_stores_id: 0,
					hhhj: '',
					goodsTitle:'',
	
					tg_str: '', //通告
					announce_seat: 1,
					//弹窗
					content: '',
					type: '',
					inverted: false,
					scrollTop: 0,
					old: {
						scrollTop: 0
					},
					spec_id: 0,
					spec: '',
					goodsinfo: [],
					goodsinfos: [],
					buyList:'',
					choice: [],
					choice_tag: [],
					choice_unit: [],
					simulatedDATA: { //模拟后台返回的数据 多规格
						"difference": [],
						"specifications": []
					},
					selectArr: [], //存放被选中的值
					shopItemInfo: {}, //存放要和选中的值进行匹配的数据
					subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
					xpopup: 1, //是否显示规格
					xSt_key: 2,
					tzStatus: 2,
					tcStatus: 1, //弹窗状态
					tcGgList: [], //弹窗广告列表
					orderStatus: 1, //最新订单是否显示//默认不显示
					order_info: [], //最新订单
					config:{
						title:'首页',
						color: '#ffffff',
						backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
						statusBarFontColor:'#fff',
						fontSize:'16px',
						back:false,
						leftButton:[{
								key: 'btn1',
								icon: '&#xe651;',
								position: 'left',
								txt:'',
								fontSize:'14px'
							}],
					},
					tabIndex:1,
					height:'',
					limit:30,
					newList:[],
					newCouponList:[],   // 优惠券
					iconList:[{
						id:0,
						img:'https://div.buy315.com.cn/xcx_imgs/xihongshi.png',
						title:'蔬菜'
					},
					{
						id:1,
						img:'https://div.buy315.com.cn/xcx_imgs/xihongshi.png',
						title:'水果'
					},
					{
						id:2,
						img:'https://div.buy315.com.cn/xcx_imgs/xihongshi.png',
						title:'肉禽'
					},
					{
						id:3,
						img:'https://div.buy315.com.cn/xcx_imgs/xihongshi.png',
						title:'水产'
					},
					{
						id:4,
						img:'https://div.buy315.com.cn/xcx_imgs/xihongshi.png',
						title:'蛋类'
					},
					{
						id:5,
						img:'https://div.buy315.com.cn/xcx_imgs/xihongshi.png',
						title:'米面粮油'
					},
					{
						id:6,
						img:'https://div.buy315.com.cn/xcx_imgs/xihongshi.png',
						title:'休闲酒饮'
					},
					{
						id:7,
						img:'https://div.buy315.com.cn/xcx_imgs/xihongshi.png',
						title:'调料干货'
					},
					{
						id:8,
						img:'https://div.buy315.com.cn/xcx_imgs/xihongshi.png',
						title:'厨房用品'
					},
					{
						id:9,
						img:'https://div.buy315.com.cn/xcx_imgs/xihongshi.png',
						title:'品牌专场'
					}],  
					thingsList:[],   //爆品
					effectiveList:[{
						id:0,
						title:'西瓜',
						img:'https://div.buy315.com.cn/xcx_imgs/kele.jpg',
						price:'￥25.00',
						prices:'30.00'
					},
					{
						id:0,
						title:'黄瓜',
						img:'https://div.buy315.com.cn/xcx_imgs/kele.jpg',
						price:'￥25.00',
						prices:'30.00'
					}],
					eveningList:[],
					listScrollShop:[],
					shopList:[],
					spikeList:[],    // 限时秒杀
					wanjian:'block',
					miaosha:'block',
					newcomer:true,
					evenimglist:'',
				}
			},
			onTabItemTap:function(){
				//console.log('点击了tab触发');
				try {//从本地缓存中同步获取指定 key 对应的内容。
					const value = uni.getStorageSync('memberinfo');
					const valuex = uni.getStorageSync('shoppingCarts');
					const values = uni.getStorageSync('xshopInfo');
					var sfQhStores = uni.getStorageSync('sfQhStores');
					if(sfQhStores==2){
						if (value) {
							this.memberinfo = value;
							this.login = true;
						}
						if(valuex){
							this.shoppingCarts = valuex;
						}
						if(values){
							this.xshopInfo = values;
						}
						uni.setStorageSync('sfQhStores', 1);//用来判断换了店铺是否重新加载数据，默认1，不加载，2时重新加载。对应会用到分类页判断是否重新加载数据-
						this.sumShoppingCartNum();
					}
					
				} catch (e) {
					// error
				}
			},
			onPullDownRefresh() {
				try { //从本地缓存中同步获取指定 key 对应的内容。
					const value = uni.getStorageSync('memberinfo');
					const valuex = uni.getStorageSync('shoppingCarts');
					const values = uni.getStorageSync('xshopInfo');
					if (values) {
						this.xshopInfo = values;
					}
					if (value) {
						this.memberinfo = value;
						this.login = true;
					}
					if (valuex) {
						this.shoppingCarts = valuex;
					}
				} catch (e) {
					// error
				}
				this.getHome();
				this.getexlosIve();
				uni.stopPullDownRefresh();
				// this.getEvening();
				this.getnewList();
				this.getnewCoupon();
				this.clickTab(0);
				this.getbuyList();
				console.log('@@@@@@@@@@@@@@@@@@')
				this.getTimespike();
				// setTimeout(function(){
				// 	this.pd_mshewanjian();
				// },1000)
				this.getClass();
			},
			onReady: function(e) {
				var xthis = this;
				uni.getNetworkType({
					success: function(res) {
						if (res.networkType !== 'none') {
							xthis.getBanben();
						}
					}
				});
				if (xthis.xSt_key == 1) {
					var dsqId = setInterval(function() {
						uni.getNetworkType({
							success: function(res) {
								if (res.networkType !== 'none') {
									xthis.getShop();
									clearInterval(dsqId);
								}
							}
						});
					}, 1000)
				} else {
					xthis.getShop();
				}
			},
			onShow: function(e) {
			
				this.wanjian ='block',
				this.miaosha ='block'
				//#ifdef MP-WEIXIN
				wx.login({
				  success: res =>{
					  //console.log(res.code);
					  this.xcode = res.code;
					}
				})
				//#endif
				var xthis = this;
				if (xthis.xSt_key == 1) {
					var dsqId = setInterval(function() {
						uni.getNetworkType({
							success: function(res) {
								if (res.networkType !== 'none') {
									xthis.xshow(xthis);
									clearInterval(dsqId);
								}
							}
						});
					}, 1000)
				} else {
					xthis.xshow(xthis);
				}
			},
			onLoad(data) {

					this.getnewList();
			
				this.clickTab(0);
				
				this.getnewShopList();
				this.getnewCoupon();
				this.getexlosIve();
				this.getClass();
				// this.getEvening();
				this.getbuyList();
				this.getTimespike();
				// setTimeout(function(){
				// 	this.pd_mshewanjian();
				// },1000)
				console.log('s*****************rd')
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						console.log('s*****************rd')
					}
				});
				console.log('******************', '查询页面')
				///wx.login({success: res => {console.log(res.code);},});
				uni.showLoading({
					title: '加载中'
				});
				var xthis = this;
				try { //从本地缓存中同步获取指定 key 对应的内容.
					var xSt = uni.getStorageSync('startup');
					if (xSt) {
						xthis.xSt_key = xSt.key;
					}
					if (xthis.xSt_key == 1) {
						var dsqId = setInterval(function() {
							uni.getNetworkType({
								success: function(res) {
									if (res.networkType !== 'none') {
										xthis.xlode(xthis, data);
										uni.setStorage({
											key: 'startup',
											data: [],
											success: function() {}
										});
										clearInterval(dsqId);
									}
								}
							});
						}, 1000)
					} else {
						xthis.xlode(xthis, data);
					}
				} catch (e) {
					// error
				}
			},
			created() {
				this.newcomer==true,
				console.log(this.newcomer)
				this.initializeData();
				this.checkItem(-1);
				this.clickTab(0);
			},
			methods: {
				gotodetails(item){
					if (this.memberinfo.length == 0) {
						uni.navigateTo({
							url: "/pages/login/login"
						})
						return;
					}
					
					uni.navigateTo({
					     url:"../goods_details/goods_details?barcode_id=" + item.barcode_id
					 })
				},
				// 拼团
				gotocoupon(){
					if (this.memberinfo.length == 0) {
						uni.navigateTo({
							url: "/pages/login/login"
						})
						return;
					}
					uni.navigateTo({
						url:'/pages/home/group'
					})
				},
				// 爆品
				gotoexplosive(){
					if (this.memberinfo.length == 0) {
						uni.navigateTo({
							url: "/pages/login/login"
						})
						return;
					}
					uni.navigateTo({
						url:'/pages/home/explosive'
					})
				},
				// 搜索
				gotoseachshop(){
					if (this.memberinfo.length == 0) {
						uni.navigateTo({
							url: "/pages/login/login"
						})
						return;
					}
					uni.navigateTo({
						url:'/pages/serch/index'
					})
				},
				// 晚间
				gotomarket(){
					if (this.memberinfo.length == 0) {
						uni.navigateTo({
							url: "/pages/login/login"
						})
						return;
					}
					uni.navigateTo({
						url:'/pages/home/market'
					})
				},
				// 新人专享
				gotonewlist(){
					if (this.memberinfo.length == 0) {
						uni.navigateTo({
							url: "/pages/login/login"
						})
						return;
					}
					uni.navigateTo({
						url:"/pages/home/newlist" 
					})
				},
				//限时抢购
				gotolimited(){
					if (this.memberinfo.length == 0) {
						uni.navigateTo({
							url: "/pages/login/login"
						})
						return;
					}
					uni.navigateTo({
						url:"/pages/home/limited" 
					})
				},
				// 地址
				address_list() {
					if (this.memberinfo.length == 0) {
						uni.navigateTo({
							url: "/pages/login/login"
						})
						return;
					}
					uni.navigateTo({
						url: "/pagesb/center/xxmd"
					})
				},
				// 会员详情
				gotovipdetails(){
					if (this.memberinfo.length == 0) {
						uni.navigateTo({
							url: "/pages/login/login"
						})
						return;
					}
					uni.navigateTo({
						url: "../center/vipsdetail"
					})
				},

				// 新人专享商品
				getnewShopList(){
						var arr = {};
						var pdata = url.getSignStr(arr);
						uni.request({
							url: url.websiteUrl + '/api_v2/stores/getnewpeoplegoodslist',
							method: 'POST',
							dataType: 'json',
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							data: pdata,
							success: res => {
								console.log(res.data,'新人商品')
								this.newList = res.data.data
							},
							fail: () => {},
							complete: () => {}
						});
				},
				// 新人优惠券
				getnewCoupon(){
					try { //从本地缓存中同步获取指定 key 对应的内容。
						const value = uni.getStorageSync('memberinfo');
						const valuex = uni.getStorageSync('shoppingCarts');
						const values = uni.getStorageSync('xshopInfo');
						//console.log(value);
						if (values) {
							this.xshopInfo = values;
							this.stores_name = values.store.stores_name;
						}
						if (value) {
							this.memberinfo = value;
							this.login = true;
						}
						if (valuex) {
							this.shoppingCarts = valuex;
						}
					} catch (e) {
						// error
					}
						var arr = {
							member_openid: this.memberinfo.openid,
						};
						var pdata = url.getSignStr(arr);
						uni.request({
							url: url.websiteUrl + '/api_v2/stores/getnewmembercouponlist',
							method: 'POST',
							dataType: 'json',
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							data: pdata,
							success: res => {
								console.log(res.data,'新人优惠券')
								this.newCouponList = res.data.data
							},
							fail: () => {},
							complete: () => {}
						});
				},
				// 首页爆品
			getexlosIve(){
				try {//从本地缓存中同步获取指定 key 对应的内容。
					const value = uni.getStorageSync('memberinfo');
					const valuex = uni.getStorageSync('shoppingCarts');
					const values = uni.getStorageSync('xshopInfo');
					//console.log(value);
					if(values){
						this.xshopInfo = values;
						this.stores_name = values.store.stores_name;
					}
					if (value) {
						this.memberinfo = value;
						this.login = true;
					}
					if(valuex){
						this.shoppingCarts = valuex;
					}
				}catch (e) {
								// error
				}
				var arr ={
					stores_id:this.xshopInfo.store.stores_id,
					member_openid: this.memberinfo.openid,
				};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/stores/gethotmoneygoodslist',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						console.log(res.data,'首页爆品')
						this.thingsListlen = res.data.data.length;
						console.log(this.thingsListlen)
						this.thingsList = res.data.data;
				
					}
				})
			},
			// 限时秒杀
			getTimespike(){
				var that = this
				console.log('dhweurerhweihreiowh')
				try {//从本地缓存中同步获取指定 key 对应的内容。
					const value = uni.getStorageSync('memberinfo');
					const valuex = uni.getStorageSync('shoppingCarts');
					const values = uni.getStorageSync('xshopInfo');
					//console.log(value);
					if(values){
						this.xshopInfo = values;
						this.stores_name = values.store.stores_name;
					}
					if (value) {
						this.memberinfo = value;
						this.login = true;
					}
					if(valuex){
						this.shoppingCarts = valuex;
					}
				}catch (e) {
								// error
				}
				var arr ={
					stores_id:this.xshopInfo.store.stores_id,
					member_openid: this.memberinfo.openid,
				};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/app_seckill/aapi_seckill/get_goods_list',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						console.log(res.data,'限时秒杀')
						this.spikeList = res.data.data;
						// setTimeout(function(){
						// 	that.pd_mshewanjian();
						// },1000)
					uni.request({
						url:url.websiteUrl+'/api_v2/stores/geteveningmarketgoodslist',
						method:'POST',
						dataType:'json',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:pdata,
						success: res => {
							console.log(res.data,'晚间菜场')
							this.evenimglist = res.data.data
							
							
							
							if(res.data.data.length != 0){
								this.eveningList = res.data.data.data;
							}
						setTimeout(function(){
							that.pd_mshewanjian();
						},100)
						},
						
						})
					},
					
				})
			},
			pd_mshewanjian(){
				console.log(this.eveningList,'开始执行晚间菜场this.eveningList')
				console.log(this.spikeList,'开始执行限时秒杀this.spikeList')
				if(this.eveningList.length==0){
					console.log('晚间菜场this.eveningList为空')
					this.wanjian = 'none'
				}else if(this.spikeList.length==0){
					console.log('限时秒杀this.spikeList为空')
					this.miaosha ='none'
				}
				if(this.eveningList.length > 0 && this.spikeList.length > 0){
					this.eveningList = this.eveningList.slice(0,2);
					var spikelenght = this.spikeList
					this.spikeList = spikelenght.slice(0,2);
					// this.spikeList = this.miaosha
					console.log(this.eveningList,'晚间菜场截断成功')
					console.log(this.spikeList,'限时秒杀截断成功')
				}
				if(this.eveningList.length==0 && this.spikeList.length>4){
					console.log(this.spikeList,'限时秒杀4个成功')
					this.spikeList = this.spikeList.slice(0,4);
				}else if(this.eveningList.length>4 && this.spikeList.length==0){
					console.log(this.eveningList,'晚间菜场4个成功')
					this.eveningList = this.eveningList .slice(0,4);
				}
				if(this.eveningList.length==0 && this.spikeList.length==0){
					this.wanjian = 'none'
					this.miaosha ='none'
				}
			},
			// 晚间菜场
			getEvening(){
				try {//从本地缓存中同步获取指定 key 对应的内容。
					const value = uni.getStorageSync('memberinfo');
					const valuex = uni.getStorageSync('shoppingCarts');
					const values = uni.getStorageSync('xshopInfo');
					//console.log(value);
					if(values){
						this.xshopInfo = values;
						this.stores_name = values.store.stores_name;
					}
					if (value) {
						this.memberinfo = value;
						this.login = true;
					}
					if(valuex){
						this.shoppingCarts = valuex;
					}
				}catch (e) {
								// error
				}
				var arr ={
					stores_id:this.xshopInfo.store.stores_id,
					member_openid: this.memberinfo.openid,
				};
				var pdata = url.getSignStr(arr);

			},
				// 新人判断
				getnewList(){
					if(uni.getStorageSync('memberinfo')){
						var arr = {
							mobile:this.memberinfo.mobile,
						};
						var pdata = url.getSignStr(arr);
						uni.request({
							url: url.websiteUrl + '/api_v2/member/check_member_is_new_people',
							method: 'POST',
							dataType: 'json',
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							data: pdata,
							success: res => {
								console.log(res.data,'还是不是一个新人')
								this.newcomer = res.data.data
							},
							fail: () => {},
							complete: () => {}
						});
					}
				},
				// 拼团
				getbuyList(){
					var arr = {
						is_one:1,
					};
					var pdata = url.getSignStr(arr);
					uni.request({
						url: url.websiteUrl + '/api_v2/stores/getgroupbuyinggoodslist',
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: pdata,
						success: res => {
							console.log(res.data.data,'拼团成功')
							this.buyList = res.data.data
							
							// this.newcomer = res.data.data
						},
						fail: () => {},
						complete: () => {}
					});
				},
				clickTab(index){
					this.tabIndex = index
					console.log('data',index)
					uni.showLoading({
					    title: '正在加载中'
					});
					this.newcomer=true
					this.shopList = [];
					this.page = 0;
					this.limit = 10;
					// this.shopclass = [];
					this.towMenu = [];
					this.getGoods(index);
					// this.getClass(index,'!!!!!!!!');
				},
				// 获取分类
				getClass(index){
					console.log(index,'看看这个data有没有');
					this.isClass = false;
					//获取信息
					var arr ={
							stores_id:this.xshopInfo.store.stores_id,
						};
					var pdata = url.getSignStr(arr);
					uni.request({
						url:url.websiteUrl+'/api_v2/mall_shop_v2/categorys',
						method:'POST',
						dataType:'json',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:pdata,
						success: res => {
							//console.log(res.data.data);
							if(res.data.data.length>0){
								if(index){
									//console.log(1);
									for(let i in res.data.data){
										if(res.data.data[i].category_id==index){
											//console.log(res.data.data[i].category_id);
											//console.log(res.data.data[i].childs);
											//获取一级
											this.shopclass = res.data.data;
											this.categoryId = res.data.data[i].category_id;
											this.towMenu = res.data.data[i].childs;
											this.categoryId = res.data.data[i].category_id;
											this.tCategoryId = index;
											//获取商品信息									
											this.getGoods(index);
										}
									}
								}else{
									//console.log(res.data.data[0].category_id);
									//获取一级
									this.shopclass = res.data.data;
									this.categoryId = res.data.data[0].category_id;
									//获取二级
									this.towMenu = res.data.data[0].childs;
									this.tCategoryId = res.data.data[0].category_id;
									//获取商品信息
									this.getGoods(res.data.data[0].category_id);
									//console.log(res.data.data[0].childs[0].category_id);
								}
							}else{
								this.shopList = [];
							}
						
						},
						fail: () => {},
						complete: () => {}
					});
					// }
				},
				getGoods(index,action = 'add'){
					this.sData = index;
					//console.log(this.memberinfo.openid);
					//获取信息
					var arr ={
							stores_id:this.xshopInfo.store.stores_id,
							category_id:index,
							content:'',
							member_openid:this.memberinfo.openid,
							limit:this.limit,
							offset:this.page*this.limit,
						};
					var pdata = url.getSignStr(arr);
					uni.request({
						url:url.websiteUrl+'/api_v2/mall_shop_v2/goods_query',
						method:'POST',
						dataType:'json',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:pdata,
						success: res => {
							console.log(res.data,'这里图片哪里去了 啊啊啊啊啊啊')
							this.xShow = true;
							uni.hideLoading();
							//console.log(res.data);
							this.tCategoryId = index;
							var max_page = res.data.total/this.limit;
							if(max_page<=this.page){
								uni.showToast({
								    icon: 'none',
								    title: '已到底'
								});
								return;
							}
							if(res.data.status=='y'){
								var datax = res.data.data.goods;
							}else{
								var datax = [];
								uni.showToast({
								    icon: 'none',
								    title: '已到底'
								});
							}
							if (action === 'refresh') {
								this.shopList = [];
							}						
							datax.forEach(item => {							
								this.shopList.push(item);
							});
							this.page = this.page+1;
						},
						fail: () => {},
						complete: () => {}
					});
				},
				goOrderDinfo(data) {
					uni.navigateTo({
						url: "/pagesb/center/order_details?order_id=" + data.order_id + "&order_code=" + data.order_code
					})
				},
				//关闭弹窗
				gbTc() {
					this.tcStatus = 1;
					uni.showTabBar();
				},
				SJwat() { //APP小版本升级
					uni.showLoading({
						title: '正在安装,请稍后...'
					});
					uni.downloadFile({
						url: url.websiteUrl + '/download/zxsc/sc.wgt',
						success: (downloadResult) => {
							//console.log(downloadResult);
							if (downloadResult.statusCode === 200) {
								plus.runtime.install(downloadResult.tempFilePath, {
									force: false
								}, function() {
									//console.log('install success...');
									uni.hideLoading();
									plus.runtime.restart();
								}, function(e) {
									//console.error('install fail...');
									uni.hideLoading();
									uni.showToast({
										title: '安装失败',
										icon: 'none'
									});
								});
							}
						}
					});
				},
				//检查服务器上app的版本，然后跳转到对应的地方进行升级
				getBanben() {
					// #ifdef APP-PLUS
					//获取默认门店是否存在
					var arr = {};
					var pdata = url.getSignStr(arr);
					uni.request({
						url: url.websiteUrl + '/api_v2/base/client_editions',
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: pdata,
						success: res => {
							if (res.data.status == 'y') {
								if (uni.getSystemInfoSync().platform === 'android') {
									//console.log(plus.runtime.versionCode);
									//如果是安卓
									if (plus.runtime.version != res.data.data.mall_android) {
										var url = res.data.data.mall_android_url; // 跳转到安卓下载地址--						
										uni.showModal({
											title: '提示',
											content: '有新的版本需要更新',
											success: res => {
												if (res.confirm) {
													plus.runtime.openURL(url);
												} else if (res.cancel) {
													//console.log('用户点击取消');
												}
											}
										});
									}
								}
								if (uni.getSystemInfoSync().platform === 'ios') {
									//如果是ios
									if (plus.runtime.version != res.data.data.mall_ios) {
										var url = res.data.data.mall_ios_url; // 跳转到苹果商店
										uni.showModal({
											title: '提示',
											content: '有新的版本需要更新',
											success: res => {
												if (res.confirm) {
													plus.runtime.openURL(url);
												} else if (res.cancel) {
													//console.log('用户点击取消');
												}
											}
										});
									}
								}
							}
						},
						fail: () => {},
						complete: () => {}
					});
					//#endif
				},
				xshow(xthis) {
					try { //从本地缓存中同步获取指定 key 对应的内容。
						const value = uni.getStorageSync('memberinfo');
						const values = uni.getStorageSync('xshopInfo');
						const valuex = uni.getStorageSync('shoppingCarts');
						const de = uni.getStorageSync('deployinfo');
						if (de) {
							xthis.deployinfo = de;
							//console.log(JSON.stringify(de));
						}
						//console.log(values.store.stores_id);
						if (value) {
							xthis.memberinfo = value;
							xthis.login = true;
						}
						if (valuex) {
							xthis.shoppingCarts = valuex;
						}
						if (values) {
							xthis.xshopInfo = values;
							if (values.address.address == undefined) {
								xthis.maddress = values.current;
							} else {
								xthis.maddress = values.address.xq_name + values.address.mbh;
							}
							
							xthis.stores_name = values.store.stores_name;

							xthis.$refs.hxnb.conf.leftButton[0].txt = values.store.stores_name;
							console.log(xthis.$refs.hxnb.conf.leftButton[0].txt,'取回来菜场的名字');
							uni.setNavigationBarTitle({
								title: values.store.stores_name
							});
						}
						//获取默认门店是否存在
						var arr = {
							//stores_id:values.store.stores_id,
							xtype: 2,
						};
						var pdata = url.getSignStr(arr);
						uni.request({
							url: url.websiteUrl + '/api_v2/stores/index',
							method: 'POST',
							dataType: 'json',
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							data: pdata,
							success: res => {
								//console.log(res);
								if (res.data.total == 0) {
									xthis.getShop();
								} else {
									xthis.getHome();
									xthis.clickTab(0);
									xthis.getnewList();
									xthis.getnewShopList();
									xthis.getbuyList();
									xthis.getnewCoupon();
									// xthis.getEvening();
									xthis.getTimespike();
									// setTimeout(function(){
									// 	xthis.pd_mshewanjian();
									// },1000)
									xthis.getexlosIve();
									xthis.getClass();
								}
								//console.log(res.data);						
								if (xthis.memberinfo.length != 0) {
									xthis.getMer(); //检查会员是否存在
								}
								xthis.getOrderInfo();
								//xthis.getHome();
							},
							fail: () => {},
							complete: () => {}
						});
					} catch (e) {
						// error
					}
				},
				xlode(xthis, data) { //lode
					// #ifdef APP-PLUS
					//查询配置信息货币的单位，符号，以及其他配置信息//并且写入缓存
					var apparr = {};
					var apppdata = url.getSignStr(apparr);
					uni.request({
						url: url.websiteUrl + '/api_v2/mall_base/base_set',
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: apppdata,
						success: appres => {
							if (appres.data.status == 'y') {
								//console.log(appres);
								//写入缓存
								uni.setStorage({
									key: 'deployinfo',
									data: appres.data.data,
									success: function() {}
								});
							}
						}
					});
					//读取安装的插件
					uni.request({
						url: url.websiteUrl + '/api_v2/apps/index',
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: apppdata,
						success: appsres => {
							//console.log(appsres);return;
							if (appsres.data.status == 'y') {
								//写入缓存
								uni.setStorage({
									key: 'appsinfo',
									data: appsres.data.data.apps,
									success: function() {}
								});
							}
						}
					});
					//#endif
					if (data.scene != undefined) {
						var xscene = decodeURIComponent(data.scene);
						var xx = xscene.split('&');
						if (xx[0] != undefined) {
							var x_mid = xx[0].split('=');
							var x_mid_s = x_mid[1];
						}
						if (xx[1] != undefined) {
							var x_stores_id = xx[1].split('=');
							var x_stores_id_s = x_stores_id[1];
						}
					}
					if (data.member_openid != undefined) {
						xthis.tjr_member_openid = data.member_openid;
						//console.log(1);
						//将推荐人id写入缓存
						uni.setStorage({
							key: 'tjr_member_openid',
							data: data.member_openid,
							success: function() {}
						});
					}
					if (data.mid != undefined || data.scene != undefined) {
						var mid = 0;
						if (data.mid != undefined) {
							mid = data.mid;
						}
						if (data.scene != undefined) {
							mid = x_mid_s;
						}
						//将会员id转换成member_openid
						var arr = {
							member_openid: mid,
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
								if (res.data.status == 'y') {
									var member_openid = res.data.data.member_openid;
								} else {
									var member_openid = '';
								}
								xthis.tjr_member_openid = member_openid;
								//将推荐人id写入缓存
								uni.setStorage({
									key: 'tjr_member_openid',
									data: member_openid,
									success: function() {}
								});
							}
						});
	
					}
					if (data.stores_id != undefined || (data.scene != undefined && xx[1] != undefined)) {
						var stores_id = 0;
						if (data.stores_id != undefined) {
							stores_id = data.stores_id;
						}
						if (data.scene != undefined && xx[1] != undefined) {
							stores_id = x_stores_id_s;
						}
						xthis.tjr_stores_id = stores_id;
						//获取上级推荐人的店铺信息
						xthis.getTjrShop(stores_id);
					}
				},
				//查询配置信息//并且写入缓存
				getGg() {
					//获取公告信息
					var xarr = {};
					var xpdata = url.getSignStr(xarr);
					uni.request({
						url: url.websiteUrl + '/api_v2/mall_base/base_set',
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: xpdata,
						success: xres => {
							if (xres.data.status == 'y') {
								//console.log(xres.data.data);
								this.announce_seat = xres.data.data.announce_seat;
								//获取公告信息
								var arr = {
									stores_id: this.xshopInfo.store.stores_id,
								};
								var pdata = url.getSignStr(arr);
								uni.request({
									url: url.websiteUrl + '/api_v2/mall_base/announce',
									method: 'POST',
									dataType: 'json',
									header: {
										'content-type': 'application/x-www-form-urlencoded'
									},
									data: pdata,
									success: res => {
										//console.log(res.data);
										var tg_str = ''
										for (let i in res.data.data) {
											tg_str += res.data.data[i].name + " ";
										}
										this.tg_str = tg_str;
										this.xShow = true;
										uni.hideLoading();
									}
								});
							}
						}
					});
	
				},
				//获取订单信息
				getOrderInfo() {
					
					var xarr = {
						status_dx: '2,3',
						member_openid: this.memberinfo.openid,
						limit: 10,
						offset: 0,
					};
					var xpdata = url.getSignStr(xarr);
					uni.request({
						url: url.websiteUrl + '/api_v2/mall_order/order_query',
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: xpdata,
						success: xres => {
							//console.log(xres.data);
							if (this.memberinfo.length != 0 && xres.data.data.order_info.length > 0) {
								this.orderStatus = 2;
							} else {
								this.orderStatus = 1;
							}
							if (xres.data.status == 'y') {
								this.order_info = xres.data.data.order_info;
							}
						}
					});
	
				},
				goTgList() {
					uni.navigateTo({
						url: "/pagesb/center/tg"
					})
				},
				chooseItem(item, n, event, index) {
					if (this.selectArr[n] != item) {
						this.$set(this.selectArr, n, item);
						this.$set(this.subIndex, n, index);
	
						//对比下面2个数组来切换商品信息
						var selectArrx = [];
						var str_xzSpec = "";
						var k1 = 0;
						for (let y1 in this.selectArr) {
							if (this.selectArr[y1] != "") {
								selectArrx[k1] = this.selectArr[y1];
								str_xzSpec += this.selectArr[y1] + ",";
								k1++;
							}
						}
						if (selectArrx.length == this.choice.choice_spec.length) {
							var goodsAttr = [];
							for (let y2 in this.goodsinfos) {
								var str_sp = "";
								for (let y3 in this.goodsinfos[y2].specs) {
									str_sp += this.goodsinfos[y2].specs[y3].spec_attr_val_name + ",";
								}
								if (str_sp == str_xzSpec) {
									goodsAttr = this.goodsinfos[y2];
								}
							}
							this.goodsinfo = goodsAttr;
							//读出对应的商品备注
							var choice_tag = [];
							var k = 0;
							for (let i in this.choice.choice_tag) {
								if (this.choice.choice_tag[i].barcode_id == this.goodsinfo.barcode_id) {
									choice_tag[k] = {
										goods_tag: this.choice.choice_tag[i].goods_tag,
									}
									k++;
								}
							}
							this.choice_tag = choice_tag;
						}
					} else {
						this.$set(this.selectArr, n, '');
						this.$set(this.subIndex, n, -1); //去掉选中颜色
					}
					this.checkItem(n);
				},
				checkItem(clickIndex) {
					var option = this.simulatedDATA.specifications;
					for (let i = 0, len = option.length; i < len; i++) {
						if (i == clickIndex) {
							continue;
						}
						let len2 = option[i].list.length;
						for (let j = 0; j < len2; j++) {
							if (this.subIndex[i] != -1 && j == this.subIndex[i]) {
								continue;
							}
							let choosed_copy = [...this.selectArr];
							this.$set(choosed_copy, i, this.simulatedDATA.specifications[i].list[j].name);
							let choosed_copy2 = choosed_copy.filter(item => item !== '' && typeof item !== 'undefined');
							if (this.shopItemInfo.hasOwnProperty(choosed_copy2)) {
								this.$set(this.simulatedDATA.specifications[i].list[j], 'isShow', true);
							} else {
								this.$set(this.simulatedDATA.specifications[i].list[j], 'isShow', false);
							}
						}
					}
				},
				initializeData() {
					//计算有多小种可选路径
					let result = this.simulatedDATA.difference.reduce(
						(arrs, items) => {
							return arrs.concat(
								items.attribute6.split(',').reduce(
									(arr, item) => {
										return arr.concat(
											arr.map(item2 => {
												//利用对象属性的唯一性实现二维数组去重
												if (!this.shopItemInfo.hasOwnProperty([...item2, item])) {
													this.shopItemInfo[[...item2, item]] = items;
												}
												return [...item2, item];
											})
										);
									},
									[
										[]
									]
								)
							);
						},
						[
							[]
						]
					);
				},
				//选择单位或备注
				ggxz(type, data, xdata) {
					if (type == 1) {
						//切换单位
						var choice_unit = [];
						for (let u in this.choice_unit) {
							this.choice_unit[u].site = 1;
							if (this.choice_unit[u].unit_id == data) {
								this.choice_unit[u].site = 2;
							}
							choice_unit[u] = {
								unit: this.choice_unit[u].unit,
								unit_id: this.choice_unit[u].unit_id,
								site: this.choice_unit[u].site,
							}
						}
						this.choice_unit = choice_unit;
						//切换单位的时候切换商品数据
						for (let g in this.goodsinfos) {
							if (this.goodsinfos[g].unit_id == data) {
								this.goodsinfo = this.goodsinfos[g];
							}
						}
					}
					if (type == 3) { //备注信息的选中效果
						var oneTag = [];
						for (let u in this.choice_tag) {
							//console.log(this.choice_tag[u].goods_tag.name);
							var threeTag = [];
							for (let u3 in this.choice_tag[u].goods_tag.tag) {
								if (this.choice_tag[u].goods_tag.name == xdata) {
									this.choice_tag[u].goods_tag.tag[u3].site = 1;
								}
								if (this.choice_tag[u].goods_tag.name == xdata && this.choice_tag[u].goods_tag.tag[u3].tag_name == data) {
									this.choice_tag[u].goods_tag.tag[u3].site = 2;
								}
								threeTag[u3] = {
									tag_id: this.choice_tag[u].goods_tag.tag[u3].tag_id,
									tag_name: this.choice_tag[u].goods_tag.tag[u3].tag_name,
									site: this.choice_tag[u].goods_tag.tag[u3].site,
								}
							}
	
							if (this.choice_tag[u].goods_tag.name == xdata) {
								this.choice_tag[u].goods_tag.site = 1;
							}
							if (this.choice_tag[u].goods_tag.name == xdata && data == "自定义") {
								this.choice_tag[u].goods_tag.site = 2;
							}
							oneTag[u] = {
								goods_tag: {
									name: this.choice_tag[u].goods_tag.name,
									tag: threeTag,
									site: this.choice_tag[u].goods_tag.site,
									t_name: this.choice_tag[u].goods_tag.t_name,
									is_must: this.choice_tag[u].goods_tag.is_must,
									sgt_id: this.choice_tag[u].goods_tag.sgt_id,
								},
							}
						}
						this.choice_tag = oneTag;
					}
				},
				//滚动窗口
				upper(e) {
					//console.log(e)
				},
				lower(e) {
					//console.log(e)
				},
				scroll(e) {
					//console.log(e)
					this.old.scrollTop = e.detail.scrollTop
				},
				goTop(e) {
					this.scrollTop = this.old.scrollTop
					this.$nextTick(function() {
						this.scrollTop = 0
					});
					//uni.showToast({
					//icon:"none",
					//title:"纵向滚动 scrollTop 值已被修改为 0"
					//})
				},
				//弹出下拉弹窗
				togglePopup(type, open, data) {
					switch (type) {
						case 'bottom':
							this.content = '底部弹出 popup';
							this.xpopup = 1;
							this.getGoodsDetailsInfo(data);
							break
					}
					this.type = type
					this.$nextTick(() => {
						this.$refs['show' + open].open()
					})
				},
				cancel(type) {
					this.$refs['show' + type].close()
				},
				change(e) {
					//console.log(e);
					//console.log('是否打开:' + e.show)
				},
				//根据商品id查找当前商品基本信息
				getGoodsDetailsInfo(data) {
					this.spec_id = 0;
					this.spec = '';
					this.goodsinfo = [];
					this.goodsinfos = [];
					this.choice = [];
					this.choice_tag = [];
					this.simulatedDATA = { //模拟后台返回的数据 多规格
						"difference": [],
						"specifications": []
					};
					this.selectArr = []; //存放被选中的值
					this.shopItemInfo = {}; //存放要和选中的值进行匹配的数据
					this.subIndex = []; //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
					try { //从本地缓存中同步获取指定 key 对应的内容。
						const value = uni.getStorageSync('memberinfo');
						const valuex = uni.getStorageSync('shoppingCarts');
						const values = uni.getStorageSync('xshopInfo');
						//console.log(value);
						if (values) {
							this.xshopInfo = values;
							this.stores_name = values.store.stores_name;
						}
						if (value) {
							this.memberinfo = value;
							this.login = true;
						}
						if (valuex) {
							this.shoppingCarts = valuex;
						}
					} catch (e) {
						// error
					}
					//console.log(this.shoppingCarts);
					this.barcode_id = data.barcode_id;
					//获取信息
					var arr = {
						stores_id: this.xshopInfo.store.stores_id,
						barcode_id: data.barcode_id,
						member_openid: this.memberinfo.openid,
					};
					var pdata = url.getSignStr(arr);
					uni.request({
						url: url.websiteUrl + '/api_v2/mall_shop_v2/goods_details',
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: pdata,
						success: res => {
							//console.log(res.data);
							this.goodsinfo = res.data.data.goods[0];
							//console.log(this.sale_num);
							this.choice = res.data.data;
							//读出默认备注组
							var choice_tag = [];
							var k = 0;
							for (let i in res.data.data.choice_tag) {
								if (res.data.data.choice_tag[i].barcode_id == res.data.data.goods[0].barcode_id) {
									//this.choice_tag = res.data.data.choice_tag[i].goods_tag;											
									choice_tag[k] = {
										goods_tag: res.data.data.choice_tag[i].goods_tag,
									}
									k++;
								}
							}
							this.choice_tag = choice_tag;
							for (let i in this.choice_tag) { //默认把备注标签加上一个t_name字段
								this.choice_tag[i].goods_tag.t_name = "";
							}
							//console.log(this.choice_tag);
							//读出默认规格
							var x_choice_spec = [];
							var str_spec = ''; //得到一级规格的名称
							for (let s in res.data.data.choice_spec) {
								var x_list = [];
								for (let s2 in res.data.data.choice_spec[s].val) {
									x_list[s2] = {
										name: res.data.data.choice_spec[s].val[s2].name,
										//spec_attr_val_id:res.data.data.choice_spec[s].val[s2].spec_attr_val_id,
									}
								}
								str_spec += res.data.data.choice_spec[s].name + ",";
								x_choice_spec[s] = {
									name: res.data.data.choice_spec[s].name,
									list: x_list,
								}
							}
							//this.simulatedDATA.specifications = x_choice_spec;
							//得到都有哪些规格
							var s_choice_spec = [];
							for (let sL in res.data.data.goods) {
								var x_str_spec = ''; //得到二级规格的名称
								for (let sL2 in res.data.data.goods[sL].specs) {
									x_str_spec += res.data.data.goods[sL].specs[sL2].spec_attr_val_name + ",";
								}
								s_choice_spec[sL] = {
									attribute2: str_spec.substring(0, str_spec.length - 1),
									attribute6: x_str_spec.substring(0, x_str_spec.length - 1),
									uid: sL,
								}
							}
							///**x_choice_spec
							this.simulatedDATA = {
								difference: s_choice_spec,
								specifications: x_choice_spec,
							};
							this.initializeData(); //
							this.checkItem(-1); //
							//**/
							//读出默认单位
							for (let u in res.data.data.choice_unit) {
								if (res.data.data.choice_unit[u].unit == res.data.data.goods[0].unit) {
									res.data.data.choice_unit[u].site = 2;
								}
							}
							this.choice_unit = res.data.data.choice_unit;
							this.goodsinfos = res.data.data.goods;
							this.spec_id = res.data.data.goods[0].spec_id;
							this.spec = res.data.data.goods[0].spec;
						}
					});
				},
				addToCart() {
					//加入购物前先检查有没有选择规格
					if (this.choice.choice_spec.length > 0) {
						var selectArrx = [];
						var k1 = 0;
						for (let y1 in this.selectArr) {
							if (this.selectArr[y1] != "") {
								selectArrx[k1] = this.selectArr[y1];
								k1++;
							}
						}
						if (selectArrx.length < this.choice.choice_spec.length) {
							uni.showToast({
								title: '请选择规格',
								duration: 2000,
								icon: "none",
							});
							return;
						}
					}
	
					//组织要提交的备注信息
					var bjRemark = "";
					var tag_name = "";
					var bzInt = "";
					var sgt_ids = "";
					var allbzxzInt = "";
					for (let b in this.choice_tag) {
						if (this.choice_tag[b].goods_tag.is_must == 1) {
							tag_name += this.choice_tag[b].goods_tag.name + ",";
							allbzxzInt += this.choice_tag[b].goods_tag.sgt_id + ",";
						}
						var str_bz = "";
						var sgt_ids_b = "";
						var bzInt_b = "";
						for (let b1 in this.choice_tag[b].goods_tag.tag) {
							if (this.choice_tag[b].goods_tag.tag[b1].site == 2 && this.choice_tag[b].goods_tag.tag[b1].tag_id > 0) {
								str_bz = this.choice_tag[b].goods_tag.name + ":【" + this.choice_tag[b].goods_tag.tag[b1].tag_name + "】";
								sgt_ids_b = this.choice_tag[b].goods_tag.sgt_id;
								if (this.choice_tag[b].goods_tag.is_must == 1) {
									bzInt_b = this.choice_tag[b].goods_tag.sgt_id;
								}
							}
							if (this.choice_tag[b].goods_tag.tag[b1].site == 2 && this.choice_tag[b].goods_tag.tag[b1].tag_id == 0) {
								str_bz = this.choice_tag[b].goods_tag.name + ":【" + this.choice_tag[b].goods_tag.t_name + "】";
								sgt_ids_b = this.choice_tag[b].goods_tag.sgt_id;
								if (this.choice_tag[b].goods_tag.is_must == 1) {
									bzInt_b = this.choice_tag[b].goods_tag.sgt_id;
								}
							}
						}
						if (str_bz != '') {
							bjRemark += str_bz + ",";
							sgt_ids += sgt_ids_b + ",";
							if (this.choice_tag[b].goods_tag.is_must == 1) {
								bzInt += bzInt_b + ",";
							}
						}
					}
					//检查备注信息是不是必须选择，如果是要先选择备注信息
					if (allbzxzInt != bzInt) {
						uni.showToast({
							title: "请选择：" + tag_name,
							duration: 2000,
							icon: "none",
						});
						return;
					}
					uni.showToast({
						title: '加入成功',
						duration: 2000
					});
					//console.log(this.goodsinfo);
					var xxx = {
						stores_id: this.xshopInfo.store.stores_id,
						barcode_id: this.goodsinfo.barcode_id,
						category_id: this.goodsinfo.category_id,
						goods_id: this.goodsinfo.goods_id,
						goods_title: this.goodsinfo.goods_title,
						img: this.goodsinfo.imgs[0],
						original_price: this.goodsinfo.original_price,
						price: this.goodsinfo.price,
						promotion: this.goodsinfo.promotion,
						unit: this.goodsinfo.unit,
						astrict_num: this.goodsinfo.astrict_num,
						spec: this.spec,
						site: 2,
						remark: bjRemark,
						sgt_ids: sgt_ids,
					};
					//console.log(xxx);
					//console.log(this.goodsinfo);return;
					this.jrShoppingCart(1, xxx, 'dgg');
				},
				goToMs() { //立即购买
					//检查是否登录，没有登录的跳转到登录界面
					//console.log(this.login);
					uni.showToast({
						title: '正在加载...',
						icon: 'none',
						duration: 2000
					});
					try { //从本地缓存中同步获取指定 key 对应的内容。
						var value = uni.getStorageSync('memberinfo');
						if (value.length == 0) {
							this.login = false;
						} else {
							this.login = true;
						}
					} catch (e) {
						// error
					}
					if (this.memberinfo.length == 0) {
						uni.navigateTo({
							url: "/pages/login/login"
						})
						return;
					}
					//加入购物前先检查有没有选择规格
					if (this.choice.choice_spec.length > 0) {
						var selectArrx = [];
						var k1 = 0;
						for (let y1 in this.selectArr) {
							if (this.selectArr[y1] != "") {
								selectArrx[k1] = this.selectArr[y1];
								k1++;
							}
						}
						if (selectArrx.length < this.choice.choice_spec.length) {
							uni.showToast({
								title: '请选择规格',
								duration: 2000,
								icon: "none",
							});
							return;
						}
					}
					//组织要提交的备注信息
					var bjRemark = "";
					var tag_name = "";
					var bzInt = "";
					var sgt_ids = "";
					var allbzxzInt = "";
					for (let b in this.choice_tag) {
						if (this.choice_tag[b].goods_tag.is_must == 1) {
							tag_name += this.choice_tag[b].goods_tag.name + ",";
							allbzxzInt += this.choice_tag[b].goods_tag.sgt_id + ",";
						}
						var str_bz = "";
						var sgt_ids_b = "";
						var bzInt_b = "";
						for (let b1 in this.choice_tag[b].goods_tag.tag) {
							if (this.choice_tag[b].goods_tag.tag[b1].site == 2 && this.choice_tag[b].goods_tag.tag[b1].tag_id > 0) {
								str_bz = this.choice_tag[b].goods_tag.name + ":【" + this.choice_tag[b].goods_tag.tag[b1].tag_name + "】";
								sgt_ids_b = this.choice_tag[b].goods_tag.sgt_id;
								if (this.choice_tag[b].goods_tag.is_must == 1) {
									bzInt_b = this.choice_tag[b].goods_tag.sgt_id;
								}
							}
							if (this.choice_tag[b].goods_tag.tag[b1].site == 2 && this.choice_tag[b].goods_tag.tag[b1].tag_id == 0) {
								str_bz = this.choice_tag[b].goods_tag.name + ":【" + this.choice_tag[b].goods_tag.t_name + "】";
								sgt_ids_b = this.choice_tag[b].goods_tag.sgt_id;
								if (this.choice_tag[b].goods_tag.is_must == 1) {
									bzInt_b = this.choice_tag[b].goods_tag.sgt_id;
								}
							}
						}
						if (str_bz != '') {
							bjRemark += str_bz + ",";
							sgt_ids += sgt_ids_b + ",";
							if (this.choice_tag[b].goods_tag.is_must == 1) {
								bzInt += bzInt_b + ",";
							}
						}
					}
					//检查备注信息是不是必须选择，如果是要先选择备注信息
					if (allbzxzInt != bzInt) {
						uni.showToast({
							title: "请选择：" + tag_name,
							duration: 2000,
							icon: "none",
						});
						return;
					}
					//this.hd.is_kill = 1;
					//查询一下有没有默认收货地址
					var aarr = {
						openid: this.memberinfo.openid,
						is_default: 1,
					};
					var apdata = url.getSignStr(aarr);
					uni.request({
						url: url.websiteUrl + '/api_v2/member_addres_act/index',
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: apdata,
						success: ares => {
							//console.log(ares.data);
							if (ares.data.data.length == 0) {
								uni.showToast({
									icon: 'none',
									title: '请先设置收货地址',
								});
								//this.hd.is_kill = 2;
								uni.navigateTo({
									url: "../goods_details/address_list"
								})
								return;
							}
	
							//抢购成功去生成订单
							var goods_l = [];
							goods_l[0] = {
								stores_id: this.xshopInfo.store.stores_id,
								barcode_id: this.goodsinfo.barcode_id,
								num: 1,
								remark: bjRemark,
								sgt_ids: sgt_ids,
							}
							//console.log(this.xshopInfo.store.stores_id,this.hd.barcode_id);
							var parr = {
								member_openid: this.memberinfo.openid,
								stores_id: this.xshopInfo.store.stores_id,
								goods: JSON.stringify(goods_l),
							};
							//console.log(arr);return;
							var xpdata = url.getSignStr(parr);
							uni.request({
								url: url.websiteUrl + '/api_v2/mall_order/pre_order',
								method: 'POST',
								dataType: 'json',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								data: xpdata,
								success: xres => {
									//console.log(res.data);return;
									if (xres.data.status == 'y') {
										this.xpopup = 2;
										uni.navigateTo({
											url: "../goods_details/order_sure?order_code=" + xres.data.data.order_code + "&goods_l=" + JSON.stringify(
												goods_l)
										})
									} else {
										uni.showToast({
											icon: 'none',
											title: xres.data.info,
										});
										return;
									}
								}
							});
						}
					});
	
				},
				//#ifdef MP-WEIXIN			
				//跳转到另外的小程序
				tz() {
					wx.navigateToMiniProgram({
						appId: 'wxba05b8fc5f43289c',
						path: 'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Fdashboard%2Findex%3Fkdt_id%3D41594443',
						extraData: {
							foo: 'bar'
						},
						envVersion: 'release',
						success(res) {
							// 打开成功
						}
					})
				},
				//#endif
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
							//console.log(res.data);
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
				//购物车动画效果
				shopCart(barcode_id, type, v) {
					//console.log(v);
					var glist = [];
					glist[0] = {
						barcode_id: barcode_id,
						type: type,
					}
					this.amintiond_list = glist;
					uni.getSystemInfo({
						success: res => {
							this.wheight = res.windowHeight + 60;
						}
					});
					//console.log(this.wheight);
					var animation = uni.createAnimation({
						duration: 400,
						transformOrigin: "50% 50%",
						timingFunction: "linear",
						delay: 0
					})
					animation.translate(0, 0).step({
						duration: 10
					})
					this.animationData = animation.export()
					let view = uni.createSelectorQuery().select("#" + v);
					view.boundingClientRect(data => {
						animation.translate(-20, -20).step({
							duration: 50
						}).translate(-40, -10).step({
							duration: 50
						}).translate(-data.left + 240, this.wheight - data.bottom).step({
							duration: 150
						})
						this.animationData = animation.export()
					}).exec();
					setTimeout(function() {
						this.amintiond_list = [];
					}.bind(this), 400)
	
				},
				//扫码
				sm() {
					uni.scanCode({
						success: function(res) {
							//console.log('条码类型：' + res.scanType);
							//console.log('条码内容：' + res.result);
							//this.jrShoppingCart(1,goods_info);
							uni.navigateTo({
								url: "../serch/sm_goods_list?goods_code=" + res.result
							});
							return;
						}
					});
				},
				//搜索
				serchList() {
					if (this.memberinfo.length == 0) {
						uni.navigateTo({
							url: "/pages/login/login"
						})
						return;
					}
					uni.navigateTo({
						url:"../serch/index"
					})
				},
				//已经修改成店铺切换
				address_list() {
					if (this.memberinfo.length == 0) {
						uni.navigateTo({
							url: "/pages/login/login"
						})
						return;
					}
					uni.navigateTo({
						url: "/pagesb/center/xxmd"
					})
				},
				//获取门店信息
				getShop(s_lat = false, s_lng = false) {
					var xxx = this;
					//获取用户当前经纬度
					uni.getLocation({
						type: 'wgs84',
						success: res => {
							//console.log('当前位置的经度：' + res.longitude);
							//console.log('当前位置的纬度：' + res.latitude);
							xxx.lng = (s_lng == false) ? (res.longitude) : (s_lng);
							xxx.lat = (s_lat == false) ? (res.latitude) : (s_lat);
							//获取信息
							var arr = {
								lng: xxx.lng,
								lat: xxx.lat,
								member_openid: xxx.memberinfo.openid,
							};
							var pdata = url.getSignStr(arr);
							uni.request({
								url: url.websiteUrl + '/api_v2/mall_base/get_store_address',
								method: 'POST',
								dataType: 'json',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								data: pdata,
								success: res => {
									//console.log(res.data.data);
									//console.log(sort(res.data));
	
									xxx.xshopInfo = res.data.data;
									//console.log(this.xshopInfo.store.stores_id);
									//写入缓存
									uni.setStorage({
										key: 'xshopInfo',
										data: res.data.data,
										success: function() {}
									});
									uni.setStorage({
										key: 'shoppingCarts',
										data: [],
										success: function() {}
									});
									if (res.data.data.address.length == 0) {
										xxx.maddress = res.data.data.current;
									} else {
										xxx.maddress = res.data.data.address.xq_name + res.data.data.address.mbh;
									}
									xxx.stores_name = res.data.data.store.stores_name;
									uni.setNavigationBarTitle({
										title: res.data.data.store.stores_name
									});
									//获取弹窗广告列表
									var tarr = {
										stores_id: res.data.data.store.stores_id,
									};
									var tpdata = url.getSignStr(tarr);
									uni.request({
										url: url.websiteUrl + '/api_v2/mall_base/popup',
										method: 'POST',
										dataType: 'json',
										header: {
											'content-type': 'application/x-www-form-urlencoded'
										},
										data: tpdata,
										success: tres => {
											if (tres.data.status == 'y') {
												if (tres.data.data.length > 0) {
													uni.hideTabBar();
													this.tcGgList = tres.data.data;
													this.tcStatus = 2;
												}
											}
										},
										fail: () => {},
										complete: () => {}
									});
									xxx.getHome();
									xxx.clickTab(0);
									xxx.getnewList();
									xxx.getnewShopList();
									xxx.getnewCoupon();
									xxx.getbuyList();
									// xxx.getEvening();
									xxx.getTimespike();
									// setTimeout(function(){
									// 	xxx.pd_mshewanjian();
									// },1000)
									xxx.getexlosIve();
									xxx.getClass();
								}
							});
						},
						fail: res => {
							//console.log('当前位置的经度：' + res.longitude);
							//console.log('当前位置的纬度：' + res.latitude);
							xxx.lng = '';
							xxx.lat = '';
							//获取信息
							var arr = {
								lng: xxx.lng,
								lat: xxx.lat,
								member_openid: xxx.memberinfo.openid,
							};
							var pdata = url.getSignStr(arr);
							uni.request({
								url: url.websiteUrl + '/api_v2/mall_base/get_store_address',
								method: 'POST',
								dataType: 'json',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								data: pdata,
								success: res => {
									//console.log(res.data.data);
									//console.log(sort(res.data));
	
									xxx.xshopInfo = res.data.data;
									//console.log(this.xshopInfo.store.stores_id);
									//写入缓存
									uni.setStorage({
										key: 'xshopInfo',
										data: res.data.data,
										success: function() {}
									});
									uni.setStorage({
										key: 'shoppingCarts',
										data: [],
										success: function() {}
									});
									if (res.data.data.address.length == 0) {
										xxx.maddress = res.data.data.current;
									} else {
										xxx.maddress = res.data.data.address.xq_name + res.data.data.address.mbh;
									}
									xxx.stores_name = res.data.data.store.stores_name;
									uni.setNavigationBarTitle({
										title: res.data.data.store.stores_name
									});
									//获取弹窗广告列表
									var tarr = {
										stores_id: res.data.data.store.stores_id,
									};
									var tpdata = url.getSignStr(tarr);
									uni.request({
										url: url.websiteUrl + '/api_v2/mall_base/popup',
										method: 'POST',
										dataType: 'json',
										header: {
											'content-type': 'application/x-www-form-urlencoded'
										},
										data: tpdata,
										success: tres => {
											if (tres.data.status == 'y') {
												if (tres.data.data.length > 0) {
													uni.hideTabBar();
													this.tcGgList = tres.data.data;
													this.tcStatus = 2;
												}
											}
										},
										fail: () => {},
										complete: () => {}
									});
									xxx.getHome();
									xxx.getexlosIve();
									xxx.clickTab(0);
									xxx.getClass();
									xxx.getnewList();
									xxx.getnewShopList();
									xxx.getbuyList();
									xxx.getnewCoupon();
									// xxx.getEvening();
									xxx.getTimespike();
									// setTimeout(function(){
									// 	xxx.pd_mshewanjian();
									// },1000)
								}
							});
						},
					});
				},
				//合计购物车数量
				sumShoppingCartNum() {
					//合计购物车数量
					var snum = 0;
					for (let i in this.shoppingCarts) {
						if (this.shoppingCarts[i].stores_id == this.xshopInfo.store.stores_id) {
							snum += parseFloat(this.shoppingCarts[i].num);
						}
					}
					this.shoppingCartNum = snum;
					uni.setTabBarBadge({
						index: 2,
						text: '' + snum + '',
					});
				},
				memberfkm() {
					if (this.memberinfo.length == 0) {
						uni.showToast({
							title:'请先登录',
							icon:'none',
						})
						// uni.navigateTo({
						// 	url: "/pages/login/login"
						// })
						return;
					}
					uni.navigateTo({
						url: "/pagesb/center/member_fkm"
					})
				},
				getHome() {    //首页基本配置
					var apparr = {};
					var apppdata = url.getSignStr(apparr);
					uni.request({
						url: url.websiteUrl + '/api_v2/mall_base/base_set',
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: apppdata,
						success: appres => {
							if (appres.data.status == 'y') {
								//console.log(appres.data.data);
								this.deployinfo = appres.data.data;
								//console.log(this.memberinfo);
								var xstoresId = (this.xshopInfo.length != 0) ? (this.xshopInfo.store.stores_id) : ('');
								var xopenid = (this.memberinfo.length != 0) ? (this.memberinfo.openid) : ('');
								if (xstoresId > 0) {
									//获取信息
									var arr = {
										stores_id: xstoresId,
										member_openid: xopenid,
									};
									var pdata = url.getSignStr(arr);
									uni.request({
										url: url.websiteUrl + '/api_v2/mall_shop_v2/index',
										method: 'POST',
										dataType: 'json',
										header: {
											'content-type': 'application/x-www-form-urlencoded'
										},
										data: pdata,
										success: res => {
										
											this.bannerLen = res.data.data.banner.length;
											this.iconsLen = res.data.data.icons.length;
											this.homeGoods = res.data.data;
											// this.spikeList = res.data.data.groups[0].goods
											// console.log('限时秒杀',this.spikeList)
											if(this.homeGoods)
											this.getGg();
											console.log(this.homeGoods.groups);
											this.sumShoppingCartNum();
										}
									});
								}
							}
						}
					});
	
				},
				jrShoppingCart(num_s, goods_info, type, v) {
					//num_s参数   0和1，0为减，1为加
					//goods_info参数  一维数组				
					//console.log(goods_info);
					//console.log(goods_info);
					//if(num_s==1){
					//console.log(123);
					//return;
					//}
					//限购数量和购物车数量对比
					for (let ixs in this.shoppingCarts) {
						if (this.shoppingCarts[ixs].barcode_id == goods_info.barcode_id) {
							if (goods_info.astrict_num !== '' && ((parseFloat(this.shoppingCarts[ixs].num) + 1) > goods_info.astrict_num)) {
								uni.showToast({
									icon: 'none',
									title: '商品【' + this.shoppingCarts[ixs].goods_title + '】限购' + goods_info.astrict_num + goods_info.unit
								});
								return;
							}
						}
					}
					//如果重复，查询下重复的商品在购车的数量
					var snum = 0;
					for (let ix in this.shoppingCarts) {
						if (this.shoppingCarts[ix].barcode_id == goods_info.barcode_id) {
							snum = this.shoppingCarts[ix].num;
						}
					}
					//只留下不重复的
					var glistx = [];
					var mxx = 0;
					for (let i in this.shoppingCarts) {
						if (this.shoppingCarts[i].barcode_id != goods_info.barcode_id && this.shoppingCarts[i].stores_id == this.xshopInfo
							.store.stores_id && this.shoppingCarts[i].status == 1) {
							glistx[mxx] = {
								stores_id: this.xshopInfo.store.stores_id,
								barcode_id: this.shoppingCarts[i].barcode_id,
								category_id: this.shoppingCarts[i].category_id,
								goods_id: this.shoppingCarts[i].goods_id,
								goods_title: this.shoppingCarts[i].goods_title,
								img: this.shoppingCarts[i].img,
								original_price: this.shoppingCarts[i].original_price,
								price: this.shoppingCarts[i].price,
								promotion: this.shoppingCarts[i].promotion,
								num: this.shoppingCarts[i].num,
								unit: this.shoppingCarts[i].unit,
								spec: this.shoppingCarts[i].spec,
								site: this.shoppingCarts[i].site,
								status: this.shoppingCarts[i].status,
								remark: this.shoppingCarts[i].remark,
								sgt_ids: this.shoppingCarts[i].sgt_ids,
							}
							mxx++;
						}
					}
					//this.shoppingCarts = glistx;
					//console.log(glistx);
					var glist = [];
					var mx = 0;
					//console.log(snum);
					glist[mx] = {
						stores_id: this.xshopInfo.store.stores_id,
						barcode_id: goods_info.barcode_id,
						category_id: goods_info.category_id,
						goods_id: goods_info.goods_id,
						goods_title: goods_info.goods_title,
						img: goods_info.img,
						original_price: goods_info.original_price,
						price: goods_info.price,
						promotion: goods_info.promotion,
						num: (num_s == 1) ? (snum + 1) : (snum - 1),
						unit: goods_info.unit,
						spec: goods_info.spec,
						site: 2,
						status: 1,
						remark: goods_info.remark,
						sgt_ids: goods_info.sgt_ids,
					}
	
					this.shoppingCarts = glistx.concat(glist);
					//console.log(this.shoppingCarts);
					//console.log(this.shoppingCarts);
					//写入缓存
					uni.setStorage({
						key: 'shoppingCarts',
						data: this.shoppingCarts,
						success: function() {}
					});
					//console.log(this.shoppingCarts);
					this.sumShoppingCartNum();
					if (type != "dgg") {
						//调取动画效果
						this.shopCart(goods_info.barcode_id, type, v);
					}
					//console.log(this.shoppingCarts);
				},
				goDetails(s_itme, group_id, gtype) {
					//console.log(s_itme);
					if (gtype == 1) {
						uni.navigateTo({
							url: "../goods_details/ms_goods_details?barcode_id=" + s_itme.barcode_id + "&s_id=" + s_itme.s_id
						})
					} else {
						uni.navigateTo({
							url: "../goods_details/goods_details?barcode_id=" + s_itme.barcode_id
						})
					}
	
				},
				//专题
				goZt(type, jump_id, title, group_id, gtype) {
					//1商品详情
					//2分组
					//3自定义
					//4次卡
					//5分类
					//group_id==1000秒杀分组
					//console.log(type,jump_id,title,group_id,gtype);return;
					this.tcStatus = 1;
					uni.showTabBar();
					if (gtype == 1) {
						uni.navigateTo({
							url: "../home/ms"
						})
					} else {
						if (type == 1) {
							//跳转到商品详情
							uni.navigateTo({
								url: "../goods_details/goods_details?barcode_id=" + jump_id
							})
						} else if (type == 2) {
							uni.navigateTo({
								url: "../home/zt?group_id=" + jump_id + "&title=" + title
							})
						} else if (type == 4) {
							uni.navigateTo({
								url: "../home/ck_list?title=" + title
							})
						} else if (type == 5) {
							uni.navigateTo({
								url: "../home/classgoods?category_id=" + jump_id + "&title=" + title
							})
						} else if (type == 6) {
							uni.navigateTo({
								url: "../home/ms"
							})
						} else if (type == 7) {
							uni.navigateTo({
								url: "../home/xjj_list"
							})
						} else if (type == 8) {
							uni.navigateTo({
								url: "/pagesb/center/xxmd"
							})
						} else {
							uni.navigateTo({
								url: "../home/zdy?custom_id=" + jump_id + "&title=" + title
							})
						}
					}
				},
				//获取当前上级推荐人分享的店铺
				getTjrShop(storesId) {
					//获取信息
					var arr = {};
					var pdata = url.getSignStr(arr);
					uni.request({
						url: url.websiteUrl + '/api_v2/shop/index',
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: pdata,
						success: res => {
							//console.log(res.data.data);
							for (var i in res.data.data) {
								if (res.data.data[i].stores_id == storesId) {
									try { //从本地缓存中同步获取指定 key 对应的内容。
										var xvs = uni.getStorageSync('xshopInfo');
										//写入缓存
										var xxx = {
											address: xvs.address,
											current: xvs.current,
											store: res.data.data[i],
										}
									} catch (e) {
										// error
									}
									//this.hhhj = res.data.data[i];
									try {
										uni.setStorage({
											key: 'xshopInfo',
											data: xxx,
											success: function() {}
										});
									} catch (e) {
										// error
									}
									try { //从本地缓存中同步获取指定 key 对应的内容。
										const value = uni.getStorageSync('memberinfo');
										const values = uni.getStorageSync('xshopInfo');
										const valuex = uni.getStorageSync('shoppingCarts');
										//console.log(values);
										if (values) {
											this.xshopInfo = values;
											if (values.address.address == undefined) {
												this.maddress = values.current;
											} else {
												this.maddress = values.address.xq_name + values.address.mbh;
											}
											//console.log(values.store.stores_name);
											this.stores_name = values.store.stores_name;
											uni.setNavigationBarTitle({
												title: values.store.stores_name
											});
										}
										if (value) {
											this.memberinfo = value;
											this.login = true;
										}
										if (valuex) {
											this.shoppingCarts = valuex;
										}
									} catch (e) {
										// error
									}
									this.getHome();
									this.getexlosIve();
									this.clickTab(0);
									this.getnewList();
									this.getnewShopList();
									this.getbuyList();
									this.getnewCoupon();
									// this.getEvening();
									this.getTimespike();
									// setTimeout(function(){
									// 	this.pd_mshewanjian();
									// },1000)
								}
							}
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
	    margin: 0;
	    padding: 0;
		line-height: 0;	
		background-color: #f7f7f7 !important;
	}
	.head_top1{
		width: 100%;
		height: 128upx;
		position: fixed;
		top: 0;
		z-index: 111;
		background-size: 100%;
	}
	.head_img1{
		width: 100%;
		height: 652upx;
	}
	/* 搜索和定位 */
	.head_top2{
		position: relative;
	}
	.add_sea{
		margin-left: 20upx;
		display: flex;
		align-items: center;
	}
	.address{
		display: flex;
		position: absolute;
		top: 40upx;
		right: 20upx;
		font-size: 24upx;
		align-items: center;
		justify-content: center;
		color: #fff;
	}
	.add_img2{
		height: 40upx;
		width: 40upx;
		margin-right: 20upx;
	}
	/* 搜索 */
	.search{
		height: 60upx;
		width: 550upx;
		background-color: #fff;
		border-radius: 30upx;
		position: absolute;
		top: 30upx;
		/* right: 20upx; */
	}
	.search_01{
		position: absolute;
		left: 40upx;
		top: 15upx;
		height: 30upx;
		width: 30upx;
	}
	.text1{
		font-size: 24upx;
		color: #999;
		position: absolute;
		left: 100upx;
		top: 30upx;
	}
	/* 新人 */
	.new01{
		height:530upx;
		width: 710upx;
		position: absolute;
		top: 110upx;
		left: 20upx;
	}
	.newlist{
		position: absolute;
		left: 30upx;
		top: 220upx;
		display: flex;
		justify-content: space-around;
		width: 690upx;
	}
	.newone{
		height: 218upx;
		width: 156upx;
		background-color: #fff;
		border-radius: 10upx;
		box-shadow: 0px 2px 6px 0px rgba(4, 0, 0, 0.08);
	}
	.img02{
		height: 156upx;
		width: 156upx;
		border-top-right-radius: 10upx;
		border-top-left-radius: 10upx;
	}
	.newprice{
		display: flex;
		margin-top: 30upx;
		align-items: center;
		font-family: 'SimHei';
	}
	.price1{
		font-size: 20upx;
		color:#fff;
	}
	.price2{
		font-size: 24upx;
		color: #FF874B;
	/* 	margin-top: 10upx; */
		font-weight: bold;
	}
	.text2{
		font-size: 24upx;
		color: #999;
		position: absolute;
		bottom: 46upx;
		left: 320upx;
	}
	/* 优惠券 */
	.coupon{
		display: flex;
		justify-content: space-between;
		position: absolute;
		left: 60upx;
		bottom: 90upx;
	}
	._notice{
		position: relative;
	}
	.couponimg1{
		height: 100upx;
		width: 190upx;
		margin-right: 30upx;
	}
	.text3{
		font-size: 54upx;
		left: 10upx;
		top: 35upx;
		color: #FF874B;
		font-family: Adobe Heiti Std;
		position: absolute;
		width: 70upx;
		text-align: center;
	}
	.text4{
		font-size: 15upx;
		font-family: Adobe Heiti Std;
		color: #FF874B;
		position: absolute;
		left: 80upx;
		top: 24upx;
		letter-spacing: 2upx;
	}
	.text5{
		font-size: 15upx;
		font-family: Adobe Heiti Std;
		color: #FF874B;
		position: absolute;
		left: 80upx;
		top: 45upx;
	}
	/* 轮播图 */
	swiper{
		height: 230upx;
	}
	.img3{
		width: 710upx;
		margin-left: 20upx;
		height: 230upx;
		border-radius: 20upx;
		
	}
	.lunbotu{
		position: absolute;
		top: 240upx;
		width: 100%;
		margin-top: 60rpx;
		/* left: 20upx; */
	}
	/* 二维码 */
	.erweima{
		height: 122upx;
		width: 432upx;
		margin-top: 20upx;
		margin-left: 160upx;
	}
	.text6{
		font-size: 24upx;
		display: flex;
		justify-content: center;
		margin-top: 20upx;
	}
	/* 二图标 */
	.icons{
		display: flex;
		width: 780upx;
		margin: 13upx 20upx 0 20upx;
		flex-wrap: wrap;
	}
	/* 图标 */
	.icon{
	  display: flex;
	  width: 730upx;
	  margin: 13upx 20upx 0 20upx;
	  flex-wrap: wrap;
	  position: absolute;
	  top: 530rpx;
/* 	  margin-top: 40rpx; */
	}
	.iconbg{
	  height: 88upx;
	  width: 88upx;
	  background: #F8C6C6;
	  border-radius: 50%;
	  margin-top: 14upx;
	}
	.icon_img{
	  height: 88upx;
	  width: 88upx;
	}
	.icon_name{
	  font-size: 22upx;
	  padding-top: 20upx;
	  color: #333;
	}
	.icon1{
	  text-align: center;
	  /* margin-right: 59upx; */
	  margin: 0 28upx;
	}
	/* 提示信息 */
	.prompt{
		height: 50upx;
		width: 710upx;
		background-color: #fa7c7e;
		border-radius: 10upx;
		line-height: 2.5;
		margin-left: 20upx;
		margin-top: 20upx;
		display: flex;
	}
	.img4{
		height: 30upx;
		width: 30upx;
		position: absolute;
		left: 40upx;
		margin-top: 10upx;
	}
	.text7{
		/* font-size: 20upx; */
		color: #fff;
		font-size: 20upx;
		margin-bottom: 20upx;
		position: absolute;
		left: 182upx;
	}
	.things{
		height: 240upx;
		width: 710upx;
		background-color: #fff;
		box-shadow: 0px 2px 6px 0px rgba(4, 0, 0, 0.08);
		border-radius: 20upx;
		position: relative;
		margin-left: 20upx;
		margin-top: 46upx;
	}
	.thingstwo{
		height: 300upx;
		width: 710upx;
		background-color: #fff;
		box-shadow: 0px 2px 6px 0px rgba(4, 0, 0, 0.08);
		border-radius: 20upx;
		position: relative;
		margin-left: 20upx;
		margin-top: 20upx;
	}
	.things_top1{
		display: flex;
		justify-content: space-between;
		color: #FF874B;
		position: absolute;
		top: 30upx;
		left: 20upx;
		width: 100%;
	}
	.things_text1{
		font-size: 30upx;
	}
	.things_text2{
		position: absolute;
		right: 40upx;
	}
	.things_top2{
		display: flex;
		justify-content: space-around;
	}
	.things_img1{
		margin-top: 60upx;
		display: table-cell;
		text-align: center;
		vertical-align: middle;
	}
	.img5{
		height: 120upx;
		width: 120upx;
	}
	.things_text3{
		font-size: 22upx;
		color: #333;
		margin-top: 30upx;
	}
	.heng{
		position: absolute;
		top: 240upx;
		background-color: #C0C0C0;
		height: 10upx;
		width: 100%;	
		opacity: 0.1;
	}
	.things_foot{
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	.things_foot1{
		height: 340upx;
		width: 350upx;
		position: relative;
	}
	.things_foot2{
		position: absolute;
		top: 20upx;
		display: flex;
		align-items: center;
		margin-left: 20upx;
	}
	.things_text4{
		font-size: 30upx;
	}
	.things_img2{
		width: 150upx;
		height: 36upx;
		margin-left: 50upx;
	}
	.things_foot1:nth-child(2) .things_foot2 .things_imgs .things_img2{
		width: 185upx;
		margin-left: 20upx;
	}
	.things_text5{
		font-size: 22upx;
		color: #fff;
		position: absolute;
		top: 20upx;
		right: 7upx;
	}
	.things_img3{
		height: 130upx;
		width: 130upx;
		border-radius: 10upx;
		box-shadow: 0px 4px 6px 0px rgba(5, 0, 0, 0.08);
	}
	.things_foot3{
		display: flex;
		justify-content: space-between;
		margin-left: 20upx;
		width: 90%;
	}
	.things_foot4{
		vertical-align: middle;
		display: table-cell;
		/* text-align: center; */
		margin-top: 77upx;
	}
	.things_text6{
		font-size: 24upx;
		color: #333;
		margin-top: 20upx;
		width: 150upx;
		overflow:hidden;
		text-overflow:ellipsis;
		display: -webkit-box;
	    word-break: break-all;
	    -webkit-box-orient: vertical;
	    -webkit-line-clamp: 1;
	    text-align: justify;
	    line-height: 30upx;
		height: 30upx;
	}
	.shu{
		height: 340upx;
		width: 10upx;
		position: absolute;
		bottom: 0;
		background-color: #C0C0C0;
		opacity: 0.1;
		left: 350upx;
	}
	.things_foot5{
		display: flex;
		position: absolute;
		bottom: 70upx;
		align-items: center;
	}
	.things_text7{
		font-size: 22upx;
		color: #FE0000;
		
	}
	.things_text8{
		font-size: 22upx;
		color: #999;
		text-decoration: line-through;
	}
	/* 选项卡 */
	.selected{
		height: 120upx;
		width: 750upx;
		background-color: #fff;
		margin-top: 20upx;
		position: relative;
	}
	scroll-view{
		line-height: 2.5;
	}
	.catlistone{
		margin-right: 65upx;
		line-height: 120upx;
		font-weight: bold;
	}
	.categories{
		display: flex;
		vertical-align: middle;
		text-align: center;
		/* margin-left: 35upx; */
	}
	.topScroll{
		white-space: nowrap;
		overflow: hidden;
	}
	.selected_text1{
		font-size: 28upx;
	}
	.active .selected_text1{
		color: red;
	}
	/* 商品列表 */
	.shop{
		height: 550upx;
		width: 340upx;
		background-color: #fff;
		border-radius: 10upx;
		margin-bottom: 20upx;
		margin-top: 20upx;
		line-height: 2.5;
		position: relative;
		margin-left: 20upx;
	}
	.shop_list{
		display: flex;
		width: 98%;
		flex-wrap: wrap;
		justify-content: space-between;
		min-height: 1100upx;
	}
	.shop_listimg{
		height: 340upx;
		width: 340upx;
		border-top-right-radius: 10upx;
		border-top-left-radius: 10upx;
	}
	.shoptext{
		line-height: 40upx;
		margin-left: 20upx;
	}
	.shop_text1{
		font-size: 28upx;
	}
	.shop_text1 text{
		font-size: 22upx;
		margin-left: 20upx;
	}
	.shop_text2{
		font-size: 24upx;
		color: #FE0000;
	}
	.shop_text3{
		font-size: 30upx;
		color: #FE0000;
		font-weight: bold;
	}
	.shop_text3 text{
		font-size: 24upx;
		color: #999;
		margin-left: 20upx;
		text-decoration: line-through;
		font-weight: normal;
	}
	.shop_text4{
		border: 1upx solid #FF874B;
		font-size: 22upx;
		color: #FF874B;
		width: 146upx;
		height: 34upx;
		text-align: center;
		line-height: 34upx;
		display: flex;
	}
	.shop_text4 .shops{
		margin-left: 10upx;
		display: flex;
	}
	.shop_text4 .shops text{
		margin-left: 10upx;
	}
	.shop_moreimg{
		position: absolute;
		height: 50upx;
		width: 50upx;
		bottom: 50upx;
		right: 20upx;
	}
	.Suspensionimg{
		height: var(--status-bar-height); 
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 111;
		background-size: 100%;
	}
	.this_coupon{
		position: relative;
	}
	.conten_imgs{
		height: 195upx;
		width: 710upx;
		margin-left: 20upx;
		line-height: 200upx;
		margin-top: 20upx;
	}
	.conter_img2{
		height: 120upx;
		width: 120upx;
		border-radius: 10upx;
		position: absolute;
		left: 111rpx;
		top: 55upx;

	}
	.this_title{
		font-size: 24upx;
		color: #333;
		position: absolute;
		top: 90upx;
		left: 252upx;
	}
	.this_fenshu{
		font-size: 22upx;
		color: #999;
		position: absolute;
		top: 120upx;
		left: 252upx;
	}
	.hengsss{
		position: absolute;
		border: 1upx solid #70BC26;
		height: 10upx;
		width: 335upx;
		top: 152upx;
		left: 255upx;
		overflow: hidden;
	}
	.qiuqiu{
		height: 14upx;
		width: 14upx;
		background-color: #70BC26;
		border-radius: 50%;
	}
	.this_qiuqiu{
		display: flex;
		justify-content: space-between;
		width: 335upx;
		position: absolute;
		left: 252upx;
		top: 150upx;
	}
	.schedule_quan{
		height: 14upx;
		width: 14upx;
		border-radius: 50%;
		background-color: #70BC26;
	}
	.schedule_down{
		font-size: 18upx;
		position: absolute;
		color: #666;
		margin-top: 27rpx;
		width: 100rpx;
		margin-left: -20rpx;
	}
	.jindu{
		background-color: #70BC26;
		height: 6rpx;
	}
</style>
