<template>
	<view>
		<view class="x12 padding" style="padding-bottom: 150upx;">
			<view class="tctj"  v-if="goodslist.length>0">				
				<view class="tctj-title">
					<view class="x-auto">
						<image src="https://div.buy315.com.cn/xcx_imgs/xz.png" class="float-left" style="width: 36upx; height: 36upx;" @click="isNoXz(1,1)" v-if="goodslist.length==xnum"></image>
						<image src="https://div.buy315.com.cn/xcx_imgs/wxz.png" class="float-left" style="width: 36upx; height: 36upx;" @click="isNoXz(1,2)" v-else></image>
					</view>
					<view class="x-auto" style="margin-top: -6upx; padding-left: 10upx;">
						{{stores_name}}
					</view>
				</view>
				<view class="tctj-body">
						<view class="x12 border-top border-gray padding-top padding-bottom" v-for="(g_ite,g_index) in goodslist" :key="g_index">
							<view class="x12" v-if="g_ite.status==2 || g_ite.sale_num==0">
								<view class="x-auto" style="margin-top: 30upx; padding-right: 10upx;">
									<image src="https://div.buy315.com.cn/xcx_imgs/wxz2.png" class="float-left" style="width: 36upx; height: 36upx;"></image>
								</view>
								<view class="tctj-body-left" style="display: none;">
									<image :src="g_ite.img" style="-webkit-filter: grayscale(100%);"  mode="aspectFill"></image>
								</view>
								<view class="tctj-body-right">
									<view class="tctj-body-right-title" style="color: #999;">
										{{g_ite.goods_title}}
									</view>
									<view class="tctj-body-right-price" style="color: #999; width: 250upx;">
										{{deployinfo.monetary_symbol}}{{g_ite.price}} <span> /{{g_ite.unit}}</span>
									</view>
									<view class="x-auto" style="float: right; margin-top: -48upx;">
										<view class="x-auto">											
											<image src="https://div.buy315.com.cn/xcx_imgs/jian2.png" style="width: 48upx; height: 48upx;"></image>
										</view>
										<view class="x-auto" style="padding:0upx 10upx; line-height: 48upx;">
											<input class="uni-input" v-if="g_ite.stock_type==2" type="digit" v-model="g_ite.th_sl" @input="gbGoodsNum(g_ite.th_sl,g_ite.barcode_id,g_ite.surplus_num)" style="border: #ddd solid 1px; width: 80upx; height: 30upx; line-height: 30upx; padding: 0 10upx; border-radius: 5upx; margin-top: -4upx;" />
											<input class="uni-input" v-else type="number" v-model="g_ite.th_sl" @input="gbGoodsNum(g_ite.th_sl,g_ite.barcode_id,g_ite.surplus_num)" style="border: #ddd solid 1px; width: 80upx; height: 30upx; line-height: 30upx; padding: 0 10upx; border-radius: 5upx; margin-top: -4upx;" />
										</view>
										<view class="x-auto">
											<view class="x-auto"><image src="https://div.buy315.com.cn/xcx_imgs/jia2.png"  mode="aspectFill" style="width: 48upx; height: 48upx;"></image></view>
										</view>
									</view>
									<view class="x12 text-small text-gray" style="color: #999;" v-if="g_ite.spec!=''">
										规格:{{g_ite.spec}}
									</view>
								</view>
							</view>
							
							<view class="x12" v-else>
								<view class="x-auto" style="margin-top: 30upx; padding-right: 10upx;">
									<image src="https://div.buy315.com.cn/xcx_imgs/xz.png" class="float-left" style="width: 36upx; height: 36upx;" @click="isNoXz(2,1,g_ite.barcode_id)" v-if="g_ite.site==2"></image>
									<image src="https://div.buy315.com.cn/xcx_imgs/wxz.png" class="float-left" style="width: 36upx; height: 36upx;" @click="isNoXz(2,2,g_ite.barcode_id)" v-else></image>
								</view>
								<view class="tctj-body-left"  style="display: none;" @click="goDetails(g_ite.barcode_id)">
									<image :src="g_ite.img"  mode="aspectFill"></image>
								</view>
								<view class="tctj-body-right">
									<view class="tctj-body-right-title" @click="goDetails(g_ite.barcode_id)" style="">
										{{g_ite.goods_title}}
									</view>
									<view class="tctj-body-right-price" @click="goDetails(g_ite.barcode_id)" style="color: #F65A2A; width: 250upx;">
										{{deployinfo.monetary_symbol}}{{g_ite.price}} <span class="text-gray"> /{{g_ite.unit}}</span>
									</view>
									<view class="x-auto" style="float: right; margin-top: -48upx;">
										<view class="x-auto" v-on:click="jrShoppingCart(1,g_ite.barcode_id)">											
											<!-- <image src="https://div.buy315.com.cn/xcx_imgs/jian.png" style="width: 48upx; height: 48upx;"></image> -->
										</view>
										<view class="x-auto" style="padding:0upx 10upx; line-height: 48upx;">
											<input disabled='true' class="uni-input" v-if="g_ite.stock_type==2" type="digit" v-model="g_ite.th_sl" @input="gbGoodsNum(g_ite.th_sl,g_ite.barcode_id,g_ite.surplus_num)" style="border: #ddd solid 1px; width: 80upx; height: 30upx; line-height: 30upx; padding: 0 10upx; border-radius: 5upx; margin-top: -4upx;" />
											<input disabled='true' class="uni-input" v-else type="number" v-model="g_ite.th_sl" @input="gbGoodsNum(g_ite.th_sl,g_ite.barcode_id,g_ite.surplus_num)" style="border: #ddd solid 1px; width: 80upx; height: 30upx; line-height: 30upx; padding: 0 10upx; border-radius: 5upx; margin-top: -4upx;" />
										</view>
										<view class="x-auto" :id="'dh1'+'-'+g_ite.barcode_id"  @click="jrShoppingCart(2,g_ite.barcode_id,1,'dh1'+'-'+g_ite.barcode_id)">
											<view class="x-auto" :animation="animationData" style="background:#F65A2A;height:48upx;width:48upx; border-radius: 48upx; position: absolute;" v-for="(ditem,dindex) in amintiond_list" :key="dindex" v-if="ditem.barcode_id==g_ite.barcode_id"></view>
											<!-- <view class="x-auto"><image src="https://div.buy315.com.cn/xcx_imgs/jia.png"  mode="aspectFill" style="width: 48upx; height: 48upx;"></image></view> -->
										</view>
									</view>
									<view class="x12 text-small text-gray" v-if="g_ite.spec!=''">
										规格:{{g_ite.spec}}
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
					<button @click="goIndex" style="background:rgba(255,255,255,1); font-size: 12pt; border:1px solid rgba(246,90,42,1); border-radius:34px; color: #F65A2A;height: 80upx; line-height: 80upx; width: 40%;">去首页逛逛</button>
				</view>
			</view>
		</view>
		<view class="x12" style="padding-top: 0; position: fixed; z-index: 100; bottom: 0;" v-if="goodslist.length>0">
			<view class="x12 bg-white padding">				
				<view class="x-auto text-center text-white float-right" v-if="xnum>0 && ktnum>0" @click="goOrderSure" style="width:154upx;height:66upx;background:rgba(246,90,42,1); font-size: 14pt; line-height: 66upx; border-radius:32upx;border:1px solid rgba(246,90,42,1); margin-top: 5upx;">
					去退货
				</view>
				<view class="x-auto text-center text-white float-right" v-else style="width:154upx;height:66upx;background:#999; font-size: 14pt; line-height: 66upx; border-radius:32upx;border:1px solid #999; margin-top: 5upx;">
					去退货
				</view>
				<view class="x-auto float-left" style="padding: 0upx 30upx 0 20upx; font-size: 10pt;">
					<view class="text-bold">商品合计:<text style="font-size: 14pt; color: #F65A2A;">{{deployinfo.monetary_symbol}}{{xsum}}</text></view>
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
			addressNum:0,
			shoppingCartNum:0,
			xshopInfo:[],
			stores_name:'',
			animationData: {},
			amintiond_list:[],
			wheight:500,
			fwqGoods:[],
			order_code:'',
			ktnum:0,
			}
		},
		onLoad:function(data){//返回时接收子页面的传参
			var xgoods = JSON.parse(data.goods);
			var xs_goods = [];
			var mi = 0;
			for(var i in xgoods){
				xs_goods[mi] = {
					site:2,
					th_sl:xgoods[i].surplus_num,//退货数量,默认退剩下的所有数量
					already_num:xgoods[i].already_num,
					barcode_id:xgoods[i].barcode_id,
					goods_title:xgoods[i].goods_title,
					img:xgoods[i].img,
					num:xgoods[i].num,
					unit:xgoods[i].unit,
					pack_moneys:xgoods[i].pack_moneys,
					price:xgoods[i].price,
					surplus_num:xgoods[i].surplus_num,//剩余数量
					spec:xgoods[i].spec,
				}
				mi++;
			}
			this.goodslist = xs_goods;
			this.order_code = data.order_code;
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const values = uni.getStorageSync('xshopInfo');
				this.deployinfo = uni.getStorageSync('deployinfo');
				//console.log(uni.getStorageSync('shoppingCarts'));
				if(values){
					this.xshopInfo = values;
					this.stores_name = values.store.stores_name;
				}
				if (value) {
					this.memberinfo = value;
					this.login = true;
				}
			} catch (e) {
				// error
			}
			this.xzAll();
		},
		methods: {
			//去首页
			goIndex(){
				uni.switchTab({
					url:"/pages/home/index"
				})
			},
			//合计购物车选中的数量
			xzAll(){
				var xnum = 0;//合计选中数量
				var xsum = 0;//合计选中价格
				var ktnum = 0;//可退数量
				for (let i in this.goodslist) {
					if (this.goodslist[i].site==2){
						xnum = xnum+1;
						ktnum += this.goodslist[i].surplus_num;
						xsum += this.goodslist[i].price*this.goodslist[i].th_sl;
					}
				}
				this.xnum = xnum;
				this.xsum = xsum.toFixed(2);
				this.ktnum = ktnum;
			},
			//点击选中或者取消
			//第一个参数1全选，2单选
			//第二个参数1选中，2取消
			//第3个参数,商品的唯一id
			isNoXz(xz,zt,barcode_id){
				//console.log(xz,zt,barcode_id);
				if(xz==1 && zt==1){
					for (let i in this.goodslist) {
						this.goodslist[i].site = 1;
					}
				}else if(xz==1 && zt==2){
					for (let i in this.goodslist) {
						this.goodslist[i].site = 2;
					}
				}else if(xz==2 && zt==1){
					for (let i in this.goodslist) {
						if(this.goodslist[i].barcode_id==barcode_id){
							this.goodslist[i].site = 1;
						}						
					}
				}else{
					for (let i in this.goodslist) {
						if(this.goodslist[i].barcode_id==barcode_id){
							this.goodslist[i].site = 2;
						}						
					}
				}
				this.xzAll();
			},
			//加减商品数量
			//第一个参数1减二加
			//商品的唯一id
			jrShoppingCart(xj,xbarcode_id,type,v){
				for (var i in this.goodslist) {
					if(this.goodslist[i].barcode_id==xbarcode_id && xj==1){
						var th_sl = parseFloat(this.goodslist[i].th_sl)-1;
						this.goodslist[i].th_sl = th_sl;
						if(this.goodslist[i].th_sl<=0){
							this.goodslist.splice(i,1);
						}
					}else if(this.goodslist[i].barcode_id==xbarcode_id && xj==2){
						var th_sl = parseFloat(this.goodslist[i].th_sl)+1;
						if(th_sl<=this.goodslist[i].surplus_num){
							this.goodslist[i].th_sl = th_sl;
						}else{
							uni.showToast({
								icon:'none',
								title: '已达到最大退货量'+this.goodslist[i].surplus_num,
								duration: 2000
							});
						}						
					}
				}
				this.xzAll();
			},
			goDetails(barcode_id) {
				uni.navigateTo({
					url:"/pages/goods_details/goods_details?barcode_id="+barcode_id
				})
			},			
			goOrderSure() {//去退货
				//检查是否登录
				if(!this.login){
					uni.navigateTo({
						url:"/pages/login/login"
					})
					return;
				}
				var xgoods = [];
				var mi = 0;
				for(var i in this.goodslist){
					if(this.goodslist[i].site==2 && this.goodslist[i].th_sl>0){
						xgoods[mi] = {
							num:this.goodslist[i].th_sl,//退货数量,默认退剩下的所有数量
							barcode_id:this.goodslist[i].barcode_id,
							name:this.goodslist[i].goods_title,
						}
						mi++;
					}
				}
				if(xgoods.length<=0){
					uni.showToast({
						icon:'none',
						title: '请指定要退的商品',
						duration: 2000
					});
					return;
				}
				uni.navigateTo({
					url:"/pagesb/center/order_th_ms?goods="+JSON.stringify(xgoods)+"&order_code="+this.order_code
				})
			},
			//输入数量结束
			gbGoodsNum(num,xbarcode_id,surplus_num){
				if(num>surplus_num){
					for(var i in this.goodslist){
						if(this.goodslist[i].barcode_id==xbarcode_id){
							this.goodslist[i].th_sl = this.goodslist[i].surplus_num;
						}
					}
					uni.showToast({
						icon:'none',
						title: '超出最大退货量'+surplus_num+',将全部退完',
						duration: 2000
					});
				}
				if(num=='' || num==0){
					for(var i in this.goodslist){
						if(this.goodslist[i].barcode_id==xbarcode_id){
							this.goodslist[i].th_sl = 0;
						}
					}
					uni.showToast({
						icon:'none',
						title: '退货数量为0请修改,否则不退此商品',
						duration: 2000
					});
				}
				this.xzAll();
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
		width: 600upx;
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
</style>
