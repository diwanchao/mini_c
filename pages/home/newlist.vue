<template>
	<view>
		<!-- 新人专享大礼包 -->
	<!-- <hx-navbar :config="config"/> -->
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
			  <image src="https://div.buy315.com.cn/xcx_imgs/ananiuuioj.png" mode="widthFix" class="bg3"></image>
			</view>
		  </view>
		  </view>
		
		  <!-- 商品 -->
		  <view class="new_t1"  >
		    <image class="new_images" src="https://div.buy315.com.cn/xcx_imgs/xiangou.png"></image>
		  </view>
		  <view >
		    <view class="shop_1" v-for="(item,index) in newlist" :key='index' >
		      <view @click="gotonewdetail(item)">
		        <image class="shop_picter" :src="item.imgs_original"></image>
		      </view>
		      <view class="shop_t1" @click="gotonewdetail(item)">
		        <view class="shop_t2">{{item.goods_title}}</view>
				<view class="shop_news">
				  <view class="shop_t4">{{item.label_name}}</view>
				</view>
		        <view class="shop_money">
		          <view>￥{{item.new_people_price}}</view>
		          <view class="shop_t3">{{item.retail_price}}</view>
		        </view>
		        
		      </view>
			  
		      <view v-if="pointer==true" class="shop_gou" @click="jrShoppingCart(1,item,item.group_id,'dh'+item.group_id+'-'+item.barcode_id,item.barcode_id)">
				  <image class="shop_moreimg" src="https://div.buy315.com.cn/xcx_imgs/jia.png" mode=""></image>
			  </view>
			  <view v-else class="shop_gou" @click="tips_xiangou">
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
			 	<view style="color: #FE0000;">使用规则</view>
				<view>①每个订单每天只能使用一张同种类优惠券，不找零、不兑换现金。</view>
				<view>②优惠券有使用时间、品类及金额限制，需要在对应品类下且满足使用金额后方可使用。</view>
				<view>③同一登陆账号、同一手机号、同一终端设备号、同一支付账号、同一IP地址或其他合理显示为同一用户的情形，均视为同一用户，仅限领取一次。</view>
				<view>④若发生取消订单或退款退货，仅退回该商品实际支付金额，优惠券抵扣部分不予退回。</view>
				<view>⑤若通过不正当手段获取，或存在恶意套利、作弊等其他不诚信行为，每日菜场商城有权撤销该用户优惠券资格，并废止优惠券。</view>
				<view style="color: #FE0000;">首单一元购</view>
				
				<view>①本活动仅限通过“新人专享”区进行下单；</view>
				<view>②本活动1元商品每个用户仅限参与一次，且购买1件，若购买多件，超出部分恢复原价。</view>
				<view>③用户选定1元商品后，需与其他商品共同下单，若仅下单一元商品则不予配送。</view>
				<view>④每个订单只能使用一张优惠券，不找零、不兑换现金。</view>
			   </view>
			 </view>
		 </view>
		<view class="Suspension" @click="gotogouwuc">
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
				// config:{
				// 	title: '新人专享',
				// 	color: '#ffffff',
				// 	backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
				// 	statusBarFontColor:'#fff'
				// },
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
				newCouponList:[],
				pointer:true
				
			}
		},
		created() {
			this.getnewlist();
			this.getnewCoupon();
		},
		onLoad() {	
			this.getnewgoodsid();
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
			// 获取新人商品id
			getnewgoodsid() {
				
				var xarr = {};
				var xpdata = url.getSignStr(xarr);
				uni.request({
					url: url.websiteUrl + '/api_v2/stores/getnewpeoplegoods',
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: xpdata,
					success: res => {
						
						this.newpeopleid = res.data.data
						console.log('this.newpeopleid',this.newpeopleid)
					}
				});
			},
			gotogouwuc(){
				uni.switchTab({
					url:'/pages/shoppingcart/shoppingcart'
				})
			},
			// goGwc() {
			// 	uni.switchTab({//reLaunch 这是直接进入，没有滑动效果。switchTab有滑动效果
			// 		url:"../shoppingcart/shoppingcart?acom_id="+this.sData.acom_id
			// 	})
			// },
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
			},
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
				    // animation.translate(-20,-20).step({duration: 50}).translate(-40,-10).step({duration: 50}).translate(-data.left+240,this.wheight-data.bottom).step({duration: 150})
				    this.animationData = animation.export()
				}).exec();				
				setTimeout(function() {
				  this.amintiond_list = [];
				}.bind(this), 400)
				
			},
			// tips_xiangou(){
			// 	uni.showToast({
			// 		title:'购买的数量已经超出了总数',
			// 		icon:'none'
			// 	})
			// },
			jrShoppingCart(num_s, goods_info, type, v, barcode_id) {
				 if (this.memberinfo.length == 0) {
				      uni.navigateTo({
				        url: "/pages/login/login"
				      })
				      return;
				    }
				const newshopcart =  uni.getStorageSync('newshopcart')
				if(newshopcart) {
					if(newshopcart === barcode_id){
						uni.showToast({
							title:'新人商品限购1件哦',
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: '新人商品限购1件哦',
							icon: 'none'
						})
					}
					return false;
				}
				
			uni.showToast({
			      title: '加入成功',
			      duration: 1000,
				  icon:'none'
			     });
				//num_s参数   0和1，0为减，1为加
				//goods_info参数  一维数组				
				console.log(goods_info,'%%%%%%%%%%%%%%%%%%%%%');
				
				//console.log(goods_info);
				//if(num_s==1){
				//console.log(123);
				//return;
				//}
				//限购数量和购物车数量对比
				// for(let ixs in this.newshopcart) {
				// 	if(this.newshopcart[ixs].barcode_id == goods_info.barcode_id) {
				// 		if(this.shoppingCarts[ixs].num>0){
				// 			uni.showToast({
				// 				title:'新人的商品只能购买一件哦',
				// 				icon:'none'
				// 			})
				// 			return false
				// 		}
				// 	}
				// 	console.log(this.newshopcart.length,'长度==================')
				// 	if(this.newshopcart.length>0){
				// 		uni.showToast({
				// 			title:'新人的商品只能购买一件哦',
				// 			icon:'none'
				// 		})
				// 		return false
				// 	}
				// }
				
				// for (let ixs in this.shoppingCarts) {
				// 	if (this.shoppingCarts[ixs].barcode_id == goods_info.barcode_id) {
				// 		if (goods_info.astrict_num !== '' && ((parseFloat(this.shoppingCarts[ixs].num) + 1) > goods_info.astrict_num)) {
				// 			uni.showToast({
				// 				icon: 'none',
				// 				title: '商品【' + this.shoppingCarts[ixs].goods_title + '】限购' + goods_info.astrict_num + goods_info.unit
				// 			});
				// 			return;
				// 		}
				// 	}
				// }
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
				this.newshopcart = glistx.concat(glist);
				//console.log(this.shoppingCarts);
				//console.log(this.shoppingCarts);
				// 写入缓存
				uni.setStorageSync('newshopcart', barcode_id);
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
			sumShoppingCartNum(){
				//合计购物车数量
				var snum = 0;
				for(let i in this.shoppingCarts){
					if(this.shoppingCarts[i].stores_id==this.xshopInfo.store.stores_id){
						snum+=parseFloat(this.shoppingCarts[i].num);
					}					
				}
				this.shoppingCartNum = snum;
				uni.setTabBarBadge({
				  index: 2,
				  text: ''+snum+'',
				})
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
  line-height: 30upx;
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
	.Suspension{
		position: relative;
		height: 80upx;
		width: 80upx;
		background-color: #FC8282;
		border-radius: 50%;
		position: fixed;
		right: 40rpx;
		bottom: 50rpx;
		z-index: 9999;
	}
	.Suspensionimg{
		height: 35upx;
		width: 35upx;
		position: absolute;
		left: 20upx;
		top: 25upx;
		z-index: 9999999;
	}
</style>
