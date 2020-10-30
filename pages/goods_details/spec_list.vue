<template>
	<view style="padding-top: 10upx;">
		<view class="x12 bg-white padding-big text-333 text-big" style=" margin-top:2upx;"  v-for="(ggitem,ggindex) in specinfo" :key="ggindex" @click="goGoodsDetails(ggitem,specinfo,ggitem.barcode_id,ggitem.spec)">
			<view class="x12 text-center text-default">
				<view class="x12">
					<view class="x-auto" style="padding-right: 15upx; padding-top: 2upx;">
						<image src="https://div.buy315.com.cn/xcx_imgs/xz.png" style="width: 36upx; height: 36upx;" v-if="ggitem.barcode_id==barcode_id"></image>
						<image src="https://div.buy315.com.cn/xcx_imgs/wxz.png" style="width: 36upx; height: 36upx;" v-else></image>
					</view>
					<view class="x-auto">
						{{ggitem.spec}}
					</view>
					<view class="x-auto float-right">
						<image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" style="width: 16upx; height: 28upx;"></image>
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
			login:false,
			memberinfo:[],
			specinfo:[],
			barcode_id:0,
			goods_title:'',
			}
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
		  //console.log(JSON.parse(data.specinfo));
		  this.barcode_id = data.barcode_id;
		  this.specinfo = JSON.parse(data.specinfo);
		  this.goods_title = data.goods_title;
		  this.predicts = data.predicts;
		  
		 },
		methods: {
			goGoodsDetails(data,specinfo,barcode_id,spec){
				//console.log(specinfo);return;
				//console.log(data);
				//console.log(data);return;
				//下面的程序执行了返回时向上级页面传参，并跳转到指定的页面
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
				//#ifdef MP-WEIXIN
				prevPage.setData({
					mydata:{
						spec:specinfo,
						spec_str:spec,
						spec_id:data.spec_id,
						imgs:data.imgs,
						goods_title:this.goods_title,
						promotion:data.promotion,
						barcode_id:barcode_id,
						detial:data.detial,
						goods_id:data.goods_id,
						original_price:data.original_price,
						price:data.price,
						unit:data.unit,
						predicts:this.predicts,
					},
				});
				//#endif
				// #ifdef APP-PLUS
						prevPage.$vm.spec = specinfo;
						prevPage.$vm.spec_str = spec;
						prevPage.$vm.spec_id = data.spec_id;
						prevPage.$vm.imgs = data.imgs;
						prevPage.$vm.goods_title = this.goods_title;
						prevPage.$vm.promotion = data.promotion;
						prevPage.$vm.barcode_id = barcode_id;
						prevPage.$vm.detial = data.detial;
						prevPage.$vm.goods_id = data.goods_id;
						prevPage.$vm.original_price = data.original_price;
						prevPage.$vm.price = data.price;
						prevPage.$vm.unit = data.unit;
						prevPage.$vm.predicts = this.predicts;
				// #endif
				uni.navigateBack({
					delta: 1
				});
				return;
			}
		}
	}
</script>
<style>
	page {
		background-color: #F6F6F6;
	}
	.imgwidth{width: 750upx; height:750upx;}
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
		font-size: 6pt;
		min-width: 30upx;
		height: 30upx;
		line-height: 30upx;
		border-radius:30upx;
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
</style>
