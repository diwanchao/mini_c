<template>
	<view>
		<!--pages/index/market.wxml-->
		 <hx-navbar :config="config"/>
		  <view class="nav">
		    <view><image class="icon_wjcc" src="https://div.buy315.com.cn/xcx_imgs/qianggou.png"></image></view>
		    <!-- <view class="icon_text">晚间特价：9.9三件起</view> -->
		  </view>
	<!-- 	  <view class="marth_text">
		    <view><image class="icon_left" src="https://div.buy315.com.cn/xcx_imgs/xihongshi.png"></image></view>
		    <text>晚间菜场 限时打折</text>
		    <view><image class="icon_right" src="https://div.buy315.com.cn/xcx_imgs/xihongshi.png"></image></view>
		  </view> -->
		  <!-- 时间倒计时 -->
<!-- 		  <view class="marth_time">
		    <view class="text1">距离结束还有：</view>
		    <view class="market_times">
		      <view>00</view>
		      <view>00</view>
		      <view>00</view>
		    </view>
		  </view> -->
		<!-- 商品 -->
		<view>
		  <view class="shop_one" v-for='item in spikeList' @click="gotonewdetail(item)">
		    <view><image class="one_icon" :src="item.img1_original"></image></view>
		    <view class="text2">
		      <view class="texttitle">{{item.goods_title}}</view>
		      <view class="text3">
		        <view><text class="text5">{{item.price}}</text></view>
		       <!-- <view class="tetx4">{{item.zhek}}</view> -->
		        <view class="tetx6">{{item.retail_price}}</view>
		      </view>
			 <!-- <view class="text10">7.2折</view> -->
		    </view>
		    <view class="text9">
		      <view class="tetx7">仅剩{{item.num}}件</view>
		      <view class="text8">马上抢 > </view>
		    </view>
		  </view>
		</view>

		  <!-- 活动规则 -->
		<!--    <view class="active_imgs">
		      <image class="active_img" src="https://div.buy315.com.cn/xcx_imgs/kele.jpg"></image>
		    </view>
		    <view class="active_footer">
		      <view class="active_rules" v-for="item in active_rules" :key='item.id'>
		        <view>dshdffhisrhoew富哦热帖瑞如今偶尔偶然荷藕我ueorheoi伛广东省法规特人体退热贴也太热</view>
		      </view>
		   </view> -->
		   <view class="Suspension" @click="gotogouwuche">
			   <view><image class="Suspensionimg" src="https://div.buy315.com.cn/xcx_imgs/gouwuche.png"></image></view>
		   </view>
	</view>
</template>

<script>
	import url from '../../main.js';
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
					title: '限时抢购',
					color: '#ffffff',
					backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
					statusBarFontColor:'#fff'
				},
				active_rules:[1,2,3],
				spikeList:[{
					id:0,
					img:'https://div.buy315.com.cn/xcx_imgs/kele.jpg',
					name:'[可口可乐] 汽水 碳酸饮料',
					picter:'25.00',
					zhek:'7折',
					husx:'￥30.00',
					shengy:'剩余30件'
					
				},
				{
					id:0,
					img:'https://div.buy315.com.cn/xcx_imgs/kele.jpg',
					name:'[可口可乐] 汽水 碳酸饮料',
					picter:'25.00',
					zhek:'7折',
					husx:'￥30.00',
					shengy:'剩余30件'
					
				}],
				sidnum:[],
			}
		},
		onLoad() {
			this.getexlosIve();
		},
		methods: {
			gotogouwuche(){
				uni.switchTab({
					url:'/pages/shoppingcart/shoppingcart'
				})
			},
			gotonewdetail(item){
				console.log('fhesuortgieoa')
				console.log(item.barcode_id)
				uni.navigateTo({
					// url:"../goods_details/goods_details?barcode_id=" + item.barcode_id
					url:"../goods_details/ms_goods_details?barcode_id="+item.barcode_id+"&s_id="+item.s_id
				})
			
			},
			// 限时秒杀
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
						console.log('%%%%%%%%%%%%')
						var sid =[];
						for(var i=0; this.spikeList.length>0; i++){
							sid.push(this.spikeList[i].s_id)
							console.log(sid,'这样的一个数组')
							this.getnumjins();
						}		
					}
				})
			},
			// 获取仅剩的数量
			getnumjins(){
				var arr ={
					s_ids:this.sidnum
				};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/stores/getseckillnumber',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						console.log(res.data,'获取的数组')
						this.numbersid = res.data.data;
						console.log('^^^^^^^^^^^^')
					}
				})
			},
		}
	}
</script>

<style>
/* pages/index/market.wxss */
page{
	background-color: #f7f7f7;
}
.nav{
  position: relative;
}
.icon_wjcc{
  height: 350rpx;
  width: 710rpx;
  margin-top: 20rpx;
  margin-left: 20rpx;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
}
.icon_text{
  position: absolute;
  top: 220rpx;
  color: #fff;
  width: 750rpx;
  left: 30%;
}
.marth_text{
  display: flex;
  align-items: center;
  height: 67rpx;
  line-height: 67rpx;
  justify-content: center;
  font-size: 36rpx;
  font-weight: bold;
  color: #FE0000;
}
.icon_left{
  height: 26rpx;
  width: 26rpx;
  margin-right: 20rpx;
}
.icon_right{
  height: 26rpx;
  width: 26rpx;
  margin-left: 20rpx;
}
.marth_time{
  display: flex;
}
.text1{
  font-size: 28rpx;
  margin-left: 20rpx;
  font-weight: bold;
  height: 81rpx;
  line-height: 81rpx;
}
.market_times{
  display: flex;
  color: #fff;
  width: 130rpx;
  justify-content: space-around;
  font-size: 24rpx;
  align-items: center;
}
.market_times view{
  background-color: #FE0000;
  width: 30rpx;
  height: 30rpx;
}
/* 商品 */
.shop_one{
  height: 190rpx;
  width: 710rpx;
  background-color: #fff;
  border-radius: 10rpx;
  margin-left: 20rpx;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 20rpx;
}
.one_icon{
  height: 150rpx;
  width: 150rpx;
  border-radius: 10rpx;
  margin-left: 20rpx;
  margin-top: 20rpx;
}
.text2{
  font-size: 28rpx;
  color: #333;
  margin-left: 20rpx;
  height: 150rpx;
  line-height: 50rpx;
  width: 100%;
}
.text3{
  display: flex;
  font-size: 30rpx;
  color: #fe0000;
  font-weight: bold;
}
.text5{
  font-weight: none;
}
.tetx4{
  font-size: 22rpx;
  margin-left: 20rpx;
}
.tetx6{
  font-size: 24rpx;
  color: #999;
  text-decoration:line-through;
  margin-left: 20rpx;
}
.tetx7{
  font-size: 24rpx;
  color: #fe0000;
  font-weight: bold;
}
.text8{
	font-size: 22upx;
	color: #fff;
	background-color: #FE0000;
	height: 47upx;
	width: 134upx;
	border-radius: 7upx;
	line-height: 47upx;
	text-align: center;
}
.text9{
  position: absolute;
  right: 20rpx;
  line-height: 65rpx;
}
/* 会员 */
.vip{
  position: relative;
  margin-left: 20rpx;
  height: 98rpx;
  width: 710rpx;
}
.vip_icon{
  height: 98rpx;
  width: 710rpx;
}
.vip_text{
  font-size: 36rpx;
  color: #333;
  font-weight: bold;
  position: absolute;
  top: 25rpx;
  left: 200rpx;
}
/* 优惠券 */
.maret_group{
  height: 130rpx;
  width: 710rpx;
  background-color: #fff;
  margin-top: 20rpx;
  margin-left: 20rpx;
}
.scroll_market{
  white-space: nowrap;
}
.market_icon{
  height: 110rpx;
  width: 252rpx;
}
.market_yhj{
  display: inline-block;
  height: 110rpx;
  width: 252rpx;
  margin-right: 60rpx;
  position: relative;
  margin-top: 10rpx;
}
.money1{
  font-size: 28rpx;
  color: #FD857D;
  font-family: Microsoft YaHei;
  position: absolute;
  top: 35rpx;
  left: 5rpx;
}
.money2{
  font-size: 74rpx;
  color: #FD857D;
  position: absolute;
  top: -10rpx;
  left: 20rpx;
  font-weight: bold;
  letter-spacing: -10rpx;
}
.money3{
  font-size: 26rpx;
  color: #FD857D;
  position: absolute;
  top: 15rpx;
  left: 100rpx;
  font-weight: bold;
  font-family: RS_TeCuHei;
}
.money4{
  font-size: 20rpx;
  color: #FD857D;
  position: absolute;
  top: 50rpx;
  left: 100rpx;
  font-family: SimHei;
}
.money5{
  font-size: 20rpx;
  color: #FD857D;
  position: absolute;
  top: 80rpx;
  left: 25rpx;
  font-family: SimHei;
}
/* 更多精彩 */
.more{
  height: 110rpx;
  display: flex;
  justify-content: center;
  padding-top: 20rpx;
}
.more_icon{
  height: 46rpx;
  width: 260rpx; 
}
/* 其他频道 */
.other_one{
  height: 200rpx;
  width: 710rpx;
  background-color: #a6d47a;
  border-radius: 20rpx;
  margin-left: 20rpx;
  position: relative;
  margin-bottom: 50rpx;
}
.other_gou{
  font-size: 40rpx;
  color: #fff;
  height: 70rpx;
  line-height: 70rpx;
  padding-top: 10rpx;

}
.other_bao{
  font-size: 23rpx;
  color: #fff;
  height: 40rpx;
  line-height: 40rpx;
}
.other_cha{
  height: 50rpx;
  background-color: #70bc26;
  border-radius: 20rpx;
  position: absolute;
  right: 97rpx;
  font-size: 24rpx;
  color: #fff;
  width: 150rpx;
  top: 130rpx;
  line-height: 50rpx;
}
.other_text{
  width: 345rpx;
  height: 200rpx;
  text-align: center;
  position: absolute;
  right: 0;
}
.other_icon{
  height: 215rpx;
  width: 365rpx;
  position: absolute;
  bottom: 12rpx;
  margin-top: 30rpx;
}
.other_one1{
  background-color: #fcb490;
}
.other_cha1{
  background-color: #ff874b;
}
/* 规则 */
.active_footer{
  /* height: 306rpx; */
  width: 710rpx;
  border: 3rpx solid;
  border-image: linear-gradient(#1848BB,#4AB8F1)3;
  margin-top: -30rpx;
  /* opacity: 0.2; */
  border-radius: 5rpx;
  margin-left: 20rpx;
  margin-bottom: 20rpx;
  padding-bottom: 20rpx;
  
}
.active_imgs{
  position: relative;
}
.active_img{
  height: 46rpx;
  width: 184rpx;
  position: relative;
  z-index: 10;
  left: 40%;
}
.active_rules{
  font-size: 24rpx;
  color: #333333;
  width: 660rpx;
  text-align: left;
  padding-left: 20rpx;
  padding-top: 54rpx;
  padding-right: 20rpx;
  line-height: 40rpx;
  z-index: 10;
}
.Suspension{
	position: relative;
	height: 80upx;
	width: 80upx;
	background-color: #FC8282;
	border-radius: 50%;
	position: fixed;
	right: 40rpx;
	bottom: 50rpx;
}
.Suspensionimg{
	height: 35upx;
	width: 35upx;
	position: absolute;
	left: 20upx;
	top: 25upx;
}
.text10{
	font-size: 24upx;
	color: #999;
}
.texttitle{
	width: 70%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow:ellipsis;
}
</style>
