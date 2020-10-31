<template>
	<view>
		<hx-navbar :config="config" />
		<view>
		  <view class="topimg">
		    <image class="luimg" src="https://div.buy315.com.cn/xcx_imgs/mareak.png"></image>
		  </view>
		  <view class="style_name">
		    <image class="style_left" src="https://div.buy315.com.cn/xcx_imgs/xihongshi.png"></image>
		    <view class="style_text">有你拼团更放心</view>
		    <image class="style_right" src="https://div.buy315.com.cn/xcx_imgs/xihongshi.png"></image>
		  </view>
		  <view>
		    <view class="shopping" v-for="(item,index) in buyList" :key='index' @click="gotonewdetail(item)">
				<view style="display: flex;">
				  <image class="shop_img" :src="item.imgs_original"></image>
				  <view style="height: 150upx; line-height: 48upx; margin-left: 20upx;">
					<view class="shop_texts">{{item.goods_title}}</view>
					<view class="carry">已累计拼成{{item.current_number}}份 <text style="margin-left: 20rpx;">总数量{{item.total_num}}</text></view>
					<view class="time_end">{{item.end_time}} 结束</view>
				  </view>
				  <view class="group_grab">
					<view>立即参团 ></view>
				  </view>
			  </view>
			  <view class="schedule" >
				  <view class="schedule_all" style="display: flex;" >
					  <view class="schedule_quan" v-for="(items,index) in item.data" :key='index'>
						  <view class="schedule_up">{{items.number}}份</view>
						 
						  <view class="schedule_down">{{items.unit_price}}元/份</view>
					  </view>
				  </view>
				    <view class="schedule_heng">
						<view class="kuan" :style="{width:Math.floor(item.current_number/item.data[3].number*100) + '%' }"></view>
					</view>
			  </view>
			  <!-- this.newkuan = (Math.floor(this.scheduleList[0].up/400*10000) / 100.00 + "%") -->
		    </view>
		    <!-- 活动规则 -->
		    <view class="active_imgs">
		      <image class="active_img" src="../../static/ditu.png"></image>
			  <view class="viptext">拼团规则</view>
		    </view>
		    <view class="active_footer">
		      <view class="active_rules" >
		        <view>1.参加团购用户,团购支付成功后无法退款,如拼团未成功,金额退回原路径.</view>
				<view>2.参团人数越多,团购商品价格越低.</view>
				<view>3.团购商品到截止时间,参团人数符合最低开团标准,团购成功.</view>
				<view>4.参团人数不符合开团最低标准,团购失败,金额退回原路径.</view>
				<view>5.团购成功后,到店自提商品次日早八点后可提取.</view>
		      </view>
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
					title:'拼团',
					color: '#ffffff',
					backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
					statusBarFontColor:'#fff',
					fontSize:'16px',
				},
				buyList:[],
				buyListlenght:0,
				 getshopping:[],
				active_rules:[1,2,3],
				groupbuyfen:[],
				scheduleList:[],
				newkuan:'',
				qiuqiu:[{}],
				qiuqiu2:[],
			}
		},
		onLoad() {
			this.getbuyList();
			// this.getbarwidth();
			
		},
		methods: {
			gotonewdetail(item){
				console.log('fhesuortgieoa')
				console.log(item.barcode_id)
				uni.navigateTo({
					url:"../goods_details/goods_details?barcode_id=" + item.barcode_id
				})
			
			},
			// getbarwidth(){
			// 	console.log(this.scheduleList[0].up )
				
			// 	 this.newkuan = (Math.floor(this.scheduleList[0].up/400*10000) / 100.00 + "%")
			// 	 console.log(this.newkuan,'新的宽值')
			// },
			getbuyList(){
				var arr = {};
				var pdata = url.getSignStr(arr);
				uni.request({
					url: url.websiteUrl + '/api_v2/stores/getgroupbuyinggoodslist',
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: pdata,
					success: res => {
						this.buyList = res.data.data
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
		}
	}
</script>

<style>
/* pages/index/groupbuy.wxss */
.topimg{
  width: 710rpx;
  height: 300rpx;
}
.luimg{
  height: 300rpx;
  width: 710rpx;
  border-radius: 10rpx;
  margin-left: 20rpx;
  margin-top: 30rpx;
}
.style_name{
  display: flex;
  justify-content: center;
  margin-top: 70rpx;
  align-items: center;
  margin-bottom: 50rpx;
}
.style_left{
  height: 25rpx;
  width: 25rpx;
  color: #333;
}
.style_text{
  font-size: 36rpx;
  color: #FD0000;
  font-family:SimHei;
  font-weight: bold;
  
}
.style_right{
  height: 25rpx;
  width: 25rpx;
  color: #333;
}
.shop_prog{
  display: flex;
  margin-left: 25rpx;
  margin-top: 38rpx;
  align-items: center;
}
.shop_progress{
  height: 20rpx;
  width: 200rpx;
  border-radius: 10rpx;
  border: 1rpx solid #FF874B;
}
.shop_bar{
  height: 20rpx;
  width: 150rpx;
  background: #FF874B;
  border-radius: 10rpx;
}
.shop_number{
  font-size: 20rpx;
  color: #969595;
  margin-left: 20rpx;
}

/**app.wxss**/

page{
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  font-family: "微软雅黑";
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
} 
.shopping{
  height: 300rpx;
  width: 710rpx;
  background: #fff;
  margin:0 auto;
  border-radius: 10rpx;
  /* display: flex; */
  margin-bottom: 20upx;
  position: relative;
}
.shop_img{
  height: 150rpx;
  width: 150rpx;
  border-radius: 10upx;
  margin-left: 20upx;
  margin-top: 20upx;
}
.shop_texts{
  font-size: 28rpx;
  color: #333;
  font-family: SimHei;
  margin-top: 20rpx;
  width: 75%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.shop_textss{
  display: flex;
  margin-top: 20rpx;
  margin-left: 20rpx;
  align-items: center;
}
.moneys{
  font-size: 30rpx;
  color: #FD0000;
}
.moneys_a{
  font-size: 24rpx;
  color: #999;
  margin-left: 15rpx;
  text-decoration:line-through;
}
.group_grab{
  height: 48rpx;
  width: 134rpx;
  background: #FD0000;
  border-radius: 6rpx;
  margin-top: 115rpx;
  margin-left: 30rpx;
  position: absolute;
  right: 20rpx;
  bottom: 130rpx;
}
.group_grab view{
  font-size: 22rpx;
  color: #fff;
  line-height: 48rpx;
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
.detail_img{
  height: 600rpx;
  width: 746rpx;
}
.detail_heng{
  height: 90rpx;
  width: 750rpx;
  margin-top: 3rpx;
  background: #fb6363;
  position: relative;
  font-size: 22rpx;
  color: #fff;
}
.detail_text{
  padding-top: 10rpx;
  margin-left: 20rpx;
  font-size: 28rpx;
}
.detail_hint{
  margin-left: 20rpx;
  padding-top: 6rpx;
}
.detail_text text{
  font-size: 22rpx;
  text-decoration:line-through;
  margin-left: 10rpx;
}
.detail_left{
  background: #FD0000;
  height: 90rpx;
  width: 212rpx;
  position: absolute;
  right: 0;
  top: 0;
  font-size: 24rpx;
  line-height: 90rpx;
  text-align: center;
}
.detail_label{
  height: 160rpx;
  width: 710rpx;
  background: #fff;
  margin-left: 20rpx;
  margin-top: 20rpx;
  border-radius: 10rpx;
}
.detail_labels{
  padding-top: 20rpx;
  margin-left: 20rpx;
}
.detail_labels .text{
  font-size: 28rpx;
  color: #333;
}
.detail_labels .texts{
  font-size: 24rpx;
  color: #BFBFBF;
  margin-top: 10rpx;
}
.delivery{
  height: 100rpx;
  width: 690rpx;
  margin-left: 20rpx;
  margin-top: 20rpx;
  background: #fff;
  border-radius: 10rpx;
  font-size: 28rpx;
  color: #333;
  line-height: 100rpx;
  padding-left: 20rpx;
}
.delivery text{
  font-size: 24rpx;
  color: #999;
  padding-left: 20rpx;
}
.detail_shop{
  height: 220rpx;
  width: 710rpx;
  border-radius: 10rpx;
  background: #fff;
  margin-left: 20rpx;
  margin-top: 20rpx;
}
.detail_shopp{
  display: flex;
  flex-wrap: wrap;
  margin-top: 30rpx;
  margin-left: 20rpx;
}
.detail_shopp view{
  width: 50%;
  font-size: 24rpx;
  line-height: 40rpx;
  color: #999;
}
.detail_shopp view text{
  color: #333;
  margin-left: 20rpx;
}
.detail_name{
  margin-left: 20rpx;
  font-size: 28rpx;
  padding-top: 20rpx;
}
.detail_imgs{
  height: 900rpx;
  width: 710rpx;
  margin-left: 20rpx;
  margin-top: 20rpx;
  background: #fff;
  border-radius: 10rpx;
}
.detail_imgpng{
  height: 900rpx;
  width: 710rpx;
}
.detail_rule{
  height: 600rpx;
  width: 710rpx;
  margin-left: 20rpx;
  margin-top: 20rpx;
  background: #fff;
  border-radius: 10rpx;
  margin-bottom: 80rpx;
}
.detail_rules{
  height: 600rpx;
  width: 710rpx;
}
.detail_icon{
  height: 42rpx;
  width: 42rpx;
}
.detail_all{
  text-align: center;
  margin-left: 70rpx;
  font-size: 20rpx;
  color: #656565;
  margin-top: 10rpx;
} 
.after::after{
  content: "";
  clear: both;
  display: block;
}
.red_bt_btn{
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  font-size: 36rpx;
  color: #fff;
  background-color: #FE0000;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
}
.btn_circular{
  width: 600rpx;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  font-size: 36rpx;
  color: #fff;
  background-color: #FE0000;
  box-shadow:0px 10rpx 30rpx 0px rgba(118,74,5,0.2);
  border-radius: 44rpx;
}
/* 新加 */
.carry{
	font-size: 24upx;
	color: #999999;
	font-weight: 400;
}
.time_end{
	font-size: 24upx;
	color: #FE0000;
	font-weight: 400;
}
.schedule{
	/* overflow: hidden; */
	/* position: relative; */
}
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
	position: absolute;
	left: 58upx;
	bottom: 62upx;
	overflow: hidden;
}
.schedule_all{
	display: flex;
	/* justify-content: space-around; */
	width: 607upx;
	left: 55upx;
	bottom: 57upx;
	position: absolute;
	justify-content: space-between;
	align-items: center;
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
.kuan{
	background-color: #FE0000;
	height: 10upx;
	position: absolute;
	border-radius: 5upx;

}
.viptext{
	font-size: 30rpx;
	color: #FFFFFF;
	position: absolute;
	left: 44%;
	bottom: 12rpx;
	letter-spacing: 7rpx;
	z-index: 999999;
}
/* .schedule::after{
	content: "";
	display: block;
	clear: both;
} */
</style>
