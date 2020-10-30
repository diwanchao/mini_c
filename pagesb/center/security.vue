<template>
	<view class="center">
		<view class="x12 float-left">
			<view class="center-list" style="margin-top: 0;">
	<!-- 			<navigator url="pay_password">
					<view class="center-list-item border-bottom" style="height: 100upx;">
						<view class="x-auto text-gray text-big" style="padding-top: 24upx;">
							<view class="x-auto" style="padding-top: 4upx; padding-right: 20upx;">
								<view style="display: table-cell; vertical-align: middle; text-align: center; width: 32upx; height: 32rpx;">
									<image src="https://div.buy315.com.cn/xcx_imgs/zfmm.png" style="width: 28upx; height: 32upx;"></image>
								</view>
							</view>
							<view class="x-auto" style="font-size: 12pt; padding-top: 2upx;">设置支付密码</view>
						</view>
						<view class="x-auto float-right"  style="padding-top: 24upx;">
							<image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" style="width: 16upx; height: 28upx;"></image>
						</view>
					</view>
				</navigator> -->
<!-- 				<navigator url="login_password">
					<view class="center-list-item border-bottom" style="height: 100upx;">
						<view class="x-auto text-gray text-big" style="padding-top: 24upx;">
							<view class="x-auto" style="padding-top: 4upx; padding-right: 20upx;">
								<view style="display: table-cell; vertical-align: middle; text-align: center; width: 32upx; height: 32rpx;">
									<image src="https://div.buy315.com.cn/xcx_imgs/xgmm.png" style="width: 28upx; height: 28upx;"></image>
								</view>
							</view>
							<view class="x-auto" style="font-size: 12pt; padding-top: 2upx;">修改登录密码</view>
						</view>
						<view class="x-auto float-right"  style="padding-top: 24upx;">
							<image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" style="width: 16upx; height: 28upx;"></image>
						</view>
					</view>
				</navigator> -->
				<view class="center-list-item border-bottom" style="height: 100upx;" @click="signOut">
					<view class="x-auto text-gray text-big" style="padding-top: 24upx;">
						<view class="x-auto" style="padding-top: 4upx; padding-right: 20upx;">
							<view style="display: table-cell; vertical-align: middle; text-align: center; width: 32upx; height: 32rpx;">
								<image src="https://div.buy315.com.cn/xcx_imgs/tcdl.png" style="width: 32upx; height: 28upx;"></image>
							</view>
						</view>
						<view class="x-auto" style="font-size: 12pt; padding-top: 4upx;">退出登录</view>
					</view>
					<view class="x-auto float-right"  style="padding-top: 24upx;">
						<image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" style="width: 16upx; height: 28upx;"></image>
					</view>
				</view>
				<view class="center-list-item border-bottom" style="height: 100upx; display: none;" @click="qkShoppingCart">
					<view class="x-auto text-gray text-big" style="padding-top: 24upx;">
						<view class="x-auto" style="padding-top: 4upx; padding-right: 20upx;">
							<view style="display: table-cell; vertical-align: middle; text-align: center; width: 32upx; height: 32rpx;">
								<image src="https://div.buy315.com.cn/xcx_imgs/tcdl.png" style="width: 32upx; height: 28upx;"></image>
							</view>
						</view>
						<view class="x-auto" style="font-size: 12pt; padding-top: 4upx;">清空购物车</view>
					</view>
					<view class="x-auto float-right"  style="padding-top: 24upx;">
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
			memberinfo:[],
			login:false,
			news:[],
			}
		},
		onLoad:function(){
			
		},
		methods: {
			signOut(){
				uni.showToast({
					title: '退出成功',
					duration: 1000
				});			
				setTimeout(function () {
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
					uni.switchTab({
						url:"/pages/home/index"
					})
				}, 2000);
				return;
			},
			qkShoppingCart(){
				uni.showToast({
					title: '清空购物车',
				});
				//写入缓存
				uni.setStorage({
					key: 'shoppingCarts',
					data:[],
					success: function () {
					}
				});
			}
		}
	}
</script>

<style>
	@import '../../common/common.css';
	page {
		background-color: #F6F6F6;
	}
</style>
