<template>
	<view class="center">
		<view class="x12 float-left">
			<view class="center-list" style="margin-top: 0;">
				<navigator url="ck_list">
					<view class="center-list-item border-bottom" style="height: 100upx;">
						<view class="x-auto text-gray text-big" style="padding-top: 24upx;">
							<view class="x-auto" style="padding-top: 4upx; padding-right: 20upx; display: none;">
								<view style="display: table-cell; vertical-align: middle; text-align: center; width: 32upx; height: 32rpx;">
									<image src="https://div.buy315.com.cn/xcx_imgs/zfmm.png" style="width: 28upx; height: 32upx;"></image>
								</view>
							</view>
							<view class="x-auto" style="font-size: 12pt; padding-top: 2upx;">次卡</view>
						</view>
						<view class="x-auto float-right"  style="padding-top: 24upx;">
							<image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" style="width: 16upx; height: 28upx;"></image>
						</view>
					</view>
				</navigator>
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
		}
	}
</script>

<style>
	@import '../../common/common.css';
	page {
		background-color: #F6F6F6;
	}
</style>
