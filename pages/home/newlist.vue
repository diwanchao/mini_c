<template>
	<view>
		<!-- 新人专享大礼包 -->
	<hx-navbar :config="config"/>
		<!-- <view class="newGiftBanner">
		  <image class="bg1" src="https://div.buy315.com.cn/xcx_imgs/bg1.png" mode="widthFix"></image>
		</view> -->
		<view class="newGiftCon" style="margin-top:20upx">
		  <image class="newGiftConImgTop" mode="widthFix" src="https://div.buy315.com.cn/xcx_imgs/bg2.png"></image>
		  <view class="newGiftConCoupon">
		    <view class="newGiftConCouponList">
		      <view class="newGiftConCouponListLi" v-for="(item,index) in newCouponList">
		      <image src="https://div.buy315.com.cn/xcx_imgs/bg4.png" class="imageee"></image>
			   <!-- <text class="t1">10</text>
			     <text class="t2">满39元可用</text>
			     <text class="t3">肉蛋水产蔬菜</text> -->
		       <text class="t1">{{item.reduce}}</text>
		        <text class="t2">满{{item.full}}使用</text>
		        <!-- <text class="t3">{{item.title}}</text> -->
				 <text class="t3">全场通用</text> 
		      </view>
		    </view>
			<view class="newGiftConCouponBtnAdd" @click="gotoyouhuiq" >
			  <image src="../../static/ananiuuioj.png" mode="widthFix" class="bg3"></image>
			</view>
		  </view>
		  </view>
		
		  <!-- 商品 -->
		  <view class="new_t1"  >
		    <image class="new_images" src="../../static/xiangou.png"></image>
		  </view>
		  <view >
		    <view class="shop_1" v-for="(item,index) in newlist" :key='index' @click="gotonewdetail(item)">
		      <view >
		        <image class="shop_picter" :src="item.imgs_original"></image>
		      </view>
		      <view class="shop_t1">
		        <view class="shop_t2">{{item.goods_title}}</view>
		        <view class="shop_money">
		          <view>￥{{item.new_people_price}}</view>
		          <view class="shop_t3">{{item.retail_price}}</view>
		        </view>
		        <view class="shop_news">
		          <view class="shop_t4">{{item.label_name}}</view>
		        </view>
		      </view>
		      <view class="shop_gou" @click="addshuliang">
				  <image class="shop_moreimg" src="https://div.buy315.com.cn/xcx_imgs/jia.png" mode=""></image>
			  </view>
		    </view>
		  </view>

		 <!-- 活动规则 -->
		 <view >
			 <view class="active_imgs" >
			   <image class="active_img" src="../../static/guize.png"></image>
			 </view>
			 <view class="active_footer">
			   <view class="active_rules">
			 	<view style="color: #FE0000;">参与对象</view>
				<view>每日菜场首次登录用户</view>
				<view style="color: #FE0000;">参与城市</view>
				<view>长春</view>
				<view style="color: #FE0000;">使用范围</view>
				<view>在指定时间、指定商品品类下的商品可使用，详见优惠券说明。</view>
				<view style="color: #FE0000;">如何获得</view>
				<view>上述城市用户首次登录每日菜场用户，即可获得。</view>
				<view style="color: #FE0000;">如何查看</view>
				<view>打开每日菜场小程序→“我的”→“优惠券”即可查看。</view>
				<view style="color: #FE0000;">使用规则</view>
				
				
				<view>①每个订单只能使用一张优惠券，不找零、不兑换现金。</view>
				<view>②优惠券有使用时间、品类及金额限制，需要在对应品类下且满足使用金额后方可使用。</view>
				<view>③同一登录账号、同一手机号、同一终端设备号、同一支付账号、同一IP地址或其他合理显示为同一用户的情形，均视为同一用户，仅限领取一次。</view>
				<view>④若发生取消订单，系统将自动返还相关优惠券（优惠券有效期不变）；若发生退款退货，仅退回该商品实际支付金额，优惠券抵扣部分不予退回。</view>
				<view>⑤若通过不正当手段获取，或存在恶意套利、作弊等其他不诚信行为，每日菜场商城有权撤销该用户优惠券资格，并废止优惠券。</view>
				
				<view style="color: #FE0000;">首单一元购</view>
				<view>①本活动仅限通过“新人专享”区进行下单；</view>
				<view>②本活动1元商品每个用户仅限参与一次，且购买1件，若购买多件，超出部分恢复原价。</view>
				<view>③用户选定1元商品后，需与其他商品共同下单，若仅下单一元商品则不予配送。</view>
			   </view>
			 </view>
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
					title: '新人专享',
					color: '#ffffff',
					backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
					statusBarFontColor:'#fff'
				},
				height:'',
				newlist:[{
					id:0,
					title:'',
					img:'',
					picter:'',
					picters:'',
					remark:'',
					barcode_id:'',
					
				}],
				newCouponList:[]
			}
		},
		created() {
			this.getnewlist();
			this.getnewCoupon();
		},
		onLoad() {
			
			console.log(this.xshopInfo)
			// 获取系统高度
			uni.getSystemInfo({
				success:(res) =>{
					this.height = res.statusBarHeight + this.CustomBar
					// this.height = uni.getSystemInfoSync()['statusBarHeight'] + 45;
					console.log(this.height)
				}
			})
			console.log('45645646')
		},
		methods: {
			gotoyouhuiq(){
				uni.navigateTo({
					url:'/pagesb/center/xjj_list'
				})
			},
			getnewlist() {
				console.log('fewgirhe')
				//获取公告信息
				var xarr = {
					// stores_id:this.xshopInfo.store.stores_id,
					stores_id:13,
				};
				var xpdata = url.getSignStr(xarr);
				uni.request({
					url: url.websiteUrl + '/api_v2/stores/getnewpeoplegoodslist',
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: xpdata,
					success: res => {
						this.newlist = res.data.data
						console.log('$$$$$$$$$$$')
						console.log('fdsfsd',res)
					}
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
			gotonewdetail(item){
				console.log('fhesuortgieoa')
				console.log(item.barcode_id)
				uni.navigateTo({
					url:"../goods_details/goods_details?barcode_id=" + item.barcode_id
				})

			}
		}
	}
</script>

<style>
/* pages/index/newGift.wxss */
page{
  background: #F7F7F7; 
  width: 100%;
  height: 100%;
  float: left;
}
.bg1{
  width: 100%;
  height: 180rpx;
}
.newGiftBanner{
  width: 100%;
  float: left;
}
.newGiftCon{
  width: 94%;
  float: left;
  margin-left: 3%;
  position: relative;

}
.newGiftConImgTop{
  width: 100%;
  height: 556rpx;
}
.newGiftConCoupon{
  position: absolute;
  top: 180rpx;
  left: 30rpx;
  width: 100%;
}
.newGiftConCouponList{
  width: 96%;
  float: left;
  margin-top: 20rpx;
  margin-left: 13upx;
}
.newGiftConCouponListLi{
  width: 192rpx;
  height: 110rpx;
  float: left;
  /* margin-left: 2%; */
  margin:0 10rpx;
  margin-top: 20rpx;
  position: relative;
  color: #ff864b;
}
.imageee{
  width: 192rpx;
  height: 110rpx;
  background-size: 100%;
  
}
.newGiftConCouponListLi .t1{
  font-size: 55rpx;
  position: absolute;
  top: -5rpx;
  left: 18rpx;
}
.newGiftConCouponListLi .t2{
  width: 100rpx;
  text-align: center;
  font-size: 15rpx;
  position: absolute;
  top: 13rpx;
  right: 14rpx;
}
.newGiftConCouponListLi .t3{
  text-align: center;
  width: 90rpx;
  font-size: 15rpx;
  position: absolute;
  bottom: 48rpx;
  right: 18rpx;
}
/* .newGiftConCouponListLi:nth-child(3n){
  margin-right: 0;
} */
.newGiftConCouponListLiText1{
  width: 40%;
  float: left;
  margin-left: 3%;
}
.newGiftConCouponListLiText1_1{
  font-size: 80rpx;
  font-weight: bold;
  color: #598e3a;
  float: left;
  text-align: right;
  width: calc(100% - 30rpx);
  margin-top: 30rpx;
}
.newGiftConCouponListLiText1_2{
  font-size:26rpx;
  float: left;
  margin-top: 48rpx;
  color: #598e3a;
}
.newGiftConCouponListLiText2{
  width: 53%;
  float: left;
  text-align: center;
}
.newGiftConCouponListLiText2_1{
  width: 100%;
  float: left;
  text-align: center;
  color: #598e3a;
  font-size: 26rpx;
  margin-top: 40rpx;
  margin-bottom: 6rpx;
}
.newGiftConCouponListLiText2_2{
  padding: 4rpx 10rpx;
  background: #598e3a;
  font-size: 26rpx;
  color: #fff;
  text-align: center;
  display: initial;
}
.newGiftConCouponBtnAdd{
  /* float: left; */
  margin-left: 50upx;
}
.bg3{
  height: 100rpx;
  width: 553rpx;
  margin-top: 60rpx;
}
/* 商品 */
.new_t1{
  text-align: center;
  font-size: 40rpx;
  color: #FF874B; 
  font-family: 'STHupo';
  font-weight: bold;
}
.new_images{
  height: 38rpx;
  width: 360rpx;
}
.shop_1{
  height: 190rpx;
  width: 710rpx;
  background-color: #fff;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
  display: flex;
  position: relative;
  margin-left: 20upx;
}
.shop_picter{
  height: 150rpx;
  width: 150rpx;
  margin-left: 20rpx;
  margin-top: 20rpx;
  border-radius: 10rpx;
}
.shop_money{
  display: flex;
  font-size: 30rpx;
  color: #fe0000;
  padding-right: 20rpx;
  align-items: center;
  vertical-align: middle;
}
.shop_news{
  display: flex;
}
.shop_t1{
  height: 150rpx;
  line-height: 50rpx;
  margin-left: 20rpx;
}
.shop_t2{
  font-size: 28rpx;
  margin-top: 20rpx;
  white-space: nowrap;
  overflow:hidden;
  text-overflow: ellipsis;
}
.shop_t3{
  font-size: 24rpx;
  color: #999;
  text-decoration: line-through;
  padding-top: 8upx;
  padding-left: 10upx;
}
.shop_t4{
  font-size: 24rpx;
  color: #999;
/*  border: 1rpx solid #ff864b; */
  margin-right: 20rpx;
  padding: 0 12rpx;
}
.shop_gou{
  position: absolute;
  right: 20rpx;
  bottom: 20rpx;
  color: #fff;
/*  background-color: #ff864b; */
  height: 80rpx;
  width: 80rpx;
  font-size: 36rpx;
  font-weight: bold;
  font-family: 经典叠圆体简;
  border-radius: 50%;
  line-height: 80rpx;
  text-align: center;
}
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
.shop_moreimg{
	height: 50upx;
	width: 50upx;
}
/* 顶部导航 */
.heads{
	position: relative;
}
.topimg{
	height: var(--status-bar-height); 
	width: 100%;
	position: fixed;
	z-index: 111;
}
.toptext{
	position: fixed;
	z-index: 999;
	font-size: 32upx;
	color: #fff;
	left: 42%;
	top: 60upx;
}
</style>
