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

			<!-- 爆品 -->
			<view class="x12 hengfu" v-if="isgroups==false && isHot==true && isMark==false && isNew==false" >
				<view class="x12 left">
					<view class="baopin">爆品推荐</view>
				</view>
				<view class="textjiage">￥{{goodsinfo.price}}/{{goodsinfo.unit}}<text>原价￥{{goodsinfo.retail_price}}/{{goodsinfo.unit}}</text></view>
			</view>
			<!-- 新人 -->
			<view class="x12 hengfu" v-if="isgroups==false && isHot==false && isMark==false && isNew==true" >
				<view class="x12 left">
					<view class="baopin">新人专享</view>
				</view>
				<view class="textjiage">￥{{goodsinfo.price}}/{{goodsinfo.unit}}<text>原价￥{{goodsinfo.retail_price}}/{{goodsinfo.unit}}</text></view>
			</view>
			<!-- 晚间 -->
			<view class="x12 hengfu" v-if="isgroups==false && isHot==false && isMark==true && isNew==false" >
				<view class="x12 left">
					<view class="baopin">晚间菜场</view>
					<!-- <view style="display: flex; align-items: center;" >
						<view><image class="left_img" src="https://div.buy315.com.cn/xcx_imgs/c-set.png" style="margin-left: 20upx;"></image></view>
						<view style="height: 90upx;  font-size: 24upx; color: #fff; margin-left: 20upx; margin-top: 8upx;">
							<view style="margin-left: 5upx;">距结束</view>
							<view class="newstyle" style="margin-left: 37upx;">
								{{eveningListtime.end_time}}
								<uni-countdown color="#fff"  :show-day="false" :hour="h" :minute="m" :second="s"></uni-countdown>
							</view>
						</view>
					</view> -->
				</view>
				<view class="textjiage">￥{{goodsinfo.price}}/{{goodsinfo.unit}}<text>原价￥{{goodsinfo.retail_price}}/{{goodsinfo.unit}}</text></view>
			</view>
			<!-- 拼团 -->
			<view class="x12 hengfu" v-if="isgroups==true && isHot==false && isMark==false && isNew==false" >
				<view class="x12 left this_pintuan">
					<view style="color: #fff; font-size: 24upx;">{{buylistpintuan.xcx_start_time + '-' + buylistpintuan.xcx_end_time}} </view>
					<view style="font-size: 24upx; color: #fff; ">23:59</view>
					<!-- <view class="newstylesss">
						<uni-countdown color="#fff"  :show-day="false" :hour="s" :minute="s" :second="s"></uni-countdown>
					</view> -->
				</view>
				<view class="textjiage">团购价￥{{buylistpintuan.current_price}}/{{buylistpintuan.unit_name}}<text>原价￥{{goodsinfo.retail_price}}/{{goodsinfo.unit}}</text></view>
			</view>
	
		<view class="x12 bg-white newagain " style="margin-top:20upx;">
			<view class="x12" v-if="goodsinfo.length != 0">
				<view class="x12">
					<view class="x12 text-large text_title">{{goodsinfo.goods_title}}</view>
					<view  v-if="isgroups==false && isHot==false && isMark==false && isNew==false"  style="color: #FE0000; font-size: 30upx; margin-left: 20rpx; font-weight: 400;">￥{{goodsinfo.original_price}}</view>
					<!-- <view class="textmiaoshu">商品描述商品描述商品描述商品描述商品描述商品描述商品描述述商品描述</view> -->
					<view class="x12 schedule" v-if="isgroups==true">
					  <view class="schedule_all" style="display: flex;" >
						  <view class="schedule_quan" v-for="(item,index) in buylistpintuan.data" :key='index'>
							  <view class="schedule_up">{{item.number}}份</view>
							 
							  <view class="schedule_down">{{item.unit_price}}元/份</view>
						  </view>
					  </view>
						<view class="schedule_heng">
							<view class="kuan" :style="{width:Math.floor(buylistpintuan.current_number/buylistpintuan.data[3].number*100) + '%' }"></view>
						</view>
						
						
						<view style="font-size: 22upx; position: absolute; top: 135upx;color: #999; left: 20upx;">已累计拼成{{buylistpintuan.current_number}}份
						<text style="margin-left: 20rpx;">总数量{{buylistpintuan.total_num}}</text>
						</view>
					</view>
					
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
			
			<view v-if="isgroups==true">配送<text>拼团成功后,1-3日内配送 可自提</text></view>
			<view v-if="isgroups==false">配送<text>今日达</text></view>
		</view>
		<view class="x12 bg-white time_peisongs">
			<view class="shop_detail">商品详情</view>
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
		<!-- 拼团 -->
		<view class="x12 shop-menu" v-if="isgroups == true && isNew == false && isMark == false && isHot == false">
			<view class="x12 bg-white text-default text-333 border-top border-gray">
				<view style="margin-left: 30rpx; box-sizing: border-box;">					
					<view class="x-auto"  @click="rotohome" style="height: 50upx; padding: 15upx 0 0 20upx;">
						<image src="../../static/index-1.png" style="width: 42upx; height: 42upx; margin-left: 10upx;"></image>
						<view style="font-size: 24upx;">回首页</view>
					</view>
				</view>
				<view class="x6 text-white float-right text-center gouwuche_three pintuangouwu" @click="open()">
					  <view style="font-size: 28upx; line-height: 80upx;"> 
						  <!-- ￥{{buylistpintuan.current_price}} -->
						<view>一键参团</view>
					  </view>
					  
				</view>
			</view>
		</view>
			<view class="x12 shop-menu" v-else>
				<view class="x12 bg-white text-default text-333 border-top border-gray">
					<view >					
						<view class="x-auto"  @click="goGwc" style="height: 50upx; padding: 15upx 0 0 20upx;">
							<image src="../../static/hot-1.png" style="width: 64upx; height: 55upx;"></image>
							<view class="addcart text-center">
								{{shoppingCartNum}}
							</view>
						</view>
					</view>
					<view class="x6 text-white float-right text-center this_lijigoum"   v-if="goodsinfo.sale_num !== 0" @click="goToMs">
						立即购买
					</view>
					<view class="x6 text-white float-right text-center this_shouqin"  v-if="goodsinfo.sale_num === 0">
						已售罄
					</view>
					<view class=" text-white float-right text-center this_gouwuche"  v-else @click="addToCart">
						加入购物车
					</view>
				</view>
			</view>
			<!-- 新人 -->
			<view class="x12 shop-menu" v-if="isNew==true">
				<view class="x12 bg-white text-default text-333 border-top border-gray">
					<view style="margin-left: 30rpx; box-sizing: border-box;">					
						<view class="x-auto"  @click="rotohome" style="height: 50upx; padding: 15upx 0 0 20upx;">
							<image src="../../static/index-1.png" style="width: 42upx; height: 42upx; margin-left: 10upx;"></image>
							<view style="font-size: 24upx;">回首页</view>
						</view>
					</view>
					<view class="x6 text-white float-right text-center gouwuche_two"   v-if="goodsinfo.sale_num !== 0" @click="addToCart">
						加入购物车
					</view>
				</view>
			</view>

		</view>
		<!-- 弹出层 -->
		
			<uni-popup ref="popup" type="bottom" >
				<view class="boxTop" style="display: flex;">
					<view><image class="boximg" :src="goodsinfo.imgs" ></image></view>
					<view class="boxtext">
						<view>{{goodsinfo.goods_title}}</view>
						<view class="boxpicter">￥{{buylistpintuan.current_price}}/{{buylistpintuan.unit_name}}<text>原价￥{{goodsinfo.price}}/{{goodsinfo.unit}}</text></view>
					
						<!-- <view class="boxpicter">￥{{current_price.price}}/{{current_price.unit}} <text>￥{{current_price.original_price}}/{{current_price.unit}}</text></view> -->
					</view>
						<view class="numberbox">
							<lc-number-box :value="1" :min="1" :disabled="false" :step="1" @change="daysChange" ></lc-number-box>
						</view>
			<!-- 		<view style="display: flex;" class="numberbox">
						<view ><image class="jiajian" src="https://div.buy315.com.cn/xcx_imgs/jian.png" mode=""></image></view>
						<view class="x-auto">
							<view class="numbertext">0</view>
						</view>
						<view ><image class="jiajian" src="https://div.buy315.com.cn/xcx_imgs/jia.png" mode=""></image></view>
					</view> -->
				</view>
			</uni-popup>
	</view>
</template>
<script>import url from '../../main.js';
import service from '../../service.js';
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
import lcNumberBox from '@/components/lc-number-box/lc-numberBox.vue'
	export default {
		components: {uniNoticeBar,uniPopup, uniPopupMessage,uniPopupDialog,lcNumberBox,},
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
				  path: '/pages/goods_details/goods_details?member_openid='+mv.openid+"&stores_id="+xv.store.stores_id+"&barcode_id="+this.barcode_id
				}
			} catch (e) {
				// error
			}
			
		  },
		//#endif
		data() {
			return {
				config:{
					title: '商品详情',
					color: '#ffffff',
					backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
					statusBarFontColor:'#fff'
				},
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
			goodsinfo:[],
			goodsinfos:[],
			//xstrs:'',
			pjList:[],
			buylistpintuan:[],
			spec_num:0,
			spec_id:0,
			spec:'',
			eveningListtime:'',
			isClass:false,
			shoppingCarts:[],
			shoppingCartNum:0,
			xshopInfo:[],
			groupbuyfen:[{
				number:'10/份',
				unit_price:'25/份'
			},
			{
				number:'10/份',
				unit_price:'25/份'
			},
			{
				number:'10/份',
				unit_price:'25/份'
			},
			{
				number:'10/份',
				unit_price:'25/份'
			}],
			stores_name:'',
			praise:0,
			barcode_id:0,
			jjkkjj:0,
			fx:false,
			zxkf:false,
			tg_str:'',//通告
			announce_seat:1,
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
			price:0,
			dwxlogin:false,
			xcode:'',
			deployinfo:{},
			tjr_id:'',
			newkuan:'',
			flag:false,
			numbersss:0,
			isHot:true,
			isNew:true,
			isMark:true,
			isgroups:true
			}
		},
		onShow:function(){//返回时接收子页面的传参
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
					return;
				}
				// uni.showLoading({
				// 	title: '加载中'
				// });
				
		},
		onLoad:function(data){
			uni.showLoading({
			    title: '加载中'
			});
			//#ifdef MP-WEIXIN
			this.dwxlogin = true;
			//#endif
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
			this.getbarwidth();
		 },
		methods: {

			rotohome(){
				uni.switchTab({
					url:'/pages/home/index'
				})
			},
			daysChange(e){
				this.numbersss = e
				console.log(e)
			},
			open(){
				
				if(this.flag==false){
					this.$refs.popup.open();
					
				}else{
					this.goToMs()
					console.log('第二次点击成功啦')
				}
				
			    this.flag=!this.flag;
			     },
			gotodingdan(){
				
				// uni.navigateTo({
				// 	url:'./add_address'
				// })
			},
			getbarwidth(){
				// console.log(this.scheduleList[0].up )
				 this.newkuan = (Math.floor(100/400*10000) / 100.00 + "%")
				 console.log(this.newkuan,'新的宽值')
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
			getPhoneNumber: function (e){
				console.log(e)
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
							},
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
				console.log(this.xcode);
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
				  		//console.log(res);						
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
						//console.log(res.data);
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
				try {//从本地缓存中同步获取指定 key 对应的内容。
					this.deployinfo = uni.getStorageSync('deployinfo');
					this.announce_seat = this.deployinfo.announce_seat;
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
										var tg_str = ''
										for (let i in res.data.data) {
											tg_str += res.data.data[i].name+" ";										
										}
										this.tg_str = tg_str;
									}
					});
				} catch (e) {
					// error
				}
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
					//console.log(this.goodsinfo);
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
			goToMs() {//立即购买
				//检查是否登录，没有登录的跳转到登录界面
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
				//this.hd.is_kill = 1;
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
							//this.hd.is_kill = 2;
							uni.navigateTo({
								url:"../goods_details/address_list"
							})
							return;
						}						
						
							//抢购成功去生成订单
							var goods_l = [];
							goods_l[0] = {
									stores_id:this.xshopInfo.store.stores_id,
									barcode_id:this.goodsinfo.barcode_id,
									num:this.numbersss,
									remark:bjRemark,
									sgt_ids:sgt_ids,
							}
						
							//console.log(this.xshopInfo.store.stores_id,this.hd.barcode_id);
							var parr ={
									member_openid: this.memberinfo.openid,
									stores_id:this.xshopInfo.store.stores_id,
									goods:JSON.stringify(goods_l),
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
										//this.hd.is_kill = 2;
										//return;
										//console.log(this.wx_tpl);return;
										uni.navigateTo({
											url:"../goods_details/order_sure?order_code="+xres.data.data.order_code+"&goods_l="+JSON.stringify(goods_l)
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
								if(res.data.status =='n'){
									uni.showToast({
										icon:'none',
										title: res.data.info,
									});
									return;
								}
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
							duration: 1000,
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
						duration: 1000,
						icon:"none",
					});
					return;
				}
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
				console.log('***********************')
				
				//num_s参数   0和1，0为减，1为加
				//goods_info参数  一维数组
				//console.log(goods_info);
				//console.log(this.shoppingCarts);return;
				//限购数量和购物车数量对比
				if(this.isNew==true){
					for(let ixs in this.newshopcart) {
						if(this.newshopcart[ixs].barcode_id == goods_info.barcode_id) {
							if(this.newshopcart[ixs].num>0){
								uni.showToast({
									title:'新人的商品只能购买一件哦',
									icon:'none'
								})
								return false
							}
						}
						console.log(this.newshopcart.length,'长度==================')
						if(this.newshopcart.length>0){                                       
							uni.showToast({
								title:'新人的商品只能购买一件哦',
								icon:'none'
							})
							return false
						}
					}
				}else{
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
				}
				uni.showToast({
					title: '加入成功',
					duration: 1000
				});
			
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
				this.newshopcart = glistx.concat(glist);
				//写入缓存
				uni.setStorage({
					key: 'shoppingCarts',
					data:this.shoppingCarts,
					success: function () {
					}
				});
				uni.setStorage({
					key: 'newshopcart',
					data: this.shoppingCarts,
					success: function() {}
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
						this.login = true;
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
						if(res.data.status=='n'){
							uni.showToast({
							    icon: 'none',
							    title: '暂无此商品',
								duration: 5000
								
							});
							setTimeout(function() {
								uni.navigateBack({
								    delta: 1,
									duration: 3000
								});  
							}, 1500) 
						}else{
						// if(res.data.)
						console.log(res.data.data,'res.data.data')
						this.isHot = res.data.data.goods[0].is_hot_money
						this.isNew = res.data.data.goods[0].is_new_people_goods
						this.isMark = res.data.data.goods[0].is_evening_market
						this.isgroups = res.data.data.goods[0].is_group_buying
						this.buylistpintuan = res.data.data.goods[0].group_buying_info
						this.eveningListtime = res.data.data.goods[0].evening_market_info
						console.log(this.buylistpintuan)
						console.log(res.data.data.goods[0].is_hot_money)
				
					this.marketList = res.data.data;
					this.xtime = res.data.data.end_time
					var new_date = new Date(); //新建一个日期对象，默认现在的时间
					var old_date = new Date(this.xtime); //设置过去的一个时间点，"yyyy-MM-dd HH:mm:ss"格式化日期
					var difftime = (old_date - new_date) / 1000; //计算时间差,并把毫秒转换成秒
					var days = parseInt(difftime / 86400); // 天  24*60*60*1000 
					var hours = parseInt(difftime / 3600) - 24 * days;    // 小时 60*60 总小时数-过去的小时数=现在的小时数 
					var minutes = parseInt(difftime % 3600 / 60); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
					var seconds = parseInt(difftime % 60);  // 以60秒为一整份 取余 剩下秒数
					console.log('difftime' + difftime)
					console.log('现在时间：' + new_date)
					console.log('自定义时间：' + old_date)
					console.log("时间差是: " + days + "天, " + hours + "小时, " + minutes + "分钟, " + seconds + "秒")
					this.d = days
					this.h = hours
					this.m = minutes
					this.s = seconds
							//console.log(res.data);
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
				
						
					}
				});
				this.sumShoppingCartNum();
			}
		}
	}
</script>
<style>
	page {
		background-color: #F7F7F7;
	}
	
	.imgwidth{width: 750upx; height:600upx;}
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
		top: 10upx;
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
	.eval_all{
		position: relative;
	}
	.evaluation{
		position: absolute;
		right: 20upx;
		font-size: 28upx;
		color: #999;
	}
	/* 新加 */
	.shoptisp{
		width: 710rpx;
		height: 160rpx;
		border-radius: 10rpx;
		margin-left: 20rpx;
	}
	.text_pictyu{
		font-size: 30rpx;
		color: #FE0000;
		font-weight: 400;
	}
	.text_pictyu text{
		font-size: 24rpx;
		color: #999;
		text-decoration: line-through;
		margin-right: 20rpx;
	}
	.biaoqian{
		font-size: 22rpx;
		color: #FF874B;
		border: 1rpx solid #FF874B;
		/* padding: 6rpx 8rpx 6rpx 8rpx; */
		width: 80rpx;
		height: 34rpx;
		line-height: 34rpx;
		text-align: center;
	}
	.time_peisong{
		margin-top: 20rpx;
		width: 710rpx;
		height: 110rpx;
		margin-left: 20rpx;
		border-radius: 10rpx;
		line-height: 50rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
	}
	.tiem_kucun{
		font-size: 28rpx;
		color: #333;
		font-weight: 400;
	}
	.tiem_kucun text{
		font-size: 24rpx;
		color: #999;
		margin-left: 20rpx;
	}
	.manjian{
		height: 40rpx;
		width: 100rpx;
		border-radius: 20rpx;
		border: 1rpx solid #FE0000;
		font-size: 22rpx;
		color: #FE0000;
		text-align: center;
		line-height: 40rpx;
		margin-left: 20rpx;
	}
	.guizer{
		font-size: 24rpx;
		color: #333;
		margin-left: 20rpx;
	}
	.time_all{
		height: 110rpx;
		line-height: 110rpx;
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
	.shop_img001{
		width: 710rpx;
		margin-left: 20rpx;
		border-radius: 10rpx;
		margin-top: 20rpx;
	}
	.lijiqugoumai{
		font-size: 28upx; 
		line-height: 78upx; 
		background-color: #FE0000;
		color: #fff;
		width: 230rpx;
		height: 78rpx;
		text-align: center;
		border-top-right-radius: 40rpx;
		border-bottom-right-radius: 40rpx;
		margin-right: 40rpx;
		margin-top: 10rpx;
	}
	.pintuangouwu{
		font-size: 28upx; 
		line-height: 39upx; 
		background-color: #FE0000;
		color: #fff;
		width: 230rpx;
		height: 78rpx;
		text-align: center;
		border-radius: 40rpx;
		margin-right: 40rpx;
		margin-top: 10rpx;
	}
	.pintuangouwusss{
		font-size: 28upx; 
		line-height: 78upx; 
		background-color: #FE0000;
		color: #fff;
		width: 230rpx;
		height: 78rpx;
		text-align: center;
		border-radius: 40rpx;
		margin-right: 40rpx;
		margin-top: 10rpx;
	}
	.jiarugoueu{
		font-size: 28upx;
		line-height: 78rpx; 
		background-color: #FF874B;
		color: #fff;
		width: 230rpx;
		height: 78rpx;
		text-align: center;
		border-top-left-radius: 40rpx;
		border-bottom-left-radius: 40rpx;
		margin-top: 10rpx;
	}
	.border-gray{
		height: 98rpx;
	}
	.img_car{
		position: absolute;
		left: 150rpx;
		top: 25rpx;
	}
	.img_idnexshouy{
		height: 42rpx;
		width: 42rpx;
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
		width: 710upx;
		border-radius: 10upx;
		margin-left: 20upx;
	}
	.text_title{
		font-size: 32upx;
		color: #333333;
		margin-top: 30upx;
		margin-left: 20upx;
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
	 	width: 220upx;
		text-align: center;
	 	height: 90upx;
	 	right: 0;
	 	background-color: #FE0000;
		/* padding: 16upx; */
		box-sizing: border-box;
	 }
	 .left_img{
	 	width: 34upx;
	 	height: 34upx;
	 }
	 .newstyle{
	 	height: 30upx;
	 	width: 30upx;
	 }
	 .newstylesss{
		 text-align: center;
	 }
	 .uni-countdown__number{
	 	height: 30upx !important;
	 	border: none !important;
	 	background-color: none !important;
	 	background:none !important;
	 	margin: 0 !important;
	 	padding: 0 !important;
		width: 35upx !important;
	 }
	 .uni-countdown__splitor{
	 	padding: 0 3upx !important;
	 	color: #fff !important;
		line-height: 30upx !important;
	 }
	 .uni-countdown{
		 display: flex;
		 justify-content: center !important;
	 }
	 .imgwidth2{width: 750upx; height:600upx;}
	 .schedule_quan{
	 	height: 26upx;
	 	width: 26upx;
	 	background-color: #FE0000;
	 	border-radius: 50%;
		position: relative;
	 }
	 .schedule_heng{
	 	width: 600upx;
	 	height: 10upx;
	 	/* background-color: #FE0000; */
	 	border: 1upx solid #FE0000;
	 	left: 58upx;
		position: absolute;
		overflow: hidden;
	 }
	 .schedule_all{
	 	display: flex;
	 	/* justify-content: space-around; */
	 	width: 607upx;
	 	left: 55upx;
	 	justify-content: space-between;
	 	align-items: center;
		position: absolute;
		top: 48rpx;
	 }
	 .schedule{
		 position: relative;
		 padding-bottom: 110rpx;
		 padding-top: 55rpx;
	 }
	 .schedule_up{
	 	font-size: 22upx;
	 	color: #666;
	 	position: absolute;
	 	bottom: 35upx;
	 	/* margin-left: -20upx; */
	 	text-align: center;
	 	width: 5em;
	 	display: block;
	 	left: 50%;
	 	transform: translateX(-50%);
	 	white-space:nowrap;
	 }
	 .schedule_down{
	 	font-size: 22upx;
	 	color: #666;
	 	width: 6em;
	 	display: block;
	 	position: absolute;
	 	text-align: center;
	 	white-space:nowrap;
	 	/* margin-left: -20upx; */
	 	left: 50%;
	 	transform: translateX(-50%);
	 	top: 35upx;
	 }
	/* .schedule_up{
		font-size: 22upx;
		color: #666;
		position: absolute;
		bottom: 35upx;
		margin-left: -20upx;
		width: 100%;
	}
	.schedule_down{
		font-size: 22upx;
		color: #666;
		width: 100%;
		position: absolute;
		margin-left: -20upx;
		top: 35upx;
	} */
	 .kuan{
	 	background-color: #FE0000;
	 	height: 10upx;
	 	border-radius: 5upx;

	 }
	 /* 弹出 */
	 .bg{
	   height: 100%;
	   width: 100%;
	   background-color: #333;
	   position: absolute;
	   top: 0;
	   opacity: 0.5;
	   position: fixed;
	 }
	 .bg_bg1{
	   height: 240rpx;
	   width: 750rpx;
	   background-color: #fff;
	   position: absolute;
	   bottom: 100rpx;
	   padding-left: 20rpx;
	   position: fixed;
	 }
	 .bg_2{
	   height: 100rpx;
	   width: 750rpx;
	   background-color: #fff;
	   position: absolute;
	   bottom: 0;
	 }
	 .bg_t1{
	   font-size: 22rpx;
	   color: #333;
	   margin-top: 20rpx;
	 }
	 .bg_picter{
	   height: 120rpx;
	   width: 120rpx;
	   margin-top: 20rpx;
	 }
	 .bg_all{
	   display: flex;
	 }
	 .bg_money{
	   display: flex;
	   font-size: 30rpx;
	   color: #FD0000;
	   margin-top: 20rpx;
	   align-items: center;
	 }
	 .bg_moneyt1{
	   font-size: 24rpx;
	   color: #999;
	   text-decoration: line-through;
	   margin-left: 20rpx;
	 }
	 .bg_biaoq{
	   display: flex;
	 }
	 .biaoqqq{
	   font-size: 22rpx;
	   color: #FF874B;
	   border: 1rpx solid #FF874B;
	   margin-right: 20rpx;
	   padding: 7rpx 12rpx;
	   margin-top: 20rpx;
	 }
	 .bg_t2{
	   font-size: 28rpx;
	   margin-top: 20rpx;
	 }
	 .bg_bgt1{
	   margin-left: 20rpx;
	 }
	 .bg_picters{
	   display: flex;
	   align-items: center;
	 }
	 .bg_picter1{
	   height: 36rpx;
	   width: 36rpx;
	   position: absolute;
	   right: 130rpx;
	   top: 138rpx;
	 }
	 .bg_picter2{
	   position: absolute;
	   right: 95rpx;
	   top: 138rpx;
	   font-size: 24rpx;
	 }
	 .bg_picter3{
	   height: 36rpx;
	   width: 36rpx;
	   position: absolute;
	   right: 40rpx;
	   top: 138rpx;
	 }
	 .detail_paly{
	   height: 200rpx;
	   width: 710rpx;
	   background: #fff;
	   border-radius: 10rpx;
	   margin-left: 20rpx;
	   margin-top: 20rpx;
	 }
	 .footer_money{
	   font-size: 28rpx;
	   color: #fff;
	   text-align: center;
	   margin-top: 10rpx;
	 }
	 .fotter_hint{
	   text-align: center;
	   font-size: 24rpx;
	   color: #fff;
	 }
	 .active{
	   height: 150rpx;
	   width: 710rpx;
	   background-color: #fff;
	   margin-left: 20rpx;
	   margin-top: 20rpx;
	   border-radius: 10rpx;
	   display: flex;
	 }
	 .active_all{
	   margin-left: 20rpx;
	   margin-top: 20rpx;
	 }
	 .active_t1{
	   font-size: 24rpx;
	   color: #333;
	 }
	 .t1{
	   font-size: 22rpx;
	   color: #fe0000;
	   border: 1rpx solid #fe0000;
	   padding: 5rpx 28rpx;
	   border-radius: 20rpx;
	 }
	 .active_t2{
	   margin-top: 30rpx;
	 }
	 /* 弹出 */
	 .boxTop{
		 height: 240upx;
		 width: 750upx;
		 background-color: #fff;
		 position: absolute;
		 bottom: 98upx;
	 }
	 .boximg{
		 height: 120upx;
		 width: 120upx;
		 margin-left: 20upx;
		 margin-top: 20upx;
		 border-radius: 10upx;
	 }
	 .boxtext{
		 font-size: 28upx;
		 height: 120upx;
		 line-height: 60upx;
		 margin-top: 20upx;
		 margin-left: 20upx;
	 }
	 .boxpicter{
		 font-size: 30upx;
		 color: #FE0000;
	 }
	 .boxpicter text{
	 		 font-size: 24upx;
	 		 color: #999;
			 padding-left: 20upx;
			 text-decoration: line-through;
	 }
	 .jiajian{
		 height: 36upx;
		 width: 36upx;
	 }
	 .numberbox{
		 position: absolute;
		 bottom: 66upx;
		 right: 20upx;		 
	 }
	 .numberbox .numbertext{
		 padding-left: 20upx;
		 padding-right: 20upx;
	 }
	 .baopin{
		 line-height: 90upx;
		 font-size: 24upx;
		 color: #fff;
		 text-align: center;
		 height: 90upx;
	 }
	 .groups{
		 color: #FFFFFF;
		 font-size: 24upx;
		 height: 90upx;
		 line-height: 40upx;
		 text-align: center;
		 justify-content: center;
	 }
	 .this_lijigoum{
		 height: 78upx;
		 width: 230upx;
		 line-height: 78upx;
		 font-size: 28upx;
		 color: #fff;
		 border-top-right-radius: 40upx;
		 border-bottom-right-radius: 40upx;
		 background-color: #FE0000;
		 margin-top: 10upx;
		 margin-right: 20upx;
	 }
	 .this_gouwuche{
		 height: 78upx;
		 width: 230upx;
		 line-height: 78upx;
		 font-size: 28upx;
		 color: #fff;
		 border-top-left-radius: 40upx;
		 border-bottom-left-radius: 40upx;
		 background-color: #FF874B;
		 margin-top: 10upx;
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
	}
	.gouwuche_three{
		height: 78upx;
		width: 230upx;
		color: #fff;
		border-radius: 40upx;
		background-color: #FE0000;
		margin-top: 10upx;
		margin-right: 20upx;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
	}
	.this_pintuan{
		height: 90upx;
		line-height: 45upx;
	}
</style>
