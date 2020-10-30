<template>
	<view>
		<hx-navbar :config="config" />
	<view v-if="xShow==true">
		<view class="x12 bg-white">
			<!-- <view class="x12 padding-big" style="font-size: 12pt; color: #393D4A;">
				<view class="x-auto" style="padding-right: 20upx;">
					<image src="https://div.buy315.com.cn/xcx_imgs/gwcdw.png" class="float-left" style="width: 36upx; height: 46upx;"></image>
				</view>
				<view class="x-auto" style="width: 580upx;" v-if="addressNum>0">
					<view class="x12">
						<view>{{address_list.xq_name}}{{address_list.mbh}}</view>
						<view>
							<view class="x-auto">{{address_list.name}}</view>
						    <view class="x-auto padding-left">{{address_list.tel}}</view>
						</view>
					</view>			
				</view>
				<view class="x-auto" v-else>添加收货地址</view>
				<view class="x-auto float-right" style="padding-top: 7upx;">
					<image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" class="float-left" style="width: 18upx; height: 32upx;"></image>
				</view>
			</view> -->
		</view>
		<view class="x12 padding">
			<view class="tctj"  v-if="goodslist.length>0">				
				<view class="tctj-title">
					<view class="x-auto">
						<image src="https://div.buy315.com.cn/xcx_imgs/xz.png" class="float-left" style="width: 36upx; height: 36upx;" @click="isNoXz(1,1)" v-if="goodslist.length==xnum"></image>
						<image src="https://div.buy315.com.cn/xcx_imgs/wxz.png" class="float-left" style="width: 36upx; height: 36upx;" @click="isNoXz(1,2)" v-else></image>
					</view>
					<!-- <view class="x-auto" style="margin-top: -6upx; padding-left: 10upx;">
						{{stores_name}}
					</view> -->
					<view class="x-auto" style="margin-top: -6upx; padding-left: 10upx;">
						全选
					</view>
					<view class="x-auto" style="float: right; font-size: 10pt;" @click="qkgwc">清空</view>
				</view>
				<view class="tctj-body">
						<view class="x12 border-top border-gray padding-top padding-bottom" v-for="(g_ite,g_index) in goodslist" :key="g_index" v-if="g_ite.stores_id==xshopInfo.store.stores_id">
							<view class="x12" v-if="g_ite.status==1 && (g_ite.sale_num > 0 || g_ite.sale_num === '')">
								
								<view class="x-auto" style="margin-top: 57upx; padding-right: 10upx;">
									<image src="https://div.buy315.com.cn/xcx_imgs/xz.png" class="float-left" style="width: 36upx; height: 36upx;" @click="isNoXz(2,1,g_ite.barcode_id)" v-if="g_ite.site==2"></image>
									<image src="https://div.buy315.com.cn/xcx_imgs/wxz.png" class="float-left" style="width: 36upx; height: 36upx;" @click="isNoXz(2,2,g_ite.barcode_id)" v-else></image>
								</view>
								<view class="tctj-body-left" @click="goDetails(g_ite.barcode_id)">
									<image :src="g_ite.img"  mode="aspectFill"></image>
								</view>
								<view class="tctj-body-right">
									<view class="tctj-body-right-title" @click="goDetails(g_ite.barcode_id)" style="">
										{{g_ite.goods_title}}
									</view>
									<view class="tctj-body-right-price" @click="goDetails(g_ite.barcode_id)" style="color: #Fe0000; width: 250upx;">
										{{deployinfo.monetary_symbol}}{{g_ite.price}} <span class="text-gray"> /{{g_ite.unit}}</span>
									</view>
									<view class="x-auto" style="float: right; margin-top: -38upx;">
										<view class="x-auto" v-on:click="jrShoppingCart(1,g_ite.barcode_id)">											
											<image src="https://div.buy315.com.cn/xcx_imgs/jian.png" style="width: 38upx; height: 38upx;"></image>
										</view>
										<view class="x-auto" style="padding:0upx 10upx; line-height: 48upx;">
											<input disabled class="uni-input" v-if="g_ite.stock_type==2" type="digit" v-model="g_ite.num" @input="gbGoodsNum(g_ite.num,g_ite.barcode_id)" style="border: #ddd solid 0px; width: 60upx; height: 30upx; line-height: 30upx; padding: 0 10upx; border-radius: 5upx; margin-top: -8upx; line-height: 30upx; text-align: center;" />
											<input disabled class="uni-input" v-else type="number" v-model="g_ite.num" @input="gbGoodsNum(g_ite.num,g_ite.barcode_id)" style="border: #ddd solid 0px; width: 60upx; height: 30upx; line-height: 30upx; padding: 0 10upx; border-radius: 5upx; margin-top: -8upx; line-height: 30upx; text-align: center;" />
										</view>
										<view class="x-auto" :id="'dh1'+'-'+g_ite.barcode_id"  @click="jrShoppingCart(2,g_ite.barcode_id,1,'dh1'+'-'+g_ite.barcode_id)">
											<view class="x-auto" :animation="animationData" style="background:#Fe0000;height:38upx;width:38upx; border-radius: 48upx; position: absolute;" v-for="(ditem,dindex) in amintiond_list" :key="dindex" v-if="ditem.barcode_id==g_ite.barcode_id"></view>
											<view class="x-auto"><image src="https://div.buy315.com.cn/xcx_imgs/jia.png"  mode="aspectFill" style="width: 38upx; height: 38upx;"></image></view>
										</view>
									</view>
									<view class="x12 text-small text-gray" v-if="g_ite.spec!=''">
										规格:{{g_ite.spec}}
									</view>
									<view class="x12 text-small text-gray" style="color: #999;" v-if="g_ite.pack_money>0 && g_ite.pack_num>0">
										包装费:{{g_ite.bzf}}
									</view>
								</view>
							</view>
							
							<view class="x12" v-else>
								<view class="x-auto" style="margin-top: 30upx; padding-right: 10upx;">
									<image src="https://div.buy315.com.cn/xcx_imgs/wxz2.png" class="float-left" style="width: 36upx; height: 36upx;"></image>
								</view>
								<view class="tctj-body-left">
									<image :src="g_ite.img" style="-webkit-filter: grayscale(100%);"  mode="aspectFill"></image>
								</view>
								<view class="tctj-body-right">
									<view class="tctj-body-right-title" style="color: #999;">
										{{g_ite.goods_title}}
									</view>
									<view class="tctj-body-right-price" style="color: #999; width: 250upx;">
										{{deployinfo.monetary_symbol}}{{g_ite.price}} <span> {{g_ite.unit}}</span>
									</view>
									<view class="x-auto" style="float: right; margin-top: -38upx;">
										<view class="x-auto" v-on:click="jrShoppingCart(1,g_ite.barcode_id)">											
											<image src="https://div.buy315.com.cn/xcx_imgs/jian.png" style="width: 38upx; height: 38upx;"></image>
										</view>
										<view class="x-auto" style="padding:0upx 10upx; line-height: 48upx;">
											<input class="uni-input" v-if="g_ite.stock_type==2" type="digit" v-model="g_ite.num" @input="gbGoodsNum(g_ite.num,g_ite.barcode_id)" style="border: #ddd solid 0px; width: 60upx; height: 30upx; line-height: 30upx; padding: 0 10upx; border-radius: 5upx; margin-top: -8upx; line-height: 30upx; text-align: center;" />
											<input class="uni-input" v-else type="number" v-model="g_ite.num" @input="gbGoodsNum(g_ite.num,g_ite.barcode_id)" style="border: #ddd solid 0px; width: 60upx; height: 30upx; line-height: 30upx; padding: 0 10upx; border-radius: 5upx; margin-top: -8upx; line-height: 30upx; text-align: center;" />
										</view>
										<view class="x-auto">
											<view class="x-auto"><image src="https://div.buy315.com.cn/xcx_imgs/jia2.png"  mode="aspectFill" style="width: 38upx; height: 38upx;"></image></view>
										</view>
									</view>
									<view class="x12 text-small text-gray" style="color: #999;" v-if="g_ite.spec!=''">
										规格:{{g_ite.spec}}
									</view>
									<view class="x12 text-small text-gray" style="color: #999;" v-if="g_ite.pack_money>0 && g_ite.pack_num>0">
										包装费:{{g_ite.bzf}}
									</view>
								</view>
							</view>
						</view>
				</view>
			</view>
			<view class="x12 text-center text-gray" style="margin-top: 20%; font-size: 12pt;" v-if="goodslist.length==0">
				<view class="x12">
					<image src="https://div.buy315.com.cn/xcx_imgs/gwcwsp.png" style="width:140upx; height: 140upx;"></image>
				</view>
				<view class="x12">空空如也 (~^~)</view>
				<view class="x12 padding-big margin-top">
					<button @click="goIndex" style="background:rgba(255,255,255,1); font-size: 12pt; border:1px solid #fe0000; border-radius:34px; color: #Fe0000;height: 80upx; line-height: 80upx; width: 40%;">去首页逛逛</button>
				</view>
			</view>
		</view>
		<view class="x12 padding" style="width: 100%; box-sizing: border-box; padding:0; position: fixed;bottom: 0;left: 0; z-index: 99999;" v-if="goodslist.length>0">
			<view class="x12 bg-white" style="line-height: 96upx;height: 96upx;">				
				<view class="x-auto text-center text-white float-right qujiesuan" v-if="xnum>0" @click="goOrderSure" style="width:232upx;height:96upx;background:#fe0000; line-height: 96upx; font-size: 14pt;border:1px solid #fe0000; margin-top: 5upx; font-size: 28upx;">
					去结算
				</view>
				<view class="x-auto text-center text-white float-right qujiesuan" v-else style="width:232upx;height:96upx;background:#999; line-height: 96upx; font-size: 14pt; border:1px solid #999; margin-top: 5upx; font-size: 28upx;">
					去结算
				</view>
				<view class="x-auto float-left" style="padding: 0upx 30upx 0 20upx; font-size: 10pt;">
					<view class="text-bold">商品合计:<text style="font-size: 14pt; color: #Fe0000;">{{deployinfo.monetary_symbol}}{{xsum}}</text></view>
					<view class="text-gray" style="padding-left: 28upx;"><span v-if="bzf_sum>0">包装费:{{deployinfo.monetary_symbol}}{{bzf_sum}}</span></view>
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
			xShow:false,
			deployinfo:{},//配置信息货币单位，符号，以及其他的一些配置参数
			login:false,
			memberinfo:[],
			details:false,
			goodslist: [],
			checkeds: [],
			xsum:0,
			checked:false,
			xnum:0,
			allunm:0,
			status:false,
			address_list:[],
			addressNum:0,
			shoppingCarts:[],
			shoppingCartNum:0,
			xshopInfo:[],
			stores_name:'',
			animationData: {},
			amintiond_list:[],
			wheight:500,
			fwqGoods:[],
			bzf_sum:0,
			wx_tpl:[],
			config:{
				title: '购物车',
				color: '#ffffff',
				backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
				statusBarFontColor:'#fff',
				back:false,
			},
			}
		},
		onPullDownRefresh() {
		    try {//从本地缓存中同步获取指定 key 对应的内容。
		    	const value = uni.getStorageSync('memberinfo');
		    	const valuex = uni.getStorageSync('shoppingCarts');
				const values = uni.getStorageSync('xshopInfo');
				if(values){
					this.xshopInfo = values;
				}
		    	if (value) {
		    		this.memberinfo = value;
		    		this.login = true;
		    	}
		    	if(valuex){
					//console.log(valuex);
		    		this.goodslist = valuex;
		    	}
		    } catch (e) {
		    	// error
		    }
			//this.getAddress();
			this.xzAll();
			uni.stopPullDownRefresh();			
		},
		onShow:function(){//返回时接收子页面的传参
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const valuex = uni.getStorageSync('shoppingCarts');
				const values = uni.getStorageSync('xshopInfo');
				const de = uni.getStorageSync('deployinfo');
				if(de){
					this.deployinfo = de;
				}
				//console.log(uni.getStorageSync('shoppingCarts'));
				if(values){
					this.xshopInfo = values;
					this.stores_name = values.store.stores_name;
				}
				//console.log(value);
				if (value.length!=0) {
					this.memberinfo = value;
					this.login = true;
				}
				if(valuex){
					this.goodslist = valuex;
					//console.log(this.goodslist);
				}
			} catch (e) {
				// error
			}			
			if(this.memberinfo.length==0){
				this.addressNum = 0;
			}
			uni.showLoading({
			    title: '加载中'
			});			
			if(this.memberinfo.length!=0){
				//获取地址
				this.getAddress();
			}
			if(this.memberinfo.length!=0){
				this.getMer();
			}
			//console.log(this.xshopInfo);
			this.xzAll();
			if(this.goodslist.length>0){
				this.getGoods();
			}
			this.sumShoppingCartNum();
			//console.log(this.wheight);
		},
		methods: {
			qkgwc(){
				uni.setStorage({
					key: 'shoppingCarts',
					data:[],
					success: function () {
					}
				});
				this.shoppingCarts = [];
				this.goodslist = [];
				uni.setTabBarBadge({
				  index: 2,
				  text: '0',
				})
				uni.showToast({
					icon:'none',
					title: '购物车已清空',
				});
			},
			//检查会员是否存在
			getMer(){
				var arr ={
						member_openid: this.memberinfo.openid,
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
						//console.log(res.data.data.status);
						if(res.data.status == 'n' || res.data.data.status!=1){
							try {
								const value = uni.getStorageSync('memberinfo');
								//写入缓存
								uni.setStorage({
									key: 'memberinfo',
									data:[],
									success: function () {
									}
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
			goAddressXlist(){
				//console.log(this.login);
				if(this.memberinfo.length==0){
					uni.navigateTo({
						url:"/pages/login/login"
					})
					return;
				}
				uni.navigateTo({
					url:"../goods_details/address_list"
				})
			},
			//用购物车商品id去换取商品信息
			getGoods(){
				console.log(this.goodslist,'购物车商品信息-- this.goodslist');
				var barcode_ids = '';
				for(let i in this.goodslist){
					barcode_ids += this.goodslist[i].barcode_id+','
				}
				//获取信息
				var arr ={
						stores_id:this.xshopInfo.store.stores_id,
						barcode_ids: barcode_ids,
						openid: this.memberinfo.openid,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/mall_shop_v2/get_car_goods',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data);
						if(res.data.status=='y'){
							if(res.data.data.wx_tpl==undefined){
								this.wx_tpl = [];
							}else{
								this.wx_tpl = res.data.data.wx_tpl;
							}
							this.fwqGoods = res.data.data.goods;
							var fGoods = res.data.data.goods;
							for(let i in fGoods){
								for(let m in this.goodslist){
									if(fGoods[i].stores_id == this.goodslist[m].stores_id){
										if(fGoods[i].barcode_id == this.goodslist[m].barcode_id  && fGoods[i].status==1  && fGoods[i].sale_num!==0){
											this.goodslist[m].goods_title = fGoods[i].goods_title;
											this.goodslist[m].img = fGoods[i].img;
											this.goodslist[m].original_price = fGoods[i].original_price;
											this.goodslist[m].price = fGoods[i].price;
											this.goodslist[m].promotion = fGoods[i].promotion;
											this.goodslist[m].spec = fGoods[i].spec;										
											this.goodslist[m].unit = fGoods[i].unit;
											this.goodslist[m].status = fGoods[i].status;
											this.goodslist[m].sale_num = fGoods[i].sale_num;											
											this.goodslist[m].pack_money = fGoods[i].pack_money;
											this.goodslist[m].pack_num = fGoods[i].pack_num;
											this.goodslist[m].stock_type = fGoods[i].stock_type;
											this.goodslist[m].astrict_num = fGoods[i].astrict_num
											this.goodslist[m].bzf = (Math.ceil(parseFloat(this.goodslist[m].num)/parseFloat(fGoods[i].pack_num))*parseFloat(fGoods[i].pack_money)).toFixed(2);
										}
									}
								}
							}
							//写入缓存
							this.xhc();
							//算合计
							this.xzAll();
						}else{
							this.goodslist = [];
						}
					}
				});
			},
			//购物车动画效果
			shopCart(barcode_id,type,v){
				//console.log(v);
				var glist = [];
				glist[0] = {
					barcode_id:barcode_id,
					type:type,
				}
				this.amintiond_list = glist;
				uni.getSystemInfo({
					success: res => {
						this.wheight = res.windowHeight+60;
					}
				});
				//console.log(this.wheight);
				var animation = uni.createAnimation({
					duration: 400,
					 transformOrigin: "50% 50%",
					 timingFunction: "linear",
					 delay: 0
				})
				animation.translate(0,0).step({duration: 10})
				this.animationData = animation.export()
				let view = uni.createSelectorQuery().select("#"+v);
				view.boundingClientRect(data => {
					//console.log(data);
				    animation.translate(-20,-20).step({duration: 50}).translate(-40,-10).step({duration: 50}).translate(-data.left+240,this.wheight-data.bottom).step({duration: 150})
				    this.animationData = animation.export()
				}).exec();				
				setTimeout(function() {
				  this.amintiond_list = [];
				}.bind(this), 400)
				
			},
			//去首页
			goIndex(){
				uni.switchTab({
					url:"../home/index"
				})
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
									s_lat:res.data.data[i].s_lat,
									s_lng:res.data.data[i].s_lng,
								}
							}
						}
						this.addressNum = addressNum;
						this.address_list = address;						
					}
				});
			},
			//合计购物车选中的数量
			xzAll(){
				var xnum = 0;//合计选中数量
				var xsum = 0;//合计选中价格
				var bzf_sum = 0;//包装费合计
				for (let i in this.goodslist) {
					if (this.goodslist[i].site==2 && this.goodslist[i].stores_id==this.xshopInfo.store.stores_id && this.goodslist[i].status==1  && (this.goodslist[i].sale_num>0 || this.goodslist[i].sale_num==='')){
						xnum = xnum+1;
						xsum += this.goodslist[i].price*this.goodslist[i].num;
						bzf_sum += Math.ceil(parseFloat(this.goodslist[i].num)/parseFloat(this.goodslist[i].pack_num))*parseFloat(this.goodslist[i].pack_money)
					}
				}
				this.xnum = xnum;
				this.xsum = xsum.toFixed(2);
				this.bzf_sum = bzf_sum.toFixed(2);
			},
			//点击选中或者取消
			//第一个参数1全选，2单选
			//第二个参数1选中，2取消
			//第3个参数,商品的唯一id
			isNoXz(xz,zt,barcode_id){
				//console.log(xz,zt,barcode_id);
				if(xz==1 && zt==1){
					for (let i in this.goodslist) {
						if(this.goodslist[i].stores_id==this.xshopInfo.store.stores_id){
							this.goodslist[i].site = 1;
						}
					}
				}else if(xz==1 && zt==2){
					for (let i in this.goodslist) {
						if(this.goodslist[i].stores_id==this.xshopInfo.store.stores_id){
							this.goodslist[i].site = 2;
						}
					}
				}else if(xz==2 && zt==1){
					for (let i in this.goodslist) {
						if(this.goodslist[i].barcode_id==barcode_id && this.goodslist[i].stores_id==this.xshopInfo.store.stores_id){
							this.goodslist[i].site = 1;
						}						
					}
				}else{
					for (let i in this.goodslist) {
						if(this.goodslist[i].barcode_id==barcode_id && this.goodslist[i].stores_id==this.xshopInfo.store.stores_id){
							this.goodslist[i].site = 2;
						}						
					}
				}
				this.xzAll();
				this.xhc();
			},
			//加减商品数量
			//第一个参数1减二加
			//商品的唯一id
			jrShoppingCart(xj,xbarcode_id,type,v){
				//console.log(this.goodslist);
				if(xj==2){					
					//限购数量和购物车数量对比
					for(let ixs in this.goodslist){
						if(this.goodslist[ixs].barcode_id==xbarcode_id){
							if(this.goodslist[ixs].astrict_num !== '' && ((parseFloat(this.goodslist[ixs].num)+1) > this.goodslist[ixs].astrict_num)){
								uni.showToast({
									icon: 'none',
									title: '商品【'+this.goodslist[ixs].goods_title+'】限购'+this.goodslist[ixs].astrict_num+this.goodslist[ixs].unit,
								});
								return;
							}
						}					
					}
				}
				//console.log(xbarcode_id);
				var list = [];
				var mi = 0;
				for (var i in this.goodslist) {
					if(this.goodslist[i].barcode_id==xbarcode_id && this.goodslist[i].stores_id==this.xshopInfo.store.stores_id && xj==1){
						this.goodslist[i].num = parseFloat(this.goodslist[i].num)-1;
						this.goodslist[i].bzf = (Math.ceil(parseFloat(this.goodslist[i].num)/parseFloat(this.goodslist[i].pack_num))*parseFloat(this.goodslist[i].pack_money)).toFixed(2);
						if(this.goodslist[i].num<=0){
							this.goodslist.splice(i,1);
						}						
					}else if(this.goodslist[i].barcode_id==xbarcode_id && this.goodslist[i].stores_id==this.xshopInfo.store.stores_id && xj==2){
						this.goodslist[i].num = parseFloat(this.goodslist[i].num)+1;
						this.goodslist[i].bzf = (Math.ceil(parseFloat(this.goodslist[i].num)/parseFloat(this.goodslist[i].pack_num))*parseFloat(this.goodslist[i].pack_money)).toFixed(2);
					}
				}
				//console.log(this.goodslist);
				this.xzAll();
				this.xhc();
				this.sumShoppingCartNum();
				if(xj==2){
					//调取动画效果
					this.shopCart(xbarcode_id,type,v);
				}
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
			},
			goDetails(barcode_id) {
				uni.navigateTo({
					url:"../goods_details/goods_details?barcode_id="+barcode_id
				})
			},			
			goOrderSure() {//去结算
				//检查是否登录
				if(this.memberinfo.length==0){
					uni.navigateTo({
						url:"/pages/login/login"
					})
					return;
				}
				if(this.addressNum==0){
					uni.showToast({
						icon:'none',
						title: '请添加收货地址',
					});
					return;
				}
				if(this.xnum==0){
					uni.showToast({
						icon:'none',
						title: '请选择商品',
					});
					return;
				}
				//console.log(this.goodslist);return;
				var goods_l = [];
				var xx = 0;
				for (let i in this.goodslist) {
					if(this.goodslist[i].site==2  && this.goodslist[i].stores_id==this.xshopInfo.store.stores_id && this.goodslist[i].status==1  && (this.goodslist[i].sale_num>0 || this.goodslist[i].sale_num==='')){
						goods_l[xx] = {
								stores_id:this.goodslist[i].stores_id,
								barcode_id:this.goodslist[i].barcode_id,
								num:this.goodslist[i].num,
								remark:this.goodslist[i].remark,
								sgt_ids:this.goodslist[i].sgt_ids,
							}
						xx++;
					}
				}				
				//console.log(goods_l);return;
				//console.log(JSON.stringify(goods_l));
				//获取信息
				var arr ={
						member_openid: this.memberinfo.openid,
						stores_id:this.xshopInfo.store.stores_id,
						goods:JSON.stringify(goods_l),
					};
				//console.log(arr);return;
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/mall_order/pre_order',
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
							this.xnum = 0;
							//console.log(this.wx_tpl);return;
							if(this.wx_tpl!=undefined){
								uni.navigateTo({
									url:"../goods_details/order_sure?order_code="+res.data.data.order_code+"&goods_l="+JSON.stringify(goods_l)+"&wx_tpl="+JSON.stringify(this.wx_tpl)
								})
							}else{
								uni.navigateTo({
									url:"../goods_details/order_sure?order_code="+res.data.data.order_code+"&goods_l="+JSON.stringify(goods_l)
								})
							}
						}else{
							uni.showToast({
								icon:'none',
								title: res.data.info,
							});
							return;
						}						
					}
				});
			},
			//合计购物车数量
			sumShoppingCartNum(){
				//合计购物车数量
				var snum = 0;
				for(let i in this.goodslist){
					if(this.goodslist[i].stores_id==this.xshopInfo.store.stores_id){
						snum+=parseFloat(this.goodslist[i].num);
					}					
				}
				this.shoppingCartNum = snum;
				uni.setTabBarBadge({
				  index: 2,
				  text: ''+snum+'',
				})
				this.xShow = true;
				uni.hideLoading();
			},
			//输入数量结束
			gbGoodsNum(num,xbarcode_id){
				if(num=='' || num==0){
					for(var i in this.goodslist){
						if(this.goodslist[i].barcode_id==xbarcode_id && this.goodslist[i].stores_id==this.xshopInfo.store.stores_id){
							this.goodslist[i].num = 1;
						}
					}
				}
				for (var i in this.goodslist) {
					this.goodslist[i].bzf = (Math.ceil(parseFloat(this.goodslist[i].num)/parseFloat(this.goodslist[i].pack_num))*parseFloat(this.goodslist[i].pack_money)).toFixed(2);
				}
				this.xzAll();
				this.xhc();
				this.sumShoppingCartNum();
			}			
		}
	}
</script>
<style>
	page{
		background-color: #F6F6F6;
	}
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
		width: 150upx;
		height: auto;
		float:left;
	}
	.tctj-body-left image{
		width: 150upx;
		height: 150upx;
		float:left;
	}
	.tctj-body-right{
		width: 460upx;
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
		
	}
	.qujiesuan{
		
	}
</style>
