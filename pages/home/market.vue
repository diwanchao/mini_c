<template>
	<view>
		<!--pages/index/market.wxml-->
		  <hx-navbar :config="config"/>
		  <view class="nav">
		    <view class="icon_wjcc"><image class="icon_wjcc" src="https://div.buy315.com.cn/xcx_imgs/icon_wjcc.png"></image></view>
		   <!-- <view class="icon_text">晚间特价：9.9三件起</view> -->
		  </view>
		  <view class="marth_text">
		    <view><image class="icon_left" src="https://div.buy315.com.cn/xcx_imgs/xihongshi.png"></image></view>
		    <text>晚间菜场 限时打折</text>
		    <view><image class="icon_right" src="https://div.buy315.com.cn/xcx_imgs/xihongshi.png"></image></view>
		  </view>
		  <!-- 时间倒计时 -->
		  <view class="marth_time">
		    <view class="text1">据下次折扣时间还有：</view>
			
		    <view class="newstyle">
				<uni-countdown color="#fff" background-color="#70BC26" :show-day="false" :hour="h" :minute="m" :second="s"></uni-countdown>
		    </view>
			
		  </view>
		<!-- 商品 -->
		<view>
		  <view class="shop_one" v-for='(item,index) in marketList.data' :key='index' >
		    <view><image class="one_icon" :src="item.imgs_original"></image></view>
		    <view class="text2">
		      <view class="text2s">{{item.goods_title}}</view>
		      <view class="text3">
		        <view><text class="text5">特惠价：￥{{item.activity_price}}</text></view>
		        <!-- <view class="tetx4">{{item.zhek}}</view> -->
		        <!-- <view class="tetx6">{{item.activity_price}}</view> -->
		      </view>
			 <!-- <view class="text10">限时7折</view> -->
		    </view>
		    <view class="text9">
		      <view class="tetx7" >仅剩{{item.sale_num}}件</view>
		      <view class="text8" style="background-color: #9999; color: #999;" v-if="item.sale_num == 0" >售空</view>
			  <view class="text8" v-else @click="gotonewdetail(item)">抢</view>
		    </view>
		  </view>
		</view>

		  <!-- 活动规则 -->
		    <view class="active_imgs">
		      <image class="active_img" src="../../static/guize.png"></image>
			  <!-- <view class="viptext">会员规则</view> -->
		    </view>
			
		    <view class="active_footer">
		      <view class="active_rules">
		        <view>活动时间：每日18:00-21:00；</view>
				<view>活动内容：当日未售完的菜品可参与晚间菜场活动；</view>
				<view>活动规则：</view>
				<view>①限时抢购；②不支持退换货；③不支持优惠券。</view>
		      </view>
		   </view>
		   <view class="Suspension" @click="gotogouwuc">
			   <view><image class="Suspensionimg" src="https://div.buy315.com.cn/xcx_imgs/gouwuche.png"></image></view>
		   </view>
	</view>
</template>

<script>
	import url from '../../main.js';
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
	export default {
		components: {uniCountdown},
		data() {
			return {
				config:{
					title: '晚间菜场',
					color: '#ffffff',
					backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
					statusBarFontColor:'#fff'
				},
				active_rules:[1,2,3],
				marketList:[],
				m:'',
				s:'',
				d:'',
				h:'',
				endTime:''
			}
		},
		onLoad() {
			this.getEvening();
		},
		methods: {
			gotogouwuc(){
				uni.switchTab({
					url:'/pages/shoppingcart/shoppingcart'
				})
			},
			gotonewdetail(item){
				console.log('fhesuortgieoa')
				console.log(item.barcode_id)
				uni.navigateTo({
					url:"../goods_details/goods_details?barcode_id=" + item.barcode_id
				})
			
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
				uni.request({
					url:url.websiteUrl+'/api_v2/stores/geteveningmarketgoodslist',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						console.log(res.data.data,'晚间菜场')
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
  width: 750rpx;
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
  color: #AFD08C;
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
  background-color: #70BC25;
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

}
.text2s{
	width:70%;//自己调整
	overflow:hidden; //超出的文本隐藏
	text-overflow:ellipsis; //用省略号显示
	white-space:nowrap; //不换行
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
  font-size: 36rpx;
  color: #fff;
  background-color: #6FBB25;
  height: 80rpx;
  width: 80rpx;
  border-radius: 50%;
  line-height: 80rpx;
  text-align: center;
  font-weight: bold;
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
.newstyle{
	height: 30upx;
	width: 30upx;
	margin-top: 20upx;
}
.uni-countdown__number{
	height: 30upx !important;
	border-radius: 5upx !important;
}
.uni-countdown__splitor{
	line-height: 30upx !important;
}
</style>
