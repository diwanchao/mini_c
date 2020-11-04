<template>
	<view>
		<hx-navbar :config="config"/>
		<view v-if="xShow==true">
			<view class="x12 bg-white" v-if="goodsinfo.imgs!=''">
				<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" class="imgwidth"  v-if="wh==1">
					<swiper-item v-for="(item,index) in goodsinfo.imgs" :key="index"  class="imgwidth">
						<image :src="item" mode="" class="imgwidth"></image>
					</swiper-item>
				</swiper>
				<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" class="imgwidth2"  v-else>
					<swiper-item v-for="(item,index) in goodsinfo.imgs" :key="index"  class="imgwidth2">
						<image :src="item" mode="" class="imgwidth2"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="x12 hengfu" >
				<view class="x12 left">
					<view style="display: flex; align-items: center;">
						<view><image class="left_img" src="https://div.buy315.com.cn/xcx_imgs/naozhongaaaa.png" style="margin-left: 20upx;"></image></view>
						<view style="height: 90upx;  font-size: 24upx; color: #fff; margin-left: 20upx; margin-top: 8upx;">
							<view style="margin-left: 5upx;" v-if="hd.is_kill==1">距开始</view>
							<view style="margin-left: 5upx;" v-if="hd.is_kill==2">距结束</view>
							<view class="newstyle">
								<uni-countdown color="#fff"  :show-day="false" :hour="hour" :minute="minute" :second="second"></uni-countdown>
							</view>
						</view>
					</view>
				</view>
				<view class="textjiage">￥{{hd.price}}/{{goodsinfo.unit}}<text>原件￥{{hd.retail_price}}/{{goodsinfo.unit}}</text></view>
			</view>		
					
				
		<view class="x12 bg-white newagain " style="margin-top:20upx;">
			<view class="x12" v-if="goodsinfo.length != 0">
				<view class="x12">
					<view class="x12 text-large text_title">{{goodsinfo.goods_title}}</view>
					<!-- <view class="textmiaoshu">商品描述商品描述商品描述商品描述商品描述商品描述商品描述述商品描述</view> -->
				</view>
				<view class="x12" v-if="goodsinfo.promotion==2">
					<image src="https://div.buy315.com.cn/xcx_imgs/cx.png" style="width: 70upx; height: 30upx;"></image>
				</view>
				<view class="x12 text-large" style="padding-top: 15upx;">
					<view class="x12" style="font-size: 12pt; height: 30upx; padding-top: 20upx; color: #999;display: none; text-decoration: line-through; font-weight: 100;" v-if="(goodsinfo.price*1) < (goodsinfo.original_price*1)">
						<view>{{deployinfo.monetary_symbol}}{{goodsinfo.original_price}}</view>
					</view>
					<view class="x-auto" style="display: none;">
						<view class="x-auto">
							<span style="color:#F65A2A; font-size: 18pt;">{{deployinfo.monetary_symbol}}{{goodsinfo.price}}</span>
						</view>
						<view class="x-auto" style="padding-left: 10upx;padding-top: 9upx;">
							<span style="color:#393D4A; font-size: 12pt;">{{goodsinfo.unit}}</span>
						</view>
					</view>
					<view class="x-auto float-right" style="font-size: 10pt; padding-top: 23upx;" @tap="share" v-if="fx==true">
						<view class="x-auto" style="padding-top: 5upx;"><image src="https://div.buy315.com.cn/xcx_imgs/fx.png" style="width: 28upx; height: 28upx;"></image></view>
						<view class="x-auto" style="padding-left: 10upx;color:#393D4A;">分享</view>
					</view>
				</view>
			</view>
			<view class="x12" style="font-size: 10pt; color: #fff; padding-bottom: 4px; display: none;">
				<view class="float-left" style="border: #FF9900 solid 1px; padding: 1px 4px; border-radius:2px; background-color: #FF9900;" v-if="hd.is_limit==1">每人限购{{hd.limit_num}}{{hd.unit_name}}</view>
			</view>
			<view class="x12" style="font-size: 10pt; color: #fff; padding-bottom: 4px; display: none;" v-if="goodsinfo.show_month_sales==1 || goodsinfo.show_sale_num==1">
				<view class="float-left" style="border: #f60 solid 1px; padding: 1px 4px; border-radius:2px;background-color: #f60; margin-right: 5px;" v-if="goodsinfo.show_month_sales==1">月销 {{goodsinfo.month_sales}}</view>
				<view class="float-left" style="border: #FF9900 solid 1px; padding: 1px 4px; border-radius:2px; background-color: #FF9900;" v-if="goodsinfo.sale_num>0 && goodsinfo.show_sale_num==1">库存 {{goodsinfo.sale_num}}</view>
				<view class="float-left" style="border: #FF9900 solid 1px; padding: 1px 4px; border-radius:2px; background-color: #FF9900;" v-if="goodsinfo.sale_num===0 && goodsinfo.show_sale_num==1">售罄</view>
			</view>
			<view class="x12" style="font-size: 12pt; color: #393D4A;padding-top: 0upx;" v-if="app_xxb >= 0 && xxb_num > 0">购买此商品可获得{{xxb_num}}希希贝</view>
			<!-- <view class="x12" style="font-size: 12pt; color: #666;padding-top: 0upx;">
				{{stores_name}} 为您配送
			</view> -->
		</view>
		
		<view class="x12 bg-white margin-top text-333 text-big" style=" margin-top:15upx; padding: 0;">
			<view class="x12"  v-if="choice_unit.length!=0" style="width:690upx; padding: 20upx 30upx 30upx 30upx;display: none; border-bottom: 1px dashed #EEEEEE;">
				<view class="x12" style="color: #333;font-size: 26upx;font-weight: bold; margin-bottom: 6upx;">规格</view>
				<view class="x12">
					<view v-for="(uitem,uindex) in choice_unit" :key="uindex" class="x-auto" style="margin-top: 16upx;">
						<view class="x-auto  xzbg" v-if="uitem.site==2">{{uitem.unit}}</view>
						<view class="x-auto  mbg"  @click="ggxz(1,uitem.unit_id)" v-else>{{uitem.unit}}</view>
					</view>
				</view>
			</view>
			<view id="vmsimulatedDATA" class="x12 productBox" v-if="simulatedDATA.specifications.length>0" style="border-bottom:1px dashed #EEEEEE; width: 750upx;">
				<view class="productConten">
					<view class="product-delcom" v-for="(ProductItem,n) in simulatedDATA.specifications" :key="n">
						<view class="product-name" style="font-weight: bold;">{{ProductItem.name}}</view>
						<view class="product-footerlist clearfix">
							<view v-for="(oItem,index) in ProductItem.list" :key="index" v-on:click="chooseItem(oItem.name,n,$event,index)"
							 v-bind:class="[oItem.isShow?'':'noneActive',subIndex[n] == index?'productActive':'']">{{oItem.name}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="x12" style="padding: 10upx 0;" v-if="choice_tag.length!=0">
				<view class="x12" v-for="(citem,cindex) in choice_tag" :key="cindex"  style="width:690upx; padding: 30upx 30upx 10upx 30upx;">
					<view class="x12" style="color: #333;font-size: 26upx;font-weight: bold; margin-bottom: 6upx;">{{citem.goods_tag.name}}</view>
					<view class="x12">
						<view v-for="(titem,tindex) in citem.goods_tag.tag" :key="tindex" class="x-auto" style="margin-top: 16upx;">
							<view class="x-auto  xzbg" v-if="titem.site==2">{{titem.tag_name}}</view>
							<view class="x-auto  mbg"  @click="ggxz(3,titem.tag_name,citem.goods_tag.name)" v-else>{{titem.tag_name}}</view>
						</view>
					</view>
					<view class="x-auto" v-if="citem.goods_tag.site==2" style="padding:16upx 0 0 0; width: 690upx;">
						<input placeholder="备注"  style="width:658upx;height:66upx; padding: 0 15upx; background:rgba(245,245,245,1);border-radius:4px;border:1px solid rgba(204,204,204,1);"  v-model="citem.goods_tag.t_name"/>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="x12 bg-white peisong" style=" margin-top:20upx;">
			<view>配送<text>今日达</text></view>
		</view>
		<view class="x12 bg-white time_peisongs">
			<view class="shop_detail">商品详情</view>
			<view class="x12 bg-white time_peisongs">
				<!-- <view class="shop_detail">商品详情</view> -->
				<view class="shop_jieshao">
					<view class="shop_text45" v-if="goodsinfo.gb_name==''">产地 <text></text></view>
					<view class="shop_text45" v-else>产地 <text>{{goodsinfo.origin}}</text></view>
					
					<view class="shop_text45" v-if="goodsinfo.grade==''">等级  <text></text></view>
					<view class="shop_text45" v-else>等级  <text>{{goodsinfo.grade}}</text></view>
					
					<view class="shop_text45" v-if="goodsinfo.gb_name==''">品牌  <text></text></view>
					<view class="shop_text45" v-else>品牌  <text>{{goodsinfo.gb_name}}</text></view>
					
					<view class="shop_text45" v-if="goodsinfo.baozhuang==''">包装  <text></text></view>
					<view class="shop_text45" v-else>包装  <text>{{goodsinfo.baozhuang}}</text></view>
					
					<view class="shop_text45" v-if="goodsinfo.keeps==''">储藏  <text></text></view>
					<view class="shop_text45" v-else>储藏  <text>{{goodsinfo.keeps}}</text></view>
				</view>
			</view>
	<!-- 		<view class="shop_jieshao">
				<view class="shop_text45">产地  <text>山东</text></view>
				<view class="shop_text45">等级  <text>ssss</text></view>
				<view class="shop_text45">品牌  <text>其他</text></view>
				<view class="shop_text45">包装  <text>无</text></view>
				<view class="shop_text45">储藏  <text>冷藏</text></view>
			</view> -->
		</view>
		<view class="x12" style="height: 115upx;"></view>
		<view class="x12 bg-white margin-top  text-333 text-big shop_detailsss" style=" margin-top:15upx;" v-if="goodsinfo.detial!=''">
			<scroll-view scroll-x= "true" scroll-y= "true" scroll-left="0" scroll-with-animation="true">
				<view class="x12" style="margin-top: 30upx;">				
					<rich-text :nodes="goodsinfo.detial"></rich-text>				
				</view>
			</scroll-view>
		</view>
		<view class="x12"  v-if="tg_str!='' && announce_seat==2" style="height: 95upx;"></view>
		<view class="x12"  v-if="tg_str!='' && announce_seat==2" style="position:fixed; z-index: 1000; bottom:116upx;">
			<view class="x12"  @click="goTgList" style="height:70upx; background-color: #fffbe8; padding-top: 10upx;">
				<view class="example-body">
					<uni-notice-bar :scrollable="true" :text="tg_str"  style="height:90upx;"/>
				</view>
			</view>
		</view>
		<view class="x12" style="height: 115upx;"></view>
		<view class="x12 shop-menu" >
			<view class="x12 bg-white text-default text-333 border-top border-gray">
				<view >					
					<view class="x-auto"  @click="rotohome" style="height: 50upx; padding: 16upx 0 0 30upx; ">
						<image src="../../static/index-1.png" style="width: 42upx; height: 42upx; margin-left: 10upx;"></image>
						<view style="font-size: 24upx; line-height: 24upx;">回首页</view>
					</view>
				</view>
				<view class="x6 text-white float-right text-center gouwuche_two"   v-if="goodsinfo.sale_num !== 0" @click="goToMs">
					立即购买
				</view>
			</view>
		</view>
<!-- 		<view class="x12 shop-menu">
			<view class="x12 bg-white text-default text-333 border-top border-gray">
				<view class="x6" style="padding:20upx 0 0 0; width: 40%;">					
					<view class="x-auto"  @click="goGwc" style="height: 50upx; padding: 15upx 0 0 20upx;">
						<image src="https://div.buy315.com.cn/xcx_imgs/gwc3.png" style="width: 64upx; height: 55upx;"></image>
						<view class="addcart text-center">
							{{shoppingCartNum}}
						</view>
					</view>
				</view>
				<view class="x6 text-white float-right text-center" style="line-height: 115upx; width: 30%; background-color: #f0a63b; font-size: 14pt;"  v-if="goodsinfo.sale_num !== 0" @click="goToMs">
					立即购买
				</view>
				<view class="x6 text-white float-right text-center" style="line-height: 115upx; width: 30%; background-color: #666; font-size: 14pt;" v-if="goodsinfo.sale_num === 0">
					已售罄
				</view>
				<view class="x6 text-white float-right text-center" style="line-height: 115upx; width: 30%; background-color: #F65A2A; font-size: 14pt;" v-else @click="addToCart">
					加入购物车
				</view>
			</view>
		</view> -->
		<!--多规格弹窗的显示结束-->
	</view>
	</view>
</template>
<script>
import uniCountdown from "@/components/linnian-CountDown/uni-countdown.vue";
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
import url from '../../main.js';
	export default {
		components: {uniCountdown,uniNoticeBar},
		//#ifdef MP-WEIXIN
		onShareAppMessage(res) {//分享
			try {//从本地缓存中同步获取指定 key 对应的内容。
				var mv = uni.getStorageSync('memberinfo');
				var xv = uni.getStorageSync('xshopInfo');
				if (res.from === 'button') {// 来自页面内分享按钮
				  console.log(res.target)
				}
				this.wh = 2;
				return {
				  title: xv.store.stores_name,
				  path: '/pages/goods_details/ms_goods_details?member_openid='+mv.openid+"&stores_id="+xv.store.stores_id+"&barcode_id="+this.barcode_id+"&s_id="+this.s_id
				}
			} catch (e) {
				// error
			}
			
		  },
		//#endif
		data() {
			return {
				config:{
					title: '秒杀详情',
					color: '#ffffff',
					backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
					statusBarFontColor:'#fff'
				},
				wh:1,
				time: 0,///多少毫秒
				xShow:false,
				deployinfo:{},//配置信息货币单位，符号，以及其他的一些配置参数
				app_xxb:-1,
				xxb_num:0,
				nodes: [{
					name: 'img',
					attrs: {
						style: 'height:100upx;width:100upx;'
					},
				}],
				login:false,
				memberinfo:[],
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 1000,
				//xstrs:'',
				pjList:[],
				spec_num:0,
				
				isClass:false,
				shoppingCarts:[],
				shoppingCartNum:0,
				xshopInfo:[],
				
				stores_name:'',
				praise:0,
				barcode_id:0,
				jjkkjj:0,
				fx:false,
				tips:'',
				ms:true,
				hour:12,
				minute: 59,
				second:59,
				xreset: false,
				hd:[],
				s_id:0,
				wx_tpl:[],
				zxkf:false,
				tg_str:'',//通告
				announce_seat:1,
				spec_id:0,
				spec:'',
				goodsinfo:[],
				goodsinfos:[],
				choice:[],
				choice_tag:[],
				choice_unit:[],
				simulatedDATA: { //模拟后台返回的数据 多规格
					"difference": [],
					"specifications": []
				},
				selectArr: [], //存放被选中的值
				shopItemInfo: {}, //存放要和选中的值进行匹配的数据
				subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
				total:0,
				xsdata:0,
				
			}
		},
		onShow:function(){//返回时接收子页面的传参
				this.wh = 1;
				//#ifdef MP-WEIXIN			
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				//console.log(currPage.data.mydata);
				if(currPage.data.mydata!=undefined){
					//this.goodsinfo = currPage.data.mydata;
					//console.log(this.goodsinfo);
					//this.spec_id = currPage.data.mydata.spec_id;
					//this.barcode_id = currPage.data.mydata.barcode_id;
					//this.spec = currPage.data.mydata.spec_str;
					//console.log(this.spec);
					//console.log(currPage.data.mydata.barcode_id);
					this.getInfo(currPage.data.mydata);
				}
				// #endif
				try {//从本地缓存中同步获取指定 key 对应的内容。
					this.deployinfo = uni.getStorageSync('deployinfo');
					var appsinfo = uni.getStorageSync('appsinfo');
					this.app_xxb = appsinfo.indexOf('app_xxb');
				} catch (e) {
					// error
				}
				this.getHdGoods(this.xsdata);
		},
		onLoad:function(data){
			uni.showLoading({
			    title: '加载中'
			});
			// #ifdef APP-PLUS
				this.fx = true;
			// #endif
			//#ifdef MP-WEIXIN
				this.zxkf = true;
			//#endif
			//console.log(data.member_openid,data.stores_id,data.barcode_id);
			  if(data.member_openid!=undefined){
			  	this.tjr_member_openid = data.member_openid;
			  	//console.log(1);
			  	//将推荐人id写入缓存
			  	uni.setStorage({
			  		key: 'tjr_member_openid',
			  		data:data.member_openid,
			  		success: function () {
			  		}
			  	});
			  }
			  this.s_id = data.s_id;
			  this.xsdata = data;
			  this.getHdGoods(data);
			  if(data.stores_id!=undefined){
			  	//获取上级推荐人的店铺信息
			  	this.getTjrShop(data);
			  }else{
				  this.getInfo(data);
			  }
			  this.getGg();
		 },
		 created() {
		 	this.initializeData();
		 	this.checkItem(-1);
		 },
		methods: {
			rotohome(){
				uni.switchTab({
					url:'/pages/home/index'
				})
			},
				
			addToCart() {
				//加入购物前先检查有没有选择规格
				if(this.choice.choice_spec.length > 0){
					var selectArrx = [];
					var k1 = 0;
					for (let y1 in this.selectArr) {
						if(this.selectArr[y1] != ""){
							selectArrx[k1] = this.selectArr[y1];
							k1++;
						}
					}
					if(selectArrx.length < this.choice.choice_spec.length){
						uni.showToast({
							title: '请选择规格',
							duration: 2000,
							icon:"none",
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
					if(this.choice_tag[b].goods_tag.is_must==1){
						tag_name += this.choice_tag[b].goods_tag.name+",";
						allbzxzInt  += this.choice_tag[b].goods_tag.sgt_id+",";
					}
					var str_bz = "";
					var sgt_ids_b = "";
					var bzInt_b = "";
					for (let b1 in this.choice_tag[b].goods_tag.tag) {
						if(this.choice_tag[b].goods_tag.tag[b1].site == 2 && this.choice_tag[b].goods_tag.tag[b1].tag_id > 0){
							str_bz = this.choice_tag[b].goods_tag.name+":【"+this.choice_tag[b].goods_tag.tag[b1].tag_name+"】";
							sgt_ids_b = this.choice_tag[b].goods_tag.sgt_id;
							if(this.choice_tag[b].goods_tag.is_must==1){
								bzInt_b  = this.choice_tag[b].goods_tag.sgt_id;
							}
						}
						if(this.choice_tag[b].goods_tag.tag[b1].site == 2 && this.choice_tag[b].goods_tag.tag[b1].tag_id == 0){
							str_bz = this.choice_tag[b].goods_tag.name+":【"+this.choice_tag[b].goods_tag.t_name+"】";
							sgt_ids_b = this.choice_tag[b].goods_tag.sgt_id;
							if(this.choice_tag[b].goods_tag.is_must==1){
								bzInt_b  = this.choice_tag[b].goods_tag.sgt_id;
							}
						}
					}
					if(str_bz!=''){
						bjRemark += str_bz+",";
						sgt_ids += sgt_ids_b+",";
						if(this.choice_tag[b].goods_tag.is_must==1){
							bzInt += bzInt_b+",";
						}
					}
				}
				//检查备注信息是不是必须选择，如果是要先选择备注信息
				if(allbzxzInt != bzInt){
					uni.showToast({
						title: "请选择："+tag_name,
						duration: 2000,
						icon:"none",
					});
					return;
				}
				uni.showToast({
					title: '加入成功',
					duration: 2000
				});
				//console.log(this.goodsinfo);
				var xxx={
					stores_id:this.xshopInfo.store.stores_id,
					barcode_id:this.goodsinfo.barcode_id,
					category_id:this.goodsinfo.category_id,
					goods_id:this.goodsinfo.goods_id,
					goods_title:this.goodsinfo.goods_title,
					img:this.goodsinfo.imgs[0],
					original_price:this.goodsinfo.original_price,
					price:this.goodsinfo.price,
					promotion:this.goodsinfo.promotion,
					unit:this.goodsinfo.unit,
					astrict_num:this.goodsinfo.astrict_num,
					spec:this.spec,
					site:2,
					remark:bjRemark,
					sgt_ids:sgt_ids,
				};
				//console.log(xxx);
				//console.log(this.goodsinfo);return;
				this.jrShoppingCart(1,xxx);
			},
			jrShoppingCart(num_s,goods_info){
				//num_s参数   0和1，0为减，1为加
				//goods_info参数  一维数组
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
					if(this.shoppingCarts[ix].barcode_id==goods_info.barcode_id  && this.shoppingCarts[ix].stores_id==this.xshopInfo.store.stores_id){
						snum = parseFloat(this.shoppingCarts[ix].num);
					}					
				}
				//只留下不重复的
				var glistx = [];
				var mxx = 0;
				for(let i in this.shoppingCarts){
					if(this.shoppingCarts[i].barcode_id!=goods_info.barcode_id  && this.shoppingCarts[i].stores_id==this.xshopInfo.store.stores_id && this.shoppingCarts[i].status==1){
						glistx[mxx] = {
							stores_id:this.xshopInfo.store.stores_id,
							barcode_id:this.shoppingCarts[i].barcode_id,
							category_id:this.shoppingCarts[i].category_id,
							goods_id:this.shoppingCarts[i].goods_id,
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
						//console.log(12344555);
					}					
				}
				//this.shoppingCarts = glistx;
				//console.log(this.shoppingCarts);
				var glist = [];
				var mx = 0;
				glist[mx] = {
					stores_id:this.xshopInfo.store.stores_id,
					barcode_id:goods_info.barcode_id,
					category_id:goods_info.category_id,
					goods_id:goods_info.goods_id,
					goods_title:goods_info.goods_title,
					img:goods_info.img,
					original_price:goods_info.original_price,
					price:goods_info.price,
					promotion:goods_info.promotion,
					num:snum+1,
					unit:goods_info.unit,
					spec:this.spec,
					site:2,
					status:1,
					remark:goods_info.remark,
					sgt_ids:goods_info.sgt_ids,					
				}
				//console.log(glist);
				this.shoppingCarts = glistx.concat(glist);
				
				//写入缓存
				uni.setStorage({
					key: 'shoppingCarts',
					data:this.shoppingCarts,
					success: function () {
					}
				});
				this.sumShoppingCartNum();
				//console.log(this.shoppingCarts);
			},
			sumShoppingCartNum(){
				//合计购物车数量
				var snum = 0;
				for(let i in this.shoppingCarts){
					if(this.shoppingCarts[i].stores_id==this.xshopInfo.store.stores_id){
						snum+=parseFloat(this.shoppingCarts[i].num);
					}					
				}
				this.shoppingCartNum = snum;
			},
			onFinish() {
				uni.showToast({
					icon: 'none',
					title: '倒计时结束'
				})
			},
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
			get_xxb(barcode_id,price){//获取希希贝的返利信息
				if(this.memberinfo.openid==undefined){
					var member_mark = '';
				}else{
					var member_mark = this.memberinfo.openid;
				}
				var arr ={
						member_mark: member_mark,
						barcode_id:barcode_id,
						stores_id:this.xshopInfo.store.stores_id,
						price:price,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/app_xxb/aapi_xxb/xxb_goods',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {						
						if(res.data.status=='y' && res.data.length != 0){
							this.xxb_num = res.data.data.num;
						}
						//this.yemxList = res.data.data;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getGg(){
				//获取公告信息
				var xarr ={
						};
				var xpdata = url.getSignStr(xarr);
				uni.request({
								url:url.websiteUrl+'/api_v2/mall_base/base_set',
								method:'POST',
								dataType:'json',
								header:{
									'content-type':'application/x-www-form-urlencoded'
								},
								data:xpdata,
								success: xres => {
									if(xres.data.status=='y'){
										this.announce_seat = xres.data.data.announce_seat;
										//获取公告信息
										var arr ={
													stores_id:this.xshopInfo.store.stores_id,
												};
										var pdata = url.getSignStr(arr);
										uni.request({
														url:url.websiteUrl+'/api_v2/mall_base/announce',
														method:'POST',
														dataType:'json',
														header:{
															'content-type':'application/x-www-form-urlencoded'
														},
														data:pdata,
														success: res => {
															//console.log(res.data);
															var tg_str = ''
															for (let i in res.data.data) {
																tg_str += res.data.data[i].name+" ";										
															}
															this.tg_str = tg_str;															
														}
										});
									}									
								}
				});
			},
			goTgList(){
				uni.navigateTo({
					url:"/pagesb/center/tg"
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
						if(this.selectArr[y1] != ""){
							selectArrx[k1] = this.selectArr[y1];
							str_xzSpec += this.selectArr[y1]+",";
							k1++;
						}
					}
					if(selectArrx.length == this.choice.choice_spec.length){
						var goodsAttr = [];
						for (let y2 in this.goodsinfos) {
							var str_sp = "";
							for (let y3 in this.goodsinfos[y2].specs) {
								str_sp += this.goodsinfos[y2].specs[y3].spec_attr_val_name+",";
							}
							if(str_sp == str_xzSpec){
								goodsAttr = this.goodsinfos[y2];
							}
						}
						this.goodsinfo = goodsAttr;
						this.get_xxb(this.goodsinfo.barcode_id,this.goodsinfo.price);
						//读出对应的商品备注
						var choice_tag = [];
						var k = 0;
						for (let i in this.choice.choice_tag) {
							if(this.choice.choice_tag[i].barcode_id == this.goodsinfo.barcode_id){
								choice_tag[k] = {
									goods_tag:this.choice.choice_tag[i].goods_tag,
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
			ggxz(type,data,xdata){
				if(type==1){
					//切换单位
					var choice_unit = [];
					for(let u in this.choice_unit){
						this.choice_unit[u].site = 1;
						if(this.choice_unit[u].unit_id == data){
							this.choice_unit[u].site = 2;
						}
						choice_unit[u] = {
								unit:this.choice_unit[u].unit,
								unit_id:this.choice_unit[u].unit_id,
								site:this.choice_unit[u].site,
						}
					}
					this.choice_unit = choice_unit;
					//切换单位的时候切换商品数据
					for(let g in this.goodsinfos){
						if(this.goodsinfos[g].unit_id == data){
							this.goodsinfo = this.goodsinfos[g];
						}
					}
					this.get_xxb(this.goodsinfo.barcode_id,this.goodsinfo.price);
				}
				if(type==3){//备注信息的选中效果
					var oneTag = [];
					for(let u in this.choice_tag){
							//console.log(this.choice_tag[u].goods_tag.name);
							var threeTag = [];
							for(let u3 in this.choice_tag[u].goods_tag.tag){
								if(this.choice_tag[u].goods_tag.name == xdata){
									this.choice_tag[u].goods_tag.tag[u3].site = 1;
								}
								if(this.choice_tag[u].goods_tag.name == xdata && this.choice_tag[u].goods_tag.tag[u3].tag_name == data){
									this.choice_tag[u].goods_tag.tag[u3].site = 2;
								}
								threeTag[u3] = {
									tag_id:this.choice_tag[u].goods_tag.tag[u3].tag_id,
									tag_name:this.choice_tag[u].goods_tag.tag[u3].tag_name,
									site:this.choice_tag[u].goods_tag.tag[u3].site,
								}
							}
							
							if(this.choice_tag[u].goods_tag.name == xdata){
								this.choice_tag[u].goods_tag.site = 1;
							}
							if(this.choice_tag[u].goods_tag.name == xdata && data=="自定义"){
								this.choice_tag[u].goods_tag.site = 2;
							}
						oneTag[u] = {
							goods_tag:{
								name:this.choice_tag[u].goods_tag.name,
								tag:threeTag,
								site:this.choice_tag[u].goods_tag.site,
								t_name:this.choice_tag[u].goods_tag.t_name,
								is_must:this.choice_tag[u].goods_tag.is_must,
								sgt_id:this.choice_tag[u].goods_tag.sgt_id,
							},
						}
					}
					this.choice_tag = oneTag;
				}
			},
			async share(e) {
				//首先获取到会员id
				var arr ={
							member_openid:this.memberinfo.openid,
						};
				var pdata = url.getSignStr(arr);
				uni.request({
								url:url.websiteUrl+'/api_v2/member/member_info',
								method:'POST',
								dataType:'json',
								header:{
									'content-type':'application/x-www-form-urlencoded'
								},
								data:pdata,
								success: res => {
									//console.log(res.data);
									if(res.data.status =='y'){
										var str_cs = '?mid='+res.data.data.member_id+'&stores_id='+this.xshopInfo.store.stores_id;
									}else{
										var str_cs =  '?stores_id='+this.xshopInfo.store.stores_id;
									}
									//console.log(res.data.data.member_id);
									//获取分享的图片
									//此接口限制了传参字段字符长度不能超过32个字符
									var arr ={
												qrcode:'pages/home/index',
												parameter:str_cs,
												poster:1,
											};
									var pdata = url.getSignStr(arr);
									uni.request({
													url:url.websiteUrl+'/api_v2/marketing/get_xcxqrcode',
													method:'POST',
													dataType:'json',
													header:{
														'content-type':'application/x-www-form-urlencoded'
													},
													data:pdata,
													success: res => {
														//console.log(res.data);return;
														//console.log(res.data.data.img);return;
														//分享代码
														uni.share({
														    provider: "weixin",
														    scene: "WXSceneSession",
														    type: 2,
														    imageUrl: res.data.data.img,
														    success: function (res) {
														        console.log("success:" + JSON.stringify(res));
														    },
														    fail: function (err) {
														        console.log("fail:" + JSON.stringify(err));
														    }
														});
													}
									});
								}
				});
				
			},
			goGwc() {
				uni.switchTab({//reLaunch 这是直接进入，没有滑动效果。switchTab有滑动效果
					url:"/pages/shoppingcart/shoppingcart"
				})
			},
			goPlList(barcode_id){
				uni.navigateTo({
					url:"/pages/goods_details/goods_pl_list?barcode_id="+barcode_id
				})
				return;
			},
			goSpec(data,barcode_id,goods_title,predicts){
				//console.log(data);return;
				var spec = [];
				var mi = 0;
				for(var i in data){
					spec[mi] = {
						barcode_id:data[i]['barcode_id'],
						goods_id:data[i]['goods_id'],
						original_price:data[i]['original_price'],
						price:data[i]['price'],
						promotion:data[i]['promotion'],
						spec:data[i]['spec'],
						spec_id:data[i]['spec_id'],
						unit:data[i]['unit'],
						imgs:data[i]['imgs'],
					}
					mi++;
				}
				uni.navigateTo({
					url:"/pages/goods_details/spec_list?specinfo="+JSON.stringify(spec)+"&barcode_id="+barcode_id+"&goods_title="+goods_title+"&predicts="+predicts
				})
				return;
			},
			//商品详情页的评价列表
			xPjList(data){
				//获取信息
				var arr ={
									stores_id:this.xshopInfo.store.stores_id,
									barcode_id:data.barcode_id,
									member_openid: this.memberinfo.openid,
									limit:3,
									offset:0,
								};
				var pdata = url.getSignStr(arr);
				uni.request({
								url:url.websiteUrl+'/api_v2/mall_shop_v2/goods_evaluate',
								method:'POST',
								dataType:'json',
								header:{
									'content-type':'application/x-www-form-urlencoded'
								},
								data:pdata,
								success: res => {
									//console.log(res.data.data);
									this.pjList = res.data.data;
									this.praise = res.data.total;
									
								}
				});
			},
			//获取当前上级推荐人分享的店铺
			getTjrShop(data){
						//获取信息
						var arr ={
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
								//console.log(res.data.data);
								for(var i in res.data.data){
									if(res.data.data[i].stores_id==data.stores_id){
										try {//从本地缓存中同步获取指定 key 对应的内容。
											var xvs = uni.getStorageSync('xshopInfo');
											//写入缓存
											var xxx = {
												address:xvs.address,
												current:xvs.current,
												store:res.data.data[i],
											}
										} catch (e) {
											// error
										}
										//this.hhhj = res.data.data[i];
										try {
											uni.setStorage({
												key: 'xshopInfo',
												data:xxx,
												success: function () {
												}
											});
										} catch (e) {
											// error
										}
										this.getInfo(data);
										
									}
								}
							},
							fail: () => {},
							complete: () => {}
						});
					
			},
			//获取详情页基本信息
			getInfo(data){
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
								}
								if(valuex){
									this.shoppingCarts = valuex;
								}
				} catch (e) {
								// error
				}
				//console.log(this.shoppingCarts);
				this.barcode_id = data.barcode_id;
				//获取信息
				var arr ={
									stores_id:this.xshopInfo.store.stores_id,
									barcode_id:data.barcode_id,
									member_openid: this.memberinfo.openid,
								};
				var pdata = url.getSignStr(arr);
				uni.request({
								url:url.websiteUrl+'/api_v2/mall_shop_v2/goods_details',
								method:'POST',
								dataType:'json',
								header:{
									'content-type':'application/x-www-form-urlencoded'
								},
								data:pdata,
								success: res => {
									this.goodsinfo = res.data.data.goods[0];
									//console.log(this.sale_num);
									this.choice = res.data.data;
									//读出默认备注组
									var choice_tag = [];
									var k = 0;
									for (let i in res.data.data.choice_tag) {
										if(res.data.data.choice_tag[i].barcode_id == res.data.data.goods[0].barcode_id){
											//this.choice_tag = res.data.data.choice_tag[i].goods_tag;											
											choice_tag[k] = {
												goods_tag:res.data.data.choice_tag[i].goods_tag,
											}
											k++;
										}
									}
									this.choice_tag = choice_tag;
									for (let i in this.choice_tag) {//默认把备注标签加上一个t_name字段
										this.choice_tag[i].goods_tag.t_name = "";
									}
									//console.log(this.choice_tag);
									//读出默认规格
									var  x_choice_spec = [];
									var str_spec = '';//得到一级规格的名称
									for (let s in res.data.data.choice_spec) {
										var x_list = [];
										for (let s2 in res.data.data.choice_spec[s].val) {
											x_list[s2] = {
												name:res.data.data.choice_spec[s].val[s2].name,
												//spec_attr_val_id:res.data.data.choice_spec[s].val[s2].spec_attr_val_id,
											}
										}
										str_spec += res.data.data.choice_spec[s].name+",";
										x_choice_spec[s] = {
											name:res.data.data.choice_spec[s].name,
											list:x_list,
										}
									}
									//this.simulatedDATA.specifications = x_choice_spec;
									//得到都有哪些规格
									var  s_choice_spec = [];
									for (let sL in res.data.data.goods) {
										var x_str_spec = '';//得到二级规格的名称
										for (let sL2 in res.data.data.goods[sL].specs) {
											x_str_spec += res.data.data.goods[sL].specs[sL2].spec_attr_val_name+",";
										}
										s_choice_spec[sL] = {
											attribute2:str_spec.substring(0,str_spec.length-1),
											attribute6:x_str_spec.substring(0,x_str_spec.length-1),
											uid:sL,
										}
									}
									///**x_choice_spec
									this.simulatedDATA = {
										difference:s_choice_spec,
										specifications:x_choice_spec,
									};
									this.initializeData();//
									this.checkItem(-1);//
									//**/
									//读出默认单位
									for (let u in res.data.data.choice_unit) {
										if(res.data.data.choice_unit[u].unit == res.data.data.goods[0].unit){
											res.data.data.choice_unit[u].site = 2;
										}
										
									}
									this.choice_unit = res.data.data.choice_unit;
									this.goodsinfos = res.data.data.goods;
									this.spec_id = res.data.data.goods[0].spec_id;
									this.spec = res.data.data.goods[0].spec;
									this.xPjList(data);
									this.get_xxb(res.data.data.goods[0].barcode_id,res.data.data.goods[0].price);
									this.xShow = true;
									uni.hideLoading();
								}
				});
			},
			//获取活动详情
			getHdGoods(data){
				//获取信息
				var arr ={
						s_id:data.s_id,
						};
				var pdata = url.getSignStr(arr);
				uni.request({
						url:url.websiteUrl+'/app_seckill/aapi_seckill/get_goods_details',
						method:'POST',
						dataType:'json',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:pdata,
						success: res => {
							var timeStr = (Number(res.data.data.times.h * 3600)+Number(res.data.data.times.i * 60)+Number(res.data.data.times.s))*1000;
							//console.log(timeStr);
							this.time = timeStr;
							//如果还要设置天, 时, 秒, 在上面声明绑定后, 在这里赋值即可
							//我的项目中只赋值一次, 所以直接设为true了
							this.hd = res.data.data;
							this.xreset = !this.xreset;
							// console.log9
							this.tips = res.data.data.msg
							this.hour = res.data.data.times.h;
							this.minute = res.data.data.times.i;
							this.second = res.data.data.times.s;
						}
				});
			},
			goHome(){
				uni.switchTab({
					url:"../home/index"
				})
			},
			goToMs() {//去秒杀length
				//检查是否登录，没有登录的跳转到登录界面
				//console.log(this.login);
				uni.showToast({
					title: '正在加载...',
					icon:'none',
					duration: 2000
				});
				try {//从本地缓存中同步获取指定 key 对应的内容。
					var value = uni.getStorageSync('memberinfo');
					if (value.length==0) {
						this.login = false;
					}else{
						this.login = true;
					}
				} catch (e) {
								// error
				}
				if(this.memberinfo.length==0){
					uni.navigateTo({
						url:"/pages/login/login"
					})
					return;
				}
				//加入购物前先检查有没有选择规格
				if(this.choice.choice_spec.length > 0){
					var selectArrx = [];
					var k1 = 0;
					for (let y1 in this.selectArr) {
						if(this.selectArr[y1] != ""){
							selectArrx[k1] = this.selectArr[y1];
							k1++;
						}
					}
					if(selectArrx.length < this.choice.choice_spec.length){
						uni.showToast({
							title: '请选择规格',
							duration: 2000,
							icon:"none",
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
					if(this.choice_tag[b].goods_tag.is_must==1){
						tag_name += this.choice_tag[b].goods_tag.name+",";
						allbzxzInt  += this.choice_tag[b].goods_tag.sgt_id+",";
					}
					var str_bz = "";
					var sgt_ids_b = "";
					var bzInt_b = "";
					for (let b1 in this.choice_tag[b].goods_tag.tag) {
						if(this.choice_tag[b].goods_tag.tag[b1].site == 2 && this.choice_tag[b].goods_tag.tag[b1].tag_id > 0){
							str_bz = this.choice_tag[b].goods_tag.name+":【"+this.choice_tag[b].goods_tag.tag[b1].tag_name+"】";
							sgt_ids_b = this.choice_tag[b].goods_tag.sgt_id;
							if(this.choice_tag[b].goods_tag.is_must==1){
								bzInt_b  = this.choice_tag[b].goods_tag.sgt_id;
							}
						}
						if(this.choice_tag[b].goods_tag.tag[b1].site == 2 && this.choice_tag[b].goods_tag.tag[b1].tag_id == 0){
							str_bz = this.choice_tag[b].goods_tag.name+":【"+this.choice_tag[b].goods_tag.t_name+"】";
							sgt_ids_b = this.choice_tag[b].goods_tag.sgt_id;
							if(this.choice_tag[b].goods_tag.is_must==1){
								bzInt_b  = this.choice_tag[b].goods_tag.sgt_id;
							}
						}
					}
					if(str_bz!=''){
						bjRemark += str_bz+",";
						sgt_ids += sgt_ids_b+",";
						if(this.choice_tag[b].goods_tag.is_must==1){
							bzInt += bzInt_b+",";
						}
					}
				}
				//检查备注信息是不是必须选择，如果是要先选择备注信息
				if(allbzxzInt != bzInt){
					uni.showToast({
						title: "请选择："+tag_name,
						duration: 2000,
						icon:"none",
					});
					return;
				}
				//查询一下有没有默认收货地址
				var aarr ={
						openid: this.memberinfo.openid,
						is_default:1,
					};
				var apdata = url.getSignStr(aarr);
				uni.request({
					url:url.websiteUrl+'/api_v2/member_addres_act/index',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:apdata,
					success: ares => {
						//console.log(ares.data);
						if(ares.data.data.length==0){
							uni.showToast({
							    icon: 'none',
							    title: '请先设置收货地址',
							});
							uni.navigateTo({
								url:"../goods_details/address_list"
							})
							return;
						}						
						//请求秒杀接口获取数据
						var arr ={
									s_id:this.s_id,
									member_openid:this.memberinfo.openid,
								};
						var pdata = url.getSignStr(arr);
						uni.request({
							url:url.websiteUrl+'/app_seckill/aapi_seckill/seckill',
							method:'POST',
							dataType:'json',
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							data:pdata,
							success: res => {
								if(res.data.status=='n'){
									uni.showToast({
									    icon: 'none',
									    title: res.data.info,
									});
									return;
								}
								
								
								this.hd.is_kill = 1;
								//抢购成功去生成订单
								var goods_l = [];
								goods_l[0] = {
										stores_id:this.xshopInfo.store.stores_id,
										barcode_id:this.goodsinfo.barcode_id,
										num:1,
										remark:bjRemark,
										sgt_ids:sgt_ids,
								}
								//console.log(this.xshopInfo.store.stores_id,this.hd.barcode_id);
								var parr ={
										member_openid: this.memberinfo.openid,
										stores_id:this.xshopInfo.store.stores_id,
										goods:JSON.stringify(goods_l),
										s_id:this.s_id,
									};
								//console.log(arr);return;
								var xpdata = url.getSignStr(parr);
								uni.request({
									url:url.websiteUrl+'/api_v2/mall_order/pre_order',
									method:'POST',
									dataType:'json',
									header:{
										'content-type':'application/x-www-form-urlencoded'
									},
									data:xpdata,
									success: xres => {
										//console.log(res.data);return;
										if(xres.data.status=='y'){											
											//var xkthis = this;
											this.hd.is_kill = 2;
											//return;
											//console.log(this.wx_tpl);return;
											uni.navigateTo({
												url:"../goods_details/order_sure?order_code="+xres.data.data.order_code+"&goods_l="+JSON.stringify(goods_l)+"&s_id"+this.s_id
											})
										}else{
											uni.showToast({
												icon:'none',
												title: xres.data.info,
											});
											return;
										}						
									}
								});
							}
						});
					}
				});
				
			}
		}
	}
</script>
<style>
	page {
		background-color: #F6F6F6;
	}
	.imgwidth{width: 750upx; height:600upx;}
	.imgwidth2{width: 750upx; height:450upx;}
	.navigat-arrow-xl{
		font-size: 32upx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}
	.shop-menu{
		position: fixed; z-index: 1000; bottom: 0upx;
	}
	.detial img{
		min-width: 100%;
	}
	.addcart{
		position: absolute;
		z-index: 1000;
		background-color: #D0021B;
		color: white;
		font-size: 8pt;
		min-width: 30upx;
		height: 30upx;
		line-height: 30upx;
		padding: 5upx;
		border-radius:40upx;
		top: 25upx;
		left: 60upx;
	}
	.ggkey{
		padding: 10upx 0upx;
	}
	.ggrow{
		padding: 10upx 20upx;
		border-radius:10upx;
		margin-right: 15upx;
		margin-bottom: 15upx;
	}
	.article-content {
		padding: 0 30upx;
		overflow: hidden;
		font-size: 30upx;
		margin-bottom: 30upx;
	}
	
	.container {
		padding: 0upx;
	}
	.case {
		display: flex;
		margin: 0upx 20upx;
	}
	.case > .title {
		margin-right: 10upx;
	}
	.custom {
		display: flex;
	}
	.custom :nth-child(odd) {
		background-color: #ffffff;
		padding: 0 4upx;
		color: #FF4343;
		border-radius: 5upx;
		text-align: center;
	}
	.custom :nth-child(even) {
		padding: 0 5upx;
	}
	.reset-btn {
		margin: 0upx 10upx;
		padding: 20upx;
		text-align: center;
		background-color: red;
		border-radius: 10upx;
		color: white;
	}
	.hengfu{
		height: 90upx;
		width: 750upx;
		background-color: #fa6262;
		position: relative;
	}
	.textheng{
		height: 90upx;
		line-height: 45upx;
		font-size: 28upx;
		color: #fff;
	}
	.left{
		position: absolute;
		width: 210upx;
		height: 90upx;
		right: 0;
		background-color: #FE0000;
	}
	.left_img{
		width: 34upx;
		height: 34upx;
	}
	.newstyle{
		height: 30upx;
		width: 30upx;
	}
	.uni-countdown__number{
		height: 30upx !important;
		border: none !important;
		background-color: none !important;
		background:none !important;
		margin: 0 !important;
		padding: 0 !important;
	}
	.uni-countdown__splitor{
		padding: 0 3upx !important;
		color: #fff !important;
	}
	.textjiage{
		font-size: 28upx;
		color: #fff;
		margin-left: 22upx;
		height: 90upx;
		line-height: 90upx;
	}
	.textjiage text{
		font-size: 24upx;
		padding-left: 20upx;
		text-decoration: line-through;
	}
	.newagain{
		height: 160upx;
		width: 710upx;
		border-radius: 10upx;
		margin-left: 20upx;
	}
	.text_title{
		font-size: 36upx;
		color: #333333;
		margin-top: 30upx;
		margin-left: 20upx;
		line-height: 90upx;
	}
	.textmiaoshu{
		font-size: 24upx;
		color: #C0C0C0;
		margin-left: 20upx;
		margin-top: 10upx;
	}
	.peisong{
		width: 710upx;
		height: 98upx;
		margin-left: 20upx;
		border-radius: 10upx;
		font-size: 28upx;
		
	}
	.peisong view{
		height: 98upx;
		line-height: 98upx;
		margin-left: 20upx;
	}
	.peisong text{
		font-size: 24upx;
		padding-left: 20upx;
		color: #999;
	}
	.time_peisongs{
		height: 220rpx;
		width: 710rpx;
		margin-left: 20rpx;
		margin-top: 20rpx;
		border-radius: 10rpx;
	}
	.shop_detail{
		font-size: 28rpx;
		color: #333;
		margin-top: 20rpx;
		padding-left: 20rpx;
		margin-bottom: 20rpx;
	}
	.shop_jieshao{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		
	}
	.shop_text45{
		width: 45%;
		font-size: 24rpx;
		color: #999;
		line-height: 42rpx; 
		padding-left: 20rpx;
	}
	.shop_text45 text{
		font-size: 24rpx;
		color: #333;
		margin-left: 37rpx;
	}
	.shop_detailsss{
	  width: 710upx;
	  border-radius: 10upx;
	  margin-left: 20upx;
	 }
	 .gouwuche_two{
	 	height: 78upx;
	 	width: 230upx;
	 	line-height: 78upx;
	 	font-size: 28upx;
	 	color: #fff;
	 	border-radius: 40upx;
	 	background-color: #FE0000;
	 	margin-top: 10upx;
	 	margin-right: 20upx;
		margin-bottom: 10upx;
	 }
</style>
