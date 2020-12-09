<template>
	<!-- 邀请好友按钮 -->
	<view>
		<!-- 实时购买记录 -->
		<view class="shishi" v-if="show_hide == 1"> 
			<view class="list_tt" style="height: 50upx;">
				<image class="image" src="../../static/logos.png" mode=""></image>
				<view class="text">{{nextListDan[list_index]}}</view>
			</view>
		</view>
		<!-- 顶部 -->
		<hx-navbar ref="hxnb" :config="config" @clickBtn="address_list" /> 
		<view class="head_top2">
			<image class="head_img1" src="https://div.buy315.com.cn/xcx_imgs/icon_bg2.png" ></image>
			<!-- 定位和搜索 -->
			<view class="ss_bottom">
				<view class="add_sea">
					<view class="search" @click="gotoseachshop">
						<view><image class="search_01" src="https://div.buy315.com.cn/xcx_imgs/search.png"></image></view>
						<view class="text1">每日菜场为您优选</view> 
					</view>
					<view class="address" @click="gotovipdetails" v-if="login==true">
						<image class="add_img2" src="https://div.buy315.com.cn/xcx_imgs/erweima.png" ></image>
						<view class="add_img22">提货码</view>
					</view>
				</view>
				<!-- 新人专享 -->
				<block v-if="newcomer==true">
					<!--  -->
					<view class="new" @click="gotonewlist" >
						<image class="new01" src="https://div.buy315.com.cn/xcx_imgs/newbg.png"></image>
						<view class="newlist">
							<view class="newone" v-for="(item,index) in newList.slice(0,4)" :key='item.index' >
								<image class="img02" src="https://div.buy315.com.cn/xcx_imgs/zwtpo.jpg" v-if="item.imgs_original==''"></image>
								<image class="img02" :src="item.imgs_original" v-else ></image>
								<view class="newprice">
									<!-- <view class="newtexiinn"><text class="price1">新人价</text></view> -->
									<view class="price2">￥{{item.new_people_price}}</view>
									<view class="price2">￥{{item.new_people_price}}</view>
								</view>
							</view>
						</view>
					</view>
				</block> 
				<!-- 轮播图 -->
				<block class="new11" v-else >
						<view v-if="bannerLen>0" class="lunbotu">
							<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
								<swiper-item  v-for="(item,index) in homeGoods.banner" :key="index" @click="goZt(item.href,item.type,item.jump_id,item.name)">
									<image class="img3":src="item.img"></image>
								</swiper-item>
							</swiper>
						</view>
				</block>
				<!-- 分类 -->
				<view class="icon" style="margin-bottom: 20upx;">
					<view class="icon1" v-for="(ico_item,ico_index) in homeGoods.icons" :key="ico_index" @click="goZt(0,ico_item.type,ico_item.jump_id,ico_item.name)">
					<view class="iconbg"><image class="icon_img" :src="ico_item.img"></image></view>
						<view class="icon_name">{{ico_item.name}}</view>
					 </view>
				</view>
			</view>
		</view>
		<!-- 爆品好物 -->
		<view class="things" v-if="thingsList.length != 0">
			<view class="things_top" >
				<view class="things_top1" @click="gotoexplosive">
					<view class="things_text1">爆品好货 总有您需要的</view>
					<view class="things_text2">></view>
				</view>
				<view class="things_top2" >
					<view class="things_img1" v-for="(item,index) in thingsList" @click="gotodetails(item)" :key=item.index>
						<image class="img5" src="../../static/zanwu.png" v-if="item.img == ''"></image>
						<image class="img5" v-if="item.imgs_original==''" src="../../static/zanwu.png"></image>
						<image class="img5" v-else :src="item.imgs_original"></image>
						<view class="things_text3">优惠价{{item.price}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="thingstwo" :style="{display:wanandmiao}"> -->
		<view class="thingstwo" :style="{display:wanandmiao}">
			<view class="things_foot">
				<!-- <view class="things_foot1"> -->
				<view class="things_foot1" :style="{display:miaosha , width:xian_width}" >
					<view class="things_foot2" @click="gotolimited">
						<!-- <view class="things_text4">购划算</view> -->
						<view class="things_text4">限时秒杀 <br/><text class="text4_ttt">爆品买不停</text></view>
						<view class="things_imgs">
							<image class="things_img2"  src="https://div.buy315.com.cn/xcx_imgs/xianshi.png" ></image>
							<text class="things_text5">{{spikeList[0].end_time ? spikeList[0].end_time : '正在获取中'}} </text>
						</view>
					</view>
					<view class="things_foot3" >
						<view class="things_foot4" v-for="(hitem,hindex) in spikeList" :key="hindex" @click="gotodetailsms(hitem)">
							<!-- <image class="img5" v-if="hitem.imgs_original==''" src="../../static/zanwu.png"></image> -->
							<image class="img5" :src="hitem.img1_original"></image>
							<!-- <view class="things_text6" >{{hitem.goods_title ? hitem.goods_title : '正在获取中'}}</view> -->
							<view class="things_text6" >秒杀价<text style="color: #fe0000;">￥{{hitem.price ? hitem.price : '正在获取中'}}</text></view>
							<!-- <view class="things_foot5">
								<view class="things_text7">￥{{hitem.price ? hitem.price : '正在获取中'}}</view>
								<view class="things_text8">￥{{hitem.retail_price ? hitem.retail_price : '正在获取中'}}</view>
							</view> -->
						</view>
					</view>	
				</view>
				<!-- <view class="things_foot1" > -->
				<view class="things_foot1" :style="{display:wanjian , width:kan_width}">
					<view class="things_foot2"  @click="gotomarket">
						<!-- <view class="things_text4">晚间菜场</view> -->
						<view class="things_text4">0元秒杀 <br/><text class="text4_ttt">砍价免费拿</text></view>
						<!-- <view class="things_imgs">
							<image class="things_img2" src="https://div.buy315.com.cn/xcx_imgs/wanjian.png" ></image>
							<text class="things_text5">{{evenimglist.temp_start_time ? evenimglist.temp_start_time + '-' + evenimglist.temp_end_time : '正在获取中'}} > </text>
						</view> -->
					</view>
					<view class="things_foot3" >
						<view class="things_foot4" v-for="(item,index) in kan_goods" :key='index' @click="kan_goods(item)">
							<view class="mianfeiling">免费领</view>
							<!-- <image class="img5" v-if="hitem.imgs_original==''" src="../../static/zanwu.png"></image> -->
							<image class="img5" :src="item.img"></image>
							<!-- <view class="things_text6" >{{item.goods_title ? item.goods_title : '正在获取中' }}</view> -->
							<view class="things_text6" >{{item.goods_name}}</view>
							<!-- <view class="things_foot5">
								<view class="things_text7">￥{{item.activity_price ? item.activity_price : '正在获取中'}}</view>
								<view class="things_text8">￥{{item.retail_price}}</view>
							</view> -->
						</view>
					</view>	
				</view>
			</view>
		</view>
		<!-- 导航 -->
		<view  class="selected" style="position: sticky;z-index: 9999;" :style="[{top:mar_top + 'px'}]">
			<scroll-view scroll-x="true" class="topScroll">
				<view class="categories"> 
					<view v-for="(item,index) in shopclass" class="catlistone" :key='index' @click="clickTab(item.category_id)" 
					 :class="{'active' : tabIndex==item.category_id}">
						 <view class="selected_text1">{{item.name}}</view>
						 <view class="selected_text1 selected_text2">{{item.describe}}</view>
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
							<!-- <view class="shop_text2">会员价：￥{{item.price}}</view> -->
							<view class="shop_text12">{{item.goods_describe == '' ? '标签未填写。' : item.goods_describe}}</view>
							<!-- <view class="shop_text13">满199减100</view> -->
							<view class="shop_text3">￥{{item.price}}<text>￥{{item.original_price}}</text></view>
						</view>
						<view class="anniu">
							<!-- <image class="add" src="https://div.buy315.com.cn/xcx_imgs/jia.png" mode=""></image>
							<view class="sum">1</view>
							<image class="jian" src="https://div.buy315.com.cn/xcx_imgs/jian.png" mode=""></image> -->
							<view class="x-auto float-right">
								<view class="x-auto" v-for="(cartitme,cartindex) in shoppingCarts" :key="cartindex" v-if="cartitme.barcode_id==item.barcode_id">
									<view class="x-auto" v-if="cartitme.num>0" @click="jrShoppingCart(0,item)"><image src="https://div.buy315.com.cn/xcx_imgs/jian.png"  mode="aspectFill" style="width: 45upx; height: 45upx;position: absolute; bottom: 30rpx; right: 120rpx;"></image></view>
									<view class="x-auto cla1" v-if="cartitme.num>0" style="width: 54rpx;text-align: center; color: #393D4A; position: absolute; bottom: 34rpx; right: 68rpx;line-height: 38rpx;">{{cartitme.num}}</view>
								</view>
								<view class="x-auto c2" :id="'dh1'+'-'+item.barcode_id"  v-if="item.more==1 && (item.sale_num==='' || item.sale_num>0)" @click="jrShoppingCart(1,item,1,'dh1'+'-'+item.barcode_id)">
									<view class="x-auto" :animation="animationData" style="background:#F65A2A;height:45upx;width:45upx; border-radius: 45upx; position: absolute;" v-for="(ditem,dindex) in amintiond_list" :key="dindex" v-if="ditem.barcode_id==item.barcode_id"></view>
									<view class="x-auto"><image src="https://div.buy315.com.cn/xcx_imgs/jia.png"  mode="aspectFill" style="width: 45upx; height: 45upx; position: absolute; right: 26rpx; bottom: 30rpx;"></image></view>
								</view>
								<view class="x-auto"   v-if="item.more==2 && (item.sale_num==='' || item.sale_num>0)">
									<button type="primary c1"  @click="togglePopup('bottom', 'popup',item)" style=" width:auto; height:auto; padding:0; border:0;border-color:#fff;line-height: 35upx; background:#fff;display:inline;">
										<view class="x-auto" :animation="animationData" style="background:#F65A2A;height:45upx;width:45upx; border-radius: 45upx; position: absolute;" v-for="(ditem,dindex) in amintiond_list" :key="dindex" v-if="ditem.barcode_id==item.barcode_id"></view>
										<view class="x-auto"><image src="https://div.buy315.com.cn/xcx_imgs/jia.png"  mode="aspectFill" style="width: 45upx; height: 45upx;"></image></view>
									</button>
								</view>
								<view class="x-auto" style=" -webkit-filter: grayscale(50%);" v-if="item.sale_num===0">
									<view class="x-auto"><image src="https://div.buy315.com.cn/xcx_imgs/jia2.png"  mode="aspectFill" style="width: 45upx; height: 45upx;"></image></view>
								</view>
							</view>
						</view>
						<!-- <view>
						<image class="shop_moreimg" src="https://div.buy315.com.cn/xcx_imgs/jia.png" @click="jrShoppingCart(1,item,item.group_id,'dh'+item.group_id+'-'+item.barcode_id)"></image>
						</view> -->
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="index_yq" :style="{display:wanandmiao}" @click="fenxiangTest()">
		</view>
		<!-- 送券提示弹窗 -->
		<view class="float_window" v-if="float_window == 1" @click="hide_window()">
			<view class="red_window">
				<image class="bottom" src="https://div.buy315.com.cn/xcx_imgs/index_red_float2.png" mode=""></image>
				<view class="banner_swiper">
					<view class="white" v-for="(item,index) in floatYouHuiJuan" :key="item.index">
						<view class="left">
							<text>￥</text>{{item.coupon_reduction}}
						</view>
						<view class="right">
							<view>满{{item.coupon_val}}元可用</view>
							<text>全场通用,特殊商品除外</text>
						</view>
					</view>
				</view>
			</view>
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
						//console.log(res.target)
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
					floatYouHuiJuan:[],
					xShow: false,
					wanandmiao:'block',
					markers: '',
					index:'',
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
						title:'',
						color: '#ffffff',
						backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
						statusBarFontColor:'#fff',
						fontSize:'16px',
						back:false,
						leftButton:[{
								key: 'btn1',
								icon: '&#xe651;',
								position: 'left',
								txt:'请登录' ,
								fontSize:'14px'
							}],
					},
					tabIndex:7223,
					height:'',
					limit:20,
					newList:[],
					newCouponList:[],   // 优惠券
					iconList:[],
					eveningList:[],
					listScrollShop:[],
					shopList:[],
					spikeList:[],    // 限时秒杀
					wanjian:'block',
					miaosha:'block',
					newcomer:true,
					evenimglist:'',
					mar_top:'',
					sData:'',
					ScrollHeight:'',
					kan_goods:[],
					nextListDan:[],
					thingsList:[],
					float_window:2,
					show_hide:1,
					list_index:0,
					xian_width:'350rpx',
					kan_width:'350rpx',
					myVar:''//定时器
				}
			},
			onTabItemTap:function(){
				
				////console.log('点击了tab触发');
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
			},
			onReady: function(e) {
				var xthis = this;
				// uni.getNetworkType({
				// 	success: function(res) {
				// 		if (res.networkType !== 'none') {
				// 			xthis.getBanben();
				// 		}
				// 	}
				// });
				if (xthis.xSt_key == 1) {
					var dsqId = setInterval(function() {
						uni.getNetworkType({
							success: function(res) {
								if (res.networkType !== 'none') {
									console.log("-----------------res.networkType !== 'none'")
									xthis.getShop();
									clearInterval(dsqId);
								}
							}
						});
					}, 1000)
				} else {
					console.log("-----------------res.networkType === 'none'")
					xthis.getShop();
				}
			},
			onShow: function(e) {
				var that = this
				this.myVar = setInterval(function(){
					that.title_xx()
					that.title_hs()
				},3000);
				this.memberinfo = uni.getStorageSync('memberinfo')
				this.shoppingCarts = uni.getStorageSync('shoppingCarts')
			},
			onHide(){
				clearInterval(this.myVar)
			},
			onUnload(){
				clearInterval(this.myVar)
			},
			onLoad(data) {
				uni.getSystemInfo({
					success(res) {
						
					}
				})
				
				uni.showLoading({
					title: '加载中',
					mask:true
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
			methods: {
				//购物车
				//分类购物车
				jrShoppingCart(num_s,goods_info,type,v){
					//num_s参数   0和1，0为减，1为加
					//goods_info参数  一维数组
					//console.log(num_s);
					//console.log(goods_info);
					//console.log(this.shoppingCarts);return;
					//限购数量和购物车数量对比
					for(let ixs in this.shoppingCarts){
						if(this.shoppingCarts[ixs].barcode_id==goods_info.barcode_id){
							if(goods_info.astrict_num !== '' && ((parseFloat(this.shoppingCarts[ixs].num)+1) > goods_info.astrict_num)){
								uni.showToast({
								    icon: 'none',
								    title: '商品【'+this.shoppingCarts[ixs].goods_title+'】限购'+goods_info.astrict_num+goods_info.unit
								});
								return;
							}
						}					
					}
					//如果重复，查询下重复的商品在购车的数量
					var snum = 0;
					for(let ix in this.shoppingCarts){
						if(this.shoppingCarts[ix].barcode_id==goods_info.barcode_id){
							snum = parseFloat(this.shoppingCarts[ix].num);
						}					
					}
					//console.log(goods_info);
					//只留下不重复的
					var glistx = [];
					var mxx = 0;
					for(let i in this.shoppingCarts){
						if(this.shoppingCarts[i].barcode_id!=goods_info.barcode_id && this.shoppingCarts[i].stores_id==this.xshopInfo.store.stores_id && this.shoppingCarts[i].status==1){
							glistx[mxx] = {
								stores_id:this.xshopInfo.store.stores_id,
								barcode_id:this.shoppingCarts[i].barcode_id,
								category_id:this.shoppingCarts[i].category_id,
								goods_id:this.shoppingCarts[i].goods_id,
								delivery_type:this.shoppingCarts[i].delivery_type,
								goods_title:this.shoppingCarts[i].goods_title,
								img:this.shoppingCarts[i].img,
								original_price:this.shoppingCarts[i].original_price,
								price:this.shoppingCarts[i].price,
								promotion:this.shoppingCarts[i].promotion,
								num:this.shoppingCarts[i].num,
								unit:this.shoppingCarts[i].unit,
								spec:this.shoppingCarts[i].spec,
								site:this.shoppingCarts[i].site,
								status:this.shoppingCarts[i].status,
								remark:this.shoppingCarts[i].remark,
								sgt_ids:this.shoppingCarts[i].sgt_ids,
							}
							mxx++;
						}					
					}
					this.shoppingCarts = glistx;
					//console.log(this.shoppingCarts);
					var glist = [];
					var mx = 0;
					//console.log(snum);
					if(num_s!=1 && snum<2){
						//console.log(snum+'---');//删除缓存
					}else{
						glist[mx] = {
							stores_id:this.xshopInfo.store.stores_id,
							barcode_id:goods_info.barcode_id,
							category_id:goods_info.category_id,
							goods_id:goods_info.goods_id,
							goods_title:goods_info.goods_title,
							delivery_type:goods_info.delivery_type,
							img:goods_info.img,
							original_price:goods_info.original_price,
							price:goods_info.price,
							promotion:goods_info.promotion,
							num:(num_s==1)?(snum+1):(snum-1),
							unit:goods_info.unit,
							spec:goods_info.spec,
							site:2,
							status:1,
							remark:goods_info.remark,
							sgt_ids:goods_info.sgt_ids,
						}
					}
					
					this.shoppingCarts = glistx.concat(glist);
					//console.log(this.shoppingCarts);
					//写入缓存
					uni.setStorage({
						key: 'shoppingCarts',
						data:this.shoppingCarts,
						success: function () {
						}
					});
					this.sumShoppingCartNum();
					if(num_s==1 && type!="dgg"){
						//调取动画效果
						// this.shopCart(goods_info.barcode_id,type,v);
					}
					//console.log(this.shoppingCarts);
				},
				
				
				
				//实时获取下单用户扇窗
				title_xx(){
					// console.log('执行了一次')
					var index_math = this.nextListDan.length
					this.list_index = parseInt(Math.random() * index_math)
				},
				title_hs(){
					if(this.show_hide == 1){
						this.show_hide = 2
					}else{
						this.show_hide = 1
					}
				},
				hide_window() {
					this.float_window = 2
				},
				//砍价列表
				kanjia(){
					var arr = {
						limit:4
					};
					var pdata = url.getSignStr(arr);
					uni.request({
						url: url.websiteUrl + '/api_v2/Bargain/bargainList',
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: pdata,
						success: res => {
							//console.log(res.data,'0元秒杀') 
							this.kan_goods = res.data.data
							if(this.kan_goods.length==0){
								this.wanjian = 'none';
								this.xian_width = '700rpx'
							}
							this.pd_mshewanjian()
							this.sumShoppingCartNum()
							
						},
						fail: () => {},
						complete: () => {}
					});
				},
				//限时秒杀详情
				gotodetailsms(hitem){
					//console.log(hitem,'$$$$$$$$$$$$$$$')
					if (this.memberinfo.length == 0) {
						uni.navigateTo({
							url: "/pages/login/login"
						})
						return;
					}
					uni.navigateTo({
					     url:"../goods_details/ms_goods_details?barcode_id="+hitem.barcode_id+"&s_id="+hitem.s_id
					 })
				},
				//分类商品详情
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
						url:'/pages/serch/goods_list'
					})
				},
				//0元抢购
				gotomarket(){
					if (this.memberinfo.length == 0) {
						uni.navigateTo({
							url: "/pages/login/login"
						})
						return;
					}
					uni.navigateTo({
						url:'/pagesb/new/zeroqiang'
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
				// 下单列表
				nextDan(){
						var arr = {
							
						};
						var pdata = url.getSignStr(arr);
						uni.request({
							url: url.websiteUrl + '/api_v2/Stores/getRealTimeOrderInfo',
							method: 'POST',
							dataType: 'json',
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							data: pdata,
							success: res => {
								console.log('下单列表',res.data) 
								this.nextListDan = res.data.data
							},
							fail: () => {},
							complete: () => {}
						});
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
								//console.log(res.data,'新人商品')
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
						////console.log(value);
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
						if(this.memberinfo.openid ==undefined){
							var arr = {
								member_openid: "",
							};
						}else{
							var arr = {
								member_openid: this.memberinfo.openid,
							};
						}
						
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
								//console.log(res.data,'新人优惠券')
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
					////console.log(value);
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
					limit:4
					// member_openid: this.memberinfo.openid,
				};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/stores/getzbhotgoodslist',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						console.log(res.data,'首页爆品')
							this.thingsList = res.data.data;
					}
				})
			},
			// 新增方法  获取首页浮动优惠券列表
			youHuiList() {
				var that = this
				var apparr = {};
				var apppdata = url.getSignStr(apparr);
				uni.request({
					url: url.websiteUrl + '/api_v2/Coupon/getRegisterCouponList',
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: apppdata,
					success: res => {
						console.log('优惠券列表', res)
						that.floatYouHuiJuan = res.data.data
					}
				});
			
			},
			// 限时秒杀
			getTimespike(){
				var that = this
				console.log('获取秒杀砍价')
				try {//从本地缓存中同步获取指定 key 对应的内容。
					const value = uni.getStorageSync('memberinfo');
					const valuex = uni.getStorageSync('shoppingCarts');
					const values = uni.getStorageSync('xshopInfo');
					////console.log(value);
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
					// member_openid: this.memberinfo.openid,
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
						if(this.spikeList.length==0){
							this.miaosha ='none';
							this.kan_width = '700rpx'
						}
						this.kanjia()
					},
					})
			},
			//截取晚间菜场与限时秒杀
			pd_mshewanjian(){
				console.log(this.kan_goods,'开始执行砍价this.kan_goods')
				console.log(this.spikeList,'开始执行限时秒杀this.spikeList')
				if(this.kan_goods.length==0 && this.spikeList.length==0){
					this.wanandmiao = 'none'
				}
				if(this.kan_goods.length > 0 && this.spikeList.length > 0){
						this.kan_goods = this.kan_goods.slice(0,2);
						this.spikeList = this.spikeList.slice(0,2);
				}
				
				// if((this.kan_goods.length > 0 && this.kan_goods.length > 0) && (this.spikeList.length > 0 && this.spikeList.length > 0)){
				// 	this.eveningList = this.kan_goods.slice(0,2);
				// 	var spikelenght = this.spikeList
				// 	this.spikeList = spikelenght.slice(0,2);
				// }
				// if((!this.kan_goods) && (this.spikeList && this.spikeList.length>0)){
				// 	this.spikeList = this.spikeList.slice(0,4);
				// }
				// if((this.kan_goods && this.kan_goods.length>0) && (this.spikeList && this.spikeList.length==0)){
				// 	this.eveningList = this.kan_goods .slice(0,4);
				// }
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
								//console.log(res.data,'还是不是一个新人')
								this.newcomer = res.data.data
							},
							fail: () => {},
							complete: () => {}
						});
					}
				},
				clickTab(index){
					this.tabIndex = index
					uni.showLoading({
					    title: '正在加载中',
						mask:true
					});
					this.shopList = [];
					this.page = 0;
					this.limit = 10;
					this.towMenu = [];
					this.getClass(index);
					
				},
				// 获取分类
				getClass(index){
					this.isClass = false;
					//获取信息
					var arr ={
							stores_id:this.xshopInfo.store.stores_id,
						};
					var pdata = url.getSignStr(arr);
					uni.request({
						url:url.websiteUrl+'/api_v2/mall_shop_v2/categorys_t',
						method:'POST',
						dataType:'json',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:pdata,
						success: res => {
							////console.log(res.data.data);
							if(res.data.data.length>0){
								if(index){
									////console.log(1);
									for(let i in res.data.data){
										if(res.data.data[i].category_id==index){
											////console.log(res.data.data[i].category_id);
											////console.log(res.data.data[i].childs);
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
									////console.log(res.data.data[0].category_id);
									//获取一级
									this.shopclass = res.data.data;
									this.categoryId = res.data.data[0].category_id;
									//获取二级
									this.towMenu = res.data.data[0].childs;
									this.tCategoryId = res.data.data[0].category_id;
									//获取商品信息
									this.getGoods(index);
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
				//底部商品列表
				getGoods(index,action = 'add'){
					this.sData = index;
					//获取信息
					var arr ={
							stores_id:this.xshopInfo.store.stores_id,
							category_id:index,
							content:'',
							member_openid:this.memberinfo.openid,
							limit:10,
							// offset:this.page*this.limit,
							offset:0
						};
					var pdata = url.getSignStr(arr);
					uni.request({
						url:url.websiteUrl+'/api_v2/mall_shop_v2/goods_query_t',
						method:'POST',
						dataType:'json',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:pdata,
						success: res => {
							this.xShow = true;
							uni.hideLoading();
							this.tCategoryId = index;
							var max_page = res.data.total/this.limit;
							if(res.data.status=='y'){
								var datax = res.data.data.goods;
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
				
				xshow(xthis) {
					try { //从本地缓存中同步获取指定 key 对应的内容。
						const value = uni.getStorageSync('memberinfo');
						const values = uni.getStorageSync('xshopInfo');
						const valuex = uni.getStorageSync('shoppingCarts');
						const de = uni.getStorageSync('deployinfo');
						if (de) {
							xthis.deployinfo = de;
							////console.log(JSON.stringify(de));
						}
						////console.log(values.store.stores_id);
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
							// xthis.$refs.hxnb.conf.leftButton[0].txt = xthis.stores_name
							//console.log(xthis.stores_name,'获取到的门店地址')
							// xthis.stores_name = xthis.$refs.hxnb.conf.leftButton[0].txt
							
							xthis.$refs.hxnb.conf.leftButton[0].txt = values.store.stores_name;
							// //console.log(xthis.$refs.hxnb.conf.leftButton[0].txt,'取回来菜场的名字');
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
							url: url.websiteUrl + '/api_v2/shop/index',
							method: 'POST',
							dataType: 'json',
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							data: pdata,
							success: res => {
								
								if (res.data.total == 0) {
									console.log('----------------------res.data.total == 0')
									// xthis.getShop();
								} else {
								}
								////console.log(res.data);						
								if (xthis.memberinfo.length != 0) {
									// xthis.getMer(); //检查会员是否存在
								}
								// xthis.getOrderInfo();
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
								////console.log(appres);
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
							////console.log(appsres);return;
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
						////console.log(1);
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
						// xthis.getTjrShop(stores_id);
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
								////console.log(xres.data.data);
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
										////console.log(res.data);
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
				goTgList() {
					uni.navigateTo({
						url: "/pagesb/center/tg"
					})
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
				//滚动窗口
				upper(e) {
					////console.log(e)
				},
				lower(e) {
					////console.log(e)
				},
				scroll(e) {
					////console.log(e)
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
							// this.getGoodsDetailsInfo(data);
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
					////console.log(e);
					////console.log('是否打开:' + e.show)
				},
				
				//#ifdef MP-WEIXIN			
				//跳转到另外的小程序
				// tz() {
				// 	wx.navigateToMiniProgram({
				// 		appId: 'wxba05b8fc5f43289c',
				// 		path: 'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Fdashboard%2Findex%3Fkdt_id%3D41594443',
				// 		extraData: {
				// 			foo: 'bar'
				// 		},
				// 		envVersion: 'release',
				// 		success(res) {
				// 			// 打开成功
				// 		}
				// 	})
				// },
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
							////console.log(res.data);
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
	// 			shopCart(barcode_id, type, v) {
	// 				////console.log(v);
	// 				var glist = [];
	// 				glist[0] = {
	// 					barcode_id: barcode_id,
	// 					type: type,
	// 				}
	// 				this.amintiond_list = glist;
	// 				uni.getSystemInfo({
	// 					success: res => {
	// 						this.wheight = res.windowHeight + 60;
	// 					}
	// 				});
	// 				////console.log(this.wheight);
	// 				var animation = uni.createAnimation({
	// 					duration: 400,
	// 					transformOrigin: "50% 50%",
	// 					timingFunction: "linear",
	// 					delay: 0
	// 				})
	// 				animation.translate(0, 0).step({
	// 					duration: 10
	// 				})
	// 				this.animationData = animation.export()
	// 				let view = uni.createSelectorQuery().select("#" + v);
	// 				view.boundingClientRect(data => {
	// 					animation.translate(-20, -20).step({
	// 						duration: 50
	// 					}).translate(-40, -10).step({
	// 						duration: 50
	// 					}).translate(-data.left + 240, this.wheight - data.bottom).step({
	// 						duration: 150
	// 					})
	// 					this.animationData = animation.export()
	// 				}).exec();
	// 				setTimeout(function() {
	// 					this.amintiond_list = [];
	// 				}.bind(this), 400)
	
	// 			},
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
				//获取门店信息
				getShop(s_lat = false, s_lng = false) {
					console.log('获取门店信息几次？')
					var xxx = this;
					//获取用户当前经纬度
					uni.getLocation({
						type: 'wgs84',
						success: res => {
							////console.log('当前位置的经度：' + res.longitude);
							////console.log('当前位置的纬度：' + res.latitude);
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
									console.log(res.data.data,'res.data.data---------------');
									// //console.log(sort(res.data),'sort(res.data)====================');
									// //console.log('用户同意获取经纬度后回调',res.data.data)
									xxx.$refs.hxnb.conf.leftButton[0].txt = res.data.data.store.stores_name
									xxx.xshopInfo = res.data.data;
									////console.log(this.xshopInfo.store.stores_id);
									//写入缓存
									uni.setStorage({
										key: 'xshopInfo',
										data: res.data.data,
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
									xxx.nextDan()
									xxx.getnewList()
									xxx.getnewShopList()
									xxx.youHuiList()
									xxx.getexlosIve()
									xxx.getnewCoupon()
									xxx.getClass(7223)
									xxx.getTimespike()
									xxx.getIndex()
								}
							});
						},
						fail: res => {
						
							////console.log('当前位置的经度：' + res.longitude);
							////console.log('当前位置的纬度：' + res.latitude);
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
									xxx.xshopInfo = res.data.data;
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
									xxx.nextDan()
									xxx.getnewList()
									xxx.getnewShopList()
									xxx.youHuiList()
									xxx.getexlosIve()
									xxx.getnewCoupon()
									xxx.getClass(7223)
									xxx.getTimespike()
									xxx.getIndex()
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
					if(this.shoppingCartNum != 0){
						uni.setTabBarBadge({
							index: 2,
							text: '' + snum + '',
						});
					}else{
						uni.removeTabBarBadge({
							index:2
						})
					}
					
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
				//获取首页信息
				getIndex(){
					var arr = {
						stores_id: this.xshopInfo.store.stores_id,
						member_openid: this.memberinfo.openid,
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
							//console.log('banner',res)
							this.bannerLen = res.data.data.banner.length;
							this.iconsLen = res.data.data.icons.length;
							this.homeGoods = res.data.data;
							if(this.memberinfo.length == 0){
								this.float_window = 1
							}else{
								this.float_window = 2
							}
						}
					});
				},
				//分享按钮
				fenxiangTest() {
					uni.navigateTo({
						url: "/pagesb/new/fenxiang_test"
					})
				},
				goDetails(s_itme, group_id, gtype) {
					////console.log(s_itme);
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
				goZt(href,type, jump_id, title, group_id, gtype) {
					//1商品详情
					//2分组
					//3自定义
					//4次卡
					//5分类
					//6分类
					//7分类
					//8分类
					//group_id==1000秒杀分组
					// //console.log(type,jump_id,title,group_id,gtype,'#############');return;
					if (this.memberinfo.length == 0) {
					     uni.navigateTo({
					      url: "/pages/login/login"
					     })
					     return;
					    }
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
							//console.log(type,'########################')
							// uni.switchTab({
							// 	url: "../classification/classification?category_id=" + jump_id + "&title=" + title
							// 	url: "../classification/classification?category_id=" + jump_id 
							// })
							//原分类
							// uni.navigateTo({
							// 	url: "../home/classgoods?category_id=" + jump_id + "&title=" + title
							// })
							uni.navigateTo({
								url: "/pagesb/new/classification_t?category_id=" + jump_id + "&title=" + title
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
						}else if (type == 88) {   
							//console.log('1--11-1-1-1-1-1--1-1-11--1-1-1')
							//console.log('href',href) 
							uni.navigateTo({ 
								url: "../home/url/url?href=" + href
							})
						}
						 else {
							uni.navigateTo({
								url: "../home/zdy?custom_id=" + jump_id + "&title=" + title
							})
						}
					}
				},
			}
		}
	</script>

<style>
	page{
	    margin: 0;
	    padding: 0;
		line-height: 0;	
		background-color: #F7F7F7 !important;
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
		height: 650upx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
		
	}
	/* 搜索和定位 */
	.head_top2{
		position: relative;
	}
	
	.add_sea{
		/* margin-left: 20upx; */
		display: flex;
		align-items: center;
		/* position: absolute;
		top: 0;
		left: 0; */
		height: 60upx;
		width: 100%;
		margin-bottom: 20upx;
	}
	.shop_text12{
		font-size: 24upx;
		color: #999;
	}
	.shop_text13{
		height: 40upx;
		line-height: 40upx;
		display: inline-block;
		padding: 0 10upx;
		font-size: 24upx;
		color: #fe0000;
		border: 2upx solid #fe0000;
		box-sizing: border-box;
		border-radius: 20upx;
	}
	.address{
		display: flex;
		position: absolute;
		/* top: 40upx; */
		right: 30upx;
		font-size: 24upx;
		align-items: center;
		justify-content: center;
		color: #fff;
		width: 90upx;
		height: 80upx;
	}
	.add_img2{
		height: 40upx;
		width: 40upx;
		background-size: 100%;
		position: absolute;
		left: 50%;
		top: 10upx;
		transform: translateX(-50%);
	}
	.add_img22{
		position: absolute;
		top: 55upx;
		left: 0;
		width: 100%;
		display: block;
		font-size: 22upx;
		line-height: 28upx;
		text-align: center;
	}
	/* 搜索 */
	.search{
		height: 60upx;
		width: 550upx;
		background-color: #fff;
		border-radius: 30upx;
		position: absolute;
		left: 20upx;
		/* top: 30upx; */
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
	.new{
		height: 392upx;
		width: 710upx;
		margin: 0 auto;
		position: relative;
		border-radius: 20upx;
		overflow: hidden;
	}
	/* 新人 */
	.new01{
		height:392upx;
		width: 710upx;
		position: absolute;
		top: 0;
		left: 0;
	}
	.newlist{
		position: absolute;
		left: 10upx;
		top: 94upx;
		display: flex;
		justify-content: space-around;
		width: 690upx;
		height: 230upx;
	}
	.newone{
		height: 230upx;
		width: 178upx;
		/* background-color: #fff; */
		background: url("https://div.buy315.com.cn/xcx_imgs/yushou_new_index333.png");
		background-size: 100%;
		border-radius: 10upx;
		position: relative;
		/* box-shadow: 0px 2px 6px 0px rgba(4, 0, 0, 0.08); */
	}
	.img02{
		height: 158upx;
		width: 158upx;
		border-radius: 10upx;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 10upx;
		/* border-top-right-radius: 10upx;
		border-top-left-radius: 10upx; */
	}
	.newprice{
		position: absolute;
		bottom: 0;
		left: 14upx;
		align-items: center;
		width: 112upx;
		height: 66upx;
		
	}
	.xianshibutie{
		width: 710upx;
		height: 280upx;
		margin: 0 auto;
		border-radius: 20rpx;
		background: url("https://div.buy315.com.cn/xcx_imgs/toc_index_bg111.png")no-repeat;
		background-size: 100%;
	}
	.bg_white{
		width: 690upx;
		height: 190upx;
		background-color: #fff;
		border-radius: 10upx;
		margin: 0 auto;
		box-sizing: border-box;
		padding-top: 10upx;
	}
	.xianshibutie .p1{
		font-size: 32upx;
		line-height: 68upx;
		color: #fff;
		padding-left: 90upx;
		position: relative;
	}
	.xianshibutie .p1::before{
		content: "";
		width: 50upx;
		height: 50upx;
		background: url("https://div.buy315.com.cn/xcx_imgs/gxs_icon1.png")no-repeat;
		background-size: 100%;
		position: absolute;
		top: 50%;
		left: 14upx;
		transform:translateY(-50%);
	}
	.xianshibutie .p1 .tt1{
		width: 136upx;
		height: 46upx;
		background: url("https://div.buy315.com.cn/xcx_imgs/toc_index_more111.png")no-repeat;
		background-size: 100%;
		position: absolute;
		right: 18upx;
		top: 50%;
		transform:translateY(-50%);
	}
	.xianshibutie .p2{
		font-size: 24upx;
		line-height: 28upx;
		text-align: center;
		color: #fff;
		margin-bottom: 20upx;
	}
	.price1{
		font-size: 16upx;
		color:#fff;
		padding-left: 6upx;
	}
	.newtexiinn{
		height: 24upx;
		width: 66upx;
		background-color: #FF874B;
		line-height: 18upx;
	}
	
	.price2{
		font-size: 24upx;
		color: #fff;
		float: left;
		line-height: 29upx;
	}
	.newprice .price2:first-child{
		font-size: 28upx;
		margin-top: 8upx;
		margin-left: -2upx;
	}
	.newprice .price2:last-child{
		font-size: 22upx;
		text-decoration:line-through;
	}
	.text2{
		font-size: 24upx;
		color: #999;
		width: 100%;
		line-height: 36upx;
		position: absolute;
		bottom: 20upx;
		text-align: center;
		left: 0;
	}
	/* 优惠券 */
	.coupon{
		display: flex;
		justify-content: space-between;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 70upx;
		width: 660upx;
	}
	._notice{
		position: relative;
		margin-right: 30upx;
	}
	.coupon ._notice:last-child{
		margin-right: 0upx;
	}
	.couponimg1{
		height: 100upx;
		width: 190upx;
		/* margin-right: 30upx; */
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
	.ss_bottom{
		/* height: 600upx; */
		width: 100%;
		position: relative;
		/* top: 0;
		left: 0; */
		z-index: 1;
		padding-top: 10upx;
	}
	.hx-navbar {
		z-index: 11111111111;
	}
	.lunbotu{
		/* top: 80upx; */
		width: 100%;
		margin-bottom: 20upx;
		position: relative;
		/* position: absolute; */
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
		width: 720upx;
		margin: 13upx 20upx 0 20upx;
		flex-wrap: wrap;
	}
	/* 图标 */
	.icon{
	  display: flex;
	  width: 730upx;
	  margin: 0upx 20upx 0 20upx;
	  flex-wrap: wrap;
	  /* position: absolute; */
	  /* top: 340upx; */
/* 	  margin-top: 40upx; */
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
	  line-height: 24upx;
	}
	.icon1{
	  text-align: center;
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
		/* margin-top: 16upx; */
	}
	.thingstwo{
		height: 280upx;
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
		height: 130upx;
		width: 130upx;
		border-radius: 10upx;
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
		height: 280upx;
		width: 350upx;
		position: relative;
	}
	.things_foot2{
		position: absolute;
		/* top: 20upx; */
		display: flex;
		align-items: center;
		margin-left: 20upx;
		height: 60upx;
		line-height: 60upx;
	}
	.things_text4{
		font-size: 30upx;
		height: 60upx;
		width: 5em;
		float: left;
	}
	.things_text4 .text4_ttt{
		font-size: 22upx;
		line-height: 6upx;
		float: left;
		width: 100%;
		color: #999;
	}
	.things_img2{
		width: 150upx;
		height: 36upx;
		background-size: 100%;
		margin-left: 0;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
	}
	.things_imgs{
		position: relative;
		width: 150upx;
		height: 60upx;
		float: left;
	}
	.things_foot1:nth-child(2) .things_foot2 .things_imgs .things_img2{
		width: 185upx;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
	}
	.things_text5{
		font-size: 22upx;
		color: #fff;
		position: absolute; 
		top: 50%;
		left: 0;
		width: 100%;
		text-align: center;
		transform: translateY(-50%);
		text-indent: 30upx;
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
		margin-top: 85upx;
		position: relative;
		width: 130upx;
	}
	.things_text6{
		font-size: 24upx;
		color: #333;
		margin-top: 20upx;
		width: 130upx;
		white-space: nowrap;
		/* overflow:hidden;
		text-overflow:ellipsis; */
		/* display: -webkit-box;
	    word-break: break-all;
	    -webkit-box-orient: vertical;
	    -webkit-line-clamp: 1; */
	    /* text-align: justify; */
		float: left;
	    line-height: 30upx;
		height: 30upx;
		
	}
	.things_foot .things_foot1:last-child .things_foot3 .things_foot4 .things_text6{
		text-align: center;
		overflow:hidden;text-overflow:ellipsis; 
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
		/* position: absolute;
		bottom: 70upx; */
		align-items: center;
		float: left;
		height: 30upx;
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
		height:100upx;
		width: 750upx;
		padding: 0 20upx;
		box-sizing: border-box;
		background-color: #fff;
		margin-top: 20upx;
		
	}
	scroll-view{
		line-height: 2.5;
	}
	.catlistone{
		margin-right: 65upx;
		line-height: 70upx;
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
		line-height: 60upx;
	}
	.selected_text2{
		font-size: 22upx;
		color: #666666;
		line-height: 30upx;
	}
	.active .selected_text1{
		color: red;
	}
	.active .selected_text2{
		background-color: #fe0000;
		color: #fff;
		padding: 0 10upx;
		border-radius: 14upx;
	}
	/* 商品列表 */
	/* .shop{
		height: 550upx;
		width: 340upx;
		background-color: #fff;
		border-radius: 10upx;
		margin-bottom: 20upx;
		margin-top: 20upx;
		line-height: 2.5;
		position: relative;
		margin-left: 20upx;
	} */
	.shop{
		width: 710upx;
		height: 190upx;
		background-color: #fff;
		border-radius: 10upx;
		margin-bottom: 20upx;
		/* margin-top: 20upx; */
		/* line-height: 2.5; */
		position: relative;
		/* margin-left: 20upx; */
	}
	.shop_list{
		display: flex;
		width: 100%;
		padding: 0 20upx;
		box-sizing: border-box;
		padding-top: 20upx;
		flex-wrap: wrap;
		justify-content: space-between;
		min-height: 1100upx;
	}
	.shop_listimg{
		height: 150upx;
		width: 150upx;
		border-radius: 10upx;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 20upx;
	}
	.shoptext{
		line-height: 40upx;
		margin-left: 190upx;
		margin-top: 20upx;
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
		left: 111upx;
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
		height: 15upx;
		width: 15upx;
		background-color: #70BC26;
		border-radius: 50%;
		box-sizing: border-box;
		padding-bottom: 5upx;
	}

	.jindutiao{
		width: 335upx;
		height: 10upx;
		border: 1upx solid #70BC26;
		position: absolute;
		left: 252upx;
		top: 150upx;
		display: flex;
		justify-content: space-between;
	}
	.schedule_down{
		font-size: 18upx;
		color: #333;
		padding-top: 25upx;
		width: 90upx;
	}
	.qiuqiu_all{
		display: flex;
		width: 104%;
		justify-content: space-between;
		position: absolute;
		top: -4upx;
		left: -8upx;
	}
	.head_top2::after{
		content: "";
		clear: both;
		display: block;
	}
	.xsbt_swiper{
		width: 656upx;
		height: 165upx;
		margin: 0 auto;
	}
	.xsbt_swiper .item_list{
		width: 145upx;
		height: 165upx;
		float: left;
		margin-right: 34upx;
		position: relative;
	}
	.xsbt_swiper .item_list image{
		width: 120upx;
		height: 120upx;
		margin: 0 12.5upx;
		background-size: 100%;
	}
	.xsbt_swiper .item_list .title{
		font-size: 22upx;
		line-height: 24upx;
		height: 24upx;
		color: #CD6F00;
		box-sizing: border-box;
		background-color: #FFD21D;
		border-radius: 10upx;
		text-align: left;
		padding-left: 7upx;
		display: inline-block;
		width: 145upx;
		width: 100%;
		overflow: unset;
		position: absolute;
		bottom: 6upx;
		left: 0;
	}
	.xsbt_swiper .item_list .title .right_red{
		width: 60upx;
		height: 36upx;
		font-size: 22upx;
		background: linear-gradient(129deg,#F17C44, #FE0000);
		border-radius: 10upx 10upx 10upx 0px;
		position: absolute;
		line-height: 36upx;
		text-align: center;
		color: #fff;
		right: 2upx;
		bottom: 0;
		/* top: 50%;
		transform: translateY(-50%); */
	}
	.gun_swiper{
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		position: absolute;
		top: 10upx;
		left: 0;
	}
	.gun_swiper_list{
		min-width: 255upx;
		margin-left: 40upx;
		height: 50upx;
		line-height: 50upx;
		position: absolute;
		left: 0;
	}
	.gun_swiper_list image{
		width: 50upx;
		height: 50upx;
		background-size: 100%;
		float: left;
		border-radius: 50%;
	}
	.gun_swiper_list text{
		height: 38upx;
		line-height: 38upx;
		font-size: 22upx;
		padding: 0 15upx;
		background-color: rgba(255,255,255,0.6);
		border-radius: 10upx;
		float: left;
		margin-left: 5upx;
		margin-top: 6upx;
		box-sizing: border-box;
	}
	.mianfeiling{
		font-size: 22upx;
		color: #fff;
		width: 130upx;
		height: 30upx;
		line-height: 30upx;
		text-align: center;
		background-color: rgba(254, 0, 0, 0.4);
		position: absolute;
		top: 100upx;
		left: 0;
		border-radius: 10upx;
		border-top-right-radius: 0;
		border-top-left-radius: 0;
		z-index: 11;
	}
	.index_yq{
		width: 128upx;
		height: 152upx;
		background: url(../../static/index_yq.png)no-repeat;
		background-size: 100%;
		position: fixed;
		right: 28upx;
		bottom: 130upx;
		z-index: 999999999!important;
	}
	
	.float_window {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 11111111111;
	}
	
	.float_window .red_window {
		width: 676upx;
		height: 817upx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: url("https://div.buy315.com.cn/xcx_imgs/index_red_float1.png")no-repeat;
		background-size: 100%;
	}
	
	.float_window .red_window .bottom {
		width: 668upx;
		height: 294upx;
		background-size: 100%;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1111;
	}
	
	.float_window .red_window .banner_swiper {
		width: 500upx;
		height: 383upx;
		position: absolute;
		top: 240upx;
		left: 50%;
		transform: translateX(-50%);
		z-index: 111;
		overflow: hidden;
		overflow-y: scroll;
		padding-bottom: 50upx;
	}
	
	.float_window .red_window .banner_swiper .white {
		width: 498upx;
		height: 121upx;
		margin-bottom: 10upx;
		background: url("https://div.buy315.com.cn/xcx_imgs/index_red_float3.png")no-repeat;
		background-size: 100%;
		position: relative;
	}
	
	.float_window .red_window .banner_swiper .white .left {
		line-height: 121upx;
		font-size: 58upx;
		width: 128upx;
		text-align: center;
		color: #DC5227;
		position: absolute;
		left: 0;
		top: 0;
	}
	
	.float_window .red_window .banner_swiper .white .left text {
		font-size: 18upx;
	}
	
	.float_window .red_window .banner_swiper .white .right {
		position: absolute;
		top: 0;
		left: 168upx;
		width: 350upx;
		padding-left: 40upx;
		box-sizing: border-box;
		font-size: 35upx;
		color: #212121;
		padding-top: 26upx;
		line-height: 50upx;
		
	}
	
	.float_window .red_window .banner_swiper .white .right text {
		color: #999;
		font-size: 18upx;
		line-height: 30upx;
		display: block;
	}
	/* .gun_swiper */
/* 	.puticon{
		height: ;
	} */
	.qhmd{
		font-size: 22upx;
		font-family: 'SimHei';
		position: relative;
		line-height: 32upx;
		text-indent: 20upx;
		display: inline-block;
	}
	.shishi {
		height: 50upx;
		position: fixed;
		left: 17upx;
		top: 230upx;
		z-index: 10000111;
		width: 90%;
	}
	
	.shishi .list_tt {
		height: 50upx;
	}
	
	.shishi .list_tt .image {
		width: 50upx;
		height: 50upx;
		background-size: 100%;
		border-radius: 50%;
		float: left;
	}
	
	.shishi .list_tt .text {
		height: 50upx;
		padding-left: 60upx;
		line-height: 50upx;
		color: #333;
		font-size: 22upx;
		background-color: rgba(255, 255, 255, 0.6);
		display: inline-block;
		float: left;
		margin-left: -28rpx;
		padding-right: 20rpx;
		border-radius: 0px 10upx 10upx 0px;
		;
	}
</style>
