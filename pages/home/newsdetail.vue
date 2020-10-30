<template>
	<view>
		<!--pages/index/groupdetail.wxml-->
		<!-- <page-meta page-style="overflow-y:{{isPage}}"> -->
		<!--  <navigationBar text='商品详情'></navigationBar> -->
		  <!-- 轮播图 -->
		  <swiper>
		    <block >
		      <swiper-item >
		          <image class="detail_img" src="https://div.buy315.com.cn/xcx_imgs/mareak.png"></image>
		      </swiper-item>
		    </block>
		  </swiper>
		  <!-- 横幅 -->
		  <view class="detail_heng">
		    <view class="detail_text">￥0.70/斤<text>原价￥1.20/斤</text></view>
		    <view class="detail_hint">限购一份</view>
		    <view class="detail_left">
				<view>新人专享</view>
		     <!-- <view>还剩<text>18</text>份成团</view> -->
		    </view>
		  </view>
		  <!-- 商品介绍 -->
		  <view class="detail_label">
		    <view class="detail_labels">
		      <view class="text">黄心土豆 - 1两以上（大）</view>
		      <view class="texts">黄心土豆又大又圆还好 吃过买过不后悔 看过路过瞧一瞧 看一看 保证吃了还想吃 买了还想</view>
		    </view>
		  </view>
		  <!-- 配送 -->
		  <view class="delivery">配送<text>23:00前下单，预计23：15送达</text></view>
		    <!-- 活动 -->
<!-- 		  <view class="active">
		    <view class="detail_name">活动</view>
		    <view class="active_all">
		      <view class="active_t1"><text class="t1">满减</text> 满3000元减300元</view>
		      <view class="active_t1 active_t2"><text class="t1">买赠</text> 买一斤送一斤</view>
		    </view>
		  </view> -->
		  <!-- 商品详情 -->
		  <view class="detail_shop">
		    <view class="detail_name">商品详情</view>
		    <view class="detail_shopp">
		      <view>产地 <text>山东</text></view>
		      <view>等级 <text>SSSS</text></view>
		      <view>品牌 <text>其他</text></view>
		      <view>包装 <text>无</text></view>
		      <view>储藏 <text>冷藏</text></view>
		    </view>
		  </view>
		  <!-- 拼团规则 -->
		 <!-- <view class="detail_paly"></view> -->
		  <!-- 商品图片 -->
		  <view class="detail_imgs">
		    <image class="detail_imgpng" src="https://div.buy315.com.cn/xcx_imgs/xihongshi.png"></image>
		  </view>
		  <!-- 价格说明 -->
		  <view class="detail_rule">
		    <image class="detail_rules" src="https://div.buy315.com.cn/xcx_imgs/xihongshi.png"></image>
		  </view>
		  <!-- 底部 -->
		  <!-- 样式1 -->
		  <view class="detail_footer">
		    <view class="detail_all">
		      <image class="detail_icon" src="https://div.buy315.com.cn/xcx_imgs/index-0.png"></image>
		      <view>回首页</view>
		    </view>
		    <view class="detail_foot">
				<view class="jiarugouwuc">加入购物车</view>
		     <!-- <view class="detail_buttons">
		        <view class="footer_money">￥90.00</view>
		        <view class="fotter_hint">加入购物车</view>
		      </view> -->
		    </view>
		  </view>
		  <!-- 样式2 -->
		    <!-- <view class="detail_footer" >
		    <view class="detail_all">
		      <image class="detail_icon" src="https://div.buy315.com.cn/xcx_imgs/index-0.png"></image>
		      <view>回首页</view>
		    </view>
		    <view class="detail_all">
		      <image class="detail_icon" src="https://div.buy315.com.cn/xcx_imgs/c-shoping.png"></image>
		      <view>购物车</view>
		    </view>
		    <view class="detail_foot">
		      <view class="detail_bt">
		        <view class="footer_t1" bindtap="getClickcart">加入购物车</view>
		      </view>
		      <view class="detail_button">
		        <view class="footer_t1" >立即购买</view>
		      </view>
		    </view>
		  </view> -->
		  <!-- 弹出层 -->
		  <!-- <view>
		    <view class="bg" bindtap="showMask"></view>
		    <view class="bg_bg1">
		      <view class="bg_t1">今日达</view>
		      <view class="bg_all">
		        <view><image class="bg_picter" src="/images/shouhuo.png"></image></view>
		        <view class="bg_bgt1">
		          <view class="bg_t2">黄心土豆 - 1两以上（大）</view>
		          <view class="bg_money">
		            <view>￥25.00</view>
		            <view class="bg_moneyt1">￥30.00</view>
		          </view>
		          <view class="bg_biaoq">
		            <view class="biaoqqq">一刻达</view>
		            <view class="biaoqqq">今日特价</view>
		          </view>
		        </view>
		        <view class="bg_picters">
		          <view><image class="bg_picter1" src="/images/mareak.png"></image></view>
		          <view class="bg_picter2">1</view>
		          <view><image class="bg_picter3" src="/images/mareak.png"></image></view>
		        </view>
		      </view>
		    </view> -->
		    <!-- <view class="bg_2">
		      <view class="detail_footer">
		        <view class="detail_all">
		          <image class="detail_icon" src="https://div.buy315.com.cn/xcx_imgs/index-0.png"></image>
		          <view>回首页</view>
		        </view>
		        <view class="detail_all">
		          <image class="detail_icon" src="/images/cart.png"></image>
		          <view>购物车</view>
		        </view>
		        <view class="detail_foot">
		          <view class="detail_bt">
		            <view class="footer_t1">加入购物车</view>
		          </view>
		          <view class="detail_button">
		            <view class="footer_t1">立即购买</view>
		          </view>
		        </view>
		      </view>
		    </view> -->
		  </view>
		 <!-- </page-meta> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
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
  height: 190rpx;
  width: 710rpx;
  background: #fff;
  margin:0 auto;
  border-radius: 10rpx;
  display: flex;
}
.shop_img{
  height: 150rpx;
  width: 150rpx;
}
.shop_texts{
  font-size: 28rpx;
  color: #333;
  font-family: SimHei;
  margin-top: 20rpx;
  margin-left: 20rpx;
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
  margin-top: 128rpx;
  margin-left: 30rpx;
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
/* pages/index/groupdetail.wxss */
swiper {
  height: 600rpx;
}
/* .detail_paly{
  height: 200rpx;
  width: 710rpx;
  background: #fff;
  border-radius: 10rpx;
  margin-left: 20rpx;
  margin-top: 20rpx;
} */
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
/* 底部 */
.detail_footer{
  height: 100rpx;
  width: 750rpx;
  background: #fff;
  display: flex;
  position: fixed;
  bottom: 0;
}
.detail_foot{
  display: flex;
  margin-left: 124rpx;
  margin-top: 5rpx;
}
.detail_buttons{
  background: #FD0000;
  border-radius: 40rpx;
  height: 80rpx;
  width: 230rpx;
}
.detail_all{
  margin-left: 40rpx;
}
.detail_foot{
  position: absolute;
  right: 40rpx;
  bottom: 10rpx;
}
.footer_t1{
  color: #fff;
  font-size: 28rpx;
  line-height: 80rpx;
  text-align: center;
}
.detail_button{
  border-top-right-radius: 40rpx;
  border-bottom-right-radius: 40rpx;
  height: 80rpx;
  width: 230rpx;
  background-color: #fe0000;
}
.detail_bt{
  border-top-left-radius: 40rpx;
  border-bottom-left-radius: 40rpx;
  background-color: #FF874B;
  height: 80rpx;
  width: 230rpx;
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
/* .bg_2{
  height: 100rpx;
  width: 750rpx;
  background-color: #fff;
  position: absolute;
  bottom: 0;
} */
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
.jiarugouwuc{
	background-color: #FE0000;
	font-size: 28upx;
	color: #fff;
	height: 78upx;
	width: 230upx;
	border-radius: 40upx;
	line-height: 78upx;
	text-align: center;
}
</style>
